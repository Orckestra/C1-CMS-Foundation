using System;
using System.Web.Routing;
using Composite.Core.Routing.Pages;
using Composite.Core.WebClient;

namespace Composite.Core.Routing
{
    /// <summary>
    /// Allows adding custom routes with a priority in relation to defined by CompositeC1 routes.
    /// </summary>
    public static class Routes
    {
        /// <exclude />
        [Obsolete("Use RegisterPageRoute() and Register404Route() instead", true)]
        public static void Register()
        {
            var routes = RouteTable.Routes;

            RegisterPageRoute(routes);
            Register404Route(routes);
        }

        /// <summary>
        /// Registers C1's page route.
        /// </summary>
        public static void RegisterPageRoute(RouteCollection routes)
        {
            routes.Ignore("Composite/{*pathInfo}");
            routes.Ignore("{resource}.axd/{*pathInfo}");

            AddFunctionBoxRoute(routes);
            AddSiteMapRoutes(routes);

            if (OnBeforePageRouteAdded != null)
            {
                OnBeforePageRouteAdded(routes);
            }

            routes.Add("c1 page route", new C1PageRoute());

            if (OnAfterPageRouteAdded != null)
            {
                OnAfterPageRouteAdded(routes);
            }
        }

        /// <summary>
        /// Registers C1's 404 route that catches all requests. 
        /// This method should be called only after all other routes are registered.
        /// </summary>
        public static void Register404Route(RouteCollection routes)
        {
            // Ignoring routes that shouldn't be caught by 404 handler
            routes.Ignore("Renderers/{*pathInfo}");
            routes.Ignore("{*all_css_aspx}", new { all_css_aspx = @".*\.css.aspx(/.*)?" });

            routes.Add("c1 404 route", new PageNotFoundRoute());
        }

        private static void AddSiteMapRoutes(RouteCollection routes)
        {
            routes.Ignore("sitemap.xml");
            routes.Ignore("{language}/sitemap.xml");
            routes.Ignore("{language}/{urlTitle}/sitemap.xml");
        }

        private static void AddFunctionBoxRoute(RouteCollection routes)
        {
            routes.Add("c1 function image", new FunctionBoxRoute());
            routes.Add("c1 template preview", new TemplatePreviewRoute());
        }

        /// <summary>
        /// Occurs before C1 page route is added.
        /// </summary>
        public static event RouteRegistration OnBeforePageRouteAdded;

        /// <summary>
        /// Occurs after C1 page route is added.
        /// </summary>
        public static event RouteRegistration OnAfterPageRouteAdded;

        /// <summary>
        /// Handles route registration
        /// </summary>
        /// <param name="routeCollection">The route collection.</param>
        public delegate void RouteRegistration(RouteCollection routeCollection);
    }
}
