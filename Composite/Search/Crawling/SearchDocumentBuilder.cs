using System;
using System.Collections.Generic;
using System.Linq;
using Composite.C1Console.Security;
using Composite.Core.Linq;
using Composite.Data;

using Texts = Composite.Core.ResourceSystem.LocalizationFiles.Composite_Search;

namespace Composite.Search.Crawling
{
    /// <summary>
    /// A helper class to create search documents based of IData instances
    /// </summary>
    public class SearchDocumentBuilder
    {
        private readonly List<string> _textParts = new List<string>();
        private readonly List<KeyValuePair<string, object>> _fieldValues = new List<KeyValuePair<string, object>>();
        private readonly List<KeyValuePair<string, string[]>> _facetFieldValues = new List<KeyValuePair<string, string[]>>();

        /// <summary>
        /// Collected text parts.
        /// </summary>
        public IEnumerable<string> TextParts => _textParts;

        /// <summary>
        /// Collected field values to be available in search results.
        /// </summary>
        public IEnumerable<KeyValuePair<string, object>> FieldPreviewValues => _fieldValues;

        /// <summary>
        /// Collected facet field values
        /// </summary>
        public IEnumerable<KeyValuePair<string, string[]>> FacetFieldValues => _facetFieldValues;


        /// <summary>
        /// Sets the interface type, name of which will be used for populating the "Data Type" column in the search results.
        /// </summary>
        /// <param name="interfaceType">The interface type.</param>
        public void SetDataType(Type interfaceType)
        {
            string value;
            if (typeof (IData).IsAssignableFrom(interfaceType))
            {
                Guid dataTypeId = interfaceType.GetImmutableTypeId();
                value = dataTypeId.ToString();
            }
            else
            {
                value = interfaceType.FullName;
            }

            SetDataType(value);
        }

        /// Sets the data type name, which will be used for populating the "Data Type" column in the search results.
        public void SetDataType(string dataTypeName)
        {
            _fieldValues.Add(new KeyValuePair<string, object>(DefaultDocumentFieldNames.DataType, dataTypeName));
            _facetFieldValues.Add(new KeyValuePair<string, string[]>(DefaultDocumentFieldNames.DataType, new[] { dataTypeName }));
        }

        /// <summary>
        /// Extracts searchable information from a given data object
        /// (including text parts, field values for search results preview and faceted search).
        /// </summary>
        /// <param name="data">The data item to collect searchable information from.</param>
        /// <param name="skipInheritedInterfaces">When <value>true</value>, the inherited properties will not be processed.</param>
        public void CrawlData(IData data, bool skipInheritedInterfaces = false)
        {
            var interfaceType = data.DataSourceId.InterfaceType;
            var fields = DataTypeSearchReflectionHelper.GetSearchableFields(interfaceType);

            foreach (var field in fields)
            {
                var propertyInfo = field.Key;

                if (skipInheritedInterfaces && propertyInfo.DeclaringType != interfaceType)
                {
                    continue;
                }

                var fieldProcessor = DataTypeSearchReflectionHelper.GetDataFieldProcessor(propertyInfo);

                object value = propertyInfo.GetValue(data);
                if(value == null) continue;

                var attr = field.Value;

                // Text indexing
                if (attr.IndexText)
                {
                    var textParts = fieldProcessor.GetTextParts(value);
                    if (textParts != null)
                    {
                        _textParts.AddRange(textParts);
                    }
                }

                // Field previewing
                if (attr.Previewable)
                {
                    var indexValue = fieldProcessor.GetIndexValue(value);
                    if (indexValue != null)
                    {
                        _fieldValues.Add(new KeyValuePair<string, object>(
                            fieldProcessor.GetDocumentFieldName(propertyInfo), 
                            indexValue));
                    }
                }

                // Faceted fields
                if (attr.Faceted)
                {
                    string[] facetValues = fieldProcessor.GetFacetValues(value);
                    if (facetValues != null && facetValues.Length > 0)
                    {
                        _facetFieldValues.Add(new KeyValuePair<string, string[]>(
                        fieldProcessor.GetDocumentFieldName(propertyInfo),
                            facetValues));
                    }
                }
            }
        }

        /// <summary>
        /// Builds an instance of <see cref="SearchDocument"/> based on collected information.
        /// </summary>
        /// <param name="source">The document source name</param>
        /// <param name="documentId">The document id</param>
        /// <param name="label">The label of the item in the tree</param>
        /// <param name="versionName">The version name of the item</param>
        /// <param name="entityToken">The entity token.</param>
        /// <param name="url">The document url. Setting a not empty value makes the document searchable from the frontend.</param>
        /// <returns></returns>
        public SearchDocument BuildDocument(
            string source, 
            string documentId, 
            string label, 
            string versionName, 
            EntityToken entityToken, 
            string url)
        {
            Verify.ArgumentNotNullOrEmpty(source, nameof(source));
            Verify.ArgumentNotNullOrEmpty(documentId, nameof(documentId));
            Verify.ArgumentNotNullOrEmpty(label, nameof(label));

            _fieldValues.Add(new KeyValuePair<string, object>(DefaultDocumentFieldNames.Label, label));

            if (!string.IsNullOrWhiteSpace(url))
            {
                _facetFieldValues.Add(new KeyValuePair<string, string[]>(DefaultDocumentFieldNames.HasUrl, new[] { "1" }));
            }

            AddAccessField(entityToken);

            return new SearchDocument(source, documentId, label, entityToken)
            {
                ElementBundleName = versionName,
                FullText = _textParts,
                Url = url,
                FieldValues = _fieldValues
                    .ExcludeDuplicateKeys(pair => pair.Key)
                    .ToDictionary(pair => pair.Key, pair => pair.Value),
                FacetFieldValues = _facetFieldValues
                    .ExcludeDuplicateKeys(pair => pair.Key)
                    .ToDictionary(pair => pair.Key, pair => pair.Value)
            };
        }


        private void AddAccessField(EntityToken entityToken)
        {
            IEnumerable<string> users;
            IEnumerable<Guid> groups;
            EntityTokenSecurityHelper.GetUsersAndGroupsWithReadAccess(entityToken, out users, out groups);

            var tokens = users.Concat(groups.Select(g => g.ToString())).ToArray();

            if (tokens.Any())
            {
                _facetFieldValues.Add(new KeyValuePair<string, string[]>(
                    DefaultDocumentFieldNames.ConsoleAccess,
                    tokens));
            }
        }


        /// <summary>
        /// Gets the list of default document fields
        /// </summary>
        /// <returns></returns>
        public static IEnumerable<DocumentField> GetDefaultDocumentFields()
        {
            return new[]
            {
                new DocumentField(
                    DefaultDocumentFieldNames.Label,
                    null,
                    new DocumentFieldPreview
                    {
                        PreviewFunction = value => value?.ToString(),
                        Sortable = true,
                        FieldOrder = 1
                    })
                {
                    Label = Texts.Untranslated.FieldNames_Label
                },

                new DocumentField(
                    DefaultDocumentFieldNames.Source,
                    new DocumentFieldFacet
                    {
                        PreviewFunction = value => value,
                        FacetType = FacetType.SingleValue,
                        MinHitCount = 1
                    },
                    null)
                {
                    Label = null
                },

                new DocumentField(
                    DefaultDocumentFieldNames.DataType,
                    new DocumentFieldFacet
                    {
                        PreviewFunction = GetDataTypeLabel,
                        MinHitCount = 1
                    },
                    new DocumentFieldPreview
                    {
                        PreviewFunction = GetDataTypeLabel,
                        Sortable = false,
                        FieldOrder = 2
                    })
                {
                    Label = Texts.Untranslated.FieldNames_DataType
                },

                new DocumentField(
                    DefaultDocumentFieldNames.HasUrl,
                    new DocumentFieldFacet
                    {
                        PreviewFunction = value => value,
                        MinHitCount = 1
                    }, 
                    null)
                {
                    Label = null
                },

                new DocumentField(
                    DefaultDocumentFieldNames.ConsoleAccess,
                    new DocumentFieldFacet
                    {
                        FacetType = FacetType.MultipleValues,
                        PreviewFunction = value => value,
                        MinHitCount = 1
                    },
                    null)
                {
                    Label = null
                }
            };
        }

        private static string GetDataTypeLabel(object datatype)
        {
            var str = (string)datatype;

            Guid dataTypeId;
            if (Guid.TryParse(str, out dataTypeId))
            {
                if (dataTypeId == new Guid("C046F704-D3E4-4b3d-8CB9-77564FB0B9E7"))
                {
                    return Texts.DataType_Page;
                }

                if (dataTypeId == new Guid("A8716C78-1499-4155-875B-2545006385B2"))
                {
                    return Texts.DataType_MediaFile;
                }

                var descriptor = DataMetaDataFacade.GetDataTypeDescriptor(dataTypeId);
                if (descriptor != null)
                {
                    return descriptor.Title;
                }
            }

            return str;
        }
    }
}
