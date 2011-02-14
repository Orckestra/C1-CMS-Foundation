using Composite.C1Console.Events;


namespace Composite.Core.Instrumentation
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public static class PerformanceCounterFacade
	{
        private static IPerformanceCounterFacade _implementation = new PerformanceCounterFacadeImpl();


        internal static IPerformanceCounterFacade Implementation { get { return _implementation; } set { _implementation = value; } }
        


        static PerformanceCounterFacade()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }



        /// <exclude />
        public static void SystemStartupIncrement()
        {
            _implementation.SystemStartupIncrement();
        }



        /// <exclude />
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



        /// <exclude />
        public static IPerformanceCounterToken BeginAspNetControlCompile()
        {
            return _implementation.BeginAspNetControlCompile();
        }



        /// <exclude />
        public static void EndAspNetControlCompile(IPerformanceCounterToken performanceToken, int controlsCompiledCount)
        {
            _implementation.EndAspNetControlCompile(performanceToken, controlsCompiledCount);
        }



        /// <exclude />
        public static IPerformanceCounterToken BeginPageHookCreation()
        {
            return _implementation.BeginPageHookCreation();
        }



        /// <exclude />
        public static void EndPageHookCreation(IPerformanceCounterToken performanceToken, int controlsCompiledCount)
        {
            _implementation.EndPageHookCreation(performanceToken, controlsCompiledCount);
        }



        /// <exclude />
        public static void EntityTokenParentCacheHitIncrement()
        {
            _implementation.EntityTokenParentCacheHitIncrement();
        }



        /// <exclude />
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
