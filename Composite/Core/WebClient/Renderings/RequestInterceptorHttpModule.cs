using System;
using System.Globalization;
using System.Linq;
using System.Web;
using Composite.Core.Extensions;
using Composite.Core.Routing;
using Composite.Core.Routing.Pages;
using Composite.Core.Threading;
using Composite.Core.Configuration;
using Composite.Data;
using Composite.Data.Types;


namespace Composite.Core.WebClient.Renderings
{
    internal class RequestInterceptorHttpModule : IHttpModule
    {
        public void Init(HttpApplication context)
        {
            context.BeginRequest += context_BeginRequest;
            context.PreRequestHandlerExecute += context_PreRequestHandlerExecute;
        }

        void context_BeginRequest(object sender, EventArgs e)
        {
            if (SystemSetupFacade.IsSystemFirstTimeInitialized == false) return;

            ThreadDataManager.InitializeThroughHttpContext(true);

            var httpContext = (sender as HttpApplication).Context;

            if (CheckForHostnameAliasRedirect(httpContext))
            {
                return;
            }

            if (HandleMediaRequest(httpContext))
            {
                return;
            }

            SetCultureByHostname();

            HandleRootRequestInClassicMode(httpContext);
        }

        static void SetCultureByHostname()
        {
            IHostnameBinding hostnameBinding = HostnameBindingsFacade.GetBindingForCurrentRequest();
            if(hostnameBinding != null && !hostnameBinding.Culture.IsNullOrEmpty())
            {
                CultureInfo cultureInfo = new CultureInfo(hostnameBinding.Culture);
                var thread = System.Threading.Thread.CurrentThread;
                thread.CurrentCulture = cultureInfo;
                thread.CurrentUICulture = cultureInfo;
            }
        }

        static bool HandleMediaRequest(HttpContext httpContext)
        {
            string rawUrl = httpContext.Request.RawUrl;

            UrlKind urlKind;
            var mediaUrlData = MediaUrls.ParseUrl(rawUrl, out urlKind);

            if(mediaUrlData != null
                && (urlKind == UrlKind.Public || urlKind == UrlKind.Internal))
            {
                string rendererUrl = MediaUrls.BuildUrl(mediaUrlData, UrlKind.Renderer);

                httpContext.RewritePath(rendererUrl);
                return true;
            }

            return false;
        }

        void context_PreRequestHandlerExecute(object sender, EventArgs e)
        {
            if (!SystemSetupFacade.IsSystemFirstTimeInitialized) return;

            // Left for backward compatibility with Contrib master pages support, to be removed 
            // when support for master pages is implemented in C1
            // RenderingContext.PreRenderRedirectCheck() does the same logic
            var httpContext = (sender as HttpApplication).Context;

            var page = httpContext.Handler as System.Web.UI.Page;
            if (page == null)
            {
                return;
            }

            if (!string.IsNullOrEmpty(C1PageRoute.GetPathInfo()))
            {
                page.PreRender += (a, b) => CheckThatPathInfoHasBeenUsed(httpContext, page);
            }

            // Setting 404 response code if it is a request to a custom "Page not found" page
            if (HostnameBindingsFacade.IsPageNotFoundRequest())
            {
                page.PreRender += (a, b) =>
                {
                    httpContext.Response.TrySkipIisCustomErrors = true;
                    httpContext.Response.StatusCode = 404;
                };
            }
        }

        private static void HandleRootRequestInClassicMode(HttpContext httpContext)
        {
            if (HttpRuntime.UsingIntegratedPipeline)
            {
                return;
            }

            // Resolving root path "/" for classic mode
            string rawUrl = httpContext.Request.RawUrl;

            string rootPath = UrlUtils.PublicRootPath
                                + (UrlUtils.PublicRootPath.EndsWith("/") ? "" : "/");

            string defaultAspxPath = rootPath + "default.aspx";

            if (rawUrl.StartsWith(defaultAspxPath, StringComparison.InvariantCultureIgnoreCase))
            {
                string query = rawUrl.Substring(defaultAspxPath.Length);

                string shorterQuery = rootPath + query;

                // Checking that there's a related page)
                if (PageUrls.ParseUrl(shorterQuery) != null)
                {
                    httpContext.RewritePath(shorterQuery);
                }
            }
        }

        private static void CheckThatPathInfoHasBeenUsed(HttpContext httpContext, System.Web.UI.Page page)
        {
            if (C1PageRoute.PathInfoUsed)
            {
                return;
            }

            // Redirecting to PageNotFoundUrl or setting 404 response code if PathInfo url part hasn't been used
            if (!HostnameBindingsFacade.RedirectCustomPageNotFoundUrl(httpContext))
            {
                page.Response.StatusCode = 404;
            }

            page.Response.End();
        }


        public void Dispose()
        {
        }

        static bool CheckForHostnameAliasRedirect(HttpContext httpContext)
        {
            if (UrlUtils.IsAdminConsoleRequest(httpContext))
            {
                return false;
            }

            string hostname = httpContext.Request.Url.Host.ToLowerInvariant();

            foreach (var hostnameBinding in DataFacade.GetData<IHostnameBinding>(true).AsEnumerable())
            {
                string[] aliases = hostnameBinding.Aliases.Split(new[] { "\r\n", "\n" }, StringSplitOptions.RemoveEmptyEntries);

                if (!aliases.Any(a => a == hostname))
                {
                    continue;
                }
                var request = httpContext.Request;

                // TODO: refactor
                string newUrl = request.Url.AbsoluteUri.Replace("://" + hostname, "://" + hostnameBinding.Hostname);

                httpContext.Response.Redirect(newUrl, false);
                httpContext.ApplicationInstance.CompleteRequest();
                return true;
            }

            return false;
        }
    }
}