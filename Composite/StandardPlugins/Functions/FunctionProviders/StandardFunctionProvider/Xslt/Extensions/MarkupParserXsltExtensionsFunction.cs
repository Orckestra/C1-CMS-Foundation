
using System;
using Composite.Functions;

using System.Collections.Generic;
using System.Data.SqlTypes;
using Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using Composite.Xml;
using System.Xml.Linq;
using System.Xml;
using System.Xml.XPath;
using System.IO;

namespace Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Xslt.Extensions
{
    internal sealed class MarkupParserXsltExtensionsFunction : StandardFunctionBase
    {
        public MarkupParserXsltExtensionsFunction(EntityTokenFactory entityTokenFactory)
            : base("MarkupParser", "Composite.Xslt.Extensions", typeof(IXsltExtensionDefinition), entityTokenFactory)
        {
        }


        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            return new XsltExtensionDefinition<MarkupParserXsltExtensions>
            {
                EntensionObject = new MarkupParserXsltExtensions(),
                ExtensionNamespace = "#MarkupParserExtensions"
            };
        }


        internal class MarkupParserXsltExtensions
        {
            public XPathNavigator ParseWellformedDocumentMarkup(string wellformedMarkupString)
            {
                using (StringReader sr = new StringReader(wellformedMarkupString))
                {
                    XPathDocument doc = new XPathDocument(sr);
                    return doc.CreateNavigator();
                }
            }



            public XPathNavigator ParseXhtmlBodyFragment(string xhtmlBodyFragmentString)
            {
                using (StringReader sr = new StringReader(string.Format("<html xmlns='{0}'><head /><body>{1}</body></html>", Namespaces.Xhtml, xhtmlBodyFragmentString)))
                {
                    XPathDocument doc = new XPathDocument(sr);
                    return doc.CreateNavigator();
                }
            }

        }
    }
}
