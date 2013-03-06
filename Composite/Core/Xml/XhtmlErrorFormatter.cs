using System;
using System.Text;
using System.Xml.Linq;

namespace Composite.Core.Xml
{
    /// <summary>
    /// Provide html formatting for errors
    /// </summary>
    internal static class XhtmlErrorFormatter
    {
        /// <summary>
        /// Create a XhtmlDocument documenting an exception. If the page being rendered is requested by an authenticated C1 Console user the 
        /// exception information is more verbose.
        /// </summary>
        /// <param name="ex"></param>
        /// <param name="functionName"></param>
        /// <returns></returns>
        internal static XhtmlDocument GetErrorDescriptionXhtmlDocument(Exception ex, string functionName)
        {
            XhtmlDocument errorInfoDocument = new XhtmlDocument();
            errorInfoDocument.Body.Add(GetErrorDescriptionHtmlElement(ex, functionName));
            return errorInfoDocument;
        }

        /// <summary>
        /// Create a html element documenting an exception. If the page being rendered is requested by an authenticated C1 Console user the 
        /// exception information is more verbose.
        /// </summary>
        /// <param name="ex"></param>
        /// <param name="functionName"></param>
        /// <returns></returns>
        internal static XElement GetErrorDescriptionHtmlElement(Exception ex, string functionName)
        {
            if (Composite.C1Console.Security.UserValidationFacade.IsLoggedIn() == true)
            {
                Exception innermostException = ex;

                while (innermostException.InnerException !=null)
                {
                    innermostException = innermostException.InnerException;
                }

                XElement sourceInfo = functionName == null ? null : new XElement(Namespaces.Xhtml + "div", "C1 Function: " + functionName);

                XElement codeInfo = !ex.Data.Contains("errorSource") ? null : new XElement(Namespaces.Xhtml + "pre", ex.Data["errorSource"]);

                return new XElement(Namespaces.Xhtml + "div",
                    new XAttribute("class", "c1errordetails"),
                    new XAttribute("style", "border: 2px solid red; padding: 2px 6px 2px 6px; background-color: InfoBackground; color: InfoText; -moz-border-radius: 4px; -moz-box-shadow: 1px 1px 3px 0 rgba(0,0,0,0.75);"),
                    new XElement(Namespaces.Xhtml + "strong", string.Format("Error: {0}",innermostException.Message)),
                    codeInfo,
                    sourceInfo,
                    new XElement(Namespaces.Xhtml + "div",
                        new XAttribute("style", "font-size: 0.7em"),
                        "Error details:",
                        GetNestedHtmlListFromExceptions(ex)));
            }

            return new XElement(Namespaces.Xhtml + "span",
                new XAttribute("class", "c1error"),
                "[ Error ]");
        }

        private static XElement GetNestedHtmlListFromExceptions(Exception ex)
        {
            if (ex == null) return null;		 

            return new XElement(Namespaces.Xhtml + "div",
                new XAttribute("style", "padding-left: 10px;"),
                new XAttribute("title", ex.StackTrace),
                ex.Message,
                GetNestedHtmlListFromExceptions(ex.InnerException)
                );
        }
    }
}
