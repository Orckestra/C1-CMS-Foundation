using System.Configuration;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Actions.Plugins.DataActionProvider.Runtime
{
    internal sealed class DataActionProviderCustomFactory : AssemblerBasedCustomFactory<IDataActionProvider, DataActionProviderData>
    {
        protected override DataActionProviderData GetConfiguration(string name, IConfigurationSource configurationSource)
        {
            DataActionProviderSettings settings = configurationSource.GetSection(DataActionProviderSettings.SectionName) as DataActionProviderSettings;

            if (null == settings)
            {
                throw new ConfigurationErrorsException(string.Format("The configuration section '{0}' was not found in the configuration", DataActionProviderSettings.SectionName));
            }

            return settings.DataActionProviderPlugins.Get(name);
        }
    }
}
