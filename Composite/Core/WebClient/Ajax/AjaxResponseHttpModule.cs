using System;
using System.Web;
using System.Web.UI;
using System.Web.WebPages;

namespace Composite.Core.WebClient.Ajax
{
    internal class AjaxResponseHttpModule : IHttpModule
	{
        public void Init(HttpApplication context)
        {
            context.PostMapRequestHandler += AttachFilter;
        }

        private static void AttachFilter(object sender, EventArgs e)
	    {
            var httpContext = HttpContext.Current;

            if (httpContext.Handler != null 
                && (httpContext.Handler is Page || httpContext.Handler is WebPageHttpHandler)
                && httpContext.Request.RequestType == "GET")
            {
                var response = httpContext.Response;
                response.Filter = new AjaxStream(response.Filter);
            }
	    }

	    public void Dispose()
        {
        }
    }
}
