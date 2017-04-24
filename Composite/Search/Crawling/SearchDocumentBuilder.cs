using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading;
using Composite.C1Console.Security;
using Composite.Core;
using Composite.Core.Extensions;
using Composite.Core.Linq;
using Composite.Core.WebClient;
using Composite.Data;
using Composite.Data.Types;
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

        private readonly IEnumerable<ISearchDocumentBuilderExtension> _extensions;

        private IPage _currentPage;

        private static readonly MD5 HashingAlgorithm = MD5.Create();

        /// <summary>
        /// Creates a new instance of <see cref="SearchDocumentBuilder"/>.
        /// </summary>
        [Obsolete("Use an overload taking extensions as a parameter.")]
        public SearchDocumentBuilder(): this(null)
        {
        }

        /// <summary>
        /// Creates a new instance of <see cref="SearchDocumentBuilder"/>.
        /// </summary>
        public SearchDocumentBuilder(IEnumerable<ISearchDocumentBuilderExtension> extensions)
        {
            _extensions = extensions;
        }

        /// <summary>
        /// Collected text parts.
        /// </summary>
        public ICollection<string> TextParts => _textParts;

        /// <summary>
        /// Collected field values to be available in search results.
        /// </summary>
        public ICollection<KeyValuePair<string, object>> FieldPreviewValues => _fieldValues;

        /// <summary>
        /// Collected facet field values
        /// </summary>
        public ICollection<KeyValuePair<string, string[]>> FacetFieldValues => _facetFieldValues;


        /// <summary>
        /// The document url. Setting a not empty value makes the document searchable from the frontend.
        /// </summary>
        public string Url { get; set; }

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
            _fieldValues.Add(new KeyValuePair<string, object>(DocumentFieldNames.DataType, dataTypeName));
            _facetFieldValues.Add(new KeyValuePair<string, string[]>(DocumentFieldNames.DataType, new[] { dataTypeName }));
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

            if (data is IPage page)
            {
                _currentPage = page;
            }

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
                        _textParts.AddRange(textParts.SelectMany(ProcessXhtml));
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

            _extensions?.ForEach(e =>
            {
                try
                {
                    e.Populate(this, data);
                }
                catch (Exception ex)
                when (!(ex is ThreadAbortException))
                {
                    Log.LogError(nameof(SearchDocumentBuilder), ex);
                }
            });
        }

        /// <exclude />
        [Obsolete("Use an overload that does not take a Url parameter and use the Url property instead.")]
        public SearchDocument BuildDocument(
            string source,
            string documentId,
            string label,
            string versionName,
            EntityToken entityToken,
            string url)
        {
            Url = Url ?? url;
            return BuildDocument(source, documentId, label, versionName, entityToken);
        }

        /// <summary>
        /// Builds an instance of <see cref="SearchDocument"/> based on collected information.
        /// </summary>
        /// <param name="source">The document source name</param>
        /// <param name="documentId">The document id</param>
        /// <param name="label">The label of the item in the tree</param>
        /// <param name="versionName">The version name of the item</param>
        /// <param name="entityToken">The entity token.</param>
        /// <returns></returns>
        public SearchDocument BuildDocument(
            string source, 
            string documentId, 
            string label, 
            string versionName, 
            EntityToken entityToken)
        {
            Verify.ArgumentNotNullOrEmpty(source, nameof(source));
            Verify.ArgumentNotNullOrEmpty(documentId, nameof(documentId));
            Verify.ArgumentNotNullOrEmpty(label, nameof(label));

            _fieldValues.Add(new KeyValuePair<string, object>(DocumentFieldNames.Label, label));

            if (!string.IsNullOrWhiteSpace(Url))
            {
                _facetFieldValues.Add(new KeyValuePair<string, string[]>(DocumentFieldNames.HasUrl, new[] { "1" }));
            }

            AddAccessField(entityToken);

            return new SearchDocument(source, documentId, label, entityToken)
            {
                ElementBundleName = versionName,
                FullText = _textParts,
                Url = Url,
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
            IEnumerable<EntityToken> ancestors;
            IEnumerable<string> users;
            IEnumerable<Guid> groups;
            EntityTokenSecurityHelper.GetUsersAndGroupsWithReadAccess(entityToken, out ancestors, out users, out groups);

            var tokens = users.Concat(groups.Select(g => g.ToString())).ToArray();

            if (tokens.Any())
            {
                _facetFieldValues.Add(new KeyValuePair<string, string[]>(
                    DocumentFieldNames.ConsoleAccess,
                    tokens));
            }

            if (ancestors.Any())
            {
                var ancestorTokens = ancestors.Select(GetEntityTokenHash).ToArray();

                _facetFieldValues.Add(new KeyValuePair<string, string[]>(
                    DocumentFieldNames.Ancestors,
                    ancestorTokens));
            }
        }

        internal static string GetEntityTokenHash(EntityToken entityToken)
        {
            var entityTokenString = EntityTokenSerializer.Serialize(entityToken);
            var bytes = Encoding.UTF8.GetBytes(entityTokenString);

            return UrlUtils.CompressGuid(new Guid(HashingAlgorithm.ComputeHash(bytes)));
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
                    DocumentFieldNames.Label,
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
                    DocumentFieldNames.Source,
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
                    DocumentFieldNames.DataType,
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
                    DocumentFieldNames.HasUrl,
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
                    DocumentFieldNames.ConsoleAccess,
                    new DocumentFieldFacet
                    {
                        FacetType = FacetType.MultipleValues,
                        MinHitCount = 1
                    },
                    null)
                {
                    Label = null
                },
                new DocumentField(
                    DocumentFieldNames.Ancestors,
                    new DocumentFieldFacet
                    {
                        FacetType = FacetType.MultipleValues,
                        MinHitCount = 1
                    },
                    null)
                {
                    Label = null
                }
            };
        }

        private IEnumerable<string> ProcessXhtml(string textFragment)
        {
            if (textFragment.StartsWith("<html"))
            {
                var crawler = new XhtmlCrawlingHelper();
                crawler.SetPageContext(_currentPage);
                crawler.CrawlXhtml(textFragment);
                foreach (var fragment in crawler.TextParts)
                {
                    yield return fragment;
                }
            }
            else
            {
                yield return textFragment;
            }
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
