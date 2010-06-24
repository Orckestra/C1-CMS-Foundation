using System.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Elements.Plugins.ElementProvider.Runtime
{
#pragma warning disable 612

    internal sealed class ElementProviderCustomFactory : AssemblerBasedCustomFactory<IElementProvider, ElementProviderData>
    {
        protected override ElementProviderData GetConfiguration(string name, IConfigurationSource configurationSource)
        {
            ElementProviderSettings settings = configurationSource.GetSection(ElementProviderSettings.SectionName) as ElementProviderSettings;

            if (null == settings)
            {
                throw new ConfigurationErrorsException(string.Format("The configuration section '{0}' was not found in the configuration", ElementProviderSettings.SectionName));
            }

            return (ElementProviderData)settings.ElementProviderPlugins.Get(name);
        }
    }

#pragma warning restore 612
}
