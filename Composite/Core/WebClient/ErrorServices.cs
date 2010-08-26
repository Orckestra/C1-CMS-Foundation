using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using Composite.Core.Logging;
using Composite.C1Console.Events;


namespace Composite.Core.WebClient
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class ErrorServices
    {
        public static void DocumentAdministrativeError(Exception exception)
        {

            StringBuilder consoleMsg = new StringBuilder();
            consoleMsg.AppendLine(exception.ToString());

            LoggingService.LogCritical("Web Application Error, Exception", exception);

            if (HttpContext.Current != null && HttpContext.Current.Request != null && HttpContext.Current.Request.Url != null)
            {
                consoleMsg.AppendLine();
                consoleMsg.AppendLine("URL:     " + HttpContext.Current.Request.Url.ToString());
                if (HttpContext.Current.Request.UrlReferrer != null)
                {
                    consoleMsg.AppendLine("Referer: " + HttpContext.Current.Request.UrlReferrer.AbsolutePath.ToString());
                }
            }

            string consoleId = ConsoleInfo.TryGetConsoleId();
            if (consoleId != null)
            {
                ConsoleMessageQueueFacade.Enqueue(new LogEntryMessageQueueItem { Level = LogLevel.Error, Message = consoleMsg.ToString(), Sender = typeof(ErrorServices) }, consoleId);
            }
        }



        public static void RedirectUserToErrorPage(string uiContainerName, Exception exception)
        {
            if (HttpContext.Current == null)
                return;

            string redirectUrl = null;

            switch (uiContainerName)
            {
                case "Document":
                    {
                        string encodedExceptionType = HttpUtility.UrlEncode(exception.GetType().Name);
                        string encodedExceptionMessage = HttpUtility.UrlEncode(exception.Message);
                        string encodedExceptionStackTrace = HttpUtility.UrlEncode(exception.StackTrace);
                        if (encodedExceptionStackTrace.Length > 1000) encodedExceptionStackTrace = encodedExceptionStackTrace.Substring(0, 1000);
                        redirectUrl = string.Format("{0}?type={1}&msg={2}&stack={3}", UrlUtils.ResolveAdminUrl("content/misc/errors/error.aspx"), encodedExceptionType, encodedExceptionMessage, encodedExceptionStackTrace);
                    }
                    break;
                case null:
                case "Wizard":
                case "DataDialog":
                case "ConfirmDialog":
                    {
                        string encodedExceptionType = HttpUtility.UrlEncode(exception.GetType().Name);
                        string encodedExceptionMessage = HttpUtility.UrlEncode(exception.Message);
                        string encodedExceptionStackTrace = HttpUtility.UrlEncode(exception.StackTrace);
                        if (encodedExceptionStackTrace.Length > 1000) encodedExceptionStackTrace = encodedExceptionStackTrace.Substring(0, 1000);
                        redirectUrl = string.Format("{0}?type={1}&msg={2}&stack={3}", UrlUtils.ResolveAdminUrl("content/misc/errors/error_dialog.aspx"), encodedExceptionType, encodedExceptionMessage, encodedExceptionStackTrace);
                    }
                    break;
                default:
                    LoggingService.LogWarning("ErrorServices", string.Format("Unhandled redirect! Unknown container: '{0}", uiContainerName));
                    throw new NotImplementedException(string.Format("Unknown container: '{0}'", uiContainerName));
            }

            if (redirectUrl != null)
            {
                HttpContext.Current.Response.Redirect(redirectUrl, true);
            }
        }
    }
}
