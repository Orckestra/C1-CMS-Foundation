using System;
using System.Collections.Generic;
using System.Globalization;
using System.Xml.Linq;
using Composite.Core;
using Composite.Core.Types;
using Composite.Core.Xml;
using Composite.Data;

namespace Composite.C1Console.Search.Crawling
{
    /// <summary>
    /// Data crawling helper - collects text parts and references from xhtml and IData objects.
    /// </summary>
    internal class DataCrawlingHelper
    {
        private readonly List<string> _textParts = new List<string>();
        //private readonly List<string> _references = new List<string>();

        private readonly List<KeyValuePair<string, object>> _fieldValues = new List<KeyValuePair<string, object>>();
        private readonly List<KeyValuePair<string, string[]>> _facetFieldValues = new List<KeyValuePair<string, string[]>>();

        /// <summary>
        /// Collected text parts.
        /// </summary>
        public IEnumerable<string> TextParts => _textParts;
        //public IEnumerable<string> References => _references;

        public IEnumerable<KeyValuePair<string, object>> FieldPreviewValues => _fieldValues;

        public IEnumerable<KeyValuePair<string, string[]>> FacetFieldValues => _facetFieldValues;
        

        /// <summary>
        /// Extracts text parts for the text search as well as fields values for search results preview 
        /// from the given data object.
        /// </summary>
        /// <param name="data"></param>
        public void CrawlData(IData data)
        {
            var interfaceType = data.DataSourceId.InterfaceType;
            var fields = DataTypeSearchReflectionHelper.GetSearchableFields(interfaceType);

            foreach (var field in fields)
            {
                var propertyInfo = field.Key;
                object value = propertyInfo.GetValue(data);
                if(value == null) continue;

                var attr = field.Value;

                // Text indexing
                if (attr.IndexText && value is string)
                {
                    var text = (string) value;

                    if (text.StartsWith("<html"))
                    {
                        CrawlXhtml(text);
                    }
                    else
                    {
                        _textParts.Add(text);
                    }
                }

                // Field previewing
                if (attr.Previewable)
                {
                    var indexValue = ToIndexValue(value);
                    if (indexValue != null)
                    {
                        _fieldValues.Add(new KeyValuePair<string, object>(
                            DataTypeSearchReflectionHelper.GetDocumentFieldName(field.Key), 
                            indexValue));
                    }
                }

                if (attr.Faceted)
                {
                    // TODO: populate facet field values
                    string textValue = value.ToString();
                    _facetFieldValues.Add(new KeyValuePair<string, string[]>(
                        DataTypeSearchReflectionHelper.GetDocumentFieldName(field.Key), 
                        new[] { textValue }));
                }
            }
        }

        /// <summary>
        /// Crawls xhtml content and extracts text parts and references.
        /// </summary>
        /// <param name="xhtml"></param>
        /// <param name="htmlParts"></param>
        public bool CrawlXhtml(string xhtml)
        {
            try
            {
                var doc = XhtmlDocument.Parse(xhtml);
                ProcessNode(doc.Body);

                return true;
            }
            catch (Exception ex)
            {
                Log.LogError(nameof(DataCrawlingHelper), ex);
                return false;
            }
        }

        private void ProcessNode(XNode node)
        {
            if (node is XText)
            {
                _textParts.Add(((XText)node).Value);
                return;
            }

            if (node is XElement)
            {
                ProcessElement((XElement)node);
            }
        }

        private void ProcessElement(XElement element)
        {
            if (element.Name.Namespace == Namespaces.Function10
                && element.Name.LocalName == "function")
            {
                ProcessFunctionCall(element);
                return;
            }

            if (element.Name.LocalName == "a")
            {
                // TODO: process "href" attribute for page/data references
            }

            foreach (var childNode in element.Nodes())
            {
                ProcessNode(childNode);
            }
        }

        private void ProcessFunctionCall(XElement functionNode)
        {
            // TODO: process parameteres
            // TODO: add a function reference
        }

        public virtual object ToIndexValue(object fieldValue)
        {
            if (fieldValue == null) return null;

            if (fieldValue is DateTime?)
            {
                return ((DateTime)fieldValue).ToString("s");
            }

            return ValueTypeConverter.Convert<string>(fieldValue);
        }
    }
}
