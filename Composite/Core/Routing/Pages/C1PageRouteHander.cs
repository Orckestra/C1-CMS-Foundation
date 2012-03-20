using System;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Web;
using System.Web.Compilation;
using System.Web.Configuration;
using System.Web.Hosting;
using System.Web.Routing;
using System.Web.UI;
using System.Xml.Linq;
using Composite.Core.Linq;

namespace Composite.Core.Routing.Pages
{
    internal class C1PageRouteHandler : IRouteHandler
    {
        private static readonly Type _handlerType;


        [SuppressMessage("Composite.IO", "Composite.DoNotUseConfigurationClass:DoNotUseConfigurationClass")]
        static C1PageRouteHandler()
        {
            bool isIntegratedPipeline = HttpRuntime.UsingIntegratedPipeline;
            string sectionName = isIntegratedPipeline ? "system.webServer" : "system.web";

            var config = WebConfigurationManager.OpenWebConfiguration(HostingEnvironment.ApplicationVirtualPath).GetSection(sectionName);
            if (config != null)
            {
                string handlersSectionName = isIntegratedPipeline ? "handlers" : "httpHandlers";

                var handlers = XElement.Parse(config.SectionInformation.GetRawXml()).Element(handlersSectionName);
                if(handlers == null)
                {
                    return;
                }

                var handler = handlers
                    .Elements("add")
                    .Where(e => e.Attribute("path") != null
                          && e.Attribute("path").Value.Equals("Renderers/Page.aspx", StringComparison.OrdinalIgnoreCase))
                    .SingleOrDefaultOrException("Multiple handlers for 'Renderers/Page.aspx' were found'");

                if (handler != null)
                {
                    var typeAttr = handler.Attribute("type");
                    Verify.IsNotNull(typeAttr, "'type' attribute is missing");

                    _handlerType = Type.GetType(typeAttr.Value);
                    if(_handlerType == null)
                    {
                        Log.LogError(typeof(C1PageRouteHandler).Name, "Failed to load type '{0}'", typeAttr.Value);
                    }
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
