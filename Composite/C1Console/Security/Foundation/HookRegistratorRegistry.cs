using System.Collections.Generic;
using System.Configuration;
using Composite.Core.Collections.Generic;
using Composite.Core.Configuration;
using Composite.C1Console.Events;
using Composite.C1Console.Security.Plugins.HookRegistrator;
using Composite.C1Console.Security.Plugins.HookRegistrator.Runtime;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Composite.Core.Logging;


namespace Composite.C1Console.Security.Foundation
{
    internal static class HookRegistratorRegistry
    {
        private static ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.DoInitializeResources);

        static HookRegistratorRegistry()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }



        public static IEnumerable<string> HookRegistratorPluginNames
        {
            get
            {
                using (_resourceLocker.ReadLocker)
                {
                    return _resourceLocker.Resources.HookRegistratorPluginNames;
                }
            }
        }



        private static bool HasConfiguration()
        {
            return (ConfigurationServices.ConfigurationSource != null) &&
                   (ConfigurationServices.ConfigurationSource.GetSection(HookRegistratorSettings.SectionName) != null);
        }



        private static IConfigurationSource GetConfiguration()
        {
            IConfigurationSource source = ConfigurationServices.ConfigurationSource;

            if (null == source)
            {
                throw new ConfigurationErrorsException(string.Format("No configuration source specified"));
            }

            return source;
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
            public List<string> HookRegistratorPluginNames { get; set; }

            public static void DoInitializeResources(Resources resources)
            {
                if (HasConfiguration() == true)
                {
                    resources.HookRegistratorPluginNames = new List<string>();

                    IConfigurationSource configurationSource = GetConfiguration();

                    HookRegistratorSettings settings = configurationSource.GetSection(HookRegistratorSettings.SectionName) as HookRegistratorSettings;

                    if (settings == null)
                    {
                        throw new ConfigurationErrorsException(string.Format("Failed to load the configuration section '{0}' from the configuration", HookRegistratorSettings.SectionName));
                    }

                    foreach (HookRegistratorData data in settings.HookRegistratorPlugins)
                    {
                        resources.HookRegistratorPluginNames.Add(data.Name);
                    }
                }
                else
                {
                    resources.HookRegistratorPluginNames = new List<string>();
                }
            }
        }
    }
}
