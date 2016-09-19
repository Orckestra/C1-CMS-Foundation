using System;
using System.Collections.Generic;
using System.Text;
using System.Web;
using System.Xml.Linq;
using Composite.C1Console.Security;
using Composite.Core.Extensions;
using Composite.Core.Instrumentation;
using Composite.Core.PageTemplates;
using Composite.Core.Routing;
using Composite.Core.Routing.Pages;
using Composite.Core.WebClient.Renderings.Page;
using Composite.Data;
using Composite.Data.Types;
using Composite.Plugins.Routing.Pages;

namespace Composite.Core.WebClient.Renderings
{
    /// <summary>
    /// Rendering context
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class RenderingContext: IDisposable
    {
        private static readonly string LogTitle = typeof (RenderingContext).Name;

        /// <summary>
        /// Indicates whether performance profiling is enabled.
        /// </summary>
        /// <value><c>true</c> if profiling is enabled; otherwise, <c>false</c>.</value>
        public bool ProfilingEnabled { get; private set; }

        /// <summary>
        /// Indicates whether page is shown in preview mode.
        /// </summary>
        /// <value><c>true</c> if page is shown in preview mode; otherwise, <c>false</c>.</value>
        public bool PreviewMode { get; private set; }

        /// <summary>
        /// Gets the current c1 page.
        /// </summary>
        /// <value>The page.</value>
        public IPage Page { get; private set; }

        /// <summary>
        /// Indicates whether page caching is disabled.
        /// </summary>
        /// <value><c>true</c> if page caching is disabled; otherwise, <c>false</c>.</value>
        public bool CachingDisabled { get; private set; }

        private static readonly string ProfilerXslPath = UrlUtils.AdminRootPath + "/Transformations/page_profiler.xslt";

        private static readonly List<string> _prettifyErrorUrls = new List<string>();
        private static int _prettifyErrorCount;

        private string _previewKey;
        private IDisposable _pagePerfMeasuring;
        private string _cachedUrl;
        private IDisposable _dataScope;

        private RenderingContext()
        {
        }

        /// <exclude />
        public static RenderingContext InitializeFromHttpContext()
        {
            var renderingContext = new RenderingContext();
            renderingContext.InitializeFromHttpContextInternal();
            return renderingContext;
        }


        /// <summary>
        /// Runs the response handlers.
        /// </summary>
        /// <returns><c>true</c> if a handler has already processed the request and no further writing to response should be done; otherwise, <c>false</c>.</returns>
        public bool RunResponseHandlers()
        {
            if (PreviewMode)
            {
                return false;
            }

            var httpContext = HttpContext.Current;
            var response = httpContext.Response;

            var responseHandling = RenderingResponseHandlerFacade.GetDataResponseHandling(PageRenderer.CurrentPage.GetDataEntityToken());
            if (responseHandling != null)
            {
                if (responseHandling.PreventPublicCaching)
                {
                    response.Cache.SetCacheability(HttpCacheability.NoCache);
                    CachingDisabled = true;
                }

                if (responseHandling.EndRequest || responseHandling.RedirectRequesterTo != null)
                {
                    if (responseHandling.RedirectRequesterTo != null)
                    {
                        response.Redirect(responseHandling.RedirectRequesterTo.ToString(), false);
                    }

                    httpContext.ApplicationInstance.CompleteRequest();

                    return true;
                }
            }

            return false;
        }


        /// <exclude />
        public IEnumerable<IPagePlaceholderContent> GetPagePlaceholderContents()
        {
            return PreviewMode ? (IEnumerable<IPagePlaceholderContent>)HttpRuntime.Cache.Get(_previewKey + "_SelectedContents")
                               : PageManager.GetPlaceholderContent(Page.Id, Page.VersionId);
        }


        /// <exclude />
        public string ConvertInternalLinks(string xhtml)
        {
            using (Profiler.Measure("Converting internal urls to public"))
            {
                xhtml = InternalUrls.ConvertInternalUrlsToPublic(xhtml);
            }

            return xhtml;
        }

        /// <exclude />
        public string FormatXhtml(string xhtml)
        {
            try
            {
                using (Profiler.Measure("Formatting output XHTML with Composite.Core.Xml.XhtmlPrettifier"))
                {
                    xhtml = Composite.Core.Xml.XhtmlPrettifier.Prettify(xhtml);
                }
            }
            catch
            {
                if (!PreviewMode)
                {
                    const int maxWarningsToShow = 3;

                    if (_prettifyErrorCount < maxWarningsToShow)
                    {
                        lock (_prettifyErrorUrls)
                        {
                            if (!_prettifyErrorUrls.Contains(_cachedUrl) && _prettifyErrorCount < maxWarningsToShow)
                            {
                                _prettifyErrorUrls.Add(_cachedUrl);
                                _prettifyErrorCount++;
                                Log.LogWarning(LogTitle, "Failed to format output xhtml in a pretty way - your page output is likely not strict xml. Url: " + (HttpUtility.UrlDecode(_cachedUrl) ?? "undefined"));
                                if (maxWarningsToShow == _prettifyErrorCount)
                                {
                                    Log.LogInformation(LogTitle, "{0} xhtml format errors logged since startup. No more will be logged until next startup.", maxWarningsToShow);
                                }
                            }
                        }
                    }
                }
            }

            return xhtml;
        }

        /// <exclude />
        public string BuildProfilerReport()
        {
            _pagePerfMeasuring.Dispose();

            Measurement measurement = Profiler.EndProfiling();

            string xmlHeader = @"<?xml version=""1.0""?>
                             <?xml-stylesheet type=""text/xsl"" href=""{0}""?>"
                    .FormatWith(ProfilerXslPath);

            XElement reportXml = ProfilerReport.BuildReportXml(measurement);
            var url = new UrlBuilder(HttpContext.Current.Request.Url.ToString());
            url["c1mode"] = null;

            reportXml.Add(new XAttribute("url", url),
                          new XAttribute("consoleUrl", UrlUtils.AdminRootPath));

            return xmlHeader + reportXml;
        }


        private void InitializeFromHttpContextInternal()
        {
            HttpContext httpContext = HttpContext.Current;
            var request = httpContext.Request;
            var response = httpContext.Response;

           ProfilingEnabled = request.Url.OriginalString.Contains("c1mode=perf");
            if (ProfilingEnabled)
            {
                if (!UserValidationFacade.IsLoggedIn())
                {
                    string loginUrl = GetLoginRedirectUrl(request.RawUrl);
                    response.Write(@"You must be logged into <a href=""" + loginUrl + @""">C1 console</a> to have the performance view enabled");
                    response.End(); // throws ThreadAbortException
                    return;
                }

                Profiler.BeginProfiling();
                _pagePerfMeasuring = Profiler.Measure("C1 Page");
            }

            _previewKey = request.QueryString["previewKey"];
            PreviewMode = !_previewKey.IsNullOrEmpty();

            if (PreviewMode)
            {
                Page = (IPage)HttpRuntime.Cache.Get(_previewKey + "_SelectedPage");
                C1PageRoute.PageUrlData = new PageUrlData(Page);

                PageRenderer.RenderingReason = (RenderingReason) HttpRuntime.Cache.Get(_previewKey + "_RenderingReason");
            }
            else
            {
                PageUrlData pageUrl = C1PageRoute.PageUrlData ??  PageUrls.UrlProvider.ParseInternalUrl(request.Url.OriginalString);
                Page = pageUrl.GetPage();

                _cachedUrl = request.Url.PathAndQuery;

                PageRenderer.RenderingReason = new UrlSpace(httpContext).ForceRelativeUrls 
                    ? RenderingReason.C1ConsoleBrowserPageView 
                    : RenderingReason.PageView;
            }

            ValidateViewUnpublishedRequest(httpContext);

            if (Page == null)
            {
                throw new HttpException(404, "Page not found - either this page has not been published yet or it has been deleted.");
            }

            if (Page.DataSourceId.PublicationScope != PublicationScope.Published)
            {
                response.Cache.SetCacheability(HttpCacheability.NoCache);
                CachingDisabled = true;
            }

            PageRenderer.CurrentPage = Page;

            _dataScope = new DataScope(Page.DataSourceId.PublicationScope, Page.DataSourceId.LocaleScope);

            var pagePlaceholderContents = GetPagePlaceholderContents();
            var pageRenderingJob = new PageContentToRender(Page, pagePlaceholderContents, PreviewMode);

            Verify.IsNotNull(httpContext.Handler, "HttpHandler isn't defined");

            var aspnetPage = (System.Web.UI.Page)httpContext.Handler;
            
            var pageRenderer = PageTemplateFacade.BuildPageRenderer(Page.TemplateId);
            pageRenderer.AttachToPage(aspnetPage, pageRenderingJob);
        }

        private void ValidateViewUnpublishedRequest(HttpContext httpContext)
        {
            bool isPreviewingUrl = httpContext.Request.Url.OriginalString.Contains(DefaultPageUrlProvider.UrlMarker_RelativeUrl);
            bool isUnpublishedPage = Page != null && Page.DataSourceId.PublicationScope != PublicationScope.Published;

            if ((isUnpublishedPage || isPreviewingUrl)
                && !UserValidationFacade.IsLoggedIn())
            {
                string redirectUrl = GetLoginRedirectUrl(httpContext.Request.Url.OriginalString);

                httpContext.Response.Redirect(redirectUrl, true);
            }
        }

        /// <summary>
        /// Redirects to 404 page if PathInfo wasn't used. Adds 404 status code if the current page is specified as 404 page in hostname binding.
        /// Note that all C1 functions on page have to be executed before calling this method.
        /// </summary>
        /// <returns><c>True</c> if the request was transferred to a 404 page and rendering should be stopped.</returns>
        public bool PreRenderRedirectCheck()
        {
            var httpContext = HttpContext.Current;

            if (!C1PageRoute.GetPathInfo().IsNullOrEmpty()
                && !C1PageRoute.PathInfoUsed)
            {
                // Redirecting to PageNotFoundUrl or setting 404 response code if PathInfo url part hasn't been used
                if (HostnameBindingsFacade.ServeCustomPageNotFoundPage(httpContext))
                {
                    return true;
                }

                httpContext.Response.StatusCode = 404;
                httpContext.Response.End();
            }

            // Setting 404 response code if it is a request to a custom "Page not found" page
            if (HostnameBindingsFacade.IsPageNotFoundRequest())
            {
                httpContext.Response.StatusCode = 404;
            }

            return false;
        }
        
        private static string GetLoginRedirectUrl(string url)
        {
            return UrlUtils.PublicRootPath + "/Composite/Login.aspx?ReturnUrl=" +
                   HttpUtility.UrlEncode(url, Encoding.UTF8);
        }

        /// <exclude />
        public void Dispose()
        {
            PageRenderingHistory.MarkPageAsRendered(this.Page);

            if (_dataScope != null)
            {
                _dataScope.Dispose();
            }

            if (PreviewMode)
            {
                var cache = HttpRuntime.Cache;

                cache.Remove(_previewKey + "_SelectedPage");
                cache.Remove(_previewKey + "_SelectedContents");
            }
        }
    }
}
