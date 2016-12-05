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
                return DefaultDocumentFieldNames.Description;
            }

            if ((pi.Name == nameof(ICreationHistory.CreationDate) || pi.Name == nameof(IMediaFile.CreationTime))
                && (pi.PropertyType == typeof(DateTime) || pi.PropertyType == typeof(DateTime?)))
            {
                return DefaultDocumentFieldNames.CreationTime;
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
                SortTermsAs = GetFieldSortingMethod(propertyInfo.PropertyType),
                PreviewFunction = GetPreviewFunction(),
                FieldOrder = 100
            };
        }

        private SortTermsAs GetFieldSortingMethod(Type propertyType)
        {
            if (propertyType.IsGenericType && propertyType.GetGenericTypeDefinition() == typeof (Nullable<>))
            {
                propertyType = propertyType.GetGenericArguments()[0];
            }

            if (propertyType == typeof (byte))
            {
                return SortTermsAs.Int;
            }

            if (propertyType == typeof(short))
            {
                return SortTermsAs.Int;
            }

            if (propertyType == typeof(int))
            {
                return SortTermsAs.Int;
            }

            if (propertyType == typeof(long))
            {
                return SortTermsAs.Long;
            }

            if (propertyType == typeof(float))
            {
                return SortTermsAs.Float;
            }

            if (propertyType == typeof(decimal))
            {
                return SortTermsAs.Double;
            }

            return SortTermsAs.String;
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
