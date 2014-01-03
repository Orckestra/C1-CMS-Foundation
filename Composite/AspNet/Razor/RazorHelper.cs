using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Text;
using System.Web;
using System.Web.WebPages;
using System.Xml;
using System.Xml.Linq;
using Composite.Core.Types;
using Composite.Core.Xml;
using Composite.Functions;

namespace Composite.AspNet.Razor
{
    /// <summary>
    /// Exposes method to execute razor pages.
    /// </summary>
    public static class RazorHelper
    {
        internal static readonly string PageContext_FunctionContextContainer = "C1.FunctionContextContainer";

        private static FieldInfo HttpContext_items = typeof (HttpContext).GetField("_items", BindingFlags.Instance | BindingFlags.NonPublic);

        /// <summary>
        /// Executes the razor page.
        /// </summary>
        /// <param name="virtualPath">The virtual path.</param>
        /// <param name="setParameters">Delegate to set the parameters.</param>
        /// <param name="resultType">The type of the result.</param>
        /// <param name="functionContextContainer">The function context container</param>
        /// <returns></returns>
        public static object ExecuteRazorPage(
            string virtualPath, 
            Action<WebPageBase> setParameters,
            Type resultType,
            FunctionContextContainer functionContextContainer)
        {
            WebPageBase webPage = null;
            try
            {
                webPage = WebPageBase.CreateInstanceFromVirtualPath(virtualPath);

                return ExecuteRazorPage(webPage, setParameters, resultType, functionContextContainer);
            }
            finally
            {
                if (webPage is IDisposable)
                {
                    (webPage as IDisposable).Dispose();
                }
            }
        }

        /// <summary>
        /// Executes the razor page.
        /// </summary>
        /// <param name="webPage">The web page.</param>
        /// <param name="setParameters">Delegate to set the parameters.</param>
        /// <param name="resultType">The type of the result.</param>
        /// <param name="functionContextContainer">The function context container</param>
        /// <returns></returns>
        public static object ExecuteRazorPage(
            WebPageBase webPage,
            Action<WebPageBase> setParameters, 
            Type resultType, 
            FunctionContextContainer functionContextContainer) 
        {
            var startPage = StartPage.GetStartPage(webPage, "_PageStart", new[] {"cshtml"});

            HttpContextBase httpContext;

            HttpContext currentContext = HttpContext.Current;
            HttpContext replacementContext = null;
            if (currentContext == null)
            {
                httpContext = NoHttpRazorContext.GetDotNetSpecificVersion();
            }
            else
            {
                httpContext = new CustomHttpContextWrapper(currentContext);
                replacementContext = BuildContextWithReplacedItems(currentContext, httpContext);
            }

            var pageContext = new WebPageContext(httpContext, webPage, startPage);
            if (functionContextContainer != null)
            {
                pageContext.PageData.Add(PageContext_FunctionContextContainer, functionContextContainer);
            }

            if (setParameters != null)
            {
                setParameters(webPage);
            }

            var sb = new StringBuilder();
            using (var writer = new StringWriter(sb))
            {
                try
                {
                    if (replacementContext != null)
                    {
                        HttpContext.Current = replacementContext;
                    }
                    
                    webPage.ExecutePageHierarchy(pageContext, writer);
                }
                finally
                {
                    if (replacementContext != null)
                    {
                        HttpContext.Current = currentContext;
                    }
                }
            }

            string output = sb.ToString();
            

			if (resultType == typeof(XhtmlDocument))
			{
			    if (string.IsNullOrWhiteSpace(output)) return new XhtmlDocument();

				try
                {
                    return OutputToXhtmlDocument(output);
				}
				catch (XmlException ex)
				{
				    string[] codeLines = output.Split(new [] { Environment.NewLine, "\n" }, StringSplitOptions.None);

				    XhtmlErrorFormatter.EmbedSouceCodeInformation(ex, codeLines, ex.LineNumber);

				    throw;
				}
			}

			return ValueTypeConverter.Convert(output, resultType);
        }


        private static HttpContext BuildContextWithReplacedItems(HttpContext currentContext, HttpContextBase newContext)
        {
            var result = new HttpContext(currentContext.Request, currentContext.Response);
            result.ApplicationInstance = currentContext.ApplicationInstance;
            result.Handler = currentContext.Handler;
            result.SkipAuthorization = currentContext.SkipAuthorization;
            result.User = currentContext.User;

            HttpContext_items.SetValue(result, newContext.Items);

            return result;
        }

        private static XhtmlDocument OutputToXhtmlDocument(string output)
        {
            var nodes = new List<XNode>();

            using (var stringReader = new StringReader(output))
            {
                var xmlReaderSettings = new XmlReaderSettings
                {
                    IgnoreWhitespace = true,
                    DtdProcessing = DtdProcessing.Parse,
                    MaxCharactersFromEntities = 10000000,
                    XmlResolver = null,
                    ConformanceLevel = ConformanceLevel.Fragment // Allows multipe XNode-s
                };

                using (var xmlReader = XmlReader.Create(stringReader, xmlReaderSettings))
                {
                    xmlReader.MoveToContent();

                    while (!xmlReader.EOF)
                    {
                        XNode node = XNode.ReadFrom(xmlReader);
                        nodes.Add(node);
                    }
                }
            }

            if (nodes.Count == 1 && nodes[0] is XElement && (nodes[0] as XElement).Name.LocalName == "html")
            {
                return new XhtmlDocument(nodes[0] as XElement);
            }

            var document = new XhtmlDocument();
            document.Body.Add(nodes);

            return document;
        }

        /// <summary>
        /// Executes the razor page.
        /// </summary>
        /// <typeparam name="ResultType">The result type.</typeparam>
        /// <param name="virtualPath">The virtual path.</param>
        /// <param name="setParameters">Delegate to set the parameters.</param>
        /// <param name="functionContextContainer">The function context container.</param>
        /// <returns></returns>
        public static ResultType ExecuteRazorPage<ResultType>(
            string virtualPath, 
            Action<WebPageBase> setParameters, 
            FunctionContextContainer functionContextContainer = null) where ResultType: class
        {
            return (ResultType) ExecuteRazorPage(virtualPath, setParameters, typeof(ResultType), functionContextContainer);
        }
    }

    
}
