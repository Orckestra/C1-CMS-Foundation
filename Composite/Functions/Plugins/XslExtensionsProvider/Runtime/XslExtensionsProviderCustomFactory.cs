using System.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;

namespace Composite.Functions.Plugins.XslExtensionsProvider.Runtime
{
    internal sealed class XslExtensionsProviderCustomFactory : AssemblerBasedCustomFactory<IXslExtensionsProvider, XslExtensionsProviderData>
    {
        protected override XslExtensionsProviderData GetConfiguration(string name, IConfigurationSource configurationSource)
        {
            XslExtensionsProviderSettings settings =
                configurationSource.GetSection(XslExtensionsProviderSettings.SectionName) as XslExtensionsProviderSettings;

            if (null == settings)
            {
                throw new ConfigurationErrorsException(
                    string.Format("The configuration section '{0}' was not found in the configuration",
                                  XslExtensionsProviderSettings.SectionName));
            }

            return settings.XslExtensionProviders.Get(name);
        }
    }
}
