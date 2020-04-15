using System;
using System.Globalization;
using System.Web;
using System.Web.Routing;
using Composite.Core.WebClient;
using Composite.Core.Configuration;
using Composite.Core.Extensions;
using Composite.Core.WebClient.Renderings;
using Composite.Core.WebClient.Renderings.Page;
using Composite.Search.DocumentSources;

namespace Composite.Core.Routing.Pages
{
    /// <summary>
    /// Implements C1 page route for ASP.NET routing
    /// </summary>
    public class C1PageRoute : RouteBase
    {
        /// <exclude />
        public static readonly string RouteData_PageUrl = "C1Page";

        internal static readonly string HttpContextItem_C1PageUrl = "C1_PageUrl";
        private static readonly string HttpContextItem_PathInfoHandled = "C1PageRoute_PathInfoHandled";

        /// <exclude />
        public static PageUrlData PageUrlData
        {
            get
            {
                var httpContext = HttpContext.Current;
                return httpContext != null ? httpContext.Items[HttpContextItem_C1PageUrl] as PageUrlData : null;
            }
            set
            {
                var httpContext = HttpContext.Current;
                Verify.IsNotNull(httpContext, "HttpContext is not available");

                httpContext.Items[HttpContextItem_C1PageUrl] = value;
            }
        }

        /// <summary>
        /// Get the additional information that was passed in URL along with page url
        /// </summary>
        /// <returns>The PathInfo url part.</returns>
        public static string GetPathInfo()
        {
            return PageUrlData?.PathInfo;
        }

        /// <summary>
        /// This method has to be called to notify the system that PathInfo was used, and the request will not be redirected to "Page not found" page
        /// </summary>
        public static void RegisterPathInfoUsage()
        {
            var httpContext = HttpContext.Current;

            if(!httpContext.Items.Contains(HttpContextItem_PathInfoHandled))
            {
                httpContext.Items.Add(HttpContextItem_PathInfoHandled, true);
            }
        }

        /// <exclude/>
        [Obsolete("User PathInfoUsed property instead")]
        public static bool PathInfoHasBeenUsed()
        {
            return PathInfoUsed;
        }

        /// <summary>
        /// Gets a value indicating whether path info part of C1 page url has been used.
        /// </summary>
        /// <value>
        ///   <c>true</c> if path info has been used; otherwise, <c>false</c>.
        /// </value>
        public static bool PathInfoUsed
        {
            get
            {
                var httpContext = HttpContext.Current;

                return httpContext != null && httpContext.Items.Contains(HttpContextItem_PathInfoHandled);
            }
        }



        /// <exclude />
        public override RouteData GetRouteData(HttpContextBase context)
        {
            if (!SystemSetupFacade.IsSystemFirstTimeInitialized)
            {
                return null;
            }

            string localPath = context.Request.Url.LocalPath;

            if (IsPagePreviewPath(localPath) &&
                PagePreviewContext.TryGetPreviewKey(context.Request, out Guid previewKey))
            {
                var page = PagePreviewContext.GetPage(previewKey);
                if (page == null) throw new InvalidOperationException("Not preview information found by key: " + previewKey);

                return new RouteData(this, new C1PageRouteHandler(new PageUrlData(page)));
            }

            if (UrlUtils.IsAdminConsoleRequest(localPath) || IsRenderersPath(localPath))
            {
                return null;
            }

            var urlProvider = PageUrls.UrlProvider;

            string currentUrl = context.Request.Url.OriginalString;

            UrlKind urlKind;

            PageUrlData pageUrlData = urlProvider.ParseUrl(currentUrl, out urlKind);
            if (pageUrlData == null || urlKind == UrlKind.Renderer)
            {
                return null;
            }

            var urlSpace = new UrlSpace(context);

            // Redirecting friendly urls to public urls
            if (urlKind == UrlKind.Friendly || urlKind == UrlKind.Redirect || urlKind == UrlKind.Internal)
            {
                if(pageUrlData.PathInfo == "/")
                {
                    pageUrlData.PathInfo = null;
                }

                string publicUrl = urlProvider.BuildUrl(pageUrlData, UrlKind.Public, urlSpace);
                if(publicUrl == null)
                {
                    if (urlKind != UrlKind.Internal)
                    {
                        return null;
                    }
                    // Rendering internal url if public url is missing
                }
                else
                {
                    return GetRedirectRoute(publicUrl);
                }
            }

            Verify.That(urlKind == UrlKind.Public || urlKind == UrlKind.Internal, "Unexpected url kind '{0}", urlKind);

            bool isPublicUrl = urlKind == UrlKind.Public;


            if (isPublicUrl)
            {
                // If url ends with a trailing slash - doing a redirect. F.e. http://localhost/a/ -> http://localhost/a
                if (pageUrlData.PathInfo == "/")
                {
                    pageUrlData.PathInfo = null;
                    return GetRedirectRoute(urlProvider.BuildUrl(pageUrlData, UrlKind.Public, urlSpace));
                }

                // Checking casing in url, so the same page will not appear as a few pages by a crawler
                string correctUrl = urlProvider.BuildUrl(pageUrlData, UrlKind.Public, urlSpace);
                Verify.IsNotNull(correctUrl, "Failed to rebuild a public url from url '{0}'", currentUrl);

                string originalFilePath = new UrlBuilder(currentUrl).RelativeFilePath;
                string correctFilePath = new UrlBuilder(correctUrl).RelativeFilePath;

                string decodedOriginalPath = HttpUtility.UrlDecode(originalFilePath);
                string decodedCorrectFilePath = HttpUtility.UrlDecode(correctFilePath);

                if (!urlSpace.ForceRelativeUrls 
                    && (originalFilePath.Length != correctFilePath.Length
                        && decodedOriginalPath != correctFilePath
                        && decodedOriginalPath != decodedCorrectFilePath)
                    || (string.Compare(originalFilePath, correctFilePath, false, CultureInfo.InvariantCulture) != 0 
                        && string.Compare(originalFilePath, correctFilePath, true, CultureInfo.InvariantCulture) == 0)
                        && decodedOriginalPath != decodedCorrectFilePath)
                {
                    // redirect to a url with right casing
                    return GetRedirectRoute(correctUrl);
                }
            }

            // GetRouteData may be executed multiple times
            if (!context.Items.Contains(HttpContextItem_C1PageUrl))
            {
                PageUrlData = pageUrlData;
            }

            var data = new RouteData(this, new C1PageRouteHandler(pageUrlData));
            data.Values.Add(RouteData_PageUrl, pageUrlData);

            return data;
        }

        /// <exclude />
        public void Dispose()
        {
        }

        private static bool IsRenderersPath(string relativeUrl)
        {
            return relativeUrl.StartsWith(UrlUtils.RenderersRootPath + "/", true);
        }

        private static bool IsPagePreviewPath(string relativeUrl)
        {
            return relativeUrl.StartsWith($"{UrlUtils.RenderersRootPath}/PagePreview", true);
        }

        private RouteData GetRedirectRoute(string url)
        {
            return new RouteData(this, new SeoFriendlyRedirectRouteHandler(url));
        }

        /// <exclude />
        public override VirtualPathData GetVirtualPath(RequestContext requestContext, RouteValueDictionary values)
        {
            return null;
        }
    }
}
