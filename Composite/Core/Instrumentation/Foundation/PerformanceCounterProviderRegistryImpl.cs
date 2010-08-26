using Composite.Core.Configuration;
using Composite.Core.Instrumentation.Plugin.Runtime;


namespace Composite.Core.Instrumentation.Foundation
{
    internal sealed class PerformanceCounterProviderRegistryImpl : IPerformanceCounterProviderRegistry
	{
        private string _defaultPerformanceCounterProviderName = null;


        public string DefaultPerformanceCounterProviderName
        {
            get
            {
                if (_defaultPerformanceCounterProviderName == null)
                {
                    PerformanceCounterProviderSettings parallelizationProviderSettings = ConfigurationServices.ConfigurationSource.GetSection(PerformanceCounterProviderSettings.SectionName) as PerformanceCounterProviderSettings;

                    _defaultPerformanceCounterProviderName = parallelizationProviderSettings.DefaultPerformanceCounterProviderName;
                }

                return _defaultPerformanceCounterProviderName;
            }
        }



        public void Flush()
        {
            _defaultPerformanceCounterProviderName = null;
        }
	}
}
