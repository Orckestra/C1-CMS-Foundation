using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using Composite.C1Console.Events;
using Composite.Core.Extensions;
using Composite.Data;
using Composite.Data.Types;

using Scope = System.Tuple<Composite.Data.PublicationScope, string>;

namespace Composite.Core.Routing
{
    /// <summary>
    /// 
    /// </summary>
    public static class DataUrls
    {
        private static readonly ConcurrentDictionary<Type, IDataUrlMapper> _globalDataUrlMappers =
            new ConcurrentDictionary<Type, IDataUrlMapper>();

        private static readonly ConcurrentDictionary<string, ConcurrentDictionary<Type, IDataUrlMapper>> _dynamicPageDataUrlMappers =
            new ConcurrentDictionary<string, ConcurrentDictionary<Type, IDataUrlMapper>>();

        private static readonly ConcurrentDictionary<string, ConcurrentBag<KeyValuePair<Type, IDataUrlMapper>>> _staticPageDataUrlMappers =
            new ConcurrentDictionary<string, ConcurrentBag<KeyValuePair<Type, IDataUrlMapper>>>();

        static DataUrls()
        {
            GlobalEventSystemFacade.OnDesignChange += () => _dynamicPageDataUrlMappers.Clear();
        }

        /// <summary>
        /// Gets the data item by page url data; returns <value>null</value> if no data url mappers found.
        /// </summary>
        /// <param name="pageUrlData"></param>
        /// <returns></returns>
        public static IData TryGetData(PageUrlData pageUrlData)
        {
            Verify.ArgumentNotNull(pageUrlData, "pageUrlData");

            foreach (var globalDataUrlMapper in _globalDataUrlMappers)
            {
                var data = globalDataUrlMapper.Value.GetData(pageUrlData);
                if (data != null) return data;
            }

            var page = pageUrlData.GetPage();
            if (page == null)
            {
                return null;
            }

            // string cacheKey = GetCacheKey(page);

            var staticMappers = GetStaticMappers(page);
            foreach (var mapper in staticMappers)
            {
                var data = mapper.Value.GetData(pageUrlData);
                if (data != null) return data;
            }

            var dynamicMappers = GetDynamicMappers(page);
            foreach (var mapper in dynamicMappers)
            {
                var data = mapper.Value.GetData(pageUrlData);
                if (data != null) return data;
            }

            return null;
        }

        /// <summary>
        /// Gets page url data by data item; returns <value>null</value> if no data url mappers found.
        /// </summary>
        /// <param name="data">The data item.</param>
        /// <returns></returns>
        public static PageUrlData TryGetPageUrlData(IData data)
        {
            Verify.ArgumentNotNull(data, "data");
            var interfaceType = data.DataSourceId.InterfaceType;

            IDataUrlMapper dataUrlMapper;
            if (_globalDataUrlMappers.TryGetValue(interfaceType, out dataUrlMapper))
            {
                return dataUrlMapper.GetPageUrlData(data);
            }

            if (data is IPageRelatedData)
            {
                Guid pageId = (data as IPageRelatedData).PageId;
                return TryGetPageUrlData(pageId, data);
            }

            return null;
        }

        private static PageUrlData TryGetPageUrlData(Guid pageId, IData data)
        {
            if (pageId == Guid.Empty) return null;
            var interfaceType = data.DataSourceId.InterfaceType;

            var page = PageManager.GetPageById(pageId);
            if (page == null) return null;

            var staticMappers = GetStaticMappers(page);
            foreach (var mapper in staticMappers)
            {
                if (mapper.Key.IsAssignableFrom(interfaceType))
                {
                    var pageUrlData = mapper.Value.GetPageUrlData(data);
                    if (pageUrlData != null) return pageUrlData;
                }
            }

            var mappers = GetDynamicMappers(page);
            foreach (var mapper in mappers)
            {
                if (mapper.Key.IsAssignableFrom(interfaceType))
                {
                    var pageUrlData = mapper.Value.GetPageUrlData(data);
                    if (pageUrlData != null) return pageUrlData;
                }
            }

            return null;
        }

        private static IEnumerable<KeyValuePair<Type, IDataUrlMapper>> GetStaticMappers(IPage page)
        {
            string cacheKey = GetCacheKey(page);

            ConcurrentBag<KeyValuePair<Type, IDataUrlMapper>> result;
            if (!_staticPageDataUrlMappers.TryGetValue(cacheKey, out result))
            {
                return Enumerable.Empty<KeyValuePair<Type, IDataUrlMapper>>();
            }

            return result;
        }

        private static IEnumerable<KeyValuePair<Type, IDataUrlMapper>> GetDynamicMappers(IPage page)
        {
            string cacheKey = GetCacheKey(page);
            ConcurrentDictionary<Type, IDataUrlMapper> mappers;

            PageRenderingHistory.RenderPageIfNotRendered(page);

            if (!_dynamicPageDataUrlMappers.TryGetValue(cacheKey, out mappers))
            {
                return Enumerable.Empty<KeyValuePair<Type, IDataUrlMapper>>();
            }

            return mappers;
        }


        /// <summary>
        /// Registers a global data url mapper for the specified type.
        /// </summary>
        /// <param name="dataUrlMapper"></param>
        /// <typeparam name="T">The data type.</typeparam>
        public static void RegisterGlobalDataUrlMapper<T>(IDataUrlMapper dataUrlMapper) where T : class, IData
        {
            RegisterGlobalDataUrlMapper(typeof (T), dataUrlMapper);
        }

        /// <summary>
        /// Registers a global data url mapper for the specified type.
        /// </summary>
        /// <param name="type">The data type.</param>
        /// <param name="dataUrlMapper">The data url mapper.</param>
        public static void RegisterGlobalDataUrlMapper(Type type, IDataUrlMapper dataUrlMapper)
        {
            _globalDataUrlMappers[type] = dataUrlMapper;
        }

        /// <summary>
        /// Registers a data url mapper associated with a page.
        /// </summary>
        /// <param name="type">The data type.</param>
        /// <param name="dataUrlMapper">The data url mapper.</param>
        public static void RegisterDynamicDataUrlMapper(IPage page, Type type, IDataUrlMapper dataUrlMapper)
        {
            Verify.ArgumentNotNull(page, "page");
            Verify.ArgumentNotNull(dataUrlMapper, "dataUrlMapper");

            var handlerList = _dynamicPageDataUrlMappers.GetOrAdd(GetCacheKey(page),
                key => new ConcurrentDictionary<Type, IDataUrlMapper>());

            handlerList[type] = dataUrlMapper;
        }

        /// <summary>
        /// Registers a data url mapper associated with a page.
        /// </summary>
        /// <param name="type">The data type.</param>
        /// <param name="dataUrlMapper">The data url mapper.</param>
        public static void RegisterStaticDataUrlMapper(IPage page, Type type, IDataUrlMapper dataUrlMapper)
        {
            Verify.ArgumentNotNull(page, "page");
            Verify.ArgumentNotNull(dataUrlMapper, "dataUrlMapper");

            var handlerList = _staticPageDataUrlMappers.GetOrAdd(GetCacheKey(page),
                key => new ConcurrentBag<KeyValuePair<Type, IDataUrlMapper>>());

            if (handlerList.Count > 100)
            {
                // Preventing a memory link here
                return;
            }

            handlerList.Add(new KeyValuePair<Type, IDataUrlMapper>(type, dataUrlMapper));
        }

        private static string GetCacheKey(IPage page)
        {
            var dataSourceId = page.DataSourceId;
            string localizationInfo = dataSourceId.LocaleScope.ToString();
            string dataScope = dataSourceId.DataScopeIdentifier.Name;
            return page.Id + dataScope + localizationInfo;
        }
    }
}
