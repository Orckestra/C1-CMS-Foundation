using System;
using System.Collections.Generic;
using System.Globalization;
using System.Reflection;
using Composite.Core.Types;
using Composite.Data;

namespace Composite.C1Console.Search.Crawling
{
    /// <summary>
    /// The default data field processor.
    /// </summary>
    public class DefaultDataFieldProcessor: IDataFieldProcessor
    {
        public virtual IEnumerable<string> GetTextParts(object value)
        {
            var text = value as string;
            if (text == null) return null;

            if (text.StartsWith("<html"))
            {
                var crawler = new XhtmlCrawlingHelper();
                crawler.CrawlXhtml(text);
                return crawler.TextParts;
            }
            
            return new[] { text };
        }

        public virtual object GetIndexValue(object fieldValue)
        {
            return fieldValue == null ? null : ValueTypeConverter.Convert<string>(fieldValue);
        }

        public virtual string[] GetFacetValues(object value)
        {
            if (value == null) return null;

            string stringValue = value.ToString();

            return string.IsNullOrEmpty(stringValue) ? null : new[] { stringValue };
        }

        public string GetDocumentFieldName(PropertyInfo propertyInfo)
        {
            return $"{propertyInfo.ReflectedType.Name}.{propertyInfo.Name}";
        }

        public DocumentFieldFacet GetDocumentFieldFacet(PropertyInfo propertyInfo)
        {
            return new DocumentFieldFacet
            {
                Limit = 100,
                MinHitCount = 1,
                LabelFunction = GetFacetLabelFunction()
            };
        }

        public DocumentFieldPreview GetDocumentFieldPreview(PropertyInfo propertyInfo)
        {
            return new DocumentFieldPreview
            {
                Sortable = IsFieldSortable(propertyInfo),
                PreviewFunction = GetPreviewFunction(),
                FieldOrder = 100
            };
        }

        public string GetFieldLabel(PropertyInfo propertyInfo, CultureInfo cultureInfo)
        {
            return propertyInfo.Name;
        }

        protected virtual Func<object, string> GetPreviewFunction()
        {
            return obj => obj?.ToString();
        }

        protected virtual Func<string, string> GetFacetLabelFunction()
        {
            return obj => obj;
        }

        private static bool IsFieldSortable(PropertyInfo propertyInfo)
        {
            var attr = propertyInfo.GetCustomAttribute<StoreFieldTypeAttribute>(true);
            Verify.IsNotNull(attr, $"Failed to find and attribute of type '{nameof(StoreFieldTypeAttribute)}'");

            var storeFieldType = attr.StoreFieldType;

            if (storeFieldType.IsString)
            {
                return storeFieldType.MaximumLength <= 64;
            }

            return storeFieldType.IsDateTime
                   || storeFieldType.IsNumeric
                   || storeFieldType.IsBoolean;
        }
    }
}
