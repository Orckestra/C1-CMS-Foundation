using Composite.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.Instrumentation.Plugin
{
    [ConfigurationElementType(typeof(NonConfigurablePerformanceCounterProvider))]
    internal class PerformanceCounterProviderData : NameTypeManagerTypeConfigurationElement
	{
	}
}
