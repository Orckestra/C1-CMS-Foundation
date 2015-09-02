using System.Web;
using Composite.Core.Routing.Foundation.PluginFacades;
using Composite.Core.Routing.Plugins.PageUrlsProviders;
using Composite.Data.Types;

namespace Composite.Core.Routing
{
    /// <summary> 
    /// Responsible for parsing and building page urls
    /// </summary>
    public static class PageUrls
    {
        private static IPageUrlProvider GetDefaultProvider()
        {
            return PageUrlProviderPluginFacade.GetDefaultProvider();
        }

        /// <exclude />
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        public static IPageUrlProvider UrlProvider
        {
            get { return GetDefaultProvider(); }
        }

        /// <summary>
        /// Parses the URL.
        /// </summary>
        /// <param name="absoluteUrl">The absolute URL.</param>
        /// <returns></returns>
        public static PageUrlData ParseUrl(string absoluteUrl)
        {
            UrlKind urlKind;
            return ParseUrl(absoluteUrl, out urlKind);
        }

        /// <summary>
        /// Parses the URL.
        /// </summary>
        /// <param name="absoluteUrl">The absolute URL.</param>
        /// <param name="urlKind">Kind of the URL.</param>
        /// <returns></returns>
        public static PageUrlData ParseUrl(string absoluteUrl, out UrlKind urlKind)
        {
            if (absoluteUrl.StartsWith("http") && absoluteUrl.Contains("://"))
            {
                return UrlProvider.ParseUrl(absoluteUrl, out urlKind);
            }

            var context = HttpContext.Current;
            string hostname = context != null ? context.Request.Url.Host : null;
            var urlSpace = new UrlSpace(hostname, absoluteUrl);

            return UrlProvider.ParseUrl(absoluteUrl, urlSpace, out urlKind);
        }

        /// <summary>
        /// Parses the URL.
        /// </summary>
        /// <param name="relativeUrl">The relative URL.</param>
        /// <param name="urlSpace">The URL space.</param>
        /// <param name="urlKind">Kind of the URL.</param>
        /// <returns></returns>
        public static PageUrlData ParseUrl(string relativeUrl, UrlSpace urlSpace, out UrlKind urlKind) 
        {
            Verify.ArgumentNotNull(relativeUrl, "relativeUrl");

            return UrlProvider.ParseUrl(relativeUrl, urlSpace, out urlKind);
        }

        /// <summary>
        /// Builds the URL.
        /// </summary>
        /// <param name="pageUrlData">The page URL data.</param>
        /// <param name="urlKind">Kind of the URL.</param>
        /// <param name="urlSpace">The URL space.</param>
        /// <returns></returns>
        public static string BuildUrl(PageUrlData pageUrlData, UrlKind urlKind = UrlKind.Public, UrlSpace urlSpace = null) 
        {
            Verify.ArgumentNotNull(pageUrlData, "pageUrlData");

            return UrlProvider.BuildUrl(pageUrlData, urlKind, urlSpace ?? new UrlSpace());
        }

        /// <summary>
        /// Builds the URL.
        /// </summary>
        /// <param name="page">The page.</param>
        /// <param name="urlKind">Kind of the URL.</param>
        /// <param name="urlSpace">The URL space.</param>
        /// <returns></returns>
        public static string BuildUrl(IPage page, UrlKind urlKind = UrlKind.Public, UrlSpace urlSpace = null)
        {
            Verify.ArgumentNotNull(page, "page");

            return BuildUrl(new PageUrlData(page), urlKind, urlSpace ?? new UrlSpace());
        }
    }
}
