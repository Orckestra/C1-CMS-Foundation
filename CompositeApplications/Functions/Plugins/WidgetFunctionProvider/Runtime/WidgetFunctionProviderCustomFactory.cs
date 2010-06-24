using System.Configuration;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Functions.Plugins.WidgetFunctionProvider.Runtime
{
    internal sealed class WidgetFunctionProviderCustomFactory : AssemblerBasedCustomFactory<IWidgetFunctionProvider, WidgetFunctionProviderData>
    {
        protected override WidgetFunctionProviderData GetConfiguration(string name, IConfigurationSource configurationSource)
        {
            WidgetFunctionProviderSettings settings = configurationSource.GetSection(WidgetFunctionProviderSettings.SectionName) as WidgetFunctionProviderSettings;

            if (null == settings)
            {
                throw new ConfigurationErrorsException(string.Format("The configuration section '{0}' was not found in the configuration", WidgetFunctionProviderSettings.SectionName));
            }

            return settings.WidgetFunctionProviderPlugins.Get(name);
        }
    }
}
