using System;
using System.IO;
using System.Web;
using Composite.Extensions;
using Composite.Logging;

namespace Composite.WebClient.Presentation
{
    class JsRequestHandler : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            context.Response.Cache.SetExpires(DateTime.Now.AddMonths(1));
            context.Response.Cache.SetCacheability(HttpCacheability.Private);

            string webPath  = context.Request.Path;
            string jsPath  = webPath.Substring(0, webPath.LastIndexOf(".aspx"));
            string filePath = context.Server.MapPath(jsPath);

            context.Response.ContentType = "text/javascript";

            if (File.Exists(filePath) == false)
            {
                LoggingService.LogWarning("JsRequestHandler", "File {0} not found".FormatWith(filePath));

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
