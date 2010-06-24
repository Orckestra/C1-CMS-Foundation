using System.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Instrumentation.Plugin.Runtime
{
    internal sealed class PerformanceCounterProviderCustomFactory : AssemblerBasedCustomFactory<IPerformanceCounterProvider, PerformanceCounterProviderData>
	{
        protected override PerformanceCounterProviderData GetConfiguration(string name, IConfigurationSource configurationSource)
        {
            PerformanceCounterProviderSettings settings = configurationSource.GetSection(PerformanceCounterProviderSettings.SectionName) as PerformanceCounterProviderSettings;

            if (null == settings)
            {
                throw new ConfigurationErrorsException(string.Format("The configuration section '{0}' was not found in the configuration", PerformanceCounterProviderSettings.SectionName));
            }

            return settings.PerformanceCounterProviderPlugins.Get(name);
        }
	}
}
