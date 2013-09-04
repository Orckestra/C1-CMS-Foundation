using System;
using System.Xml.Linq;

namespace Composite.Core.Xml
{
    /// <summary>
    /// Provide html formatting for errors
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class XhtmlErrorFormatter
    {
        private const string ErrorDivStyle = "border: 1px solid red; padding: 2px 6px 2px 6px; background-color: InfoBackground; color: InfoText; -moz-border-radius: 4px; -moz-box-shadow: 1px 1px 3px 0 rgba(0,0,0,0.75); margin-bottom: 5px;font-size: 12px; line-height: 16px;";
        private const string SourceCodeStyle = "border: 1px solid #AAAAAA; padding: 5px; background-color: #EEEEEE;font-size: 12px;";
        private const string SourceCodeErrorLineStyle = "background-color: white; color: red";
        private static readonly string ExceptionData_SourceCode = "C1.SourceCode";

        /// <summary>
        /// Embeds the souce code information.
        /// </summary>
        /// <param name="ex">The exception.</param>
        /// <param name="sourceCodeLines">The source code lines.</param>
        /// <param name="errorLine">The error line number.</param>
        public static void EmbedSouceCodeInformation(Exception ex, string[] sourceCodeLines, int errorLine)
        {
            var result = new XElement(Namespaces.Xhtml + "pre", new XAttribute("style", SourceCodeStyle));

            int firstLineIndexToShow = Math.Max(0, errorLine - 3);
            int lastLineIndexToShow = Math.Min(sourceCodeLines.Length - 1, errorLine + 1);

            for (int i = firstLineIndexToShow; i <= lastLineIndexToShow; i++)
            {
                string text = (i + 1) + ": " + sourceCodeLines[i];
                if (i == errorLine - 1)
                {
                    result.Add(new XElement(Namespaces.Xhtml + "div", new XAttribute("style", SourceCodeErrorLineStyle), text));
                }
                else
                {
                    result.Add(text + Environment.NewLine);
                }
            }
            
            ex.Data[ExceptionData_SourceCode] = result.ToString();
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
            if (!Composite.C1Console.Security.UserValidationFacade.IsLoggedIn())
            {
                return new XElement(Namespaces.Xhtml + "span",
                                    new XAttribute("class", "c1error"),
                                    "[ Error ]");
            }

            XElement functionInfo = functionName == null ? null : new XElement(Namespaces.Xhtml + "div", "Function: " + functionName);

            XElement sourceCode = GetSourceCodeInfo(ex);

            bool sourceAlreadyShown = false;

            XElement nestedExceptionInfo = ex.InnerException == null
                                               ? null
                                               : new XElement(Namespaces.Xhtml + "div",
                                                              new XAttribute("style", "font-size: 0.9em"),
                                                              GetNestedHtmlListFromExceptions(ex.InnerException,
                                                                                              ref sourceAlreadyShown));

            return new XElement(Namespaces.Xhtml + "div",
                                new XAttribute("class", "c1errordetails"),
                                new XAttribute("style", ErrorDivStyle),
                                new XElement(Namespaces.Xhtml + "strong", 
                                                new XAttribute("title", ex.StackTrace),
                                                string.Format("Error: {0}", ex.Message)),
                                !sourceAlreadyShown ? sourceCode : null,
                                functionInfo,
                                nestedExceptionInfo
                                );
        }

        private static XElement GetNestedHtmlListFromExceptions(Exception ex, ref bool sourceCodeShown)
        {
            if (ex == null)
            {
                return null;
            }

            XElement sourceCode = GetSourceCodeInfo(ex);

            XElement nestedExceptionsInfo = GetNestedHtmlListFromExceptions(ex.InnerException, ref sourceCodeShown);

            bool showSourceCode = !sourceCodeShown && sourceCode != null;

            sourceCodeShown |= showSourceCode;

            return new XElement(Namespaces.Xhtml + "div",
                new XAttribute("style", "padding-left: 10px;"),
                new XAttribute("title", ex.StackTrace ?? ""),
                ex.Message,
                showSourceCode ? sourceCode : null,
                nestedExceptionsInfo);
        }

        private static XElement GetSourceCodeInfo(Exception ex)
        {
            if (!ex.Data.Contains(ExceptionData_SourceCode)) return null;

            return XElement.Parse((string)ex.Data[ExceptionData_SourceCode]);
        }
    }
}
