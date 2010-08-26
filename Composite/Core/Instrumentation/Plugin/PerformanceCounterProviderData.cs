using Composite.Core.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.Core.Instrumentation.Plugin
{
    [ConfigurationElementType(typeof(NonConfigurablePerformanceCounterProvider))]
    internal class PerformanceCounterProviderData : NameTypeManagerTypeConfigurationElement
	{
	}
}
