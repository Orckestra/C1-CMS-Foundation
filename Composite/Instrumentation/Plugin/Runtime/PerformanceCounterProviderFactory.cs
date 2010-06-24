using Composite.ConfigurationSystem;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Instrumentation.Plugin.Runtime
{
    internal sealed class PerformanceCounterProviderFactory : NameTypeFactoryBase<IPerformanceCounterProvider>
	{
        public PerformanceCounterProviderFactory()
            : base(ConfigurationServices.ConfigurationSource)
        {
        }
	}
}
