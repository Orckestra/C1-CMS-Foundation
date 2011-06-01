using System;
using System.Web;
using System.Web.Routing;
using Composite.Core.WebClient;
using Composite.Data.Types;
using Composite.Core.Extensions;

namespace Composite.Core.Routing
{
    internal class PageNotFoundRouteHandler: IRouteHandler
    {
        public IHttpHandler GetHttpHandler(RequestContext requestContext)
        {
            var httpContext = HttpContext.Current;
            string rawUrl = httpContext.Request.RawUrl;

            string customPageNotFoundUrl = HostnameBindingsFacade.GetCustomPageNotFoundUrl();

            if (string.IsNullOrEmpty(customPageNotFoundUrl))
            {
                string redirectUrl = UrlUtils.RenderersRootPath  
                                     + "/FileNotFoundHandler.ashx?aspxerrorpath="
                                     + HttpUtility.UrlEncode(rawUrl);

                httpContext.Response.Redirect(redirectUrl, true);

                throw new InvalidOperationException("This line shouldn't be reachable");
            }

            if (rawUrl == customPageNotFoundUrl)
            {
                throw new HttpException(404, "'Page not found' wasn't handled. Url: '{0}'".FormatWith(rawUrl));
            }

            httpContext.Response.Redirect(customPageNotFoundUrl, true);

            throw new InvalidOperationException("This line shouldn't be reachable");
        }
    }
}
