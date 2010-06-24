using System.Configuration;
using Composite.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.ResourceSystem.Plugins.ResourceProvider.Runtime
{
    public sealed class ResourceProviderSettings : SerializableConfigurationSection
	{
        public const string SectionName = "Composite.ResourceSystem.Plugins.ResourceProviderConfiguration";


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
