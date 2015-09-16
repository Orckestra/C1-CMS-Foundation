using System;
using System.Reflection;
using Composite.Core.Routing;

namespace Composite.Data
{
    /// <summary>
    /// Indicates that the current property has to be used for building data url.
    /// </summary>
    [AttributeUsage(AttributeTargets.Property)]
    public class RouteSegmentAttribute : Attribute
    {
        /// <summary>
        /// Creates an instance of <see cref="RouteSegmentAttribute"/>
        /// </summary>
        /// <param name="order">The order. The fields with the lowest order will appear earlier in the path info part of the url.</param>
        public RouteSegmentAttribute(int order)
        {
            Order = order;
        }

        /// <summary>
        /// Return the order of the segment. Segments with the lower number will appear in url path earlier.
        /// </summary>
        public int Order { get; set; }


        /// <summary>
        /// Build a segment to predicate mapper
        /// </summary>
        /// <param name="propertyInfo"></param>
        /// <returns></returns>
        public virtual IRelativeRouteToPredicateMapper BuildMapper(PropertyInfo propertyInfo)
        {
            if (propertyInfo.PropertyType == typeof (DateTime))
            {
                return new RouteDateSegmentAttribute.DateUrlSegmentMapper(DateSegmentFormat.YearMonthDay);
            }

            var type = typeof (DefaultRelativeRouteToPredicateMapper<>).MakeGenericType(propertyInfo.PropertyType);
            var constructor = type.GetConstructor(new Type[0]);

            return constructor.Invoke(null) as IRelativeRouteToPredicateMapper;
        }
    }
}
