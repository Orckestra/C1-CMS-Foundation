using System.Configuration;
using Composite.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.Data.Plugins.DataProvider.Runtime
{
    public sealed class DataProviderSettings : SerializableConfigurationSection
    {
        public const string SectionName = "Composite.Data.Plugins.DataProviderConfiguration";

        private const string _defaultDynamicTypeDataProviderNameProperty = "defaultDynamicTypeDataProviderName";
        [ConfigurationProperty(_defaultDynamicTypeDataProviderNameProperty, IsRequired = true)]
        public string DefaultDynamicTypeDataProviderName
        {
            get { return (string)base[_defaultDynamicTypeDataProviderNameProperty]; }
            set { base[_defaultDynamicTypeDataProviderNameProperty] = value; }
        }


        private const string _dataProviderPluginsProperty = "DataProviderPlugins";
        [ConfigurationProperty(_dataProviderPluginsProperty)]
        public NameTypeManagerTypeConfigurationElementCollection<DataProviderData> DataProviderPlugins
        {
            get
            {
                return (NameTypeManagerTypeConfigurationElementCollection<DataProviderData>)base[_dataProviderPluginsProperty];
            }
        }
    }
}
