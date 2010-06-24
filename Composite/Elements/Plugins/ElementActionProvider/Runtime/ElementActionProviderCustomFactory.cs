using System.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Elements.Plugins.ElementActionProvider.Runtime
{
    internal sealed class ElementActionProviderCustomFactory : AssemblerBasedCustomFactory<IElementActionProvider, ElementActionProviderData>
    {
        protected override ElementActionProviderData GetConfiguration(string name, IConfigurationSource configurationSource)
        {
            ElementActionProviderSettings settings = configurationSource.GetSection(ElementActionProviderSettings.SectionName) as ElementActionProviderSettings;

            if (null == settings)
            {
                throw new ConfigurationErrorsException(string.Format("The configuration section '{0}' was not found in the configuration", ElementActionProviderSettings.SectionName));
            }

            return settings.ElementActionProviderPlugins.Get(name);
        }
    }
}
