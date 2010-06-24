using System;
using System.Collections.Generic;
using System.Configuration;
using Composite.Collections.Generic;
using Composite.ConfigurationSystem;
using Composite.Elements.Plugins.ElementProvider;
using Composite.Elements.Plugins.ElementProvider.Runtime;
using Composite.EventSystem;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.Elements.Foundation
{
    internal static class ElementProviderRegistry
    {
        private static ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.Initialize);



        static ElementProviderRegistry()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }



        public static string RootElementProviderName
        {
            get
            {
                using (_resourceLocker.ReadLocker)
                {
                    return _resourceLocker.Resources.RootElementProviderName;
                }
            }
        }



        public static IEnumerable<string> ElementProviderNames
        {
            get
            {
                using (_resourceLocker.ReadLocker)
                {
                    return _resourceLocker.Resources.ElementProviderNames.Keys;
                }
            }
        }



        public static Type GetElementProviderType(string elementProviderName)
        {
            if (string.IsNullOrEmpty(elementProviderName) == true) throw new ArgumentNullException("elementProviderName");

            Type type;
            using (_resourceLocker.ReadLocker)
            {
                if (_resourceLocker.Resources.ElementProviderNames.TryGetValue(elementProviderName, out type) == false)
                {
                    throw new ArgumentException(string.Format("The element provider named '{0}' does not exist", elementProviderName));
                }

                return type;
            }
        }



        public static bool IsProviderHookingProvider(string elementProviderName)
        {
            using (_resourceLocker.ReadLocker)
            {
                return _resourceLocker.Resources.HookingProviderNames.Contains(elementProviderName);
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
            public string RootElementProviderName;
            public Dictionary<string, Type> ElementProviderNames;
            public List<string> HookingProviderNames;

            public static void Initialize(Resources resources)
            {
                IConfigurationSource configurationSource = GetConfiguration();

                ElementProviderSettings settings = configurationSource.GetSection(ElementProviderSettings.SectionName) as ElementProviderSettings;
                if (null == settings)
                {
                    throw new ConfigurationErrorsException(string.Format("Failed to load the configuration section '{0}' from the configuration", ElementProviderSettings.SectionName));
                }

                resources.RootElementProviderName = settings.RootProviderName;


                resources.ElementProviderNames = new Dictionary<string, Type>();
                resources.HookingProviderNames = new List<string>();

                foreach (HooklessElementProviderData data in settings.ElementProviderPlugins)
                {
                    resources.ElementProviderNames.Add(data.Name, data.Type);

#pragma warning disable 612
                    if ((data is ElementProviderData) == true)
                    {
                        resources.HookingProviderNames.Add(data.Name);
                    }
#pragma warning restore 612
                }
            }
        }
    }
}
