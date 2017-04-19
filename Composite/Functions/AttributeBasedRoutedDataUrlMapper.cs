using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using Composite.C1Console.Elements.ElementProviderHelpers.DataGroupingProviderHelper;
using Composite.Core.Routing;
using Composite.Core.Types;
using Composite.Data;

namespace Composite.Functions
{
    internal class AttributeBasedRoutedDataUrlMapper : IRoutedDataUrlMapper
    {
        private readonly Guid _pageId;
        private readonly Type _dataType;
        private static readonly MethodInfo _getFilteredDataMethodInfo;
        private static readonly MethodInfo _getFilteredDataQueryableMethodInfo;
        private readonly IRelativeRouteToPredicateMapper _mapper;

        static AttributeBasedRoutedDataUrlMapper()
        {
            _getFilteredDataMethodInfo = StaticReflection.GetGenericMethodInfo(() => GetFilteredData<IData>(null));
            _getFilteredDataQueryableMethodInfo =
                StaticReflection.GetGenericMethodInfo(a => GetFilteredDataQueryable<IPageRelatedData>(Guid.Empty));
        }

        protected AttributeBasedRoutedDataUrlMapper(Type dataType, Guid pageId, IRelativeRouteToPredicateMapper mapper)
        {
            _pageId = pageId;
            _mapper = mapper;
            _dataType = dataType;
        }



        public static AttributeBasedRoutedDataUrlMapper GetDataUrlMapper(Type dataType, Guid pageId)
        {
            var mapper = AttributeBasedRoutingHelper.GetPredicateMapper(dataType);
            if (mapper == null)
            {
                return null;
            }

            return new AttributeBasedRoutedDataUrlMapper(dataType, pageId, mapper);
        }

        public RoutedDataModel GetRouteDataModel(PageUrlData pageUrlData)
        {
            if (pageUrlData.PageId != _pageId) return null;

            string pathInfo = pageUrlData.PathInfo;
            bool pathIsEmpty = string.IsNullOrEmpty(pathInfo);

            if (pathIsEmpty && !pageUrlData.HasQueryParameters)
            {
                return new RoutedDataModel(GetDataQueryable);
            }

            int totalSegments = _mapper.PathSegmentsCount;
            if (pathIsEmpty != (totalSegments == 0))
            {
                return null;
            }

            string[] segments = !pathIsEmpty
                ? pathInfo.Split(new[] {'/'}, StringSplitOptions.RemoveEmptyEntries)
                : new string[0];

            if (segments.Length != totalSegments)
            {
                return null;
            }


            var relativeRoute = new RelativeRoute
            {
                PathSegments = segments,
                QueryString = pageUrlData.QueryParameters
            };

            var valueProvider = _mapper as AttributeBasedRoutingHelper.IRelativeRouteResover;
            if (valueProvider != null)
            {
                var data = valueProvider.TryGetData(pageUrlData.PageId, relativeRoute);
                return data != null ? new RoutedDataModel(data) : null;
            }

            var filterExpression = GetPredicate(_pageId, relativeRoute);
            if (filterExpression == null)
            {
                return null;
            }

            var dataSet = (IReadOnlyCollection<IData>) _getFilteredDataMethodInfo.MakeGenericMethod(_dataType)
                .Invoke(null, new object[] {filterExpression});

            if (dataSet.Count == 0)
            {
                return null;
            }

            if (dataSet.Count > 1)
            {
                throw new DataUrlCollisionException(_dataType, relativeRoute);
            }
            

            return new RoutedDataModel(dataSet.First());
        }

        private IQueryable GetDataQueryable()
        {
            IQueryable unorderedQuery;

            if (typeof (IPageRelatedData).IsAssignableFrom(_dataType))
            {
                unorderedQuery = (IQueryable)_getFilteredDataQueryableMethodInfo.MakeGenericMethod(_dataType)
                                                                                .Invoke(null, new object[] {_pageId});
            }
            else
            {
                unorderedQuery = DataFacade.GetData(_dataType);
            }

            return DataGroupingProviderHelper.OrderData(unorderedQuery, _dataType);
        }

        private static IQueryable GetFilteredDataQueryable<TDataType>(Guid pageId) where TDataType: class, IPageRelatedData
        {
            return DataFacade.GetData<TDataType>().Where(data => data.PageId == pageId);
        }

        private static IReadOnlyCollection<IData> GetFilteredData<T>(Expression<Func<T, bool>> lambdaExpression)
            where T : class, IData
        {
            return DataFacade.GetData<T>().Where(lambdaExpression).Take(2).ToList();
        }

        public PageUrlData BuildItemUrl(IData item)
        {
            var page = PageManager.GetPageById(_pageId);
            if (page == null)
            {
                return null;
            }

            var route = GetRoute(item);
            if (route == null)
            {
                return null;
            }

            string pathInfo = route.PathSegments.Any() ? "/" + string.Join("/", route.PathSegments) : null;

            if (pathInfo == null && (route.QueryString == null || route.QueryString.Count == 0))
            {
                return null;
            }

            return new PageUrlData(page)
            {
                PathInfo = pathInfo,
                QueryParameters = route.QueryString
            };
        }

        private RelativeRoute GetRoute(IData data)
        {
            var @interface = typeof(IRelativeRouteToPredicateMapper<>).MakeGenericType(_dataType);
            return @interface.GetMethod("GetRoute").Invoke(_mapper, new object[] { data, true }) as RelativeRoute;
        }


        private Expression GetPredicate(Guid pageId, RelativeRoute relativeRoute)
        {
            var @interface = typeof (IRelativeRouteToPredicateMapper<>).MakeGenericType(_dataType);
            return @interface.GetMethod("GetPredicate").Invoke(_mapper, new object[] {pageId, relativeRoute}) as Expression;
        }
    }
}
