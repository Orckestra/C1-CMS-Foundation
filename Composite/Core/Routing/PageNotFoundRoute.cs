using System;
using System.Web;
using System.Web.Routing;
using Composite.Core.WebClient;

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

            // Skipping root request
            if(httpContext.Request.RawUrl.Length == UrlUtils.PublicRootPath.Length + 1)
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
            if (!HostnameBindingsFacade.ServeCustomPageNotFoundPage(httpContext))
            {
                throw new InvalidOperationException("Failed to redirect to 'page not found' url");
            }

            return EmptyHttpHandler.Instance;
        }

        private class EmptyHttpHandler : IHttpHandler
        {
            private EmptyHttpHandler()
            {
            }

            static EmptyHttpHandler()
            {
                Instance = new EmptyHttpHandler();
            }

            public static EmptyHttpHandler Instance { get; private set; }
            

            public bool IsReusable
            {
                get { return true; }
            }

            public void ProcessRequest(HttpContext context)
            {
                throw new InvalidOperationException("This code should not be reachable");
            }
        }
    }
}
