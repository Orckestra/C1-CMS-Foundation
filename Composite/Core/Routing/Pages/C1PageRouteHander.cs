using System;
using System.Linq;
using System.Web;
using System.Web.Compilation;
using System.Web.Configuration;
using System.Web.Routing;
using System.Web.UI;
using System.Xml.Linq;

namespace Composite.Core.Routing.Pages
{
    internal class C1PageRouteHandler : IRouteHandler
    {
        private static readonly Type _handlerType;

        static C1PageRouteHandler()
        {
            bool isIntegratedPipeline = HttpRuntime.UsingIntegratedPipeline;
            string sectionName = isIntegratedPipeline ? "system.webServer" : "system.web";

            var config = WebConfigurationManager.OpenWebConfiguration("/").GetSection(sectionName);
            if (config != null)
            {
                string handlersSectionName = isIntegratedPipeline ? "handlers" : "httpHandlers";

                var handlers = XElement.Parse(config.SectionInformation.GetRawXml()).Element(handlersSectionName);
                var handler = handlers.Elements("add").SingleOrDefault(e => e.Attribute("path").Value.Equals("Renderers/Page.aspx", StringComparison.OrdinalIgnoreCase));

                if (handler != null)
                {
                    _handlerType = Type.GetType(handler.Attribute("type").Value);
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
