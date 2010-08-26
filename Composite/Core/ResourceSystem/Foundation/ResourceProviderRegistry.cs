using System;
using System.Collections.Generic;
using Composite.Core.Configuration;
using Composite.C1Console.Events;
using Composite.Core.ResourceSystem.Foundation.PluginFacades;
using Composite.Core.ResourceSystem.Plugins.ResourceProvider;
using Composite.Core.ResourceSystem.Plugins.ResourceProvider.Runtime;
using Composite.Core.Collections.Generic;
using Composite.Core.Logging;


namespace Composite.Core.ResourceSystem.Foundation
{
    internal static class ResourceProviderRegistry
    {
        private static ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.Initialize, false);



        static ResourceProviderRegistry()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }



        public static IEnumerable<string> IconResourceProviderNames
        {
            get
            {
                using (_resourceLocker.ReadLocker)
                {
                    return new ReadOnlyList<string>(_resourceLocker.Resources.IconResourceProviders);
                }
            }
        }



        public static IEnumerable<string> StringResourceProviderNames
        {
            get
            {
                using (_resourceLocker.ReadLocker)
                {
                    return new ReadOnlyList<string>(_resourceLocker.Resources.StringResourceProviders);
                }
            }
        }



        private static void Flush()
        {
            _resourceLocker.ResetInitialization();
        }



        private static void OnFlushEvent(FlushEventArgs args)
        {
            Flush();
        }



        private sealed class Resources
        {
            public List<string> IconResourceProviders;
            public List<string> StringResourceProviders;

            public static void Initialize(Resources resources)
            {
                resources.IconResourceProviders = new List<string>();
                resources.StringResourceProviders = new List<string>();

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
                            resources.StringResourceProviders.Add(data.Name);
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
