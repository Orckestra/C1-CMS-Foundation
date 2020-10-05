using System.Web;
using System.Web.Routing;

namespace Composite.Core.Routing.Pages
{
    /// <summary>
    /// A route handler that performs an HTTP redirect with response code 301 (Permanently moved).
    /// </summary>
    public class SeoFriendlyRedirectRouteHandler: IRouteHandler
    {
        private readonly string _redirectUrl;

        /// <summary>
        /// Creates a new instance of <see cref="SeoFriendlyRedirectRouteHandler"/>
        /// </summary>
        /// <param name="redirectUrl">The URL to redirect to.</param>
        public SeoFriendlyRedirectRouteHandler(string redirectUrl)
        {
            _redirectUrl = redirectUrl;
        }

        /// <inheritdoc />
        public IHttpHandler GetHttpHandler(RequestContext requestContext)
        {
            return new SeoFriendlyRedirectHttpHandler(_redirectUrl);
        }
    }
}
