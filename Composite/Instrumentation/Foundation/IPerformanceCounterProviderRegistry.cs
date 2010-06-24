

namespace Composite.Instrumentation.Foundation
{
	internal interface IPerformanceCounterProviderRegistry
	{
        string DefaultPerformanceCounterProviderName { get; }
        void Flush();
	}
}
