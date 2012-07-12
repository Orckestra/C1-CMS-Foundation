using System.Web.Routing;
using Composite.Core.Routing.Pages;
using Composite.Core.WebClient;

namespace Composite.Core.Routing
{
    internal static class Routes
    {
        public static void Register()
        {
            var routes = RouteTable.Routes;
            var c1pageRoute = new C1PageRoute();

            if (routes.Count > 2)
            {
                // The default routes are
                // 1. Composite/{*pathInfo}
                // 2. {resource}.axd/{*pathInfo}
                // Inserting to the third position, so it is executed before MVC route
                
                routes.Insert(2, c1pageRoute);
            }
            else
            {
                routes.Ignore("Composite/{*pathInfo}");
                routes.Ignore("{resource}.axd/{*pathInfo}");
                routes.Add("c1 page route", c1pageRoute);
            }

            // Ignoring routes that shouldn't be caught by 404 handler
            routes.Ignore("Renderers/{*pathInfo}");
            routes.Ignore("{*all_css_aspx}", new { all_css_aspx = @".*\.css.aspx(/.*)?" });
            routes.Ignore("{*all_js_aspx}", new { all_js_aspx = @".*\.js.aspx(/.*)?" });

            routes.Ignore(RelativeRoute("sitemap.xml"));
            routes.Ignore(RelativeRoute("{language}/sitemap.xml"));
            routes.Ignore(RelativeRoute("{language}/{urlTitle}/sitemap.xml"));

            // Adding 404 handler as the last one
            routes.Add("c1 404 route", new PageNotFoundRoute());
        }

        private static string RelativeRoute(string route)
        {
            var rootPath = UrlUtils.PublicRootPath;
            if (rootPath == string.Empty) return route;

            return rootPath.Substring(1) + '/' + route;
        }
    }
}
