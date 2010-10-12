using System;
using System.IO;
using System.Web;
using Composite.Core.Extensions;
using Composite.Core.Logging;

namespace Composite.Core.WebClient.Presentation
{
    class LessRequestHandler : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            context.Response.Cache.SetExpires(DateTime.Now.AddMonths(1));
            context.Response.Cache.SetCacheability(HttpCacheability.Private);

            string webPath = context.Request.Path;
            string lessPath = webPath.Substring(0, webPath.LastIndexOf(".aspx"));
            string filePath = context.Server.MapPath(lessPath);

            context.Response.ContentType = "text/javascript";

            if (File.Exists(filePath) == false)
            {
                LoggingService.LogWarning("LessRequestHandler", "File {0} not found".FormatWith(filePath));

                context.Response.Cache.SetCacheability(HttpCacheability.NoCache);
                context.Response.StatusCode = 404;
                context.ApplicationInstance.CompleteRequest();
            }
            else 
            {
                context.Response.WriteFile(filePath);
            }            
        }

        public bool IsReusable
        {
            get { return false; }
        }
    }
}