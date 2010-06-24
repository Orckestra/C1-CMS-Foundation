using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Composite.EventSystem;


namespace Composite.Application.Foundation
{
	internal static class ApplicationStartupHandlerRegistry
	{
        private static IApplicationStartupHandlerRegistry _applicationStartupHandlerRegistry = new ApplicationStartupHandlerRegistryImpl();


        static ApplicationStartupHandlerRegistry()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }



        internal static IApplicationStartupHandlerRegistry Implementation { get { return _applicationStartupHandlerRegistry; } set { _applicationStartupHandlerRegistry = value; } }



        public static IEnumerable<string> ApplicationStartupHandlerNames
        {
            get
            {
                return _applicationStartupHandlerRegistry.ApplicationStartupHandlerNames;
            }
        }


        private static void Flush()
        {
            _applicationStartupHandlerRegistry.Flush();
        }



        private static void OnFlushEvent(FlushEventArgs args)
        {
            Flush();
        }
	}
}
