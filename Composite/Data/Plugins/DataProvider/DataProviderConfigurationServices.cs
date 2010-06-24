using System;
using System.Linq;
using Composite.ConfigurationSystem;
using Composite.Data.Plugins.DataProvider.Runtime;


namespace Composite.Data.Plugins.DataProvider
{    
    public static class DataProviderConfigurationServices
    {
        public static DataProviderData GetDataProviderConfiguration(string providerName)
        {
            DataProviderSettings settings = (DataProviderSettings)ConfigurationServices.ConfigurationSource.GetSection(DataProviderSettings.SectionName);
            if (settings.DataProviderPlugins.Contains(providerName) == false) throw new ArgumentException("Unknown provider name", "providerName");
            return settings.DataProviderPlugins.Get(providerName);
        }


        [Obsolete("This method is pending deletion")]
        public static void SaveDataProviderConfiguration(DataProviderData dataProviderData)
        {
            throw new NotImplementedException("This method is obsolite");

           /* DataProviderSettings settings = (DataProviderSettings)ConfigurationServices.ConfigurationSource.GetSection(DataProviderSettings.SectionName);

            DataProviderSettings newSettings = new DataProviderSettings();
            newSettings.DefaultDynamicTypeDataProviderName = settings.DefaultDynamicTypeDataProviderName;
            newSettings.DataProviderPlugins.Add(dataProviderData);
            foreach (var plugin in settings.DataProviderPlugins.Where(p => p.Name != dataProviderData.Name))
                newSettings.DataProviderPlugins.Add(plugin);

            ConfigurationServices.SaveConfigurationSection(DataProviderSettings.SectionName, newSettings);*/
        }
    }
}
