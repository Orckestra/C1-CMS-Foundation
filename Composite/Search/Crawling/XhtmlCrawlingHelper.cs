using System;
using System.Collections.Generic;
using System.Xml.Linq;
using Composite.Core;
using Composite.Core.Xml;

namespace Composite.Search.Crawling
{
    internal class XhtmlCrawlingHelper
    {
        private readonly IList<string> _textParts = new List<string>();

        public IEnumerable<string> TextParts => _textParts;

        /// <summary>
        /// Crawls xhtml content and extracts text parts
        /// </summary>
        /// <param name="xhtml"></param>
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
                Log.LogError(nameof(XhtmlCrawlingHelper), ex);
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
    }
}
