using System;
using System.Text;
using System.Web;
using Composite.Core.Extensions;
using Composite.Core.Logging;
using Composite.C1Console.Events;


namespace Composite.Core.WebClient
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class ErrorServices
    {
        /// <exclude />
        public static void DocumentAdministrativeError(Exception exception)
        {

            StringBuilder consoleMsg = new StringBuilder();
            consoleMsg.AppendLine(exception.GetBaseException().ToString());

            Log.LogCritical("Web Application Error, Exception", exception);

            var httpContext = HttpContext.Current;
            if (httpContext != null && httpContext.Request != null && httpContext.Request.Url != null)
            {
                consoleMsg.AppendLine();
                consoleMsg.AppendLine("URL:     " + HttpContext.Current.Request.Url);
                if (HttpContext.Current.Request.UrlReferrer != null)
                {
                    consoleMsg.AppendLine("Referer: " + httpContext.Request.UrlReferrer.AbsolutePath);
                }
            }

            string consoleId = ConsoleInfo.TryGetConsoleId();
            if (consoleId != null)
            {
                ConsoleMessageQueueFacade.Enqueue(new LogEntryMessageQueueItem { Level = LogLevel.Error, Message = consoleMsg.ToString(), Sender = typeof(ErrorServices) }, consoleId);
            }
        }



        /// <exclude />
        public static void RedirectUserToErrorPage(string uiContainerName, Exception exception)
        {
            if (HttpContext.Current == null)
                return;

            string redirectUrl;

            switch (uiContainerName)
            {
                case "Document":
                    redirectUrl = UrlUtils.ResolveAdminUrl("content/misc/errors/error.aspx") + "?" + ConvertExceptionToQueryString(exception);
                    break;

                case null:
                case "Wizard":
                case "DataDialog":
                case "ConfirmDialog":
                    redirectUrl = UrlUtils.ResolveAdminUrl("content/misc/errors/error_dialog.aspx") + "?" + ConvertExceptionToQueryString(exception);
                    break;

                default:
                    Log.LogWarning("ErrorServices", string.Format("Unhandled redirect! Unknown container: '{0}", uiContainerName));
                    throw new NotImplementedException(string.Format("Unknown container: '{0}'", uiContainerName));
            }

            HttpContext.Current.Response.Redirect(redirectUrl, true);
        }

        private static string ConvertExceptionToQueryString(Exception exception)
        {
            var sbResult = new StringBuilder();

            int exceptionIndex = 0;

            while (exception != null)
            {
                if(sbResult.Length > 0)
                {
                    sbResult.Append("&");
                }

                string encodedExceptionType = HttpUtility.UrlEncode(exception.GetType().Name);
                string encodedExceptionMessage = HttpUtility.UrlEncode(exception.Message);
                string encodedExceptionStackTrace = HttpUtility.UrlEncode(exception.StackTrace);
                if (encodedExceptionStackTrace.Length > 1000) encodedExceptionStackTrace = encodedExceptionStackTrace.Substring(0, 1000);

                string indexStr = exceptionIndex == 0 ? string.Empty : exceptionIndex.ToString();

                sbResult.Append("type{0}=".FormatWith(indexStr) + encodedExceptionType);
                sbResult.Append("&msg{0}=".FormatWith(indexStr) + encodedExceptionMessage);
                sbResult.Append("&stack{0}=".FormatWith(indexStr) + encodedExceptionStackTrace);

                exceptionIndex++;
                exception = exception.InnerException;
            }

            return sbResult.ToString();
        }
    }
}
