using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using Composite.Core.Extensions;
using Composite.Data;

namespace Composite.Core.Routing
{
    internal class AttributeBasedRoutingHelper
    {
        internal class PropertyUrlMapping
        {
            public Attribute Attribute;
            public PropertyInfo Property;
            public IRelativeRouteToPredicateMapper Mapper;
        }


        public static IRelativeRouteToPredicateMapper ForDataType(Type dataType)
        {
            Verify.ArgumentNotNull(dataType, "dataType");
            Verify.ArgumentCondition(dataType.IsInterface && typeof(IData).IsAssignableFrom(dataType),
                "dataType", "The data type have to an interface, inheriting {0}".FormatWith(typeof(IData).FullName));

            // TODO: caching

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

            var targetType = typeof (DataTypeRelativeRouteToPredicateMapper<>).MakeGenericType(dataType);
            var constructor = targetType.GetConstructor(new[] {typeof (PropertyUrlMapping[])});
            return (IRelativeRouteToPredicateMapper) constructor.Invoke(new object[] { mappings });
        }

        internal class DataTypeRelativeRouteToPredicateMapper<TDataType> 
            : IRelativeRouteToPredicateMapper<TDataType> where TDataType : class, IData
        {
            private readonly PropertyUrlMapping[] _mappings;

            /// <summary>
            /// Invoked via reflection.
            /// </summary>
            /// <param name="mappings"></param>
            public DataTypeRelativeRouteToPredicateMapper(PropertyUrlMapping[] mappings)
            {
                _mappings = mappings;
            }

            public int PathSegmentsCount
            {
                get
                {
                    return _mappings.Sum(m => m.Mapper.PathSegmentsCount);
                }
            }

            public Expression<Func<TDataType, bool>> GetPredicate(Guid pageId, RelativeRoute route)
            {
                int segmentsProcessed = 0;
                var segments = route.PathSegments;

                var parameterExpression = Expression.Parameter(typeof(TDataType), "t");

                Expression filterExpression = null;

                foreach (var mapping in _mappings)
                {
                    string[] segmentsArgument = null;
                    if (mapping.Mapper.PathSegmentsCount > 0)
                    {
                        segmentsArgument = segments.Skip(segmentsProcessed).Take(mapping.Mapper.PathSegmentsCount).ToArray();

                        segmentsProcessed += mapping.Mapper.PathSegmentsCount;
                    }

                    var relativeRoute = new RelativeRoute
                    {
                        PathSegments = segmentsArgument,
                        QueryString = route.QueryString
                    };

                    var fieldFilter = GetFieldFilter(mapping.Mapper, mapping.Property.PropertyType, pageId, relativeRoute);
                    if (fieldFilter == null)
                    {
                        return null;
                    }

                    var propertyExpression = Expression.Property(parameterExpression, mapping.Property);

                    var filterFragmentExpression = Expression.Invoke(fieldFilter, propertyExpression);

                    filterExpression = filterExpression == null
                        ? (Expression)filterFragmentExpression
                        : Expression.AndAlso(filterExpression, filterFragmentExpression);
                }

                if (filterExpression == null)
                {
                    return null;
                }

                if (typeof (IPageRelatedData).IsAssignableFrom(typeof (TDataType)))
                {
                    // TODO: filtering by pageId for page folder types
                }

                return Expression.Lambda<Func<TDataType, bool>>(filterExpression, parameterExpression);
            }

            public RelativeRoute GetRoute(TDataType dataItem)
            {
                Verify.ArgumentNotNull(dataItem, "dataItem");

                var resultSegments = new List<string>();
                NameValueCollection resultQueryString = null;

                foreach (var mapping in _mappings)
                {
                    object filedValue = mapping.Property.GetValue(dataItem);
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

                return new RelativeRoute
                {
                    PathSegments = resultSegments.ToArray(),
                    QueryString = resultQueryString
                };
            }

            private RelativeRoute InvokeMapper(IRelativeRouteToPredicateMapper mapper, Type fieldType, object fieldValue)
            {
                var @interface = typeof(IRelativeRouteToPredicateMapper<>).MakeGenericType(fieldType);
                return @interface.GetMethod("GetRoute").Invoke(mapper, new[] { fieldValue }) as RelativeRoute;
            }

            private Expression GetFieldFilter(
                IRelativeRouteToPredicateMapper mapper,
                Type propertyType,
                Guid pageId, 
                RelativeRoute relativeRoute)
            {
                var @interface = typeof(IRelativeRouteToPredicateMapper<>).MakeGenericType(propertyType);
                return @interface.GetMethod("GetPredicate").Invoke(mapper, new object[] { pageId, relativeRoute }) as Expression;
            }
        }
    }
}
