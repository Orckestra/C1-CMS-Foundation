using System.Collections.Generic;
using Composite.C1Console.Events;


namespace Composite.Core.WebClient.Renderings.Foundation
{
	internal static class RenderingResponseHandlerRegistry
	{
        private static IRenderingResponseHandlerRegistry _implementation = new RenderingResponseHandlerRegistryImpl();


        static RenderingResponseHandlerRegistry()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }



        internal static IRenderingResponseHandlerRegistry Implementation { get { return _implementation; } set { _implementation = value; } }



        public static IEnumerable<string> RenderingResponseHandlerNames
        {
            get
            {
                return _implementation.RenderingResponseHandlerNames;
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
