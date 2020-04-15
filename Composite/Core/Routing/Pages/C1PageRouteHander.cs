using System;
using System.Diagnostics.CodeAnalysis;
using System.Collections.Concurrent;
using System.Linq;
using System.Web;
using System.Web.Compilation;
using System.Web.Configuration;
using System.Web.Hosting;
using System.Web.Routing;
using System.Web.UI;
using System.Xml.Linq;
using Composite.AspNet;
using Composite.Core.Configuration;
using Composite.Core.Extensions;
using Composite.Core.Linq;
using Composite.Core.PageTemplates;


namespace Composite.Core.Routing.Pages
{
    internal class C1PageRouteHandler : IRouteHandler
    {
        private const string PageHandlerPath = "Renderers/Page.aspx";
        private const string PageHandlerVirtualPath = "~/" + PageHandlerPath;

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
                    .Where(e => e.Attribute("path")?.Value.Equals(PageHandlerPath, StringComparison.OrdinalIgnoreCase) ?? false)
                    .SingleOrDefaultOrException($"Multiple handlers for '{PageHandlerPath}' were found'");

                if (handler != null)
                {
                    var typeAttr = handler.Attribute("type");
                    Verify.IsNotNull(typeAttr, "'type' attribute is missing");

                    _handlerType = Type.GetType(typeAttr.Value);
                    if(_handlerType == null)
                    {
                        Log.LogError(nameof(C1PageRouteHandler), $"Failed to load type '{typeAttr.Value}'");
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

            if (_handlerType == null && GlobalSettingsFacade.OmitAspNetWebFormsSupport)
            {
                var page = _pageUrlData.GetPage()
                    ?? throw new HttpException(404, "Page not found - either this page has not been published yet or it has been deleted.");

                if (IsSlimPageRenderer(page.TemplateId))
                {
                    return new CmsPageHttpHandler();
                }
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

            return (IHttpHandler)BuildManager.CreateInstanceFromVirtualPath(PageHandlerVirtualPath, typeof(Page));
        }

        private static readonly ConcurrentDictionary<Guid, bool> _pageRendererTypCache
            = new ConcurrentDictionary<Guid, bool>();

        private bool IsSlimPageRenderer(Guid pageTemplate)
        {
            return _pageRendererTypCache.GetOrAdd(pageTemplate, 
                templateId => PageTemplateFacade.BuildPageRenderer(templateId) is ISlimPageRenderer);
        }
    }
}
