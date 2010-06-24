using System.Collections.Generic;
using System.Configuration;
using Composite.Collections.Generic;
using Composite.ConfigurationSystem;
using Composite.Elements.Plugins.ElementActionProvider;
using Composite.Elements.Plugins.ElementActionProvider.Runtime;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.Elements.Foundation
{
	internal sealed class ElementActionProviderRegistryImpl : IElementActionProviderRegistry
	{
        private ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.Initialize);



        public IEnumerable<string> ElementActionProviderNames
        {
            get
            {
                using (_resourceLocker.ReadLocker)
                {
                    return _resourceLocker.Resources.ElementProviderNames;
                }
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
            public List<string> ElementProviderNames;

            public static void Initialize(Resources resources)
            {
                IConfigurationSource configurationSource = GetConfiguration();

                ElementActionProviderSettings settings = configurationSource.GetSection(ElementActionProviderSettings.SectionName) as ElementActionProviderSettings;
                if (null == settings)
                {
                    throw new ConfigurationErrorsException(string.Format("Failed to load the configuration section '{0}' from the configuration", ElementActionProviderSettings.SectionName));
                }

                resources.ElementProviderNames = new List<string>();

                foreach (ElementActionProviderData data in settings.ElementActionProviderPlugins)
                {
                    resources.ElementProviderNames.Add(data.Name);
                }
            }
        }
	}
}
