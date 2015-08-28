using System;
using System.Collections.Generic;
using Composite.Core.Configuration;
using Composite.Core.Extensions;
using Composite.Core.ResourceSystem.Foundation.PluginFacades;
using Composite.Core.ResourceSystem.Plugins.ResourceProvider;
using Composite.Core.ResourceSystem.Plugins.ResourceProvider.Runtime;
using Composite.Core.Collections.Generic;
using Composite.C1Console.Events;
using Composite.Plugins.ResourceSystem.AggregationLocalizationProvider;

namespace Composite.Core.ResourceSystem.Foundation
{
    internal static class ResourceProviderRegistry
    {
        private static readonly ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.Initialize, false);
        private static readonly string LogTitle = typeof (ResourceProviderRegistry).Name;


        static ResourceProviderRegistry()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(a => Flush());
        }



        public static IEnumerable<string> StringResourceProviderNames
        {
            get
            {
                using (_resourceLocker.ReadLocker)
                {
                    return _resourceLocker.Resources.StringResourceProviders;
                }
            }
        }


        public static IEnumerable<string> LocalizationProviderNames
        {
            get
            {
                using (_resourceLocker.ReadLocker)
                {
                    return _resourceLocker.Resources.LocalizationProviders;
                }
            }
        }



        private static void Flush()
        {
            _resourceLocker.ResetInitialization();
        }


        private sealed class Resources
        {
            public List<string> StringResourceProviders;
            public List<string> LocalizationProviders;

            public static void Initialize(Resources resources)
            {
                resources.StringResourceProviders = new List<string>();
                resources.LocalizationProviders = new List<string>();

                var configurationSource = ConfigurationServices.ConfigurationSource;
                if (configurationSource == null)
                {
                    return;
                }

                var section = configurationSource.GetSection(ResourceProviderSettings.SectionName);
                if (section == null)
                {
                    return;
                }

                var configuration = (ResourceProviderSettings)section;

                foreach (ResourceProviderData data in configuration.ResourceProviderPlugins)
                {
                    Type type = ResourceProviderPluginFacade.GetProviderType(data.Name);

                    if (typeof(IStringResourceProvider).IsAssignableFrom(type))
                    {
                        Log.LogVerbose(LogTitle, ("String resource provider '{0}' definition ignored." +
                                                  "\nEither remove it from Composite.config, or move the provider definition under a provider of type '{1}' ")
                                                  .FormatWith(data.Name, typeof(AggregationLocalizationProvider).FullName));

                        resources.StringResourceProviders.Add(data.Name);
                    }
                    else if (typeof(ILocalizationProvider).IsAssignableFrom(type))
                    {
                        resources.LocalizationProviders.Add(data.Name);
                    }
                    else 
                    {
                        throw new NotSupportedException(string.Format("Unknown resource provider type '{0}'", type));
                    }
                }
            }
        }
    }
}
