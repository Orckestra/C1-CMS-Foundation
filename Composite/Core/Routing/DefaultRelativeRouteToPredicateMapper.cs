using System;
using System.Linq;
using System.Linq.Expressions;
using Composite.Core.Routing.Foundation.PluginFacades;
using Composite.Core.Types;
using Composite.Core.WebClient;

namespace Composite.Core.Routing
{
    internal class DefaultRelativeRouteToPredicateMapper<TValue> 
        : IRelativeRouteToPredicateMapper<TValue>, IRelativeRouteValueProvider<TValue>
    {
        public int PathSegmentsCount => 1;

        public Expression<Func<TValue, bool>> GetPredicate(Guid pageId, RelativeRoute routePart)
        {
            TValue fieldValue;

            if (!TryGetValue(routePart, out fieldValue))
            {
                return null;
            }

            return field => field.Equals(fieldValue);
        }

        public RelativeRoute GetRoute(TValue fieldValue, bool searchSignificant)
        {
            if (!typeof(TValue).IsValueType && fieldValue == null)
            {
                return null;
            }

            string stringValue;
            if (IsGuidField)
            {
                stringValue = UrlUtils.CompressGuid((fieldValue as Guid?).Value);
            }
            else if (IsStringField)
            {
                stringValue = searchSignificant ? UrlUtils.EncodeUrlInvalidCharacters(fieldValue as string)
                                                : StringToUrlPart(fieldValue as string);
            }
            else
            {
                stringValue = ValueTypeConverter.Convert<string>(fieldValue);
            }
            

            return new RelativeRoute {PathSegments = new[] {stringValue}};
        }

        private static string StringToUrlPart(string partnerName)
        {
            return UrlFormattersPluginFacade.FormatUrl(partnerName, true);
        }

        public bool TryGetValue(RelativeRoute routePart, out TValue value)
        {
            var stringValue = routePart.PathSegments.Single();

            if (string.IsNullOrEmpty(stringValue))
            {
                value = default(TValue);
                return false;
            }

            if (IsGuidField)
            {
                Guid tempGuid;

                if (!UrlUtils.TryExpandGuid(stringValue, out tempGuid) && !Guid.TryParse(stringValue, out tempGuid))
                {
                    value = default(TValue);
                    return false;
                }

                value = (TValue)(tempGuid as object);
                return true;
            }

            if (IsStringField)
            {
                value = (TValue) (UrlUtils.DecodeUrlInvalidCharacters(stringValue) as object);
                return true;
            }

            Exception exception;
            object valueObj = ValueTypeConverter.TryConvert(stringValue, typeof(TValue), out exception);

            bool success = valueObj != null;
            value = success ? (TValue) valueObj : default(TValue);

            return success;
        }


        private bool IsStringField => typeof(TValue) == typeof(string);

        private bool IsGuidField => typeof(TValue) == typeof(Guid);
    }
}
