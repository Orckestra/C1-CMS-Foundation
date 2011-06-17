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
        public static UrlData<IPage> ParseUrl(string url)
        {
            if (url.StartsWith("http") && url.Contains("://"))
            {
                return UrlProvider.ParseUrl(url);
            }

            return UrlProvider.ParseUrl(url, new UrlSpace());
        }

        /// <exclude />
        public static UrlData<IPage> ParseUrl(string url, UrlSpace urlSpace) 
        {
            return UrlProvider.ParseUrl(url, urlSpace);
        }

        /// <exclude />
        public static string BuildUrl(UrlData<IPage> urlData, UrlKind urlKind, UrlSpace urlSpace) 
        {
            return UrlProvider.BuildUrl(urlData, urlKind, urlSpace);
        }
    }
}
