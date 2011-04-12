using System;
using System.Collections.Specialized;
using System.Web;
using System.Web.Routing;
using Composite.Data;
using Composite.Core.Configuration;
using Composite.Core.Extensions;

namespace Composite.Core.WebClient.Routing
{
    internal class C1PageRoute : RouteBase
    {
        public static readonly string RouteDate_PageUrl = "PageUrl";
        internal static readonly string HttpContextItem_C1PageUrl = "C1_PageUrl";

        public override RouteData GetRouteData(HttpContextBase context)
        {
            if (!SystemSetupFacade.IsSystemFirstTimeInitialized)
            {
                return null;
            }

            string localPath = context.Request.Url.LocalPath;

            if (IsAdminPath(localPath)
                || PageUrl.IsInternalUrl(localPath))
            {
                return null;
            }

            return HandlePublicPageUrl(context) ?? HandleFriendlyUrl(context);
        }

        private RouteData GetRouteData()
        {
            return new RouteData(this, new C1PageRouteHandler());
        }

        private RouteData HandlePublicPageUrl(HttpContextBase context)
        {
            try
            {
                NameValueCollection notInvolvedQueryParameters;

                string currentUrl = context.Request.Url.OriginalString;

                PageUrl pageUrl = PageUrl.ParsePublicUrl(new UrlBuilder(currentUrl), out notInvolvedQueryParameters);

                if (pageUrl == null || pageUrl.UrlType != PageUrlType.Public)
                {
                    return null;
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
                    return GetRouteData();
                }

                UrlBuilder internalPageUrl = pageUrl.Build(PageUrlType.Internal);

                internalPageUrl.AddQueryParameters(notInvolvedQueryParameters);
                internalPageUrl.PathInfo = originalUrlString.PathInfo;

                if (Composite.C1Console.Security.UserValidationFacade.IsLoggedIn())
                {
                    // Disabling ASP.NET cache if there's a logged-in user
                    context.Response.Cache.SetCacheability(HttpCacheability.NoCache);
                }

                context.Items.Add(HttpContextItem_C1PageUrl, pageUrl);

                var data = GetRouteData();
                data.Values.Add(RouteDate_PageUrl, pageUrl);

                return data;
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException(string.Format("Failed to intercept URL '{0}'.", context.Request.Url.OriginalString), ex);
            }
        }

        private RouteData HandleFriendlyUrl(HttpContextBase context)
        {
            PageUrl pageUrl;

            Uri requestUrl = context.Request.Url;

            if (!PageUrl.TryParseFriendlyUrl(requestUrl.LocalPath, out pageUrl))
            {
                return null;
            }

            UrlBuilder defaultPageUrl = pageUrl.Build(PageUrlType.Public);
            if (defaultPageUrl == null)
            {
                return null;
            }

            var parameters = new UrlBuilder(requestUrl.ToString()).GetQueryParameters();
            defaultPageUrl.AddQueryParameters(parameters);

            SeoFriendlyRedirect(context, defaultPageUrl.ToString());
            return GetRouteData();
        }

        public void Dispose()
        {
        }

        private static bool IsAdminPath(string relativeUrl)
        {
            return string.Compare(relativeUrl, UrlUtils.AdminRootPath, true) == 0
                   || relativeUrl.StartsWith(UrlUtils.AdminRootPath + "/", true);
        }

        private static void SeoFriendlyRedirect(HttpContextBase context, string url)
        {
            context.Response.AddHeader("Location", url);
            context.Response.StatusCode = 301; // Http 301 - "Permanently moved"
            context.ApplicationInstance.CompleteRequest();
        }

        public override VirtualPathData GetVirtualPath(RequestContext requestContext, RouteValueDictionary values)
        {
            return new VirtualPathData(this, "/Renderers/Page.aspx");
        }
    }
}
