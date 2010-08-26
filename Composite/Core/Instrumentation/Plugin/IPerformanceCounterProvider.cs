using Composite.Core.Instrumentation.Plugin.Runtime;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Core.Instrumentation.Plugin
{
    [CustomFactory(typeof(PerformanceCounterProviderCustomFactory))]
    [ConfigurationNameMapper(typeof(PerformanceCounterProviderDefaultNameRetriever))]
	internal interface IPerformanceCounterProvider
	{
        void SystemStartupIncrement();

        IPerformanceCounterToken BeginElementCreation();
        void EndElementCreation(IPerformanceCounterToken performanceToken, int resultElementCount, int totalElementCount);

        IPerformanceCounterToken BeginAspNetControlCompile();
        void EndAspNetControlCompile(IPerformanceCounterToken performanceToken, int controlsCompiledCount);

        IPerformanceCounterToken BeginPageHookCreation();
        void EndPageHookCreation(IPerformanceCounterToken performanceToken, int pageCount);

        void EntityTokenParentCacheHitIncrement();
        void EntityTokenParentCacheMissIncrement();
	}
}
