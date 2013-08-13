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
using Composite.Core.Extensions;
using Composite.Core.Linq;

namespace Composite.Core.Routing.Pages
{
    internal class C1PageRouteHandler : IRouteHandler
    {
        private readonly PageUrlData _pageUrlData;

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

        public C1PageRouteHandler(PageUrlData pageUrlData)
        {
            _pageUrlData = pageUrlData;
        }


        public IHttpHandler GetHttpHandler(RequestContext requestContext)
        {
            var context = requestContext.HttpContext;

            string localPath = context.Request.Url.LocalPath;
            string pathInfo = _pageUrlData.PathInfo;

            // Doing a url rewriting so ASP.NET will get correct FilePath/PathInfo properties
            if (!pathInfo.IsNullOrEmpty())
            {
                string filePath = localPath.Substring(0, localPath.Length - pathInfo.Length);

                string queryString = context.Request.Url.Query;
                if (queryString.StartsWith("?"))
                {
                    queryString = queryString.Substring(1);
                }
                context.RewritePath(filePath, pathInfo, queryString);
            }

            // Disabling ASP.NET cache if there's a logged-in user
            if (Composite.C1Console.Security.UserValidationFacade.IsLoggedIn())
            {
                context.Response.Cache.SetCacheability(HttpCacheability.NoCache);
            }

            if (_handlerType != null)
            {
                return (IHttpHandler)Activator.CreateInstance(_handlerType);
            }
            
            return (IHttpHandler)BuildManager.CreateInstanceFromVirtualPath("~/Renderers/Page.aspx", typeof(Page));
        }
    }
}
