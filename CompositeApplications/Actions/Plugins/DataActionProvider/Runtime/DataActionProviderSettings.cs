using System.Configuration;

using Composite.Configuration;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.Actions.Plugins.DataActionProvider.Runtime
{
    internal sealed class DataActionProviderSettings : SerializableConfigurationSection
    {
        public const string SectionName = "Composite.Actions.Plugins.DataActionProviderConfiguration";


        private const string _dataActionProviderPluginsProperty = "DataActionProviderPlugins";
        [ConfigurationProperty(_dataActionProviderPluginsProperty)]
        public NameTypeManagerTypeConfigurationElementCollection<DataActionProviderData> DataActionProviderPlugins
        {
            get
            {
                return (NameTypeManagerTypeConfigurationElementCollection<DataActionProviderData>)base[_dataActionProviderPluginsProperty];
            }
        }
    }
}
