using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Reflection;
using Composite.Core.Types;
using Composite.Data;
using Composite.Data.DynamicTypes;
using SearchableFieldInfo = System.Collections.Generic.KeyValuePair<System.Reflection.PropertyInfo, Composite.Data.SearchableFieldAttribute>;

namespace Composite.C1Console.Search.Crawling
{
    internal static class DataTypeSearchReflectionHelper
    {

        private static readonly ConcurrentDictionary<Type, IEnumerable<SearchableFieldInfo>> DocumentFieldsCache =
            new ConcurrentDictionary<Type, IEnumerable<SearchableFieldInfo>>();

        public static IEnumerable<SearchableFieldInfo> GetSearchableFields(Type interfaceType)
        {
            if (!typeof(IData).IsAssignableFrom(interfaceType)) return Enumerable.Empty<SearchableFieldInfo>();

            return DocumentFieldsCache.GetOrAdd(interfaceType, type =>
            {
                var properties = type.GetAllProperties();

                var result = new List<SearchableFieldInfo>();
                foreach (var property in properties)
                {
                    var searchableAttr =
                        property.GetCustomAttributesRecursively<SearchableFieldAttribute>().FirstOrDefault();
                    if (searchableAttr == null) continue;

                    result.Add(new SearchableFieldInfo(property, searchableAttr));
                }

                return result;
            });
        }

        public static IEnumerable<DocumentField> GetDocumentFields(Type interfaceType)
        {
            return from info in GetSearchableFields(interfaceType)
                   let prop = info.Key
                   let attr = info.Value
                   where attr.Previewable || attr.Faceted
                   select new DocumentField(GetDocumentFieldName(prop), 
                    attr.Faceted ? new DocumentFieldFacet { FieldOrder = 100 } : null,
                    attr.Previewable ? GetDocumentFieldPreview(prop) : null)
                   {
                       GetLabelFunc = culture => prop.Name
                   };
        }

        private static DocumentFieldPreview GetDocumentFieldPreview(PropertyInfo dataField)
        {
            var attr = dataField.GetCustomAttribute<StoreFieldTypeAttribute>(true);
            Verify.IsNotNull(attr, $"Failed to find and attribute of type '{nameof(StoreFieldTypeAttribute)}'");

            var storeFieldType = attr.StoreFieldType;

            return new DocumentFieldPreview
            {
                Sortable = IsFieldSortable(storeFieldType),
                PreviewFunction = GetPreviewFunction(storeFieldType),
                FieldOrder = 100
            };
        }

        private static Func<object, string> GetPreviewFunction(StoreFieldType storeFieldType)
        {
            if (storeFieldType.IsDateTime)
            {
                return obj =>
                {
                    if (obj == null) return null;
                    var date = DateTime.ParseExact((string) obj, "s", CultureInfo.InvariantCulture);

                    return date.ToString("yyyy MMM d");
                };
            }

            return obj => obj?.ToString();
        }

        internal static string GetDocumentFieldName(PropertyInfo propertyInfo)
        {
            return $"{propertyInfo.ReflectedType.Name}.{propertyInfo.Name}";
        }

        private static bool IsFieldSortable(StoreFieldType storeFieldType)
        {
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
