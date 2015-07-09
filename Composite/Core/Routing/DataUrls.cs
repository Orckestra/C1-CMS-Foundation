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
    /// Building/parsing data urls, and registering <see cref="IDataUrlMapper"/> objects.
    /// </summary>
    public static class DataUrls
    {
        private static readonly ConcurrentDictionary<Type, IDataUrlMapper> _globalDataUrlMappers =
            new ConcurrentDictionary<Type, IDataUrlMapper>();

        private static readonly ConcurrentDictionary<Guid, ConcurrentDictionary<Type, IDataUrlMapper>> _dynamicPageDataUrlMappers =
            new ConcurrentDictionary<Guid, ConcurrentDictionary<Type, IDataUrlMapper>>();

        private static readonly ConcurrentDictionary<Guid, ConcurrentBag<KeyValuePair<Type, IDataUrlMapper>>> _staticPageDataUrlMappers =
            new ConcurrentDictionary<Guid, ConcurrentBag<KeyValuePair<Type, IDataUrlMapper>>>();

        static DataUrls()
        {
            GlobalEventSystemFacade.OnDesignChange += () => _dynamicPageDataUrlMappers.Clear();
            Action<IPage> clearCache = page =>
            {
                ConcurrentDictionary<Type, IDataUrlMapper> temp;
                _dynamicPageDataUrlMappers.TryRemove(page.Id, out temp);
            };

            DataEvents<IPage>.OnDeleted += (sender, args) => clearCache((IPage) args.Data);
            DataEvents<IPage>.OnAfterUpdate += (sender, args) => clearCache((IPage) args.Data);
            DataEvents<IPage>.OnStoreChanged += (sender, args) =>
            {
                if (!args.DataEventsFired)
                {
                    _dynamicPageDataUrlMappers.Clear();
                }
            };
        }


        /// <summary>
        /// Gets the data item by page url data; returns <value>null</value> if no data url mappers found.
        /// </summary>
        /// <param name="pageUrlData"></param>
        /// <returns></returns>
        public static IDataReference TryGetData(PageUrlData pageUrlData)
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
        /// Gets page url data by data reference; returns <value>null</value> if no data url mappers found.
        /// </summary>
        /// <param name="data">The data reference.</param>
        /// <returns></returns>
        public static PageUrlData TryGetPageUrlData(IDataReference dataReference)
        {
            Verify.ArgumentNotNull(dataReference, "dataReference");
            var interfaceType = dataReference.ReferencedType;

            IDataUrlMapper dataUrlMapper;
            if (_globalDataUrlMappers.TryGetValue(interfaceType, out dataUrlMapper))
            {
                return dataUrlMapper.GetPageUrlData(dataReference);
            }

            if (typeof(IPageRelatedData).IsAssignableFrom(dataReference.ReferencedType))
            {
                var data = dataReference.Data;

                Guid pageId = (data as IPageRelatedData).PageId;
                return TryGetPageUrlData(pageId, dataReference);
            }

            return null;
        }


        private static PageUrlData TryGetPageUrlData(Guid pageId, IDataReference dataReference)
        {
            if (pageId == Guid.Empty) return null;
            var interfaceType = dataReference.ReferencedType;

            var page = PageManager.GetPageById(pageId);
            if (page == null) return null;

            var staticMappers = GetStaticMappers(page);
            foreach (var mapper in staticMappers)
            {
                if (mapper.Key.IsAssignableFrom(interfaceType))
                {
                    var pageUrlData = mapper.Value.GetPageUrlData(dataReference);
                    if (pageUrlData != null) return pageUrlData;
                }
            }

            var mappers = GetDynamicMappers(page);
            foreach (var mapper in mappers)
            {
                if (mapper.Key.IsAssignableFrom(interfaceType))
                {
                    var pageUrlData = mapper.Value.GetPageUrlData(dataReference);
                    if (pageUrlData != null) return pageUrlData;
                }
            }

            return null;
        }

        private static IEnumerable<KeyValuePair<Type, IDataUrlMapper>> GetStaticMappers(IPage page)
        {
            ConcurrentBag<KeyValuePair<Type, IDataUrlMapper>> result;
            if (!_staticPageDataUrlMappers.TryGetValue(page.Id, out result))
            {
                return Enumerable.Empty<KeyValuePair<Type, IDataUrlMapper>>();
            }

            return result;
        }

        private static IEnumerable<KeyValuePair<Type, IDataUrlMapper>> GetDynamicMappers(IPage page)
        {
            ConcurrentDictionary<Type, IDataUrlMapper> mappers;

            PageRenderingHistory.RenderPageIfNotRendered(page);

            if (!_dynamicPageDataUrlMappers.TryGetValue(page.Id, out mappers))
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
        /// <param name="dataType">The data type.</param>
        /// <param name="dataUrlMapper">The data url mapper.</param>
        public static void RegisterGlobalDataUrlMapper(Type dataType, IDataUrlMapper dataUrlMapper)
        {
            Verify.ArgumentCondition(dataType.IsInterface && typeof(IData).IsAssignableFrom(dataType), "dataType",
                "The data type should be an interface inheriting Composite.Data.IData");

            _globalDataUrlMappers[dataType] = dataUrlMapper;
        }

        /// <summary>
        /// Registers a data url mapper associated with a page.
        /// </summary>
        /// <param name="pageId">The page id.</param>
        /// <param name="dataUrlMapper">The data url mapper.</param>
        /// <typeparam name="T">The data type.</typeparam>
        public static void RegisterDynamicDataUrlMapper<T>(Guid pageId, IDataUrlMapper dataUrlMapper) where T: class, IData
        {
            RegisterDynamicDataUrlMapper(pageId, typeof(T), dataUrlMapper);
        }

        /// <summary>
        /// Registers a data url mapper associated with a page.
        /// </summary>
        /// <param name="pageId">The page id.</param>
        /// <param name="dataType">The data type.</param>
        /// <param name="dataUrlMapper">The data url mapper.</param>
        public static void RegisterDynamicDataUrlMapper(Guid pageId, Type dataType, IDataUrlMapper dataUrlMapper)
        {
            Verify.ArgumentNotNull(dataType, "dataType");
            Verify.ArgumentNotNull(dataUrlMapper, "dataUrlMapper");
            Verify.ArgumentCondition(dataType.IsInterface && typeof(IData).IsAssignableFrom(dataType), "dataType",
                    "The data type should be an interface inheriting Composite.Data.IData");

            var handlerList = _dynamicPageDataUrlMappers.GetOrAdd(pageId,
                key => new ConcurrentDictionary<Type, IDataUrlMapper>());

            handlerList[dataType] = dataUrlMapper;
        }

        /// <summary>
        /// Registers a data url mapper associated with a page.
        /// </summary>
        /// <param name="pageId">The page id.</param>
        /// <param name="dataType">The data type.</param>
        /// <param name="dataUrlMapper">The data url mapper.</param>
        public static void RegisterStaticDataUrlMapper(Guid pageId, Type dataType, IDataUrlMapper dataUrlMapper)
        {
            Verify.ArgumentNotNull(dataUrlMapper, "dataUrlMapper");
            Verify.ArgumentCondition(dataType.IsInterface && typeof(IData).IsAssignableFrom(dataType), "dataType",
                    "The data type should be an interface inheriting Composite.Data.IData");

            var handlerList = _staticPageDataUrlMappers.GetOrAdd(pageId,
                key => new ConcurrentBag<KeyValuePair<Type, IDataUrlMapper>>());

            if (handlerList.Count > 100)
            {
                // Preventing a memory leak here
                return;
            }

            handlerList.Add(new KeyValuePair<Type, IDataUrlMapper>(dataType, dataUrlMapper));
        }
    }
}
