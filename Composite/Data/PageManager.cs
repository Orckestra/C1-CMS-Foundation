using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using Composite.Core;
using Composite.Core.Linq;
using Composite.Data.Caching;
using Composite.Data.Foundation;
using Composite.Core.Types;
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
            public PageStructureRecord() { }

            public PageStructureRecord(IPageStructure ps)
            {
                ParentId = ps.ParentId;
                LocalOrdering = ps.LocalOrdering;
            } 

            public Guid ParentId { get; set; }
            public int LocalOrdering { get; set; }
        }

        private static readonly int PageCacheSize = 5000;
        private static readonly int PageStructureCacheSize = 3000;
        private static readonly int ChildrenCacheSize = 2000;
        private static readonly int PagePlaceholderCacheSize = 10000;

        private static readonly Cache<string, IReadOnlyCollection<IPage>> _pageCache = new Cache<string, IReadOnlyCollection<IPage>>("Pages", PageCacheSize);
        private static readonly Cache<string, ReadOnlyCollection<IPagePlaceholderContent>> _placeholderCache = new Cache<string, ReadOnlyCollection<IPagePlaceholderContent>>("Page placeholders", PagePlaceholderCacheSize);
        private static readonly Cache<Guid, ExtendedNullable<PageStructureRecord>> _pageStructureCache = new Cache<Guid, ExtendedNullable<PageStructureRecord>>("Page structure", PageStructureCacheSize);
        private static readonly Cache<Guid, ReadOnlyCollection<Guid>> _childrenCache = new Cache<Guid, ReadOnlyCollection<Guid>>("Child pages", ChildrenCacheSize);

        private static readonly object _preloadingSyncRoot = new object();
        private static bool _pageStructurePreloaded;
        private static readonly HashSet<string> _preloadedPageDataScopes = new HashSet<string>();


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
            var versions = GetAllPageVersions(id);
            if (versions == null || versions.Count == 0)
            {
                return null;
            }

            IEnumerable<IPage> filteredVersions = versions;
            foreach (var dataInterceptor in DataFacade.GetDataInterceptors(typeof(IPage)))
            {
                filteredVersions = dataInterceptor.InterceptGetData(filteredVersions);
            }

            var result = filteredVersions.FirstOrDefault();
            if (result == null)
            {
                return null;
            }

            return readonlyValue ? result : CreateWrapper(result);
        }

        /// <exclude />
        public static IPage GetPageById(Guid id, Guid versionId, bool readonlyValue = false)
        {
            var versions = GetAllPageVersions(id);
            if (versions == null || versions.Count == 0)
            {
                return null;
            }

            var result = versions.FirstOrDefault(v => v.VersionId == versionId);
            if (result == null)
            {
                return null;
            }

            return readonlyValue ? result : CreateWrapper(result);
        }

        private static IReadOnlyCollection<IPage> GetAllPageVersions(Guid pageId)
        {
            string cacheKey = GetCacheKey<IPage>(pageId, Guid.Empty);
            IReadOnlyCollection<IPage> allPageVersions = _pageCache.Get(cacheKey);

            if (allPageVersions == null)
            {
                using (var conn = new DataConnection())
                {
                    conn.DisableServices();

                    allPageVersions = new ReadOnlyCollection<IPage>(
                        conn.Get<IPage>().Where(p => p.Id == pageId).ToList()
                    );
                }

                _pageCache.Add(cacheKey, allPageVersions);
            }
            
            return allPageVersions;
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
            return pageStructure?.ParentId ?? Guid.Empty;
        }


        /// <exclude />
        public static int GetLocalOrdering(Guid pageId)
        {
            PageStructureRecord pageStructure = GetPageStructureRecord(pageId);
            return pageStructure?.LocalOrdering ?? 0;
        }



        /// <summary>
        /// 
        /// </summary>
        /// <param name="parentPageId">Empty guild will yield all root pages</param>
        /// <returns></returns>
        public static ReadOnlyCollection<Guid> GetChildrenIDs(Guid parentPageId)
        {
            var cacheKey = parentPageId;
            var cachedValue = _childrenCache.Get(cacheKey);

            if (cachedValue != null)
            {
                return cachedValue;
            }

            // TODO: put children's page structure records into cache
            List<Guid> children = (from ps in DataFacade.GetData<IPageStructure>()
                                   where ps.ParentId == parentPageId
                                   orderby ps.LocalOrdering
                                   select ps.Id).ToList();

            var readonlyList = new ReadOnlyCollection<Guid>(children);

            _childrenCache.Add(cacheKey, readonlyList);

            return readonlyList;
        }


        /// <exclude />
        [Obsolete("Use an overload also accepting a version id")]
        public static ReadOnlyCollection<IPagePlaceholderContent> GetPlaceholderContent(Guid pageId)
        {
            IPage page = GetPageById(pageId);

            return GetPlaceholderContent(pageId, page.VersionId);
        }


        /// <exclude />
        public static ReadOnlyCollection<IPagePlaceholderContent> GetPlaceholderContent(Guid pageId, Guid versionId)
        {
            string cacheKey = GetCacheKey<IPagePlaceholderContent>(pageId, versionId);
            var result = _placeholderCache.Get(cacheKey);

            if (result == null)
            {
                using (var conn = new DataConnection())
                {
                    conn.DisableServices();

                    var list = DataFacade.GetData<IPagePlaceholderContent>(false)
                        .Where(f => f.PageId == pageId && f.VersionId == versionId).ToList();

                    result = new ReadOnlyCollection<IPagePlaceholderContent>(list);
                }

                _placeholderCache.Add(cacheKey, result);
            }

            return result;
        }

        #endregion Public

        internal static void PreloadPageCaching()
        {
            string key = DataScopeManager.CurrentDataScope.ToString() + LocalizationScopeManager.CurrentLocalizationScope;

            if (!_preloadedPageDataScopes.Contains(key))
            {
                lock (_preloadingSyncRoot)
                {
                    if (!_preloadedPageDataScopes.Contains(key))
                    {
                        using (var conn = new DataConnection())
                        {
                            conn.DisableServices();

                            var pages = DataFacade.GetData<IPage>().GroupBy(p => p.Id).Evaluate();
                            if (pages.Count > 0)
                            {
                                var dataSourceId = pages.First().First().DataSourceId;

                                foreach (var pageVersionsGroup in pages)
                                {
                                    string pageKey = GetCacheKey(pageVersionsGroup.Key, dataSourceId);
                                    _pageCache.Add(pageKey, new ReadOnlyCollection<IPage>(pageVersionsGroup.ToList()));
                                }
                            }
                        }

                        _preloadedPageDataScopes.Add(key);
                    }
                }
            }

            if (!_pageStructurePreloaded)
            {
                lock (_preloadingSyncRoot)
                {
                    if (!_pageStructurePreloaded)
                    {
                        var pageStructures = DataFacade.GetData<IPageStructure>().Evaluate();

                        foreach (var str in pageStructures)
                        {
                            _pageStructureCache.Add(str.Id, new ExtendedNullable<PageStructureRecord> {Value = new PageStructureRecord(str)});
                        }

                        foreach (var pair in pageStructures.GroupBy(ps => ps.ParentId))
                        {
                            _childrenCache.Add(pair.Key, new ReadOnlyCollection<Guid>(
                                pair
                                .OrderBy(p => p.LocalOrdering)
                                .Select(v => v.Id).ToList()));
                        }

                        _pageStructurePreloaded = true;
                    }
                }
            }
        }


        #region Private

        private static PageStructureRecord GetPageStructureRecord(Guid pageId)
        {
            var cacheKey = pageId;
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
                Log.LogWarning(LogTitle, $"No IPageStructure entries found for Page with Id '{pageId}'");
            }

            _pageStructureCache.Add(cacheKey, result);

            return result;
        }

        private static string GetCacheKey<T>(Guid id, Guid versionId)
        {
            var cultureInfo = LocalizationScopeManager.MapByType(typeof (T));
            Verify.IsNotNull(cultureInfo, "Localization culture is not set");

            var dataScope = DataScopeManager.MapByType(typeof (T));
            Verify.IsNotNull(dataScope, "Publication scope is not set");

            return id + dataScope.Name + cultureInfo + (versionId != Guid.Empty ? versionId.ToString() : "");
        }

        private static string GetCacheKey(Guid id, DataSourceId dataSourceId)
        {
            return GetCacheKey(id, Guid.Empty, dataSourceId);
        }

        private static string GetCacheKey(Guid id, Guid versionId, DataSourceId dataSourceId)
        {
            string localizationInfo = dataSourceId.LocaleScope.ToString();
            string dataScope = dataSourceId.DataScopeIdentifier.Name;
            string versionIdStr = versionId != Guid.Empty ? versionId.ToString() : "";
            return id + dataScope + localizationInfo + versionIdStr;
        }

        private static void OnPageStoreChanged(object sender, StoreEventArgs storeEventArgs)
        {
            if (!storeEventArgs.DataEventsFired)
            {
                _pageCache.Clear();

                lock (_preloadingSyncRoot)
                {
                    _preloadedPageDataScopes.Clear();
                }
            }
        }

        private static void OnPageChanged(object sender, DataEventArgs args)
        {
            if (args.Data is IPage page)
            {
                _pageCache.Remove(GetCacheKey(page.Id, page.DataSourceId));
            }
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
            if (args.Data is IPagePlaceholderContent placeHolder)
            {
                _placeholderCache.Remove(GetCacheKey(placeHolder.PageId, placeHolder.VersionId, placeHolder.DataSourceId));
            }
        }


        private static void OnPageStructureStoreChanged(object sender, StoreEventArgs storeEventArgs)
        {
            if (!storeEventArgs.DataEventsFired)
            {
                _pageStructureCache.Clear();
                _childrenCache.Clear();
                _pageStructurePreloaded = false;
            }
        }

        private static void OnPageStructureChanged(object sender, DataEventArgs args)
        {
            if (args.Data is IPageStructure pageStructure)
            {
                _pageStructureCache.Remove(pageStructure.Id);
                _childrenCache.Remove(pageStructure.ParentId);
            }
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
