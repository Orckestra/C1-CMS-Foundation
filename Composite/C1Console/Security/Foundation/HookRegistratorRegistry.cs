using System.Collections.Generic;
using System.Configuration;
using Composite.Core.Collections.Generic;
using Composite.Core.Configuration;
using Composite.C1Console.Events;
using Composite.C1Console.Security.Plugins.HookRegistrator;
using Composite.C1Console.Security.Plugins.HookRegistrator.Runtime;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.C1Console.Security.Foundation
{
    internal static class HookRegistratorRegistry
    {
        private static ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.DoInitializeResources);

        static HookRegistratorRegistry()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(args => Flush());
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
            var configSource = ConfigurationServices.ConfigurationSource;

            return configSource != null && configSource.GetSection(HookRegistratorSettings.SectionName) != null;
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



        private sealed class Resources
        {
            public List<string> HookRegistratorPluginNames { get; set; }

            public static void DoInitializeResources(Resources resources)
            {
                if (HasConfiguration())
                {
                    resources.HookRegistratorPluginNames = new List<string>();

                    IConfigurationSource configurationSource = GetConfiguration();

                    var settings = configurationSource.GetSection(HookRegistratorSettings.SectionName) as HookRegistratorSettings;

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
