using System.Collections.Generic;
using Composite.EventSystem;
using System;


namespace Composite.Elements.Foundation
{
	internal static class ElementAttachingProviderRegistry
	{
        private static IElementAttachingProviderRegistry _implementation = new ElementAttachingProviderRegistryImpl();


        internal static IElementAttachingProviderRegistry Implementation { get { return _implementation; } set { _implementation = value; } }


        static ElementAttachingProviderRegistry()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }



        public static IEnumerable<string> ElementAttachingProviderNames
        {
            get
            {
                return _implementation.ElementAttachingProviderNames;
            }
        }



        public static Type GetElementProviderType(string elementProviderName)
        {
            return _implementation.GetElementProviderType(elementProviderName);
        }



        private static void OnFlushEvent(FlushEventArgs args)
        {
            _implementation.OnFlush();
        }
	}
}
