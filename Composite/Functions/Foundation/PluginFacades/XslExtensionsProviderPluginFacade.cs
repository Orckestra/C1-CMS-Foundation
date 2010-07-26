using System.Collections.Generic;
using Composite.Collections.Generic;
using Composite.Functions.Foundation.PluginFacades.Runtime;
using Composite.Functions.Plugins.XslExtensionsProvider;
using Composite.Types;

namespace Composite.Functions.Foundation.PluginFacades
{
	internal static class XslExtensionsProviderPluginFacade
	{
        static Resources _resources = new Resources();

        static XslExtensionsProviderPluginFacade()
        {
            Resources.Initialize(_resources);
        }


	    public static List<Pair<string, object>> CreateExtensions(string providerName)
	    {
	        return GetProvider(providerName).CreateExtensions();
	    }

        private static IXslExtensionsProvider GetProvider(string providerName)
        {
            Resources resources = _resources;

            IXslExtensionsProvider provider = resources.ProviderCache[providerName];
            if(provider != null)
            {
                return provider;
            }

            lock(resources.SyncRoot)
            {
                provider = resources.ProviderCache[providerName];
                if (provider != null)
                {
                    return provider;
                }

                provider = resources.Factory.Create(providerName);
                resources.ProviderCache[providerName] = provider;
            }

            return provider;
        }

        private sealed class Resources
        {
            public readonly object SyncRoot = new object();
            public readonly XslExtensionsProviderFactory Factory = new XslExtensionsProviderFactory();
            public Hashtable<string, IXslExtensionsProvider> ProviderCache { get; set; }

            public static void Initialize(Resources resources)
            {
                resources.ProviderCache = new Hashtable<string, IXslExtensionsProvider>();
            }
        }
	}
}
