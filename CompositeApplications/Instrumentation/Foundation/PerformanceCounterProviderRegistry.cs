using Composite.EventSystem;


namespace Composite.Instrumentation.Foundation
{
	internal static class PerformanceCounterProviderRegistry
	{
    private static IPerformanceCounterProviderRegistry _implementation = new PerformanceCounterProviderRegistryImpl();


        internal static IPerformanceCounterProviderRegistry Implementation { get { return _implementation; } set { _implementation = value; } }



        static PerformanceCounterProviderRegistry()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }



        public static string DefaultPerformanceCounterProviderName
        {
            get
            {
                return _implementation.DefaultPerformanceCounterProviderName;
            }
        }



        private static void Flush()
        {
            _implementation.Flush();
        }



        private static void OnFlushEvent(FlushEventArgs args)
        {
            Flush();
        }
	}
}
