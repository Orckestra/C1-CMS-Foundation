using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using Composite.Core;
using Composite.Data.Caching;
using Composite.Data.Foundation;
using Composite.Core.Extensions;
using Composite.Core.Types;
using NullableGuid = Composite.Core.Types.ExtendedNullable<System.Guid>;
using Composite.Data.Types;

namespace Composite.Data
{
    /// <summary>
    /// Provides basic data access to IPage and IPageStructure data
    /// </summary>
    /// <exclude />
    // Made public for Base site in App_Code/Composite/BasicSearch.cs
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public static class PageManager
    {
        private static readonly string LogTitle = "PageManager";

        private class PageStructureRecord
        {
            public Guid ParentId { get; set; }
            public int LocalOrdering { get; set; }
        }

        private static readonly int PageCacheSize = 5000;
        private static readonly int PageStructureCacheSize = 3000;
        private static readonly int ChildrenCacheSize = 2000;
        private static readonly int PagePlaceholderCacheSize = 500;

        private static readonly Cache<string, ExtendedNullable<IPage>> _pageCache = new Cache<string, ExtendedNullable<IPage>>("Pages", PageCacheSize);
        private static readonly Cache<string, ExtendedNullable<PageStructureRecord>> _pageStructureCache = new Cache<string, ExtendedNullable<PageStructureRecord>>("Page structure", PageStructureCacheSize);
        private static readonly Cache<string, ReadOnlyCollection<Guid>> _childrenCache = new Cache<string, ReadOnlyCollection<Guid>>("Child pages", ChildrenCacheSize);
        private static readonly Cache<string, ReadOnlyCollection<IPagePlaceholderContent>> _placeholderCache = new Cache<string, ReadOnlyCollection<IPagePlaceholderContent>>("Page placeholders", PagePlaceholderCacheSize);

        static PageManager()
        {
            SubscribeToEvents();
        }

        #region Public methods


        /// <exclude />
        public static IPage GetPageById(Guid id)
        {
            return GetPageById(id, false);
        }


        /// <exclude />
        public static IPage GetPageById(Guid id, bool readonlyValue)
        {
            IPage result;

            string cacheKey = GetCacheKey<IPage>(id);
            var cachedValue = _pageCache.Get(cacheKey);

            if (cachedValue != null)
            {
                result = cachedValue.Value;
            }
            else
            {
                result = (from page in DataFacade.GetData<IPage>(false)
                          where page.Id == id
                          select page).FirstOrDefault();

                _pageCache.Add(cacheKey, new ExtendedNullable<IPage> { Value = result });
            }

            if (result == null)
            {
                return null;
            }

            return readonlyValue ? result : CreateWrapper(result);
        }


        /// <exclude />
        [Obsolete("Use GetParentId(..)", true)]
        public static Guid GetParentID(Guid pageId)
        {
            return GetParentId(pageId);
        }


        /// <exclude />
        public static Guid GetParentId(Guid pageId)
        {
            PageStructureRecord pageStructure = GetPageStructureRecord(pageId);
            return pageStructure != null ? pageStructure.ParentId : Guid.Empty;
        }


        /// <exclude />
        public static int GetLocalOrdering(Guid pageId)
        {
            PageStructureRecord pageStructure = GetPageStructureRecord(pageId);
            return pageStructure != null ? pageStructure.LocalOrdering : 0;
        }



        /// <summary>
        /// 
        /// </summary>
        /// <param name="parentPageId">Empty guild will yield all root pages</param>
        /// <returns></returns>
        public static ReadOnlyCollection<Guid> GetChildrenIDs(Guid parentPageId)
        {
            var cacheKey = GetCacheKey<IPageStructure>(parentPageId);
            var cachedValue = _childrenCache.Get(cacheKey);

            if (cachedValue != null)
            {
                return cachedValue;
            }

            List<Guid> children = (from ps in DataFacade.GetData<IPageStructure>()
                                   where ps.ParentId == parentPageId
                                   orderby ps.LocalOrdering
                                   select ps.Id).ToList();

            var readonlyList = new ReadOnlyCollection<Guid>(children);

            _childrenCache.Add(cacheKey, readonlyList);

            return readonlyList;
        }



        /// <exclude />
        public static ReadOnlyCollection<IPagePlaceholderContent> GetPlaceholderContent(Guid pageId)
        {
            string cacheKey = GetCacheKey<IPagePlaceholderContent>(pageId);
            var cachedValue = _placeholderCache.Get(cacheKey);
            if (cachedValue != null)
            {
                return cachedValue;
            }

            var list = DataFacade.GetData<IPagePlaceholderContent>(f => f.PageId == pageId).ToList();

            var readonlyList = new ReadOnlyCollection<IPagePlaceholderContent>(list);

            _placeholderCache.Add(cacheKey, readonlyList);

            return readonlyList;
        }

        #endregion Public

        #region Private

        private static PageStructureRecord GetPageStructureRecord(Guid pageId)
        {
            string cacheKey = GetCacheKey<IPageStructure>(pageId);
            ExtendedNullable<PageStructureRecord> cachedValue = _pageStructureCache.Get(cacheKey);

            if (cachedValue != null)
            {
                Verify.That(cachedValue.HasValue, "Incorrect usage of cache.");
                return cachedValue.Value;
            }

            PageStructureRecord result =
                         (from ps in DataFacade.GetData<IPageStructure>(false)
                          where ps.Id == pageId
                          select new PageStructureRecord
                          {
                              ParentId = ps.ParentId,
                              LocalOrdering = ps.LocalOrdering
                          }).FirstOrDefault();

            if (result == null)
            {
                Log.LogWarning(LogTitle, "No IPageStructure entries found for Page with Id '{0}'".FormatWith(pageId));
            }

            _pageStructureCache.Add(cacheKey, result);

            return result;
        }

        private static string GetCacheKey<T>(Guid id)
        {
            var cultureInfo = LocalizationScopeManager.MapByType(typeof (T));
            Verify.IsNotNull(cultureInfo, "Localization culture is not set");

            var dataScope = DataScopeManager.MapByType(typeof (T));
            Verify.IsNotNull(dataScope, "Publication scope is not set");

            return id + dataScope.Name + cultureInfo;
        }

        private static string GetCacheKey(Guid id, DataSourceId dataSourceId)
        {
            string localizationInfo = dataSourceId.LocaleScope.ToString();
            string dataScope = dataSourceId.DataScopeIdentifier.Name;
            return id + dataScope + localizationInfo;
        }

        private static void OnPageStoreChanged(object sender, StoreEventArgs storeEventArgs)
        {
            if (!storeEventArgs.DataEventsFired)
            {
                _pageCache.Clear();
            }
        }

        private static void OnPageChanged(object sender, DataEventArgs args)
        {
            IPage page = args.Data as IPage;
            if (page == null)
            {
                return;
            }

            _pageCache.Remove(GetCacheKey(page.Id, page.DataSourceId));
        }


        private static void OnPagePlaceholderStoreChanged(object sender, StoreEventArgs storeEventArgs)
        {
            if (!storeEventArgs.DataEventsFired)
            {
                _placeholderCache.Clear();
            }
        }

        private static void OnPagePlaceholderChanged(object sender, DataEventArgs args)
        {
            var placeHolder = args.Data as IPagePlaceholderContent;
            if (placeHolder == null)
            {
                return;
            }

            _placeholderCache.Remove(GetCacheKey(placeHolder.PageId, placeHolder.DataSourceId));
        }


        private static void OnPageStructureStoreChanged(object sender, StoreEventArgs storeEventArgs)
        {
            if (!storeEventArgs.DataEventsFired)
            {
                _pageStructureCache.Clear();
                _childrenCache.Clear();
            }
        }

        private static void OnPageStructureChanged(object sender, DataEventArgs args)
        {
            var ps = args.Data as IPageStructure;
            if (ps == null)
            {
                return;
            }

            _pageStructureCache.Remove(GetCacheKey(ps.Id, ps.DataSourceId));
            _childrenCache.Remove(GetCacheKey(ps.ParentId, ps.DataSourceId));
        }

        private static IPage CreateWrapper(IPage page)
        {
            return DataWrappingFacade.Wrap(page);
        }

        private static void SubscribeToEvents()
        {
            DataEventSystemFacade.SubscribeToDataDeleted<IPagePlaceholderContent>(OnPagePlaceholderChanged, true);
            DataEventSystemFacade.SubscribeToDataAfterUpdate<IPagePlaceholderContent>(OnPagePlaceholderChanged, true);
            DataEventSystemFacade.SubscribeToDataAfterAdd<IPagePlaceholderContent>(OnPagePlaceholderChanged, true);
            DataEventSystemFacade.SubscribeToStoreChanged<IPagePlaceholderContent>(OnPagePlaceholderStoreChanged, true);

            DataEventSystemFacade.SubscribeToDataAfterUpdate<IPage>(OnPageChanged, true);
            DataEventSystemFacade.SubscribeToDataAfterAdd<IPage>(OnPageChanged, true);
            DataEventSystemFacade.SubscribeToDataDeleted<IPage>(OnPageChanged, true);
            DataEventSystemFacade.SubscribeToStoreChanged<IPage>(OnPageStoreChanged, true);

            DataEventSystemFacade.SubscribeToDataAfterAdd<IPageStructure>(OnPageStructureChanged, true);
            DataEventSystemFacade.SubscribeToDataAfterUpdate<IPageStructure>(OnPageStructureChanged, true);
            DataEventSystemFacade.SubscribeToDataDeleted<IPageStructure>(OnPageStructureChanged, true);
            DataEventSystemFacade.SubscribeToStoreChanged<IPageStructure>(OnPageStructureStoreChanged, true);
            
        }

        #endregion Private
    }
}
