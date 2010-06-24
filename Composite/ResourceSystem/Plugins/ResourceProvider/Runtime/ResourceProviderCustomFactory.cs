using System.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.ResourceSystem.Plugins.ResourceProvider.Runtime
{
    internal sealed class ResourceProviderCustomFactory : AssemblerBasedCustomFactory<IResourceProvider, ResourceProviderData>
	{
        protected override ResourceProviderData GetConfiguration(string name, IConfigurationSource configurationSource)
        {
            ResourceProviderSettings settings = configurationSource.GetSection(ResourceProviderSettings.SectionName) as ResourceProviderSettings;

            if (null == settings)
            {
                throw new ConfigurationErrorsException(string.Format("The configuration section '{0}' was not found in the configuration", ResourceProviderSettings.SectionName));
            }

            return settings.ResourceProviderPlugins.Get(name);
        }
	}
}
