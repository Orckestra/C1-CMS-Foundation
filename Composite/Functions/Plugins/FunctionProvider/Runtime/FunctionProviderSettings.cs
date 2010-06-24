using System.Configuration;

using Composite.Configuration;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.Functions.Plugins.FunctionProvider.Runtime
{
    public sealed class FunctionProviderSettings : SerializableConfigurationSection
    {
        public const string SectionName = "Composite.Functions.Plugins.FunctionProviderConfiguration";


        private const string _dataProviderPluginsProperty = "FunctionProviderPlugins";
        [ConfigurationProperty(_dataProviderPluginsProperty)]
        public NameTypeManagerTypeConfigurationElementCollection<FunctionProviderData> FunctionProviderPlugins
        {
            get
            {
                return (NameTypeManagerTypeConfigurationElementCollection<FunctionProviderData>)base[_dataProviderPluginsProperty];
            }
        }
    }
}
