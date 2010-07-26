using System.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Elements.Plugins.ElementAttachingProvider.Runtime
{
    internal sealed class ElementAttachingProviderCustomFactory : AssemblerBasedCustomFactory<IElementAttachingProvider, ElementAttachingProviderData>
    {
        protected override ElementAttachingProviderData GetConfiguration(string name, IConfigurationSource configurationSource)
        {
            ElementAttachingProviderSettings settings = configurationSource.GetSection(ElementAttachingProviderSettings.SectionName) as ElementAttachingProviderSettings;

            if (null == settings)
            {
                throw new ConfigurationErrorsException(string.Format("The configuration section '{0}' was not found in the configuration", ElementAttachingProviderSettings.SectionName));
            }

            return settings.ElementAttachingProviderPlugins.Get(name);
        }
    }
}
