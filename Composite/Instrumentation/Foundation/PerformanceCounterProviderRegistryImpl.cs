using Composite.ConfigurationSystem;
using Composite.Instrumentation.Plugin.Runtime;


namespace Composite.Instrumentation.Foundation
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
