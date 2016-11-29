using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Composite.Core;
using Composite.Core.Types;
using Composite.Data;
using SearchableFieldInfo = System.Collections.Generic.KeyValuePair<System.Reflection.PropertyInfo, Composite.Data.SearchableFieldAttribute>;

namespace Composite.C1Console.Search.Crawling
{
    internal static class DataTypeSearchReflectionHelper
    {
        private static readonly ConcurrentDictionary<Type, IEnumerable<SearchableFieldInfo>> DocumentFieldsCache =
            new ConcurrentDictionary<Type, IEnumerable<SearchableFieldInfo>>();

        private static readonly ConcurrentDictionary<PropertyInfo, IDataFieldProcessor> DataFieldProcessors =
            new ConcurrentDictionary<PropertyInfo, IDataFieldProcessor>();


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

        public static IDataFieldProcessor GetDataFieldProcessor(PropertyInfo propertyInfo)
        {
            return DataFieldProcessors.GetOrAdd(propertyInfo, pi =>
            {
                var processor = ServiceLocator.GetServices<IDataFieldProcessorProvider>()
                    .Select(p => p.GetDataFieldProcessor(pi))
                    .FirstOrDefault();

                if (processor != null) return processor;

                var propertyType = pi.PropertyType;
                if (propertyType == typeof (DateTime) || propertyType == typeof (DateTime?))
                {
                    return new DateTimeDataFieldProcessor();
                }

                return new DefaultDataFieldProcessor();
            });
        }




        public static IEnumerable<DocumentField> GetDocumentFields(Type interfaceType, bool includeDefaultFields = true)
        {
            var defaultFields = includeDefaultFields
                ? SearchDocumentBuilder.GetDefaultDocumentFields()
                : Enumerable.Empty<DocumentField>();

            return defaultFields.Concat(
                from info in GetSearchableFields(interfaceType)
                let prop = info.Key
                let attr = info.Value
                where attr.Previewable || attr.Faceted
                let processor = GetDataFieldProcessor(prop)
                select new DocumentField(
                    processor.GetDocumentFieldName(prop),
                    attr.Faceted ? processor.GetDocumentFieldFacet(prop) : null,
                    attr.Previewable ? processor.GetDocumentFieldPreview(prop) : null)
                {
                    GetFieldLabel = culture => prop.Name
                });
        }
    }
}
