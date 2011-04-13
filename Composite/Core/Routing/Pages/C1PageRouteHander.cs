using System.Web;
using System.Web.Routing;
using System.Web.UI;

namespace Composite.Core.Routing.Pages
{
    internal class C1PageRouteHandler : IRouteHandler
    {
        public IHttpHandler GetHttpHandler(RequestContext requestContext)
        {
            return System.Web.Compilation.BuildManager.CreateInstanceFromVirtualPath("~/Renderers/Page.aspx", typeof(Page)) as Page;
        }
    }
}
