using System.Configuration;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.GlobalSettings.Plugins.GlobalSettingsProvider.Runtime
{
    public sealed class GlobalSettingsProviderSettings : SerializableConfigurationSection
    {
        public const string SectionName = "Composite.GlobalSettings.Plugins.GlobalSettingsProviderConfiguration";

        private const string _defaultGlobalSettingsProviderProperty = "defaultGlobalSettingsProvider";
        [ConfigurationProperty(_defaultGlobalSettingsProviderProperty, IsRequired = true)]
        public string DefaultGlobalSettingsProvider
        {
            get { return (string)base[_defaultGlobalSettingsProviderProperty]; }
            set { base[_defaultGlobalSettingsProviderProperty] = value; }
        }


        private const string _globalSettingsProviderPluginsProperty = "GlobalSettingsProviderPlugins";
        [ConfigurationProperty(_globalSettingsProviderPluginsProperty, IsRequired = true)]
        public NameTypeConfigurationElementCollection<GlobalSettingsProviderData, GlobalSettingsProviderData> GlobalSettingsProviderPlugins
        {
            get
            {
                return (NameTypeConfigurationElementCollection<GlobalSettingsProviderData, GlobalSettingsProviderData>)base[_globalSettingsProviderPluginsProperty];
            }
        }
    }
}
