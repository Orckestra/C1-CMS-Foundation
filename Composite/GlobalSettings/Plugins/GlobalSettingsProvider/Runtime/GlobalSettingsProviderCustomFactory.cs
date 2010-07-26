using System.Configuration;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.GlobalSettings.Plugins.GlobalSettingsProvider.Runtime
{
    internal sealed class GlobalSettingsProviderCustomFactory : AssemblerBasedCustomFactory<IGlobalSettingsProvider, GlobalSettingsProviderData>
    {
        protected override GlobalSettingsProviderData GetConfiguration(string name, IConfigurationSource configurationSource)
        {
            GlobalSettingsProviderSettings settings = configurationSource.GetSection(GlobalSettingsProviderSettings.SectionName) as GlobalSettingsProviderSettings;

            if (null == settings)
            {
                throw new ConfigurationErrorsException(string.Format("The configuration section '{0}' was not found in the configuration", GlobalSettingsProviderSettings.SectionName));
            }

            return settings.GlobalSettingsProviderPlugins.Get(name);
        }
    }
}
