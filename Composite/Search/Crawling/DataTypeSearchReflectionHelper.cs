using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Composite.Core;
using Composite.Core.Types;
using Composite.Data;
using Composite.Data.ProcessControlled;
using Composite.Data.Types;
using Composite.Search.Crawling.DataFieldProcessors;
using SearchableFieldInfo = System.Collections.Generic.KeyValuePair<System.Reflection.PropertyInfo, Composite.Data.SearchableFieldAttribute>;

namespace Composite.Search.Crawling
{
    /// <summary>
    /// A helper class for extracting search related information frome the data types.
    /// </summary>
    public static class DataTypeSearchReflectionHelper
    {
        private static readonly ConcurrentDictionary<Type, IEnumerable<SearchableFieldInfo>> DocumentFieldsCache =
            new ConcurrentDictionary<Type, IEnumerable<SearchableFieldInfo>>();

        private static readonly ConcurrentDictionary<PropertyInfo, IDataFieldProcessor> DataFieldProcessors =
            new ConcurrentDictionary<PropertyInfo, IDataFieldProcessor>();


        internal static IEnumerable<SearchableFieldInfo> GetSearchableFields(Type interfaceType)
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

        internal static IDataFieldProcessor GetDataFieldProcessor(PropertyInfo propertyInfo)
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

                if (propertyInfo.DeclaringType == typeof(IPublishControlled) 
                    && propertyInfo.Name == nameof(IPublishControlled.PublicationStatus))
                {
                    return new PublicationStatusDataFieldProcessor();
                }

                if (propertyInfo.DeclaringType == typeof(IFile)
                    && propertyInfo.Name == nameof(IFile.FileName))
                {
                    return new FileNameDataFieldProcessor();
                }

                if (propertyInfo.DeclaringType == typeof(IMediaFile)
                    && propertyInfo.Name == nameof(IMediaFile.MimeType))
                {
                    return new MimeTypeDataFieldProcessor();
                }

                return new DefaultDataFieldProcessor();
            });
        }



        /// <summary>
        /// Gets an enumeration of the search document fields from a data type.
        /// </summary>
        /// <param name="interfaceType"></param>
        /// <param name="includeDefaultFields"></param>
        /// <returns></returns>
        public static IEnumerable<DocumentField> GetDocumentFields(Type interfaceType, bool includeDefaultFields = true)
        {
            var fields = includeDefaultFields
                ? SearchDocumentBuilder.GetDefaultDocumentFields()
                : Enumerable.Empty<DocumentField>();

            fields = fields.Concat(
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
                    Label = processor.GetFieldLabel(prop)
                });

            if (includeDefaultFields)
            {
                fields = fields.Concat(
                    ServiceLocator.GetServices<IDocumentFieldProvider>()
                        .SelectMany(fp => fp.GetCustomFields(interfaceType)));
            }

            return fields;
        }
    }
}
