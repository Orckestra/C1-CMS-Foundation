using Composite.C1Console.Events;
using Composite.Core.Collections.Generic;
using Composite.Core.Configuration;
using Composite.Core.Routing.Plugins.PageUrlsProviders;
using Composite.Core.Routing.Plugins.PageUrlsProviders.Runtime;
using Composite.Core.Routing.Plugins.Runtime;
using Composite.Data.Types;

namespace Composite.Core.Routing
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class PageUrls
    {
        private static ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.Initialize);

        static PageUrls()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(args => _resourceLocker.ResetInitialization());
        }

        /// <exclude />
        public static IPageUrlBuilder CreatePageUrlBuilder(UrlSpace urlSpace)
        {
            return GetDefaultProvider().CreateUrlBuilder(urlSpace);
        }


        private static IPageUrlProvider GetDefaultProvider()
        {
            var resources = _resourceLocker.Resources;

            string providerName = resources.DefaultPageUrlProviderName;

            var provider = resources.ProviderCache[providerName];

            if(provider == null)
            {
                lock(resources.ProviderCache)
                {
                    provider = resources.Factory.Create(providerName);
                    resources.ProviderCache.Add(providerName, provider);
                }
            }

            return provider;
        }

        /// <exclude />
        public static IUrlProvider<IPage> UrlProvider
        {
            get { return GetDefaultProvider(); }
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

        private sealed class Resources
        {
            private string _defaultPageUrlProviderName;
            public PageUrlProviderFactory Factory { get; set; }
            public Hashtable<string, IPageUrlProvider> ProviderCache { get; set; }

            public static void Initialize(Resources resources)
            {
                resources.Factory = new PageUrlProviderFactory();
                resources.ProviderCache = new Hashtable<string, IPageUrlProvider>();
            }

            public string DefaultPageUrlProviderName
            {
                get
                {
                    if (_defaultPageUrlProviderName == null)
                    {
                        string sectionName = RoutingConfiguration.SectionName;
                        var routingConfiguration = ConfigurationServices.ConfigurationSource.GetSection(sectionName) as RoutingConfiguration;

                        Verify.IsNotNull(routingConfiguration, "Missing configuration section '{0}'", sectionName);

                        _defaultPageUrlProviderName = routingConfiguration.DefaultPageUrlProviderName;
                    }

                    return _defaultPageUrlProviderName;
                }
            }
        }
    }
}
