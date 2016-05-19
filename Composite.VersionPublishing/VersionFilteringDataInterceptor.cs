using System;
using System.Linq;
using Composite.Data;
using Composite.Data.Types;

namespace Composite.VersionPublishing
{
    public class PageVersionFilteringDataInterceptor : DataInterceptor
    {
        public override IQueryable<T> InterceptGetData<T>(IQueryable<T> query)
        {
            if (typeof (T) == typeof (IPage))
            {
                return FilterPages((IQueryable<IPage>) query) as IQueryable<T>;
            }

            return FilterOtherVersionedPages(query);
            
        }

        private static IQueryable<IPage> FilterPages(IQueryable<IPage> query)
        {
            using (var dataConnection = new DataConnection())
            {
                var settings = dataConnection.GetService(typeof (VersioningServiceSettings))
                                as VersioningServiceSettings;

                if (settings == null)
                {
                    return query;
                }
                    
                var vfs = settings.VersionFilteringSettings;

                if (vfs.VersionName != null)
                {
                    return query.
                        Where(
                            page =>
                                page.VersionName == vfs.VersionName ||
                                ((page.PublishTime ?? DateTime.MinValue) <= DateTime.Now &&
                                 (page.UnpublishTime ?? DateTime.MaxValue) >= DateTime.Now))
                        .GroupBy(p => p.Id)
                        .Select(
                            g =>
                                g.OrderByDescending(page => page.VersionName == vfs.VersionName)
                                    .ThenByDescending(page => page.PublishTime)
                                    .First());
                }
                switch (vfs.FilteringMode)
                {
                    case VersionFilteringMode.Published:
                        return query
                            .Where(page => (page.PublishTime == null || page.PublishTime <= vfs.Time)
                                           && (page.UnpublishTime == null || page.UnpublishTime >= vfs.Time))
                            .GroupBy(p => p.Id)
                            .Select(g => g.OrderByDescending(page => page.PublishTime ?? DateTime.MinValue).First());
                    case VersionFilteringMode.None:
                        return query.OrderByDescending(page => page.PublishTime ?? DateTime.MinValue);
                    case VersionFilteringMode.Relevant:
                        return query
                            .GroupBy(p => p.Id)
                            .Select(g => g.OrderByDescending(page => page.PublishTime ?? DateTime.MinValue).First());
                }

                return query;
            }
        }

        private static IQueryable<T> FilterOtherVersionedPages<T>(IQueryable<T> query)
        {
            using (var dataConnection = new DataConnection())
            {
                var settings = dataConnection.GetService(typeof(VersioningServiceSettings))
                                as VersioningServiceSettings;

                if (settings == null)
                {
                    return query;
                }
                    
                //var vfs = settings.VersionFilteringSettings;
                //var relatedPages = dataConnection.Get<IPage>().Where(f => f.VersionName == vfs.VersionName);

                var relatedPages = FilterPages(dataConnection.Get<IPage>());

                if (relatedPages != null)
                {
                    return (from versioned in query
                            join page in relatedPages on (versioned as IVersioned).VersionId equals page.VersionId
                            select versioned)
                     .Union(from versioned in query
                            where (versioned as IVersioned).VersionId == Guid.Empty
                            select versioned);
                }
                
                return query;
            }
        }
    }
}
