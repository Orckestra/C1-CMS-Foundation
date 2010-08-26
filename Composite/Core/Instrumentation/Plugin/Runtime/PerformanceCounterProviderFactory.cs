using Composite.Core.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Core.Instrumentation.Plugin.Runtime
{
    internal sealed class PerformanceCounterProviderFactory : NameTypeFactoryBase<IPerformanceCounterProvider>
	{
        public PerformanceCounterProviderFactory()
            : base(ConfigurationServices.ConfigurationSource)
        {
        }
	}
}
