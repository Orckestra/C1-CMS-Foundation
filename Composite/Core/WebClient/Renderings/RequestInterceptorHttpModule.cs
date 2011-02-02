using System;
using System.Collections.Specialized;
using System.Web;
using Composite.Data;
using Composite.Core.Threading;
using Composite.Core.Extensions;
using Composite.Core.Configuration;


namespace Composite.Core.WebClient.Renderings
{
    internal class RequestInterceptorHttpModule : IHttpModule
    {
        internal static readonly string HttpContextItem_C1PageUrl = "C1_PageUrl";

        public void Init(HttpApplication context)
        {
            context.BeginRequest += context_BeginRequest;
        }

        void context_BeginRequest(object sender, EventArgs e)
        {
            if (SystemSetupFacade.IsSystemFirstTimeInitialized == false) return;

            ThreadDataManager.InitializeThroughHttpContext(true);

            HttpApplication application = (HttpApplication) sender;
            HttpContext context = application.Context;

            string localPath = context.Request.Url.LocalPath;

            if (IsAdminPath(localPath)
                || PageUrl.IsInternalUrl(localPath))
            {
                return;
            }

            if(HandlePublicPageUrl(context))
            {
                return;
            }

            HandleFriendlyUrl(context);
        }



        private static bool HandlePublicPageUrl(HttpContext context)
        {
            try
            {
                NameValueCollection notInvolvedQueryParameters;

                string currentUrl = context.Request.Url.OriginalString;

                PageUrl pageUrl = PageUrl.ParsePublicUrl(new UrlBuilder(currentUrl), out notInvolvedQueryParameters);

                if (pageUrl == null || pageUrl.UrlType != PageUrlType.Public)
                {
                    return false;
                }

                UrlBuilder originalUrlString = new UrlBuilder(context.Request.Path);
                UrlBuilder correctUrl = pageUrl.Build();

                if (string.Compare(originalUrlString.FilePath, correctUrl.FilePath, false) != 0 &&
                    string.Compare(originalUrlString.FilePath, correctUrl.FilePath, true) == 0)
                {
                    // redirect to right case
                    correctUrl.AddQueryParameters(notInvolvedQueryParameters);
                    correctUrl.PathInfo = originalUrlString.PathInfo;

                    SeoFriendlyRedirect(context, correctUrl.ToString());
                    return true;
                }

                UrlBuilder internalPageUrl = pageUrl.Build(PageUrlType.Internal);

                internalPageUrl.AddQueryParameters(notInvolvedQueryParameters);
                internalPageUrl.PathInfo = originalUrlString.PathInfo;

                context.RewritePath(internalPageUrl.FilePath, context.Request.PathInfo, internalPageUrl.QueryString);

                if (Composite.C1Console.Security.UserValidationFacade.IsLoggedIn() == true)
                {
                    context.Response.Cache.SetCacheability(HttpCacheability.NoCache);
                }

                context.Items.Add("C1_PageUrl", pageUrl);

                return true;
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException(string.Format("Failed to intercept URL '{0}'.",context.Request.Url.OriginalString), ex);
            }
        }

        private static bool HandleFriendlyUrl(HttpContext context)
        {
            PageUrl pageUrl;

            Uri requestUrl = context.Request.Url;

            if (!PageUrl.TryParseFriendlyUrl(requestUrl.LocalPath, out pageUrl))
            {
                return false;
            }

            UrlBuilder defaultPageUrl = pageUrl.Build(PageUrlType.Public);
            if(defaultPageUrl == null)
            {
                return false;
            }

            var parameters = new UrlBuilder(requestUrl.ToString()).GetQueryParameters();
            defaultPageUrl.AddQueryParameters(parameters);

            SeoFriendlyRedirect(context, defaultPageUrl.ToString());
            return true;
        }

        public void Dispose()
        {
        }

        private static bool IsAdminPath(string relativeUrl)
        {
            return string.Compare(relativeUrl, UrlUtils.AdminRootPath, true) == 0
                   || relativeUrl.StartsWith(UrlUtils.AdminRootPath + "/", true);
        }

        private static void SeoFriendlyRedirect(HttpContext context, string url)
        {
            context.Response.AddHeader("Location", url);
            context.Response.StatusCode = 301; // Http 301 - "Permanently moved"
            context.ApplicationInstance.CompleteRequest();
        }
    }
}
