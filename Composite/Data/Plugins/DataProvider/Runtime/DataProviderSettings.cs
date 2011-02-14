using System.Configuration;
using Composite.Core.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.Data.Plugins.DataProvider.Runtime
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class DataProviderSettings : SerializableConfigurationSection
    {
        /// <exclude />
        public const string SectionName = "Composite.Data.Plugins.DataProviderConfiguration";


        private const string _defaultDynamicTypeDataProviderNameProperty = "defaultDynamicTypeDataProviderName";
        /// <exclude />
        [ConfigurationProperty(_defaultDynamicTypeDataProviderNameProperty, IsRequired = true)]
        public string DefaultDynamicTypeDataProviderName
        {
            get { return (string)base[_defaultDynamicTypeDataProviderNameProperty]; }
            set { base[_defaultDynamicTypeDataProviderNameProperty] = value; }
        }


        private const string _dataProviderPluginsProperty = "DataProviderPlugins";
        /// <exclude />
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
