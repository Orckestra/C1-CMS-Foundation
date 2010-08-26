using Composite.C1Console.Events;


namespace Composite.Core.Parallelization.Foundation
{
	internal static class ParallelizationProviderRegistry
	{
        private static IParallelizationProviderRegistry _implementation = new ParallelizationProviderRegistryImpl();


        internal static IParallelizationProviderRegistry Implementation { get { return _implementation; } set { _implementation = value; } }



        static ParallelizationProviderRegistry()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }


        public static bool Enabled
        {
            get
            {
                return _implementation.Enabled;
            }
        }


        public static string[] DisabledParallelizationPoints
        {
            get
            {
                return _implementation.DisabledParallelizationPoints;
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
