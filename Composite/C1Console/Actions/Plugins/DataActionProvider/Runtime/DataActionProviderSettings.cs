using System.Configuration;

using Composite.Core.Configuration;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.C1Console.Actions.Plugins.DataActionProvider.Runtime
{
    internal sealed class DataActionProviderSettings : SerializableConfigurationSection
    {
        public const string SectionName = "Composite.C1Console.Actions.Plugins.DataActionProviderConfiguration";


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
