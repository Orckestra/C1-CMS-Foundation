using System.Web;
using System.Web.Routing;
using System.Web.UI;

namespace Composite.Core.WebClient.Routing
{
    internal class C1PageRouteHandler : IRouteHandler
    {
        public IHttpHandler GetHttpHandler(RequestContext requestContext)
        {
            return System.Web.Compilation.BuildManager.CreateInstanceFromVirtualPath("~/Renderers/Page.aspx", typeof(Page)) as Page;
        }
    }
}
