using System;
using System.Collections.Generic;
using System.Reflection;
using System.Runtime.Caching;
using System.Web;
using System.Web.Caching;
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
    [Serializable]
    internal class DonutCacheEntry
    {
        private XDocument _document;

        public DonutCacheEntry()
        {
        }

        public DonutCacheEntry(HttpContext context, XDocument document)
        {
            Document = new XDocument(document);

            var headers = context.Response.Headers;

            var headersCopy = new List<HeaderElement>(headers.Count);
            foreach (var name in headers.AllKeys)
            {
                headersCopy.Add(new HeaderElement(name, headers[name]));
            }

            OutputHeaders = headersCopy;
        }

        public XDocument Document
        {
            get => new XDocument(_document);
            set => _document = value;
        }

        public IReadOnlyCollection<HeaderElement> OutputHeaders { get; set; }
    }

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
                DonutCacheEntry cacheEntry;
                using (Profiler.Measure("Cache lookup"))
                {
                    cacheEntry = GetFromCache(context, cacheKey);
                }

                bool allFunctionsExecuted = false;
                bool preventResponseCaching = false;

                if (cacheEntry != null)
                {
                    document = cacheEntry.Document;
                    foreach (var header in cacheEntry.OutputHeaders)
                    {
                        context.Response.Headers[header.Name] = header.Value;
                    }

                    // Making sure this response will not go to the output cache
                    preventResponseCaching = true;
                }
                else
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
                        preventResponseCaching = true;

                        using (Profiler.Measure("Adding to cache"))
                        {
                            AddToCache(context, cacheKey, new DonutCacheEntry(context, document));
                        }
                    }
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

                if (preventResponseCaching)
                {
                    context.Response.Cache.SetNoServerCaching();
                }

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
            if (context.Response.StatusCode != 200)
            {
                return false;
            }

#if !DEBUG
            var cacheability = GetPageCacheablity(context);

            // TODO: a proper check here
            return cacheability > HttpCacheability.NoCache;
#endif
            return true;
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

        private DonutCacheEntry GetFromCache(HttpContext context, string cacheKey)
        {
            var provider = GetCacheProvider(context);

            if (provider == null) 
            {
                return MemoryCache.Default.Get(cacheKey) as DonutCacheEntry;
            }

            return provider.Get(cacheKey) as DonutCacheEntry;
        }

        private void AddToCache(HttpContext context, string cacheKey, DonutCacheEntry entry)
        {
            var provider = GetCacheProvider(context);

            if (provider == null)
            {
                MemoryCache.Default.Add(cacheKey, entry, new CacheItemPolicy
                {
                    SlidingExpiration = TimeSpan.FromSeconds(60)
                });
                return;
            }
            
            provider.Add(cacheKey, entry, DateTime.UtcNow.AddSeconds(60));
        }

        OutputCacheProvider GetCacheProvider(HttpContext context)
        {
            var cacheName = context.ApplicationInstance.GetOutputCacheProviderName(context);

            return cacheName != "AspNetInternalProvider" ? OutputCache.Providers?[cacheName] : null;
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