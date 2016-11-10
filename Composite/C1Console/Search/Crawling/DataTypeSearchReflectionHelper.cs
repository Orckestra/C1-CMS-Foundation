using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using Composite.Core.Types;
using Composite.Data;

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
                   select new DocumentField(prop.Name, 
                    attr.Faceted ? new DocumentFieldFacet { FieldOrder = 100 } : null,
                    attr.Previewable ? new DocumentFieldPreview { Sortable = false, FieldOrder = 100 } : null);
        }
    }
}
