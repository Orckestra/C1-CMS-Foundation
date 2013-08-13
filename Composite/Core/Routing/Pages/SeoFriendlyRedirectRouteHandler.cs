using System.Web;
using System.Web.Routing;

namespace Composite.Core.Routing.Pages
{
    internal class SeoFriendlyRedirectRouteHandler: IRouteHandler
    {
        private readonly string _redirectUrl;

        public SeoFriendlyRedirectRouteHandler(string redirectUrl)
        {
            _redirectUrl = redirectUrl;
        }

        public IHttpHandler GetHttpHandler(RequestContext requestContext)
        {
            return new SeoFriendlyRedirectHttpHandler(_redirectUrl);
        }
    }
}
