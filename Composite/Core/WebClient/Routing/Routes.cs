using System.Web.Routing;

namespace Composite.Core.WebClient.Routing
{
    internal static class Routes
    {
        public static void Register()
        {
            RouteTable.Routes.Add(new C1PageRoute());
        }
    }
}
