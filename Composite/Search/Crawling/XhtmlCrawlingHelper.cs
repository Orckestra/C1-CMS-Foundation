using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;
using Composite.Core;
using Composite.Core.Xml;
using Composite.Functions;

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
            var functionName = functionNode.GetAttributeValue("name");
            if(functionName == null) return;

            IFunction function;
            try
            {
                function = FunctionFacade.GetFunction(functionName);
                if (function == null) return;
            }
            catch
            {
                return;
            }

            foreach (var paramElement in functionNode.Elements())
            {
                var parameterName = paramElement.GetAttributeValue("name");
                if(parameterName == null) continue;

                var profile = function.ParameterProfiles.FirstOrDefault(p => p.Name == parameterName);
                if (profile != null)
                {
                    if (profile.Type == typeof (XhtmlDocument))
                    {
                        ProcessElement(paramElement);
                    }

                    // TODO: handle the other parameter types
                }
            }
        }
    }
}
