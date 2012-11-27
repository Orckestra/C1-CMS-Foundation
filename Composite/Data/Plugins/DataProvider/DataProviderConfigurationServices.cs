using System;
using System.Linq;
using Composite.Core.Configuration;
using Composite.Data.Plugins.DataProvider.Runtime;


namespace Composite.Data.Plugins.DataProvider
{    
    internal static class DataProviderConfigurationServices
    {
        public static DataProviderData GetDataProviderConfiguration(string providerName)
        {
            DataProviderSettings settings = (DataProviderSettings)ConfigurationServices.ConfigurationSource.GetSection(DataProviderSettings.SectionName);
            if (settings.DataProviderPlugins.Contains(providerName) == false) throw new ArgumentException("Unknown provider name", "providerName");
            return settings.DataProviderPlugins.Get(providerName);
        }
    }
}
