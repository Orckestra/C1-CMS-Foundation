using System.Configuration;
using Composite.Core.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.Core.ResourceSystem.Plugins.ResourceProvider.Runtime
{
    internal sealed class ResourceProviderSettings : SerializableConfigurationSection
	{
        public const string SectionName = "Composite.Core.ResourceSystem.Plugins.ResourceProviderConfiguration";


        private const string _resourceProviderPluginsProperty = "ResourceProviderPlugins";
        [ConfigurationProperty(_resourceProviderPluginsProperty)]
        public NameTypeManagerTypeConfigurationElementCollection<ResourceProviderData> ResourceProviderPlugins
        {
            get
            {
                return (NameTypeManagerTypeConfigurationElementCollection<ResourceProviderData>)base[_resourceProviderPluginsProperty];
            }
        }
	}
}
