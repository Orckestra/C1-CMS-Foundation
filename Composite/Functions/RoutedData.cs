using System;
using System.Linq;
using Composite.Core.Routing;
using Composite.Core.Routing.Pages;
using Composite.Core.WebClient.Renderings.Page;
using Composite.Data;

namespace Composite.Functions
{
    public interface IRoutedDataUrlMapper
    {
        RoutedDataModel GetRouteDataModel(PageUrlData pageUrlData);
        PageUrlData BuildDataUrl(IData dataItem);
    }

    /// <exclude />
    public class RoutedDataModel
    {
        public RoutedDataModel()
        {
        }

        public RoutedDataModel(IData data)
        {
            Data = data;
            IsDetailView = data != null;
            IsRouteResolved = data != null;
        }

        public RoutedDataModel(Func<IQueryable> getQueryable)
        {
            GetQueryable = getQueryable;
            IsRouteResolved = true;
        }

        public bool IsRouteResolved { get; protected set; }
        public bool IsDetailView { get; protected set; }
        public IData Data { get; protected set; }
        public Func<IQueryable> GetQueryable { get; protected set; }
    }
 

    /// <summary>
    /// Base class for return type of a data parameter. 
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public abstract class RoutedData<T> where T : class, IData
    {
        private RoutedDataModel _model;

        protected RoutedData()
        {
            var urlMapper = GetUrlMapper();
            Verify.IsNotNull(urlMapper, "UrlMapper is null");
            
            // TODO: un-comment when DataUrlMapper logic is implemented
            // DataUrls.RegisterDynamicDataUrlMapper(PageRenderer.CurrentPage, typeof(T), new RoutedDataUrlMapperAdapter(urlMapper));

            var pageUrlData = C1PageRoute.PageUrlData;

            var model = urlMapper.GetRouteDataModel(pageUrlData);
            SetModel(model);

            if (!string.IsNullOrEmpty(pageUrlData.PathInfo) && model.IsRouteResolved)
            {
                C1PageRoute.RegisterPathInfoUsage();
            }
        } 

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
        public virtual T Data
        {
            get
            {
                var model = Model;
                Verify.That(model.IsDetailView, "This property should not be called when IsDetailView is false");
                return (T) model.Data;
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
        public bool IsDetailView 
        {
            get { return Model.IsDetailView; }
        }

        /// <summary>
        /// Indicates whether a list view should be shown
        /// </summary>
        public bool IsListView
        {
            get { return Model.IsRouteResolved && !Model.IsDetailView; }
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

                return model.IsDetailView ? (new [] { (T) model.Data }).AsQueryable() : (IQueryable<T>) model.GetQueryable();
            }
        }

        /// <summary>
        /// Returns a public url to the specified data item.
        /// </summary>
        /// <param name="data">The data item.</param>
        /// <returns></returns>
        public virtual string DataUrl(IData data)
        {
            var mapper = GetUrlMapper();
            return PageUrls.BuildUrl(mapper.BuildDataUrl(data));
        }

        /// <summary>
        /// Returns a public url to the specified data item.
        /// </summary>
        /// <param name="data">The data item.</param>
        /// <returns></returns>
        public virtual string DataUrl(object key)
        {
            var data = DataFacade.GetDataByUniqueKey<T>(key);
            if (data == null)
            {
                return null;
            }

            var mapper = GetUrlMapper();
            return PageUrls.BuildUrl(mapper.BuildDataUrl(data));
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

        //internal class RoutedDataUrlMapperAdapter : IDataUrlMapper
        //{
        //    private readonly IRoutedDataUrlMapper _mapper;

        //    public RoutedDataUrlMapperAdapter(IRoutedDataUrlMapper mapper)
        //    {
        //        _mapper = mapper;
        //    }

        //    public IData GetData(PageUrlData pageUrlData)
        //    {
        //        var model = _mapper.GetRouteDataModel(pageUrlData);
        //        return model.IsRouteResolved && model.IsDetailView ? model.Data : null;
        //    }

        //    public PageUrlData GetPageUrlData(IData instance)
        //    {
        //        return _mapper.BuildDataUrl(instance);
        //    }
        //}
    }
 }
