using System.Web.Routing;
using Composite.Core.Routing.Pages;

namespace Composite.Core.Routing
{
    internal static class Routes
    {
        public static void Register()
        {
            // Inserting to the first position, so it is executed before MVC route
            RouteTable.Routes.Insert(0, new C1PageRoute());
        }
    }
}
