using System.Web;
using System.Xml.Linq;
using Composite.AspNet.Caching;
using Composite.Core.Configuration;
using Composite.Core.Instrumentation;
using Composite.Core.PageTemplates;
using Composite.Core.WebClient.Renderings;
using Composite.Core.WebClient.Renderings.Page;
using Composite.Core.Xml;

namespace Composite.AspNet
{
    /// <summary>
    /// Renders page templates without building a Web Form's control tree.
    /// Contains a custom implementation of "donut caching".
    /// </summary>
    internal class CmsPageHttpHandler: IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            OutputCacheHelper.InitializeFullPageCaching(context);

            using (var renderingContext = RenderingContext.InitializeFromHttpContext())
            {
                bool cachingEnabled = false;
                string cacheKey = null;
                DonutCacheEntry cacheEntry = null;

                bool consoleUserLoggedIn = Composite.C1Console.Security.UserValidationFacade.IsLoggedIn();

                // "Donut caching" is enabled for logged in users, only if profiling is enabled as well.
                if (!renderingContext.CachingDisabled
                    && (!consoleUserLoggedIn || renderingContext.ProfilingEnabled))
                {
                    cachingEnabled = OutputCacheHelper.TryGetCacheKey(context, out cacheKey);
                    if (cachingEnabled)
                    {
                        using (Profiler.Measure("Cache lookup"))
                        {
                            cacheEntry = OutputCacheHelper.GetFromCache(context, cacheKey);
                        }
                    }
                }

                XDocument document;
                var functionContext = PageRenderer.GetPageRenderFunctionContextContainer();

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

                    allFunctionsExecuted = PageRenderer.ExecuteCacheableFunctions(document.Root, functionContext);

                    if (cachingEnabled && !allFunctionsExecuted && OutputCacheHelper.ResponseCacheable(context))
                    {
                        preventResponseCaching = true;

                        if (!functionContext.ExceptionsSuppressed)
                        {
                            using (Profiler.Measure("Adding to cache"))
                            {
                                OutputCacheHelper.AddToCache(context, cacheKey, new DonutCacheEntry(context, document));
                            }
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
                    PageRenderer.ProcessDocumentHead(xhtmlDocument);

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

                // Disabling ASP.NET cache if there's a logged-in user
                if (consoleUserLoggedIn)
                {
                    context.Response.Cache.SetCacheability(HttpCacheability.NoCache);
                }

                // Inserting performance profiling information
                if (renderingContext.ProfilingEnabled)
                {
                    xhtml = renderingContext.BuildProfilerReport();

                    response.ContentType = "text/xml";
                }

                response.Write(xhtml);
            }
        }


        public bool IsReusable => true;
    }
}