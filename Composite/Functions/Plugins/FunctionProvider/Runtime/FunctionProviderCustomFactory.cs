using System.Configuration;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Functions.Plugins.FunctionProvider.Runtime
{
    internal sealed class FunctionProviderCustomFactory : AssemblerBasedCustomFactory<IFunctionProvider, FunctionProviderData>
    {
        protected override FunctionProviderData GetConfiguration(string name, IConfigurationSource configurationSource)
        {
            FunctionProviderSettings settings = configurationSource.GetSection(FunctionProviderSettings.SectionName) as FunctionProviderSettings;

            if (null == settings)
            {
                throw new ConfigurationErrorsException(string.Format("The configuration section '{0}' was not found in the configuration", FunctionProviderSettings.SectionName));
            }

            return settings.FunctionProviderPlugins.Get(name);
        }
    }
}
