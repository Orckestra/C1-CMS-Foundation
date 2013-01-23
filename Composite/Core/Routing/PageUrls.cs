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
        /// <param name="url">The URL.</param>
        /// <returns></returns>
        public static PageUrlData ParseUrl(string url)
        {
            UrlKind urlKind;
            return ParseUrl(url, out urlKind);
        }

        /// <summary>
        /// Parses the URL.
        /// </summary>
        /// <param name="url">The URL.</param>
        /// <param name="urlKind">Kind of the URL.</param>
        /// <returns></returns>
        public static PageUrlData ParseUrl(string url, out UrlKind urlKind)
        {
            if (url.StartsWith("http") && url.Contains("://"))
            {
                return UrlProvider.ParseUrl(url, out urlKind);
            }

            return UrlProvider.ParseUrl(url, new UrlSpace(), out urlKind);
        }

        /// <summary>
        /// Parses the URL.
        /// </summary>
        /// <param name="url">The URL.</param>
        /// <param name="urlSpace">The URL space.</param>
        /// <param name="urlKind">Kind of the URL.</param>
        /// <returns></returns>
        public static PageUrlData ParseUrl(string url, UrlSpace urlSpace, out UrlKind urlKind) 
        {
            return UrlProvider.ParseUrl(url, urlSpace, out urlKind);
        }

        /// <summary>
        /// Builds the URL.
        /// </summary>
        /// <param name="pageUrlData">The page URL data.</param>
        /// <param name="urlKind">Kind of the URL.</param>
        /// <param name="urlSpace">The URL space.</param>
        /// <returns></returns>
        public static string BuildUrl(PageUrlData pageUrlData, UrlKind urlKind, UrlSpace urlSpace) 
        {
            return UrlProvider.BuildUrl(pageUrlData, urlKind, urlSpace);
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
