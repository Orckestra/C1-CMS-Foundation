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
            GlobalEventSystemFacade.SubscribeToFlushEvent((a) => Flush());
        }



        public static IEnumerable<string> IconResourceProviderNames
        {
            get
            {
                using (_resourceLocker.ReadLocker)
                {
                    return _resourceLocker.Resources.IconResourceProviders;
                }
            }
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
            public List<string> IconResourceProviders;
            public List<string> StringResourceProviders;
            public List<string> LocalizationProviders;

            public static void Initialize(Resources resources)
            {
                resources.IconResourceProviders = new List<string>();
                resources.StringResourceProviders = new List<string>();
                resources.LocalizationProviders = new List<string>();

                if ((ConfigurationServices.ConfigurationSource != null) &&
                    (ConfigurationServices.ConfigurationSource.GetSection(ResourceProviderSettings.SectionName) != null))
                {
                    ResourceProviderSettings configuration = (ResourceProviderSettings)ConfigurationServices.ConfigurationSource.GetSection(ResourceProviderSettings.SectionName);

                    foreach (ResourceProviderData data in configuration.ResourceProviderPlugins)
                    {
                        Type type = ResourceProviderPluginFacade.GetProviderType(data.Name);

                        if (typeof(IIconResourceProvider).IsAssignableFrom(type) == true)
                        {
                            resources.IconResourceProviders.Add(data.Name);
                        }
                        else if (typeof(IStringResourceProvider).IsAssignableFrom(type) == true)
                        {
                            Log.LogCritical(LogTitle, ("String resource provider '{0}' definition ignored." +
                                                      "\nDefine provider of type '{1}' provider and move provider definition under it")
                                                       .FormatWith(data.Name, typeof(AggregationLocalizationProvider).Name));

                            resources.StringResourceProviders.Add(data.Name);
                        }
                        else if (typeof(ILocalizationProvider).IsAssignableFrom(type) == true)
                        {
                            resources.LocalizationProviders.Add(data.Name);
                        }
                        else 
                        {
                            throw new NotImplementedException(string.Format("Unkown resource provider type '{0}'", type));
                        }
                    }
                }
            }
        }
    }
}
