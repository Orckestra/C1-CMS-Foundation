using Composite.Core.Instrumentation.Foundation;
using Composite.Core.Instrumentation.Foundation.PluginFacades;


namespace Composite.Core.Instrumentation
{
	internal sealed class PerformanceCounterFacadeImpl : IPerformanceCounterFacade
	{
        public void SystemStartupIncrement()
        {
            string providerName = PerformanceCounterProviderRegistry.DefaultPerformanceCounterProviderName;

            PerformanceCounterProviderPluginFacade.SystemStartupIncrement(providerName);
        }



        public IPerformanceCounterToken BeginElementCreation()
        {
            string providerName = PerformanceCounterProviderRegistry.DefaultPerformanceCounterProviderName;

            return PerformanceCounterProviderPluginFacade.BeginElementCreation(providerName);
        }



        public void EndElementCreation(IPerformanceCounterToken performanceToken, int resultElementCount, int totalElementCount)
        {
            string providerName = PerformanceCounterProviderRegistry.DefaultPerformanceCounterProviderName;

            PerformanceCounterProviderPluginFacade.EndElementCreation(providerName, performanceToken, resultElementCount, totalElementCount);
        }



        public IPerformanceCounterToken BeginAspNetControlCompile()
        {
            string providerName = PerformanceCounterProviderRegistry.DefaultPerformanceCounterProviderName;

            return PerformanceCounterProviderPluginFacade.BeginAspNetControlCompile(providerName);
        }



        public void EndAspNetControlCompile(IPerformanceCounterToken performanceToken, int controlsCompiledCount)
        {
            string providerName = PerformanceCounterProviderRegistry.DefaultPerformanceCounterProviderName;

            PerformanceCounterProviderPluginFacade.EndAspNetControlCompile(providerName, performanceToken, controlsCompiledCount);
        }



        public IPerformanceCounterToken BeginPageHookCreation()
        {
            string providerName = PerformanceCounterProviderRegistry.DefaultPerformanceCounterProviderName;

            return PerformanceCounterProviderPluginFacade.BeginPageHookCreation(providerName);
        }



        public void EndPageHookCreation(IPerformanceCounterToken performanceToken, int controlsCompiledCount)
        {
            string providerName = PerformanceCounterProviderRegistry.DefaultPerformanceCounterProviderName;

            PerformanceCounterProviderPluginFacade.EndPageHookCreation(providerName, performanceToken, controlsCompiledCount);
        }



        public void EntityTokenParentCacheHitIncrement()
        {
            string providerName = PerformanceCounterProviderRegistry.DefaultPerformanceCounterProviderName;

            PerformanceCounterProviderPluginFacade.EntityTokenParentCacheHitIncrement(providerName);
        }



        public void EntityTokenParentCacheMissIncrement()
        {
            string providerName = PerformanceCounterProviderRegistry.DefaultPerformanceCounterProviderName;

            PerformanceCounterProviderPluginFacade.EntityTokenParentCacheMissIncrement(providerName);
        }


        public void Flush()
        {            
        }
    }
}
