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

            return query;
        }

        private static IQueryable<IPage> FilterPages(IQueryable<IPage> query)
        {
            using (DataConnection dataConnection = new DataConnection())
            {
                var setting = dataConnection.GetService(typeof (VersioningServiceSettings));
                if ((setting as VersioningServiceSettings) == null)
                    return query;
                var vfs = (setting as VersioningServiceSettings).VersionFilteringSettings;

                if (vfs.VersionName != null)
                {
                    return query.
                        Where(
                            page =>
                                page.VersionName == vfs.VersionName ||
                                (page.PublishTime <= DateTime.Now && page.UnpublishTime >= DateTime.Now))
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
                        return query;
                    case VersionFilteringMode.Relevant:
                        return query
                            .GroupBy(p => p.Id)
                            .Select(g => g.OrderByDescending(page => page.PublishTime ?? DateTime.MinValue).First());
                }

                return query;
            }
        }
    }
}
