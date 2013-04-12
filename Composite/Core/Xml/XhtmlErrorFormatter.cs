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
        private static readonly string ExceptionData_SourceCode = "C1.SourceCode";

        public static void EmbedSouceCodeInformation(Exception ex, string[] sourceCodeLines, int errorLine)
        {
            int firstLineIndexToShow = Math.Max(0, errorLine - 3);
            int lastLineIndexToShow = Math.Min(sourceCodeLines.Length - 1, errorLine + 1);

            var errorLines = new StringBuilder();

            for (int i = firstLineIndexToShow; i <= lastLineIndexToShow; i++)
            {
                errorLines.AppendLine((i + 1) + ": " + sourceCodeLines[i]);
            }

            ex.Data[ExceptionData_SourceCode] = errorLines.ToString();
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

                XElement functionInfo = functionName == null ? null : new XElement(Namespaces.Xhtml + "div", "C1 Function: " + functionName);

                XElement sourceCode = !ex.Data.Contains(ExceptionData_SourceCode) ? null : new XElement(Namespaces.Xhtml + "pre", ex.Data[ExceptionData_SourceCode]);

                return new XElement(Namespaces.Xhtml + "div",
                    new XAttribute("class", "c1errordetails"),
                    new XAttribute("style", "border: 2px solid red; padding: 2px 6px 2px 6px; background-color: InfoBackground; color: InfoText; -moz-border-radius: 4px; -moz-box-shadow: 1px 1px 3px 0 rgba(0,0,0,0.75);"),
                    new XElement(Namespaces.Xhtml + "strong", string.Format("Error: {0}",innermostException.Message)),
                    sourceCode,
                    functionInfo,

                    ex.InnerException == null 
                    ? null 
                    : new XElement(Namespaces.Xhtml + "div",
                                   new XAttribute("style", "font-size: 0.7em"),
                                   "Error details:",
                                   GetNestedHtmlListFromExceptions(ex.InnerException)));
            }

            return new XElement(Namespaces.Xhtml + "span",
                new XAttribute("class", "c1error"),
                "[ Error ]");
        }

        private static XElement GetNestedHtmlListFromExceptions(Exception ex)
        {
            if (ex == null) return null;

            XElement sourceCode = !ex.Data.Contains(ExceptionData_SourceCode) ? null : new XElement(Namespaces.Xhtml + "pre", ex.Data[ExceptionData_SourceCode]);

            return new XElement(Namespaces.Xhtml + "div",
                new XAttribute("style", "padding-left: 10px;"),
                new XAttribute("title", ex.StackTrace),
                ex.Message,
                sourceCode,
                GetNestedHtmlListFromExceptions(ex.InnerException)
                );
        }
    }
}
