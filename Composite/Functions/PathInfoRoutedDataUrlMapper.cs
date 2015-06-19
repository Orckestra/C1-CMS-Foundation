using System;
using System.Linq;
using System.Reflection;
using Composite.Core.Extensions;
using Composite.Core.Linq;
using Composite.Core.Routing;
using Composite.Data;
using Composite.Data.Types;

namespace Composite.Functions
{
    internal class PathInfoRoutedDataUrlMapper<T> : IRoutedDataUrlMapper where T : class, IData
    {
        private readonly IPage _page;
        private readonly PropertyInfo _keyPropertyInfo;

        public PathInfoRoutedDataUrlMapper(IPage page)
        {
            _page = page;

            // TODO: support for compound keys 
            _keyPropertyInfo = typeof(T).GetKeyProperties()
                .SingleOrException("No key fields found on data type '{0}''",
                                   "Data type '{0}' should have a single key field", typeof(T).FullName);
        }

        public RoutedDataModel GetRouteDataModel(PageUrlData pageUrlData)
        {
            string pathInfo = pageUrlData.PathInfo;
            if (pathInfo.IsNullOrEmpty())
            {
                return GetListViewModel();
            }

            if (pathInfo.Length < 2 || pathInfo.LastIndexOf('/') > 0)
            {
                return new RoutedDataModel();
            }

            string key = pathInfo.Substring(1);

            return new RoutedDataModel(DataFacade.TryGetDataByUniqueKey<T>(key));
        }

        private RoutedDataModel GetListViewModel()
        {
            if (typeof (IPageRelatedData).IsAssignableFrom(typeof(T)))
            {
                Guid pageId = _page.Id;

                return new RoutedDataModel(() => DataFacade.GetData<T>().Where(t => (t as IPageRelatedData).PageId == pageId));

            }
            return new RoutedDataModel(DataFacade.GetData<T>);
        }

        public PageUrlData BuildDataUrl(IData dataItem)
        {
            Verify.ArgumentNotNull(dataItem, "dataItem");

            object keyValue = _keyPropertyInfo.GetValue(dataItem);

            if (keyValue == null)
            {
                return null;
            }

            string urlKey = keyValue.ToString();
            if (string.IsNullOrEmpty(urlKey))
            {
                return null;
            }

            string pathInfo = "/" + keyValue;
            return new PageUrlData(_page) { PathInfo = pathInfo };
        }
    }
}
