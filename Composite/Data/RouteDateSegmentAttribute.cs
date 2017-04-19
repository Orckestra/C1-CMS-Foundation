using System;
using System.Linq.Expressions;
using System.Reflection;
using Composite.Core.Routing;

namespace Composite.Data
{
    /// <summary>
    /// Describes which data format should be used while building a data url segment
    /// </summary>
    public enum DateSegmentFormat
    {
        /// <exclude />
        Undefined = 0,
        /// <summary>
        /// Date url segment: '/Year'
        /// </summary>
        Year = 1,
        /// <summary>
        /// Date url segments: '/Year/Month'
        /// </summary>
        YearMonth = 2,
        /// <summary>
        /// Date url segments: '/Year/Month/Day'
        /// </summary>
        YearMonthDay = 3
    }


    /// <summary>
    /// Makes the data type property of type <see cref="DateTime"/> field appear in data url.
    /// </summary>
    public sealed class RouteDateSegmentAttribute : RouteSegmentAttribute
    {
        private readonly DateSegmentFormat _format;

        /// <summary>
        /// Makes the data type property of type <see cref="DateTime"/> field appear in data url.
        /// </summary>
        public RouteDateSegmentAttribute(int order, DateSegmentFormat format = DateSegmentFormat.YearMonthDay)
            : base(order)
        {
            if (format == DateSegmentFormat.Undefined)
            {
                format = DateSegmentFormat.YearMonthDay;
            }

            _format = format;
        }

        /// <exclude />
        public override IRelativeRouteToPredicateMapper BuildMapper(PropertyInfo propertyInfo)
        {
            Verify.That(propertyInfo.PropertyType == typeof(DateTime), 
                "Property '{0}' of type '{1}' has attribute [{2}] with is applicable only for properties of type System.DateTime",
                propertyInfo.Name, propertyInfo.DeclaringType.FullName, typeof(RouteDateSegmentAttribute).Name);

            return new DateUrlSegmentMapper(_format);
        }

        internal class DateUrlSegmentMapper : IRelativeRouteToPredicateMapper<DateTime>
        {
            private readonly DateSegmentFormat _format;

            public DateUrlSegmentMapper(DateSegmentFormat format)
            {
                _format = format;
            }

            public int PathSegmentsCount
            {
                get
                {
                    switch (_format)
                    {
                        case DateSegmentFormat.Year:
                            return 1;
                        case DateSegmentFormat.YearMonth:
                            return 2;
                        case DateSegmentFormat.YearMonthDay:
                            return 3;
                    }

                    throw new InvalidOperationException("Not supported DateSegmentFormat value: " + _format);
                }
            }

            public Expression<Func<DateTime, bool>> GetPredicate(Guid pageId, RelativeRoute route)
            {
                int year, month, day;

                if (!int.TryParse(route.PathSegments[0], out year) || year < 0 || year > 10000)
                {
                    return null;
                }

                if (_format == DateSegmentFormat.Year)
                {
                    return date => date.Year == year;
                }

                if (!int.TryParse(route.PathSegments[1], out month) || month < 1 || month > 12)
                {
                    return null;
                }

                if (_format == DateSegmentFormat.YearMonth)
                {
                    return date => date.Year == year && date.Month == month;
                }

                if (!int.TryParse(route.PathSegments[2], out day) || day < 1 || day > DateTime.DaysInMonth(year, month))
                {
                    return null;
                }

                return date => date.Year == year && date.Month == month && date.Day == day;
            }

            public RelativeRoute GetRoute(DateTime fieldValue, bool searchSignificant)
            {
                switch (_format)
                {
                    case DateSegmentFormat.Year:
                        return new RelativeRoute
                        {
                            PathSegments = new[]
                            {
                                fieldValue.Year.ToString(),
                            }
                        };
                    case DateSegmentFormat.YearMonth:
                        return new RelativeRoute
                        {
                            PathSegments = new[]
                            {
                                fieldValue.Year.ToString(),
                                fieldValue.Month.ToString(),
                            }
                        };
                    case DateSegmentFormat.YearMonthDay:
                        return new RelativeRoute
                        {
                            PathSegments = new[]
                            {
                                fieldValue.Year.ToString(),
                                fieldValue.Month.ToString(),
                                fieldValue.Day.ToString()
                            }
                        };
                }

                throw new InvalidOperationException("Not supported DateSegmentFormat value: " + _format);
            }
        }

    }
}
