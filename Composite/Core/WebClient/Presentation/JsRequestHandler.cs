using System;
using System.IO;
using System.Web;
using System.Text;
using Composite.Core.Extensions;
using Composite.Core.Logging;

namespace Composite.Core.WebClient.Presentation
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
            	// bespin folder here!!!
            	if ( jsPath.Contains ( "build" )) 
            	{
            		var sb = new StringBuilder();
                	string[] lines = File.ReadAllLines(filePath);
                	foreach (string line in lines)
	                {
	                 	string result = line.Replace ( ".js", ".js.aspx" );
	                    result = result.Replace ( ".less", ".less.aspx" );
	                    if (result != null)
	                    {
	                        sb.Append(result).Append("\n");
	                    }
	                }
                    context.Response.Write ( sb.ToString());
            	} else {
	                context.Response.WriteFile(filePath);
	            }
            }            
        }

        public bool IsReusable
        {
            get { return false; }
        }
    }
}
