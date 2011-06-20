using System;
using System.Linq;
using System.Web;
using System.Web.Compilation;
using System.Web.Configuration;
using System.Web.Routing;
using System.Web.UI;

namespace Composite.Core.Routing.Pages
{
    internal class C1PageRouteHandler : IRouteHandler
    {
        private static readonly Type _handlerType;

        static C1PageRouteHandler()
        {
            string sectionName = HttpRuntime.UsingIntegratedPipeline ? "system.webServer/handlers" : "system.web/httpHandlers";
            var section = (HttpHandlersSection)WebConfigurationManager.GetWebApplicationSection(sectionName);

            if(section != null)
            {
                var item = section.Handlers.Cast<HttpHandlerAction>().SingleOrDefault(a => String.Equals(a.Path, "Renderers/Page.aspx", StringComparison.OrdinalIgnoreCase));
                if (item != null)
                {
                    _handlerType = Type.GetType(item.Type);
                }
            }
        }


        public IHttpHandler GetHttpHandler(RequestContext requestContext)
        {
            if (_handlerType != null)
            {
                return (IHttpHandler)Activator.CreateInstance(_handlerType);
            }
            
            return (IHttpHandler)BuildManager.CreateInstanceFromVirtualPath("~/Renderers/Page.aspx", typeof(Page));
        }
    }
}
