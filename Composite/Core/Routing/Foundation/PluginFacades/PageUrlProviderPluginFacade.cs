using Composite.C1Console.Events;
using Composite.Core.Collections.Generic;
using Composite.Core.Configuration;
using Composite.Core.Routing.Plugins.PageUrlsProviders;
using Composite.Core.Routing.Plugins.PageUrlsProviders.Runtime;
using Composite.Core.Routing.Plugins.Runtime;

namespace Composite.Core.Routing.Foundation.PluginFacades
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public static class PageUrlProviderPluginFacade
    {
        private static readonly ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.Initialize);

        static PageUrlProviderPluginFacade()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(args => _resourceLocker.ResetInitialization());
        }

        /// <exclude />
        public static IPageUrlProvider GetDefaultProvider()
        {
            var resources = _resourceLocker.Resources;

            string providerName = resources.DefaultPageUrlProviderName;

            var provider = resources.ProviderCache[providerName];

            if (provider == null)
            {
                lock (resources.ProviderCache)
                {
                    provider = resources.Factory.Create(providerName);
                    resources.ProviderCache.Add(providerName, provider);
                }
            }

            return provider;
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
