using System;
using System.IO;
using System.Text;
using System.Web;
//using System.Web.Instrumentation;
using System.Web.WebPages;
using System.Xml;
//using Composite.Core.Extensions;
//using Composite.Core.IO;
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
                var currentContext = HttpContext.Current;
                if (currentContext != null)
                {
                    var directory = Path.GetDirectoryName(virtualPath);
                    var function = Path.GetFileNameWithoutExtension(virtualPath);

                    virtualPath = DisplayModesFileResolver.ResolveFileInInDirectory(directory, function, ".cshtml", new HttpContextWrapper(currentContext));
                }

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
            HttpContext currentContext = HttpContext.Current;

            var startPage = StartPage.GetStartPage(webPage, "_PageStart", new[] { "cshtml" });
            
            // IEnumerable<PageExecutionListener> pageExecutionListeners;
            HttpContextBase httpContext;

            if (currentContext == null)
            {
                httpContext = new NoHttpRazorContext();
                // pageExecutionListeners = new PageExecutionListener[0];
            }
            else
            {
                httpContext = new HttpContextWrapper(currentContext);
                // pageExecutionListeners = httpContext.PageInstrumentation.ExecutionListeners;
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
                //// PageExecutionContext enables "Browser Link" support
                //var pageExecutionContext = new PageExecutionContext
                //{
                //    TextWriter = writer,
                //    VirtualPath = PathUtil.Resolve(webPage.VirtualPath),
                //    StartPosition = 0,
                //    IsLiteral = true
                //};

                //pageExecutionListeners.ForEach(l => l.BeginContext(pageExecutionContext));

                webPage.ExecutePageHierarchy(pageContext, writer);

                //pageExecutionListeners.ForEach(l => l.EndContext(pageExecutionContext));
            }

            string output = sb.ToString();
            

			if (resultType == typeof(XhtmlDocument))
			{
			    if (string.IsNullOrWhiteSpace(output)) return new XhtmlDocument();

				try
                {
                    return XhtmlDocument.ParseXhtmlFragment(output);
				}
				catch (XmlException ex)
				{
				    string[] codeLines = output.Split(new [] { Environment.NewLine, "\n" }, StringSplitOptions.None);

				    XhtmlErrorFormatter.EmbedSourceCodeInformation(ex, codeLines, ex.LineNumber);

				    throw;
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
