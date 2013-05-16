using System.Collections.Generic;
using System.Configuration;
using Composite.Core.Collections.Generic;
using Composite.Core.Configuration;
using Composite.C1Console.Elements.Plugins.ElementAttachingProvider;
using Composite.C1Console.Elements.Plugins.ElementAttachingProvider.Runtime;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using System;


namespace Composite.C1Console.Elements.Foundation
{
	internal sealed class ElementAttachingProviderRegistryImpl : IElementAttachingProviderRegistry
	{
        private ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.Initialize);



        public IEnumerable<string> ElementAttachingProviderNames
        {
            get
            {
                using (_resourceLocker.ReadLocker)
                {
                    return _resourceLocker.Resources.ElementProviderNames.Keys;
                }
            }
        }



        public Type GetElementProviderType(string elementProviderName)
        {
            if (string.IsNullOrEmpty(elementProviderName)) throw new ArgumentNullException("elementProviderName");

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



        public void OnFlush()
        {
            _resourceLocker.ResetInitialization();
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



        private sealed class Resources
        {
            public Dictionary<string, Type> ElementProviderNames;

            public static void Initialize(Resources resources)
            {
                IConfigurationSource configurationSource = GetConfiguration();

                ElementAttachingProviderSettings settings = configurationSource.GetSection(ElementAttachingProviderSettings.SectionName) as ElementAttachingProviderSettings;
                if (null == settings)
                {
                    throw new ConfigurationErrorsException(string.Format("Failed to load the configuration section '{0}' from the configuration", ElementAttachingProviderSettings.SectionName));
                }

                resources.ElementProviderNames = new Dictionary<string, Type>();

                foreach (ElementAttachingProviderData data in settings.ElementAttachingProviderPlugins)
                {
                    resources.ElementProviderNames.Add(data.Name, data.Type);
                }
            }
        }
	}
}
