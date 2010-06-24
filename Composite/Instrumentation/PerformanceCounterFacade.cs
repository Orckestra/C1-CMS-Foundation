using Composite.EventSystem;


namespace Composite.Instrumentation
{
	public static class PerformanceCounterFacade
	{
        private static IPerformanceCounterFacade _implementation = new PerformanceCounterFacadeImpl();


        internal static IPerformanceCounterFacade Implementation { get { return _implementation; } set { _implementation = value; } }
        


        static PerformanceCounterFacade()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }



        public static void SystemStartupIncrement()
        {
            _implementation.SystemStartupIncrement();
        }



        public static IPerformanceCounterToken BeginElementCreation()
        {
            return _implementation.BeginElementCreation();
        }



        /// <summary>
        /// 
        /// </summary>
        /// <param name="performanceToken">The token returned by BeginElementCreation</param>
        /// <param name="resultElementCount">Element count after security filtering</param>
        /// <param name="totalElementCount">Element count before security filtering</param>
        public static void EndElementCreation(IPerformanceCounterToken performanceToken, int resultElementCount, int totalElementCount)
        {
            _implementation.EndElementCreation(performanceToken, resultElementCount, totalElementCount);
        }



        public static IPerformanceCounterToken BeginAspNetControlCompile()
        {
            return _implementation.BeginAspNetControlCompile();
        }



        public static void EndAspNetControlCompile(IPerformanceCounterToken performanceToken, int controlsCompiledCount)
        {
            _implementation.EndAspNetControlCompile(performanceToken, controlsCompiledCount);
        }



        public static IPerformanceCounterToken BeginPageHookCreation()
        {
            return _implementation.BeginPageHookCreation();
        }



        public static void EndPageHookCreation(IPerformanceCounterToken performanceToken, int controlsCompiledCount)
        {
            _implementation.EndPageHookCreation(performanceToken, controlsCompiledCount);
        }



        public static void EntityTokenParentCacheHitIncrement()
        {
            _implementation.EntityTokenParentCacheHitIncrement();
        }



        public static void EntityTokenParentCacheMissIncrement()
        {
            _implementation.EntityTokenParentCacheMissIncrement();
        }


        private static void OnFlushEvent(FlushEventArgs args)
        {
            _implementation.Flush();
        }
	}
}
