using System;
using Composite.Core.WebClient.Renderings.Page;
using Composite.Data;
using Microsoft.Extensions.DependencyInjection;
using Composite.Core.Routing;
using Composite.Core.Routing.Pages;
using System.Web;
using System.Linq;

namespace Composite.Functions
{

    /// <summary>
    /// Parameter return type for functions handling data references passed via url format, defined with attribute on the data types.
    /// If none defined, it the url format will be the same as in <see cref="RoutedData.ById{T}"/>
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class RoutedData<T> : PathInfoRoutedData<T> where T : class, IData
    {
        /// <exclude />
        protected override IRoutedDataUrlMapper GetUrlMapper()
        {
            var pageId = PageRenderer.CurrentPageId;
            Verify.That(pageId != Guid.Empty, "The current page is not set");

            IRoutedDataUrlMapper mapper = AttributeBasedRoutedDataUrlMapper.GetDataUrlMapper(typeof(T), pageId);

            return mapper ?? new PathInfoRoutedDataUrlMapper<T>(pageId, RoutedData.DataRouteKind.Key);
        }
    }


    /// <summary>
    /// Contains subclasses that can be used as function parameters that provide data routing.
    /// </summary>
    public static class RoutedData
    {
        [Flags]
        internal enum DataRouteKind
        {
            Key = 1,
            Label = 2,
            KeyAndLabel = 3,
        }


        /// <summary>
        /// Registers function parameter types that enable data url routing.
        /// </summary>
        /// <param name="serviceCollection"></param>
        public static void AddRoutedData(this IServiceCollection serviceCollection)
        {
            Action<Type> registerType = type => serviceCollection.Add(new ServiceDescriptor(type, type, ServiceLifetime.Scoped));

            registerType(typeof(ById<>));
            registerType(typeof(ByIdAndLabel<>));
            registerType(typeof(ByLabel<>));
            registerType(typeof(RoutedData<>));
        }

        /// <summary>
        /// Parameter return type for functions handling data references passed via url {pageUrl}/{DataId}
        /// </summary>
        /// <typeparam name="T">The data type.</typeparam>
        public class ById<T> : PathInfoRoutedData<T> where T : class, IData
        {
            /// <exclude />
            protected override IRoutedDataUrlMapper GetUrlMapper()
            {
                var page = PageRenderer.CurrentPage;
                Verify.IsNotNull(page, "The current page is not set");

                return new PathInfoRoutedDataUrlMapper<T>(page.Id, DataRouteKind.Key);
            }
        }

        /// <summary>
        /// Parameter return type for functions handling data references passed via url {pageUrl}/{DataId}/{data label}
        /// </summary>
        /// <typeparam name="T">The data type.</typeparam>
        public class ByIdAndLabel<T> : PathInfoRoutedData<T> where T : class, IData
        {
            /// <exclude />
            protected override IRoutedDataUrlMapper GetUrlMapper()
            {
                var page = PageRenderer.CurrentPage;
                Verify.IsNotNull(page, "The current page is not set");

                return new PathInfoRoutedDataUrlMapper<T>(page.Id, DataRouteKind.KeyAndLabel);
            }
        }

        /// <summary>
        /// Parameter return type for functions handling data references passed via url {pageUrl}/{data label}
        /// </summary>
        /// <typeparam name="T">The data type.</typeparam>
        public class ByLabel<T> : PathInfoRoutedData<T> where T : class, IData
        {
            /// <exclude />
            protected override IRoutedDataUrlMapper GetUrlMapper()
            {
                var page = PageRenderer.CurrentPage;
                Verify.IsNotNull(page, "The current page is not set");

                // return new LabelDataUrlMapper(page);
                return new PathInfoRoutedDataUrlMapper<T>(page.Id, DataRouteKind.Label);
            }
        }


        /// <summary>
        /// Gets a instance of a <see cref="IDataUrlMapper"/> that can map data references to URLs of with the following format &quot;/{page URL}/{data ID}&quot;
        /// </summary>
        /// <param name="pageId">The page id.</param>
        /// <param name="dataType">The data type.</param>
        /// <returns></returns>
        public static IDataUrlMapper GetRoutedByIdDataUrlMapper(Guid pageId, Type dataType)
        {
            return GetMapperByType(dataType, pageId, DataRouteKind.Key);
        }

        /// <summary>
        /// Gets a instance of a <see cref="IDataUrlMapper"/> that can map data references to URLs of with the following format &quot;/{page URL}/{data item label}&quot;
        /// </summary>
        /// <param name="pageId">The page id.</param>
        /// <param name="dataType">The data type.</param>
        /// <returns></returns>
        public static IDataUrlMapper GetRoutedByLabelDataUrlMapper(Guid pageId, Type dataType)
        {
            return GetMapperByType(dataType, pageId, DataRouteKind.Label);
        }

        /// <summary>
        /// Gets a instance of a <see cref="IDataUrlMapper"/> that can map data references to URLs of with the following format &quot;/{page URL}/{data ID}/{data item label}&quot;
        /// </summary>
        /// <param name="pageId">The page id.</param>
        /// <param name="dataType">The data type.</param>
        /// <returns></returns>
        public static IDataUrlMapper GetRoutedByIdAndLabelDataUrlMapper(Guid pageId, Type dataType)
        {
            return GetMapperByType(dataType, pageId, DataRouteKind.KeyAndLabel);
        }


        /// <summary>
        /// Get a default <see cref="IDataUrlMapper"/>  for the given data type.
        /// </summary>
        /// <param name="pageId">The page id.</param>
        /// <param name="dataType">The data type.</param>
        /// <returns></returns>
        public static IDataUrlMapper GetDefaultDataUrlMapper(Guid pageId, Type dataType)
        {
            IRoutedDataUrlMapper mapper = AttributeBasedRoutedDataUrlMapper.GetDataUrlMapper(dataType, pageId);
            if (mapper == null)
            {
                return GetRoutedByIdDataUrlMapper(pageId, dataType);
            }

            return new RoutedDataUrlMapperAdapter(mapper);
        }


        private static IDataUrlMapper GetMapperByType(Type dataType, Guid pageId, DataRouteKind routeKind)
        {
            Verify.ArgumentNotNull(dataType, "dataType");
            Verify.ArgumentCondition(pageId != Guid.Empty, "pageId", "An empty guid is not allowed here");

            // TODO: use static reflection here
            var constructor = typeof (PathInfoRoutedDataUrlMapper<>)
                .MakeGenericType(dataType)
                .GetConstructor(new [] {typeof (Guid), typeof (DataRouteKind)});

            Verify.IsNotNull(constructor, "Failed to get PathInfoRoutedDataUrlMapper constructor");
            var routedDataUrlMapper = (IRoutedDataUrlMapper) constructor.Invoke(new object[] {pageId, routeKind});

            return new RoutedDataUrlMapperAdapter(routedDataUrlMapper);
        }

        internal class RoutedDataUrlMapperAdapter : IDataUrlMapper
        {
            private readonly IRoutedDataUrlMapper _mapper;

            public RoutedDataUrlMapperAdapter(IRoutedDataUrlMapper mapper)
            {
                _mapper = mapper;
            }

            public IDataReference GetData(PageUrlData pageUrlData)
            {
                var model = _mapper.GetRouteDataModel(pageUrlData);
                return model.IsRouteResolved && model.IsItem ? model.Item.ToDataReference() : null;
            }

            public PageUrlData GetPageUrlData(IDataReference instance)
            {
                var data = instance.Data;
                return data != null ? _mapper.BuildItemUrl(data) : null;
            }
        }
    }


    /// <exclude />
    public class RoutedDataModel
    {
        /// <exclude />
        public RoutedDataModel()
        {
        }

        /// <exclude />
        public RoutedDataModel(IData item)
        {
            Item = item;
            IsItem = item != null;
            IsRouteResolved = item != null;
        }

        /// <exclude />
        public RoutedDataModel(Func<IQueryable> getQueryable)
        {
            QueryableBuilder = getQueryable;
            IsRouteResolved = true;
        }

        /// <exclude />
        public bool IsRouteResolved { get; protected set; }

        /// <exclude />
        public bool IsItem { get; protected set; }

        /// <exclude />
        public IData Item { get; protected set; }

        /// <exclude />
        public Func<IQueryable> QueryableBuilder { get; protected set; }
    }
 


    /// <summary>
    /// Base class for return type of a data parameter. 
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public abstract class PathInfoRoutedData<T> where T : class, IData
    {
        private RoutedDataModel _model;

        /// <summary>
        /// Creates an instace of <see cref="PathInfoRoutedData{T}"/>
        /// </summary>
        protected PathInfoRoutedData()
        {
            var urlMapper = GetUrlMapper();
            Verify.IsNotNull(urlMapper, "UrlMapper is null");

            DataUrls.RegisterDynamicDataUrlMapper(PageRenderer.CurrentPageId, typeof(T), new RoutedData.RoutedDataUrlMapperAdapter(urlMapper));

            var pageUrlData = C1PageRoute.PageUrlData;

            RoutedDataModel model;

            try
            {
                model = urlMapper.GetRouteDataModel(pageUrlData) ?? new RoutedDataModel();
            }
            catch (DataUrlCollisionException)
            {
                C1PageRoute.RegisterPathInfoUsage();
                throw;
            }

            SetModel(model);

            if (!string.IsNullOrEmpty(pageUrlData.PathInfo) && model.IsRouteResolved)
            {
                if (model.IsItem)
                {
                    var canonicalUrlData = urlMapper.BuildItemUrl(model.Item);
                    if (canonicalUrlData.PathInfo != pageUrlData.PathInfo)
                    {
                        string newUrl = PageUrls.BuildUrl(canonicalUrlData);
                        if (newUrl != null)
                        {
                            PermanentRedirect(newUrl);
                        }
                    }
                }

                C1PageRoute.RegisterPathInfoUsage();
            }
        }

        private static void PermanentRedirect(string url)
        {
            var response = HttpContext.Current.Response;

            response.AddHeader("Location", url);
            response.StatusCode = 301; //  "Moved Permanently"
            response.End();
        }

        /// <exclude />
        protected abstract IRoutedDataUrlMapper GetUrlMapper();

        /// <summary>
        /// Sets the data model.
        /// </summary>
        /// <param name="model">The data model.</param>
        protected virtual void SetModel(RoutedDataModel model)
        {
            _model = model;
        }

        /// <summary>
        /// A data item to be shown in a detail view.
        /// </summary>
        public virtual T Item
        {
            get
            {
                var model = Model;
                Verify.That(model.IsItem, "This property should not be called when IsDetailView is false");
                return (T)model.Item;
            }
        }

        /// <summary>
        /// Indicates whether the route has been resolved.
        /// </summary>
        public bool IsRouteResolved
        {
            get { return Model.IsRouteResolved; }
        }

        /// <summary>
        /// Indicates whether a detail view should be shown
        /// </summary>
        public bool IsItem
        {
            get { return Model.IsItem; }
        }

        /// <summary>
        /// Indicates whether a list view should be shown
        /// </summary>
        public bool IsList
        {
            get { return Model.IsRouteResolved && !Model.IsItem; }
        }

        /// <summary>
        /// Returns a filtered list of data items.
        /// </summary>
        public virtual IQueryable<T> List
        {
            get
            {
                var model = Model;

                if (!model.IsRouteResolved)
                {
                    return Enumerable.Empty<T>().AsQueryable();
                }

                return model.IsItem ? (new[] { (T)model.Item }).AsQueryable() : (IQueryable<T>)model.QueryableBuilder();
            }
        }

        /// <summary>
        /// Returns a public url to the specified data item.
        /// </summary>
        /// <param name="data">The data item.</param>
        /// <returns></returns>
        public virtual string ItemUrl(IData data)
        {
            var mapper = GetUrlMapper();
            return PageUrls.BuildUrl(mapper.BuildItemUrl(data));
        }

        /// <summary>
        /// Returns a public url to the specified data item key.
        /// </summary>
        /// <param name="key">The key value.</param>
        /// <returns></returns>
        public virtual string ItemUrl(object key)
        {
            var data = DataFacade.GetDataByUniqueKey<T>(key);
            if (data == null)
            {
                return null;
            }

            var mapper = GetUrlMapper();
            return PageUrls.BuildUrl(mapper.BuildItemUrl(data));
        }

        /// <summary>
        /// Returns a url link to the current page
        /// </summary>
        public virtual string ListUrl
        {
            get
            {
                return PageUrls.BuildUrl(PageRenderer.CurrentPage) ??
                       PageUrls.BuildUrl(PageRenderer.CurrentPage, UrlKind.Internal);
            }
        }

        /// <summary>
        /// Returns a currently resolved model.
        /// </summary>
        protected virtual RoutedDataModel Model
        {
            get
            {
                Verify.IsNotNull(_model, "The model object is not set");

                return _model;
            }
        }
    }
}
