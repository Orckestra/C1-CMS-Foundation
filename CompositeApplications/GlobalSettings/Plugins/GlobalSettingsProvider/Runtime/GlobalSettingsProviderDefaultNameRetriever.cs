using System;
using System.Configuration;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.GlobalSettings.Plugins.GlobalSettingsProvider.Runtime
{
    internal sealed class GlobalSettingsProviderDefaultNameRetriever : IConfigurationNameMapper
    {
        public string MapName(string name, IConfigurationSource configSource)
        {
            if (null == configSource) throw new ArgumentNullException("configSource");

            if (null != name)
            {
                return name;
            }
            else
            {
                GlobalSettingsProviderSettings settings = configSource.GetSection(GlobalSettingsProviderSettings.SectionName) as GlobalSettingsProviderSettings;

                if (null == settings)
                {
                    throw new ConfigurationErrorsException(string.Format("Could not load configuration section {0}", GlobalSettingsProviderSettings.SectionName));
                }

                return settings.DefaultGlobalSettingsProvider;
            }
        }
    }
}
