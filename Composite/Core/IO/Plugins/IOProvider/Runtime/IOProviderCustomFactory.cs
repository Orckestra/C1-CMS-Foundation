using System.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Core.IO.Plugins.IOProvider.Runtime
{
    internal sealed class IOProviderCustomFactory : AssemblerBasedCustomFactory<IIOProvider, IOProviderData>
    {
        protected override IOProviderData GetConfiguration(string name, IConfigurationSource configurationSource)
        {
            IOProviderSettings settings = configurationSource.GetSection(IOProviderSettings.SectionName) as IOProviderSettings;

            if (null == settings)
            {
                throw new ConfigurationErrorsException(string.Format("The configuration section '{0}' was not found in the configuration", IOProviderSettings.SectionName));
            }

            return settings.IOProviderPlugins.Get(name);
        }
    }
}
