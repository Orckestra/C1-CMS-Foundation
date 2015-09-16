using System;
using System.Linq;
using System.Linq.Expressions;
using Composite.Core.Routing.Foundation.PluginFacades;
using Composite.Core.Types;

namespace Composite.Core.Routing
{
    public class DefaultRelativeRouteToPredicateMapper<TValue> : IRelativeRouteToPredicateMapper<TValue>
    {
        public int PathSegmentsCount { get { return 1; } }

        public Expression<Func<TValue, bool>> GetPredicate(RelativeRoute route)
        {
            var stringValue = route.PathSegments.Single();
            if (IsStringField)
            {
                return field => field != null && StringToUrlPart(field as string) == stringValue;
            }

            var value = ValueTypeConverter.Convert<TValue>(stringValue);
            return field => field.Equals(value);
        }

        public RelativeRoute GetRoute(TValue fieldValue)
        {
            if (!typeof(TValue).IsValueType && fieldValue == null)
            {
                return null;
            }

            string stringValue = ValueTypeConverter.Convert<string>(fieldValue);
            if (IsStringField)
            {
                stringValue = StringToUrlPart(stringValue);
            }

            return new RelativeRoute {PathSegments = new[] {stringValue}};
        }

        private static string StringToUrlPart(string partnerName)
        {
            return UrlFormattersPluginFacade.FormatUrl(partnerName, true);
        }

        private bool IsStringField
        {
            get { return typeof(TValue) == typeof(string); }
        }
    }
}
