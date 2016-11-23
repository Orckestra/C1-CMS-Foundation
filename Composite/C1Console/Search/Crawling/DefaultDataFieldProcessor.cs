using System;
using System.Collections.Generic;
using System.Globalization;
using System.Reflection;
using Composite.Core.Types;
using Composite.Data;
using Composite.Data.Types;

namespace Composite.C1Console.Search.Crawling
{
    /// <summary>
    /// The default data field processor.
    /// </summary>
    public class DefaultDataFieldProcessor: IDataFieldProcessor
    {
        /// <exclude />
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

        /// <exclude />
        public virtual object GetIndexValue(object fieldValue)
        {
            return fieldValue == null ? null : ValueTypeConverter.Convert<string>(fieldValue);
        }

        /// <exclude />
        public virtual string[] GetFacetValues(object value)
        {
            if (value == null) return null;

            string stringValue = value.ToString();

            return string.IsNullOrEmpty(stringValue) ? null : new[] { stringValue };
        }

        /// <exclude />
        public virtual string GetDocumentFieldName(PropertyInfo pi)
        {
            if (pi.Name == nameof(IPage.Description) && pi.PropertyType == typeof(string))
            {
                return SearchDocumentBuilder.DefaultFieldNames.Description;
            }

            if ((pi.Name == nameof(ICreationHistory.CreationDate) || pi.Name == nameof(IMediaFile.CreationTime))
                && (pi.PropertyType == typeof(DateTime) || pi.PropertyType == typeof(DateTime?)))
            {
                return SearchDocumentBuilder.DefaultFieldNames.CreationTime;
            }

            return $"{pi.ReflectedType.Name}.{pi.Name}";
        }

        /// <exclude />
        public virtual DocumentFieldFacet GetDocumentFieldFacet(PropertyInfo propertyInfo)
        {
            return new DocumentFieldFacet
            {
                Limit = 100,
                MinHitCount = 1,
                LabelFunction = GetFacetLabelFunction()
            };
        }

        /// <exclude />
        public virtual DocumentFieldPreview GetDocumentFieldPreview(PropertyInfo propertyInfo)
        {
            return new DocumentFieldPreview
            {
                Sortable = IsFieldSortable(propertyInfo),
                PreviewFunction = GetPreviewFunction(),
                FieldOrder = 100
            };
        }

        /// <exclude />
        public virtual string GetFieldLabel(PropertyInfo propertyInfo, CultureInfo cultureInfo)
        {
            return propertyInfo.Name;
        }

        /// <exclude />
        protected virtual Func<object, string> GetPreviewFunction()
        {
            return obj => obj?.ToString();
        }

        /// <exclude />
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
