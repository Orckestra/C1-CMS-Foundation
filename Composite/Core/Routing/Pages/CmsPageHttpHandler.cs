using System;
using System.Web;
using System.Web.UI;
using System.Xml.Linq;
using Composite.Core.Configuration;
using Composite.Core.Instrumentation;
using Composite.Core.PageTemplates;
using Composite.Core.WebClient.Renderings;
using Composite.Core.WebClient.Renderings.Page;
using Composite.Core.Xml;

namespace Composite.Core.Routing.Pages
{
    internal class CmsPageHttpHandler: IHttpHandler
    {
        private const string CacheProfileName = "C1Page";

        public void ProcessRequest(HttpContext context)
        {
            InitializeFullPageCaching(context);

            using (var renderingContext = RenderingContext.InitializeFromHttpContext())
            {
                if (renderingContext.RunResponseHandlers())
                {
                    return;
                }

                var renderer = PageTemplateFacade.BuildPageRenderer(renderingContext.Page.TemplateId);

                var slimRenderer = (ISlimPageRenderer) renderer;

                var functionContext = PageRenderer.GetPageRenderFunctionContextContainer();

                XDocument document;

                using (Profiler.Measure($"{nameof(ISlimPageRenderer)}.Render"))
                {
                    document = slimRenderer.Render(renderingContext.PageContentToRender, functionContext);
                }

                PageRenderer.ProcessPageDocument(document, functionContext, renderingContext.Page);

                string xhtml;
                if (document.Root.Name == RenderingElementNames.Html)
                {
                    var xhtmlDocument = new XhtmlDocument(document);

                    PageRenderer.ProcessXhtmlDocument(xhtmlDocument, renderingContext.Page);

                    xhtml = xhtmlDocument.ToString();
                }
                else
                {
                    xhtml = document.ToString();
                }

                if (renderingContext.PreRenderRedirectCheck())
                {
                    return;
                }

                xhtml = renderingContext.ConvertInternalLinks(xhtml);

                if (GlobalSettingsFacade.PrettifyPublicMarkup)
                {
                    xhtml = renderingContext.FormatXhtml(xhtml);
                }

                var response = context.Response;

                // Inserting perfomance profiling information
                if (renderingContext.ProfilingEnabled)
                {
                    xhtml = renderingContext.BuildProfilerReport();

                    response.ContentType = "text/xml";
                }

                response.Write(xhtml);
            }
        }

        void InitializeFullPageCaching(HttpContext context)
        {
            using (var page = new CachableEmptyPage())
            {
                page.ProcessRequest(context);
            }
        }

        public bool IsReusable => true;

        private class CachableEmptyPage : Page
        {
            protected override void FrameworkInitialize()
            {
                base.FrameworkInitialize();

                // That's an equivalent of having <%@ OutputCache CacheProfile="C1Page" %> 
                // on an *.aspx page

                InitOutputCache(new OutputCacheParameters
                {
                    CacheProfile = CacheProfileName
                });
            }
        }
    }
}
