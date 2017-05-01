using System;
using System.Collections.Generic;
using System.Reflection;
using Composite.Core;
using Composite.Core.Routing;
using Composite.Core.Types;
using Composite.Data;

namespace Composite.Plugins.Routing.InternalUrlConverters
{
    class DataInternalUrlConverter: IInternalUrlConverter
    {
        private readonly Type _type;
        private readonly Type _keyType;
        private readonly ConstructorInfo _dataReferenceConstructor;


        public DataInternalUrlConverter(string shortTypeName, Type type)
        {
            AcceptedUrlPrefixes = new[] { shortTypeName + "(" };
            _type = type;
            _keyType = _type.GetSingleKeyProperty().PropertyType;

            _dataReferenceConstructor = typeof(DataReference<>).MakeGenericType(_type).GetConstructor(new[] { typeof(object) });
        }


        public IEnumerable<string> AcceptedUrlPrefixes { get; }


        public string ToPublicUrl(string internalDataUrl, UrlSpace urlSpace)
        {
            object keyValue = ExtractKeyValue(internalDataUrl);
            if(keyValue == null) return null;

            var data = DataFacade.TryGetDataByUniqueKey(_type, keyValue);
            if(data == null) return null;

            var pageUrlData = DataUrls.TryGetPageUrlData(data.ToDataReference());

            if (internalDataUrl.IndexOf("?", StringComparison.Ordinal) > 0)
            {
                var parameters = new UrlBuilder(internalDataUrl).GetQueryParameters();

                if (parameters.HasKeys())
                {
                    if (pageUrlData.QueryParameters == null)
                    {
                        pageUrlData.QueryParameters = parameters;
                    }
                    else
                    {
                        pageUrlData.QueryParameters.Add(parameters);
                    }
                }
            }

            return pageUrlData != null ? PageUrls.BuildUrl(pageUrlData, UrlKind.Public, urlSpace) : null;
        }


        private object ExtractKeyValue(string internalDataUrl)
        {
            int openBracketIndex = internalDataUrl.IndexOf("(", StringComparison.Ordinal);
            if (openBracketIndex < 0)
            {
                return null;
            }

            int closingBracketOffset = internalDataUrl.IndexOf(")", openBracketIndex + 1, StringComparison.Ordinal);
            if (closingBracketOffset < 0)
            {
                return null;
            }

            string dataIdStr = internalDataUrl.Substring(openBracketIndex + 1, closingBracketOffset - openBracketIndex - 1);

            object keyValue = ValueTypeConverter.Convert(dataIdStr, _keyType);

            if (keyValue == null || (keyValue is Guid && (Guid)keyValue == Guid.Empty))
            {
                return null;
            }

            return keyValue;
        }

        public IDataReference ToDataReference(string internalDataUrl)
        {
            object keyValue = ExtractKeyValue(internalDataUrl);
            if (keyValue == null) return null;

            return (IDataReference)_dataReferenceConstructor.Invoke(new [] { keyValue });
        }
    }
}
