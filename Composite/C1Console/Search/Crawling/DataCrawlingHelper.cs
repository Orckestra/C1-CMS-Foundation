using System.Collections.Generic;
using Composite.Data;

namespace Composite.C1Console.Search.Crawling
{
    /// <summary>
    /// Data crawling helper - collects text parts, field values and factes to index from IData objects.
    /// </summary>
    internal class DataCrawlingHelper
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
        /// Extracts text parts for the text search as well as fields values for search results preview 
        /// from the given data object.
        /// </summary>
        /// <param name="data"></param>
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
    }
}
