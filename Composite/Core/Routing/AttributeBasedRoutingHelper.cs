using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using Composite.Core.Extensions;
using Composite.Core.Types;
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


        internal interface IRelativeRouteResover : IRelativeRouteToPredicateMapper
        {
            /// <exclude />
            IData TryGetData(Guid pageId, RelativeRoute routePart);
        }


        public static IRelativeRouteToPredicateMapper GetPredicateMapper(Type dataType)
        {
            Verify.ArgumentNotNull(dataType, "dataType");
            Verify.ArgumentCondition(dataType.IsInterface && typeof(IData).IsAssignableFrom(dataType),
                "dataType", "The data type have to an interface, inheriting {0}".FormatWith(typeof(IData).FullName));

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
            : IRelativeRouteResover, 
              IRelativeRouteToPredicateMapper<TDataType> where TDataType : class, IData
        {
            private readonly PropertyUrlMapping[] _mappings;

            private readonly PropertyUrlMapping _keyMapping;
            private readonly int _keyFieldUrlSegmentOffset;


            /// <summary>
            /// Invoked via reflection.
            /// </summary>
            /// <param name="mappings"></param>
            public DataTypeRelativeRouteToPredicateMapper(PropertyUrlMapping[] mappings)
            {
                _mappings = mappings;

                var keyProperties = typeof(TDataType).GetKeyProperties();
                if (keyProperties.Count == 1)
                {
                    var keyProperty = keyProperties[0];
                    var keyValueProviderType =
                        typeof(IRelativeRouteValueProvider<>).MakeGenericType(keyProperty.PropertyType);

                    int pathSegmentsToIgnore = 0;
                    for (int i = 0; i < _mappings.Length; i++)
                    {
                        var propertyMapping = _mappings[i];
                        if (propertyMapping.Property == keyProperty
                            && keyValueProviderType.IsInstanceOfType(propertyMapping.Mapper))
                        {
                            _keyMapping = propertyMapping;
                            _keyFieldUrlSegmentOffset = pathSegmentsToIgnore;
                        }

                        pathSegmentsToIgnore += propertyMapping.Mapper.PathSegmentsCount;
                    }
                }
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
                    var pageIdProperty = typeof (IPageRelatedData).GetProperty("PageId");

                    var propertyExpr = Expression.Property(parameterExpression, pageIdProperty);
                    var pageIdMatchExpr = Expression.Equal(propertyExpr, Expression.Constant(pageId));

                    filterExpression = Expression.AndAlso(pageIdMatchExpr, filterExpression);
                }

                return Expression.Lambda<Func<TDataType, bool>>(filterExpression, parameterExpression);
            }

            public RelativeRoute GetRoute(TDataType dataItem, bool searchSignificant)
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

                    bool fieldSearchSignificant = searchSignificant && (_keyMapping == null || mapping == _keyMapping);

                    var relativeRoute = InvokeMapper(mapping.Mapper, mapping.Property.PropertyType, filedValue, fieldSearchSignificant);
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

            private RelativeRoute InvokeMapper(
                IRelativeRouteToPredicateMapper mapper, 
                Type fieldType, 
                object fieldValue, 
                bool searchSignificant)
            {
                var @interface = typeof(IRelativeRouteToPredicateMapper<>).MakeGenericType(fieldType);
                return @interface.GetMethod("GetRoute").Invoke(mapper, new[] { fieldValue, searchSignificant }) as RelativeRoute;
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

            public IData TryGetData(Guid pageId, RelativeRoute routePart)
            {
                if (routePart.PathSegments.Length != PathSegmentsCount)
                {
                    return null;
                }

                // Searching by key, if key value is provided by mappers
                if (_keyMapping != null)
                {
                    var keyRoutePart = new RelativeRoute
                    {
                        PathSegments = routePart.PathSegments.Skip(_keyFieldUrlSegmentOffset)
                            .Take(_keyMapping.Mapper.PathSegmentsCount).ToArray(),
                        QueryString = routePart.QueryString
                    };

                    return TryDataByKeyProperty(_keyMapping, keyRoutePart);
                }

                // Searching by a fields predicate otherwise
                var predicate = GetPredicate(pageId, routePart);
                if (predicate == null)
                {
                    return null;
                }

                var dataSet = DataFacade.GetData<TDataType>(predicate).Take(2).ToList();

                if (dataSet.Count == 0)
                {
                    return null;
                }

                if (dataSet.Count > 1)
                {
                    throw new DataUrlCollisionException(typeof(TDataType), routePart);
                }

                return dataSet[0];
            }

            private IData TryDataByKeyProperty(PropertyUrlMapping propertyMapping, RelativeRoute keyRoutePart)
            {
                var method = StaticReflection.GetGenericMethodInfo(() => TryDataByKeyProperty<Guid>(null, null));

                var genericMethod = method.MakeGenericMethod(propertyMapping.Property.PropertyType);
                return genericMethod.Invoke(this, new object[] {propertyMapping, keyRoutePart}) as TDataType;
            }


            private TDataType TryDataByKeyProperty<TKeyType>(PropertyUrlMapping propertyMapping, RelativeRoute keyRoutePart)
            {
                var valueProvider = propertyMapping.Mapper as IRelativeRouteValueProvider<TKeyType>;
                if (valueProvider == null)
                {
                    return null;
                }

                TKeyType key;
                if (!valueProvider.TryGetValue(keyRoutePart, out key))
                {
                    return null;
                }

                return DataFacade.TryGetDataByUniqueKey(typeof (TDataType), key) as TDataType;
            }
        }
    }
}
