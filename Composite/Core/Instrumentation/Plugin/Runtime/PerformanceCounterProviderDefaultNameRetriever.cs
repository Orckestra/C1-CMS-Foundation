using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Core.Instrumentation.Plugin.Runtime
{
    internal sealed class PerformanceCounterProviderDefaultNameRetriever : IConfigurationNameMapper
	{
        public string MapName(string name, IConfigurationSource configSource)
        {
            return null;
        }
	}
}
