using System;
using System.Web;
using System.Web.Routing;

using Composite.Core.WebClient;
using Composite.Core.Configuration;
using Composite.Core.Extensions;
using Composite.Data.Types;

namespace Composite.Core.Routing.Pages
{
    internal class C1PageRoute : RouteBase
    {
        public static readonly string RouteDate_PageUrl = "C1Page";
        internal static readonly string HttpContextItem_C1PageUrl = "C1_PageUrl";

        public override RouteData GetRouteData(HttpContextBase context)
        {
            if (!SystemSetupFacade.IsSystemFirstTimeInitialized)
            {
                return null;
            }

            string localPath = context.Request.Url.LocalPath;

            var urlProvider = PageUrls.UrlProvider;

            if (IsAdminPath(localPath) || IsRenderersPath(localPath) || urlProvider.IsInternalUrl(localPath))
            {
                return null;
            }

            var urlSpace = new UrlSpace(context);

            string currentUrl = context.Request.Url.OriginalString;

            UrlData<IPage> urlData = urlProvider.ParseUrl(currentUrl, urlSpace);
            if(urlData == null || urlData.UrlKind == UrlKind.Internal)
            {
                return null;
            }

            // Redirecting friendly urls to public urls
            if (urlData.UrlKind == UrlKind.Redirect || urlData.UrlKind == UrlKind.Redirect)
            {
                string publicUrl = urlProvider.BuildUrl(urlData, UrlKind.Public, urlSpace);
                if(publicUrl == null)
                {
                    return null;
                }

                return SeoFriendlyRedirect(context, publicUrl);
            }

            Verify.That(urlData.UrlKind == UrlKind.Public, "Unexpected url kind '{0}", urlData.UrlKind);

            // Checking casing in url, so the same page will appear as a few pages by a crawler
            string correctUrl = urlProvider.BuildUrl(urlData, UrlKind.Public, urlSpace);

            string originalFilePath = new UrlBuilder(currentUrl).FilePath;
            string correctFilePath = new UrlBuilder(correctUrl).FilePath;

            if (string.Compare(originalFilePath, correctFilePath, false) != 0 &&
                string.Compare(originalFilePath, correctFilePath, true) == 0)
            {
                // redirect to a url with right casing
                return SeoFriendlyRedirect(context, correctUrl);
            }

            // Disabling chaching if there's a logged in user
            if (Composite.C1Console.Security.UserValidationFacade.IsLoggedIn())
            {
                // Disabling ASP.NET cache if there's a logged-in user
                context.Response.Cache.SetCacheability(HttpCacheability.NoCache);
            }

            context.Items.Add(HttpContextItem_C1PageUrl, urlData);

            var data = GetRouteData();
            data.Values.Add(RouteDate_PageUrl, urlData);

            return data;
        }

        private RouteData GetRouteData()
        {
            return new RouteData(this, new C1PageRouteHandler());
        }

        public void Dispose()
        {
        }

        private static bool IsAdminPath(string relativeUrl)
        {
            return string.Compare(relativeUrl, UrlUtils.AdminRootPath, true) == 0
                   || relativeUrl.StartsWith(UrlUtils.AdminRootPath + "/", true);
        }

        private static bool IsRenderersPath(string relativeUrl)
        {
            return relativeUrl.StartsWith(UrlUtils.RenderersRootPath + "/", true);
        }

        private RouteData SeoFriendlyRedirect(HttpContextBase context, string url)
        {
            context.Response.AddHeader("Location", url);
            context.Response.StatusCode = 301; // Http 301 - "Permanently moved"
            context.ApplicationInstance.CompleteRequest();

            return GetRouteData(); // returning route so other routers will not be executed
        }

        public override VirtualPathData GetVirtualPath(RequestContext requestContext, RouteValueDictionary values)
        {
            return new VirtualPathData(this, "~/Renderers/Page.aspx");
        }
    }
}
