using System.Web.Routing;
using Composite.Core.Routing.Pages;

namespace Composite.Core.Routing
{
    internal static class Routes
    {
        public static void Register()
        {
            var c1pageRoute = new C1PageRoute();

            if(RouteTable.Routes.Count > 2)
            {
                // The default routes are
                // 1. Composite/{*pathInfo}
                // 2. {resource}.axd/{*pathInfo}
                // Inserting to the third position, so it is executed before MVC route

                RouteTable.Routes.Insert(2, c1pageRoute);
            }
            else
            {
                RouteTable.Routes.Add("c1 page route", c1pageRoute);
            }
        }
    }
}
