using System;

namespace Composite.Core.Application
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class ApplicationOnlineHandlerFacade
    {
        private static IApplicationOnlineHandlerFacade _applicationOnlineHandlerFacade = new ApplicationOnlineHandlerFacadeImpl();


        internal static IApplicationOnlineHandlerFacade Implementation { get { return _applicationOnlineHandlerFacade; } set { _applicationOnlineHandlerFacade = value; } }



        /// <summary>
        /// Turns application offline
        /// </summary>
        /// <param name="softTurnOff">
        /// Setting softTurnOff to true will only make the application offline to the client, but 
        /// not actually turning off the application. Setting this to false will turn off the 
        /// application.
        /// </param>
        public static void TurnApplicationOffline(bool softTurnOff)
        {
            _applicationOnlineHandlerFacade.TurnApplicationOffline(softTurnOff, true);
        }



        /// <exclude />
        public static void TurnApplicationOffline(bool softTurnOff, bool recompileCompositeGenerated)
        {
            _applicationOnlineHandlerFacade.TurnApplicationOffline(softTurnOff, recompileCompositeGenerated);
        }


        /// <exclude />
        public static bool CanPutApplicationOffline(bool softTurnOff, out string errorMessage)
        {
            return _applicationOnlineHandlerFacade.CanPutApplicationOffline(softTurnOff, out errorMessage);
        }


        /// <exclude />
        public static void TurnApplicationOnline()
        {
            _applicationOnlineHandlerFacade.TurnApplicationOnline();
        }



        /// <exclude />
        public static IDisposable TurnOffScope(bool softTurnOff)
        {
            TurnApplicationOffline(softTurnOff);
            return new TurnOffToken();
        }


        /// <exclude />
        public static bool IsApplicationOnline
        {
            get
            {
                return _applicationOnlineHandlerFacade.IsApplicationOnline;
            }
        }



        private sealed class TurnOffToken : IDisposable
        {
            public void Dispose()
            {
                ApplicationOnlineHandlerFacade.TurnApplicationOnline();
#if LeakCheck
                GC.SuppressFinalize(this);
#endif
            }

#if LeakCheck
            private string stack = Environment.StackTrace;
            /// <exclude />
            ~TurnOffToken()
            {
                Composite.Core.Instrumentation.DisposableResourceTracer.RegisterFinalizerExecution(stack);
            }
#endif
        }
    }
}
