using System.Web;
using System.Web.Routing;

namespace Composite.Core.WebClient.Services.WampRouter
{
    /// <summary>
    /// A wrapper around a <see cref="RouteBase"/>, that prevent inner route's influence on MVC links resolution.
    /// </summary>
    internal class WampRouteWrapper : RouteBase
    {
        private readonly RouteBase _innerRoute;

        public WampRouteWrapper(RouteBase innerRoute)
        {
            _innerRoute = innerRoute;
        }

        public override RouteData GetRouteData(HttpContextBase context) => _innerRoute.GetRouteData(context);

        public override VirtualPathData GetVirtualPath(RequestContext r, RouteValueDictionary v) => null;
    }
}
