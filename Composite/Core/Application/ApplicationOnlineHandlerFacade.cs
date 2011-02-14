using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Composite.Core.Application.Plugins.ApplicationOnlineHandler;


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
        /// 
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
        public static void TurnApplicationOffline(bool softTurnOff, bool clearGeneratedAssemblies)
        {
            _applicationOnlineHandlerFacade.TurnApplicationOffline(softTurnOff, clearGeneratedAssemblies);
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
            }
        }
    }
}
