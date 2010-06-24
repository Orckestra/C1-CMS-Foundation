using System.Collections.Generic;
using Composite.EventSystem;


namespace Composite.Elements.Foundation
{
	internal static class ElementActionProviderRegistry
	{
        private static IElementActionProviderRegistry _implementation = new ElementActionProviderRegistryImpl();


        internal static IElementActionProviderRegistry Implementation { get { return _implementation; } set { _implementation = value; } }


        static ElementActionProviderRegistry()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }



        public static IEnumerable<string> ElementActionProviderNames
        {
            get
            {
                return _implementation.ElementActionProviderNames;
            }
        }



        private static void OnFlushEvent(FlushEventArgs args)
        {
            _implementation.OnFlush();
        }
	}
}
