using System;
using System.Reflection;
using System.Runtime.Caching;
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
    /// <summary>
    /// Renders page tempates without building a Web Form's control tree.
    /// Contains a custom implementation of "donut caching".
    /// </summary>
    internal class CmsPageHttpHandler: IHttpHandler
    {
        private const string CacheProfileName = "C1Page";
        private static readonly FieldInfo CacheabilityFieldInfo;

        static CmsPageHttpHandler()
        {
            CacheabilityFieldInfo = typeof(HttpCachePolicy).GetField("_cacheability", BindingFlags.Instance | BindingFlags.NonPublic);
        }

        public void ProcessRequest(HttpContext context)
        {
            InitializeFullPageCaching(context);

            var cacheKey = GetCacheKey(context);

            using (var renderingContext = RenderingContext.InitializeFromHttpContext())
            {
                var functionContext = PageRenderer.GetPageRenderFunctionContextContainer();

                XDocument document;
                using (Profiler.Measure("Cache lookup"))
                {
                    document = GetFromCache(cacheKey);
                }

                bool allFunctionsExecuted = false;
                if (document == null)
                {
                    if (renderingContext.RunResponseHandlers())
                    {
                        return;
                    }

                    var renderer = PageTemplateFacade.BuildPageRenderer(renderingContext.Page.TemplateId);

                    var slimRenderer = (ISlimPageRenderer) renderer;

                    using (Profiler.Measure($"{nameof(ISlimPageRenderer)}.Render"))
                    {
                        document = slimRenderer.Render(renderingContext.PageContentToRender, functionContext);
                    }

                    allFunctionsExecuted = PageRenderer.ExecuteCachebleFuctions(document.Root, functionContext);

                    if (!allFunctionsExecuted && ServerSideCachingEnabled(context))
                    {
                        context.Response.Cache.SetNoServerCaching();

                        AddToCache(cacheKey, document);
                    }
                }
                else
                {
                    context.Response.Cache.SetNoServerCaching();
                }

                if (!allFunctionsExecuted)
                {
                    using (Profiler.Measure("Executing embedded functions"))
                    {
                        PageRenderer.ExecuteEmbeddedFunctions(document.Root, functionContext);
                    }
                }

                using (Profiler.Measure("Resolving page fields"))
                {
                    PageRenderer.ResolvePageFields(document, renderingContext.Page);
                }

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

        private bool ServerSideCachingEnabled(HttpContext context)
        {
            var cacheability = GetPageCacheablity(context);

            // TODO: a proper check here
            return cacheability > HttpCacheability.NoCache;
        }

        private HttpCacheability GetPageCacheablity(HttpContext context)
            => (HttpCacheability) CacheabilityFieldInfo.GetValue(context.Response.Cache);

        void InitializeFullPageCaching(HttpContext context)
        {
            using (var page = new CachableEmptyPage())
            {
                page.ProcessRequest(context);
            }
        }

        private XDocument GetFromCache(string cacheKey)
        {
            // TODO: set the response headers as well

            var result = MemoryCache.Default.Get(cacheKey) as XDocument;
            if (result != null)
            {
                result = new XDocument(result);
            }

            return result;
        }

        private void AddToCache(string cacheKey, XDocument document)
        {
            // TODO: use the standard ASP.NET cache storage providers
            // TODO: preserve the response headers as well

            var copy = new XDocument(document);
            MemoryCache.Default.Add(cacheKey, copy, new CacheItemPolicy
            {
                SlidingExpiration = TimeSpan.FromSeconds(60)
            });
        }

        private string GetCacheKey(HttpContext context)
        {
            // TODO: implement properly
            return context.Request.Url.ToString();
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