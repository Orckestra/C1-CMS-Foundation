using System;
using System.Web;
using System.Web.Routing;
using Composite.Core.Extensions;

namespace Composite.Core.Routing
{
    internal class PageNotFoundRoute : Route
    {
        public PageNotFoundRoute()
            : base("{*url}", new PageNotFoundRouteHandler())
        {
        }

        public override RouteData GetRouteData(HttpContextBase httpContext)
        {
            // Skipping the route is there's no associated "Page not found" url
            if(string.IsNullOrEmpty(HostnameBindingsFacade.GetCustomPageNotFoundUrl()))
            {
                return null;
            }

            return base.GetRouteData(httpContext);
        }
    }

    internal class PageNotFoundRouteHandler: IRouteHandler
    {
        public IHttpHandler GetHttpHandler(RequestContext requestContext)
        {
            var httpContext = HttpContext.Current;
            string rawUrl = httpContext.Request.RawUrl;

            string customPageNotFoundUrl = HostnameBindingsFacade.GetCustomPageNotFoundUrl();

            if (rawUrl == customPageNotFoundUrl)
            {
                throw new HttpException(404, "'Page not found' wasn't handled. Url: '{0}'".FormatWith(rawUrl));
            }

            httpContext.Response.Redirect(customPageNotFoundUrl, true);

            throw new InvalidOperationException("This line shouldn't be reachable");
        }
    }
}
