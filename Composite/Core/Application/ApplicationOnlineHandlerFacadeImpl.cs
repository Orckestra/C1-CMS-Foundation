using System;
using System.Web.Hosting;
using Composite.Core.Application.Foundation.PluginFacades;
using Composite.Core.Logging;
using Composite.Core.Types;
using Composite.C1Console.Events;


namespace Composite.Core.Application
{
    internal class ApplicationOnlineHandlerFacadeImpl : IApplicationOnlineHandlerFacade
    {
        private bool _isApplicationOnline = true;
        private bool _wasLastTurnOffSoft = false;
        private bool _buildManagerCachingWasDisabled;
        private ShutdownGuard _shutdownGuard;

        public void TurnApplicationOffline(bool softTurnOff, bool clearGeneratedAssemblies)
        {
            if (this.IsApplicationOnline == false) throw new InvalidOperationException("The application is already offline");

            LoggingService.LogVerbose("ApplicationOnlineHandlerFacade", string.Format("Turning off the application ({0})", softTurnOff == true ? "Soft" : "Hard"));


            _shutdownGuard = new ShutdownGuard();

            if (softTurnOff == false)
            {
                ApplicationOnlineHandlerPluginFacade.TurnApplicationOffline();
                if (ApplicationOnlineHandlerPluginFacade.IsApplicationOnline() == true) throw new InvalidOperationException("Plugin failed to turn the application offline");
            }
            else
            {
                ConsoleMessageQueueFacade.Enqueue(new LockSystemConsoleMessageQueueItem(), "");
            }

            _isApplicationOnline = false;
            _wasLastTurnOffSoft = softTurnOff;

            if ((clearGeneratedAssemblies == true) && (BuildManager.CachingEnabled == true))
            {
                _buildManagerCachingWasDisabled = true;
                BuildManager.CachingEnabled = false;
            }
        }



        public void TurnApplicationOnline()
        {
            if (this.IsApplicationOnline == true) throw new InvalidOperationException("The application is already online");

            try
            {
                LoggingService.LogVerbose("ApplicationOnlineHandlerFacade", "Turning on the application");

                if (_buildManagerCachingWasDisabled)
                {
                    BuildManager.CachingEnabled = true;
                    BuildManager.ClearCache();
                    // We're not turning-on caching since in this case changing of Composite.Generated will be done 
                    // at the same time with loading a new application domain.
                    BuildManager.CachingEnabled = false;
                }
            }
            finally
            {
                _shutdownGuard.Dispose();
                _shutdownGuard = null;
            }

            if (_wasLastTurnOffSoft == false)
            {
                ApplicationOnlineHandlerPluginFacade.TurnApplicationOnline();
                if (ApplicationOnlineHandlerPluginFacade.IsApplicationOnline() == false) throw new InvalidOperationException("Plugin failed to turn the application online");
            } 

            if (HostingEnvironment.IsHosted)
            {
                HostingEnvironment.InitiateShutdown();
            }

            _isApplicationOnline = true;
        }



        public bool IsApplicationOnline
        {
            get
            {
                return _isApplicationOnline;
            }
        }
    }
}
