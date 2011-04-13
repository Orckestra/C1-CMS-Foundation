using System.Web.Routing;
using Composite.Core.Routing.Pages;

namespace Composite.Core.Routing
{
    internal static class Routes
    {
        public static void Register()
        {
            RouteTable.Routes.Add(new C1PageRoute());
        }
    }
}
