using System;
using System.Linq;
using System.Web;
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

            if(CheckForHostnameAliasRedirect(httpContext))
            {
                return;
            }

            HandleRootRequestInClassicMode(httpContext);
        }

        void context_PreRequestHandlerExecute(object sender, EventArgs e)
        {
            var httpContext = (sender as HttpApplication).Context;

            var page = httpContext.Handler as System.Web.UI.Page;
            if(page != null 
               && !string.IsNullOrEmpty(C1PageRoute.GetPathInfo()))
            {
                page.PreRender += (a, b) => CheckThatPathInfoHasBeenUsed(httpContext, page);
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
            if (C1PageRoute.PathInfoHasBeenUsed())
            {
                return;
            }

            // Redirecting to PageNotFoundUrl or setting 404 response code if PathInfo url part hasn't been used

            string hostname = httpContext.Request.Url.Host;
            IHostnameBinding hostnameBinding = DataFacade.GetData<IHostnameBinding>().AsEnumerable()
                .FirstOrDefault(binding => binding.Hostname == hostname);

            if(hostnameBinding != null 
                && hostnameBinding.PageNotFoundUrl != null
                && hostnameBinding.PageNotFoundUrl.Trim().Length > 0)
            {
                page.Response.Redirect(hostnameBinding.PageNotFoundUrl, true);
                return;
            }
            
            page.Response.StatusCode = 404;
            page.Response.End();
        }


        public void Dispose()
        {
        }

        static bool CheckForHostnameAliasRedirect(HttpContext httpContext)
        {
            string hostname = httpContext.Request.Url.Host.ToLower();

            // TODO: caching
            foreach (var hostnameBinding in DataFacade.GetData<IHostnameBinding>(true))
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