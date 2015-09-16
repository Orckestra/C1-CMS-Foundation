using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using Composite.Core.Routing;
using Composite.Core.Types;
using Composite.Data;

namespace Composite.Functions
{
    internal class AttributeBasedRoutedDataUrlMapper : IRoutedDataUrlMapper
    {
        protected class PropertyUrlMapping
        {
            public Attribute Attribute;
            public PropertyInfo Property;
            public IRelativeRouteToPredicateMapper Mapper;
        }

        private readonly Guid _pageId;
        private readonly Type _dataType;
        private readonly PropertyUrlMapping[] _mappings;

        private static readonly MethodInfo _getFilteredDataMethodInfo;

        static AttributeBasedRoutedDataUrlMapper()
        {
            _getFilteredDataMethodInfo = StaticReflection.GetGenericMethodInfo(() => GetFilteredData<IData>(null, null));
        }

        protected AttributeBasedRoutedDataUrlMapper(Type dataType, Guid pageId, PropertyUrlMapping[] mappings)
        {
            _pageId = pageId;
            _mappings = mappings;
            _dataType = dataType;
        }

        public static AttributeBasedRoutedDataUrlMapper FromDataType(Type dataType, Guid pageId)
        {
            var mappings = dataType
                .GetAllProperties()
                .SelectMany(prop => prop
                    .GetCustomAttributes().OfType<RouteSegmentAttribute>()
                    .Select(attr => new { Attribute = attr, attr.Order, Property = prop, Mapper = attr.BuildMapper(prop) }))
                .OrderBy(a => a.Order)
                .Select(a => new PropertyUrlMapping { Attribute = a.Attribute, Property = a.Property, Mapper = a.Mapper })
                .ToArray();

            if (!mappings.Any())
            {
                return null;
            }

            foreach (var mapping in mappings)
            {
                Verify.IsNotNull(mapping.Mapper, "An attribute of type '{0}' returned a null mapper", mapping.Attribute.GetType().FullName);
            }

            return new AttributeBasedRoutedDataUrlMapper(dataType, pageId, mappings);
        }

        public RoutedDataModel GetRouteDataModel(PageUrlData pageUrlData)
        {
            if(pageUrlData.PageId != _pageId) return null;

            string pathInfo = pageUrlData.PathInfo;
            bool pathIsEmpty = string.IsNullOrEmpty(pathInfo);

            if (pathIsEmpty && !pageUrlData.HasQueryParameters)
            {
                return new RoutedDataModel(() => DataFacade.GetData(_dataType));
            }
                
            int totalSegments = _mappings.Sum(m => m.Mapper.PathSegmentsCount);

            
            if (pathIsEmpty != (totalSegments == 0))
            {
                return null;
            }

            string[] segments = !pathIsEmpty ? pathInfo.Split(new []{'/'}, StringSplitOptions.RemoveEmptyEntries) : null;
            if (segments.Length != totalSegments)
            {
                return null;
            }


            int segmentsProcessed = 0;

            var parameterExpression = Expression.Parameter(_dataType, "t");

            Expression filterExpression = null;

            foreach (var mapping in _mappings)
            {
                string[] segmentsArgument = null;
                if (!pathIsEmpty && mapping.Mapper.PathSegmentsCount > 0)
                {
                    segmentsArgument = segments.Skip(segmentsProcessed).Take(mapping.Mapper.PathSegmentsCount).ToArray();

                    segmentsProcessed += mapping.Mapper.PathSegmentsCount;
                }

                var relativeRoute = new RelativeRoute
                {
                    PathSegments = segmentsArgument,
                    QueryString = pageUrlData.QueryParameters
                };

                var fieldFilter = GetFieldFilter(mapping.Mapper, relativeRoute, mapping.Property.PropertyType);
                if (fieldFilter == null)
                {
                    return null;
                }

                var propertyExpression = Expression.Property(parameterExpression, mapping.Property);

                var filterFragmentExpression = Expression.Invoke(fieldFilter, propertyExpression);

                filterExpression = filterExpression == null
                    ? (Expression) filterFragmentExpression
                    : Expression.AndAlso(filterExpression, filterFragmentExpression);
            }

            if (filterExpression == null) 
            {
                return null;
            }

            var dataSet = (IReadOnlyCollection<IData>) _getFilteredDataMethodInfo.MakeGenericMethod(_dataType)
                            .Invoke(null, new object[] {filterExpression, parameterExpression});

            if (dataSet.Count == 0 || dataSet.Count > 1)
            {
                return null;
            }

            return new RoutedDataModel(dataSet.First());
        }

        private static IReadOnlyCollection<IData> GetFilteredData<T>(Expression bodyExpression, ParameterExpression parameterExpression) where T: class, IData
        {
            var lambdaExpression = Expression.Lambda<Func<T, bool>>(bodyExpression, new [] { parameterExpression });

            return DataFacade.GetData<T>().ToList().AsQueryable().Where(lambdaExpression).Take(2).ToList();
        }

        private Expression GetFieldFilter(IRelativeRouteToPredicateMapper mapper, RelativeRoute relativeRoute, Type propertyType)
        {
            var @interface = typeof(IRelativeRouteToPredicateMapper<>).MakeGenericType(propertyType);
            return @interface.GetMethod("GetPredicate").Invoke(mapper, new object[] { relativeRoute }) as Expression;
        }

        public PageUrlData BuildItemUrl(IData item)
        {
            var resultSegments = new List<string>();
            NameValueCollection resultQueryString = null;

            foreach (var mapping in _mappings)
            {
                object filedValue = mapping.Property.GetValue(item);
                if (filedValue == null)
                {
                    return null;
                }

                var relativeRoute = InvokeMapper(mapping.Mapper, mapping.Property.PropertyType, filedValue);
                if (relativeRoute == null)
                {
                    return null;
                }

                resultSegments.AddRange(relativeRoute.PathSegments);

                if (relativeRoute.QueryString != null && relativeRoute.QueryString.HasKeys())
                {
                    if (resultQueryString == null)
                    {
                        resultQueryString = new NameValueCollection(relativeRoute.QueryString);
                    }
                    else
                    {
                        resultQueryString.Add(relativeRoute.QueryString);
                    }
                }
            }

            var page = PageManager.GetPageById(_pageId);
            if (page == null)
            {
                return null;
            }

            string pathInfo = resultSegments.Any() ? "/" + string.Join("/", resultSegments) : null;

            if (pathInfo == null && resultQueryString == null)
            {
                return null;
            }

            return new PageUrlData(page)
            {
                PathInfo = pathInfo,
                QueryParameters = resultQueryString
            };
        }

        private RelativeRoute InvokeMapper(IRelativeRouteToPredicateMapper mapper, Type fieldType, object fieldValue)
        {
            var @interface = typeof (IRelativeRouteToPredicateMapper<>).MakeGenericType(fieldType);
            return @interface.GetMethod("GetRoute").Invoke(mapper, new[] { fieldValue }) as RelativeRoute;
        }
    }
}
