using System;
using System.IO;
using System.Text;
using System.Threading;
using System.Web;
using System.Web.WebPages;
using System.Xml;
using System.Xml.Linq;
using Composite.Core.Types;
using Composite.Core.Xml;

namespace Composite.AspNet.Razor
{
    /// <summary>
    /// Exposes method to execute razor pages.
    /// </summary>
    public static class RazorHelper
    {
        private static readonly string ExecutionLock_ItemsKey = "__razor_execute_lock__";
        private static readonly object _lock = new object();

        /// <summary>
        /// Executes the razor page.
        /// </summary>
        /// <param name="virtualPath">The virtual path.</param>
        /// <param name="setParameters">Delegate to set the parameters.</param>
        /// <param name="resultType">The type of the result.</param>
        /// <returns></returns>
        public static object ExecuteRazorPage(string virtualPath, Action<WebPageBase> setParameters, Type resultType) 
        {
   			HttpContextBase httpContext;
			object requestLock = null;

            var webPage = WebPageBase.CreateInstanceFromVirtualPath(virtualPath);
			var startPage = StartPage.GetStartPage(webPage, "_PageStart", new[] { "cshtml" });

			if (HttpContext.Current == null)
			{
				httpContext = new NoHttpRazorContext();
			}
			else
			{
				var currentContext = HttpContext.Current;

				httpContext = new HttpContextWrapper(currentContext);

                requestLock = currentContext.Items[ExecutionLock_ItemsKey];

                if (requestLock == null)
                {
                    lock (_lock)
                    {
                        requestLock = currentContext.Items[ExecutionLock_ItemsKey];

                        if (requestLock == null)
                        {
                            requestLock = new object();
                            lock (currentContext.Items.SyncRoot)
                            {
                                currentContext.Items[ExecutionLock_ItemsKey] = requestLock;
                            }
                        }
                    }
                }
			}

			var pageContext = new WebPageContext(httpContext, webPage, startPage);

            if(setParameters != null)
            {
                setParameters(webPage);
            }

			var sb = new StringBuilder();
			using (var writer = new StringWriter(sb))
			{
				bool lockTaken = false;
				try
				{
					if (requestLock != null)
					{
						Monitor.TryEnter(requestLock, ref lockTaken);
					}

					webPage.ExecutePageHierarchy(pageContext, writer);
				}
				finally
				{
					if (lockTaken)
					{
						Monitor.Exit(requestLock);
					}
				}
			}

			string output = sb.ToString().Trim();

			if (resultType == typeof(XhtmlDocument))
			{
				try
				{
                    var xElement = XElement.Parse(output);

                    if (xElement.Name.LocalName == "html") return new XhtmlDocument(xElement);

                    var document = new XhtmlDocument();
                    document.Body.Add(xElement);

                    return document;

				}
				catch (ArgumentException)
				{
                    return GetXhtmlDocument(output);
				}
				catch (InvalidOperationException)
				{
                    return GetXhtmlDocument(output);
				}
				catch (XmlException)
				{
                    return GetXhtmlDocument(output);
				}
			}

			return ValueTypeConverter.Convert(output, resultType);
        }

        /// <summary>
        /// Executes the razor page.
        /// </summary>
        /// <typeparam name="ResultType">The result type.</typeparam>
        /// <param name="virtualPath">The virtual path.</param>
        /// <param name="setParameters">Delegate to set the parameters.</param>
        /// <returns></returns>
        public static ResultType ExecuteRazorPage<ResultType>(string virtualPath, Action<WebPageBase> setParameters) 
            where ResultType: class
        {
            return (ResultType) ExecuteRazorPage(virtualPath, setParameters, typeof(ResultType));
        }

        private static XhtmlDocument GetXhtmlDocument(string content)
        {
            var s = "<html xmlns=\"http://www.w3.org/1999/xhtml\" xmlns:f=\"http://www.composite.net/ns/function/1.0\" xmlns:lang=\"http://www.composite.net/ns/localization/1.0\">" +
                    "<head />" +
                    "<body>" + HttpUtility.HtmlEncode(content) + "</body>" +
                    "</html>";

            return XhtmlDocument.Parse(s);
        }
    }
}
