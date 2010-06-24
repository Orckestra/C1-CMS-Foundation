using System.Configuration;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Data.Plugins.DataProvider.Runtime
{
    internal sealed class DataProviderCustomFactory : AssemblerBasedCustomFactory<IDataProvider, DataProviderData>
    {
        protected override DataProviderData GetConfiguration(string name, IConfigurationSource configurationSource)
        {
            DataProviderSettings settings = configurationSource.GetSection(DataProviderSettings.SectionName) as DataProviderSettings;

            if (null == settings)
            {
                throw new ConfigurationErrorsException(string.Format("The configuration section '{0}' was not found in the configuration", DataProviderSettings.SectionName));
            }

            return settings.DataProviderPlugins.Get(name);
        }
    }
}
