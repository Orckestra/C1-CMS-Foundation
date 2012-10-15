using Composite.Core.Routing.Foundation.PluginFacades;
using Composite.Core.Routing.Plugins.PageUrlsProviders;
using Composite.Data.Types;

namespace Composite.Core.Routing
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class PageUrls
    {
        private static IPageUrlProvider GetDefaultProvider()
        {
            return PageUrlProviderPluginFacade.GetDefaultProvider();
        }

        /// <exclude />
        public static IPageUrlProvider UrlProvider
        {
            get { return GetDefaultProvider(); }
        }

        /// <exclude />
        public static PageUrlData ParseUrl(string url)
        {
            UrlKind urlKind;
            return ParseUrl(url, out urlKind);
        }

        /// <exclude />
        public static PageUrlData ParseUrl(string url, out UrlKind urlKind)
        {
            if (url.StartsWith("http") && url.Contains("://"))
            {
                return UrlProvider.ParseUrl(url, out urlKind);
            }

            return UrlProvider.ParseUrl(url, new UrlSpace(), out urlKind);
        }

        /// <exclude />
        public static PageUrlData ParseUrl(string url, UrlSpace urlSpace, out UrlKind urlKind) 
        {
            return UrlProvider.ParseUrl(url, urlSpace, out urlKind);
        }

        /// <exclude />
        public static string BuildUrl(PageUrlData pageUrlData, UrlKind urlKind, UrlSpace urlSpace) 
        {
            return UrlProvider.BuildUrl(pageUrlData, urlKind, urlSpace);
        }

        /// <exclude />
        public static string BuildUrl(IPage page, UrlKind urlKind = UrlKind.Public, UrlSpace urlSpace = null)
        {
            Verify.ArgumentNotNull(page, "page");

            return BuildUrl(new PageUrlData(page), urlKind, urlSpace ?? new UrlSpace());
        }
    }
}
