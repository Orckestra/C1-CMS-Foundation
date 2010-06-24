using Composite.Instrumentation.Plugin;


namespace Composite.Instrumentation
{
	internal interface IPerformanceCounterFacade
	{
        void SystemStartupIncrement();

        IPerformanceCounterToken BeginElementCreation();
        void EndElementCreation(IPerformanceCounterToken performanceToken, int resultElementCount, int totalElementCount);

        IPerformanceCounterToken BeginAspNetControlCompile();
        void EndAspNetControlCompile(IPerformanceCounterToken performanceToken, int controlsCompiledCount);

        IPerformanceCounterToken BeginPageHookCreation();
        void EndPageHookCreation(IPerformanceCounterToken performanceToken, int controlsCompiledCount);

        void EntityTokenParentCacheHitIncrement();
        void EntityTokenParentCacheMissIncrement();

        void Flush();
	}
}
