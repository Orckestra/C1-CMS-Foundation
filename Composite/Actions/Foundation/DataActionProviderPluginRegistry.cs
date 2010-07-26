using System.Collections.Generic;
using System.Configuration;
using Composite.Actions.Plugins.DataActionProvider;
using Composite.Actions.Plugins.DataActionProvider.Runtime;
using Composite.Collections.Generic;
using Composite.ConfigurationSystem;
using Composite.EventSystem;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Composite.Logging;


namespace Composite.Actions.Foundation
{
    internal static class DataActionProviderPluginRegistry
    {
        private static ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.Initialize);



        static DataActionProviderPluginRegistry()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }



        public static IEnumerable<string> GetProviderNames()
        {
            using (_resourceLocker.ReadLocker)
            {
                return _resourceLocker.Resources.ProviderNames;
            }
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
            public List<string> ProviderNames { get; set; }

            public static void Initialize(Resources resources)
            {
                IConfigurationSource source = GetConfiguration();

                DataActionProviderSettings settings = source.GetSection(DataActionProviderSettings.SectionName) as DataActionProviderSettings;
                if (null == settings)
                {
                    throw new ConfigurationErrorsException(string.Format("Failed to load the configuration section '{0}' from the configuration", DataActionProviderSettings.SectionName));
                }


                resources.ProviderNames = new List<string>();

                foreach (DataActionProviderData data in settings.DataActionProviderPlugins)
                {
                    resources.ProviderNames.Add(data.Name);
                }
            }
        }
    }
}
