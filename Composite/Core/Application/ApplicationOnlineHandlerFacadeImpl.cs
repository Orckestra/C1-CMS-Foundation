using System;
using System.Threading;
using System.Web.Hosting;
using Composite.C1Console.Events;
using Composite.Core.Application.Foundation.PluginFacades;
using Composite.Core.Types;


namespace Composite.Core.Application
{
    internal class ApplicationOnlineHandlerFacadeImpl : IApplicationOnlineHandlerFacade
    {
        private static readonly string LogTitle = typeof (ApplicationOnlineHandlerFacadeImpl).Name;

        private bool _isApplicationOnline = true;
        private bool _wasLastTurnOffSoft = false;
        private bool _recompileCompositeGenerated;
        //private ShutdownGuard _shutdownGuard;


        public void TurnApplicationOffline(bool softTurnOff, bool recompileCompositeGenerated)
        {
            Verify.IsTrue(this.IsApplicationOnline, "The application is already offline");

            Log.LogVerbose("ApplicationOnlineHandlerFacade", string.Format("Turning off the application ({0})", softTurnOff == true ? "Soft" : "Hard"));


            _recompileCompositeGenerated = recompileCompositeGenerated;

            //_shutdownGuard = new ShutdownGuard();

            try
            {
                if (softTurnOff == false)
                {
                    ApplicationOnlineHandlerPluginFacade.TurnApplicationOffline();
                    Verify.IsFalse(ApplicationOnlineHandlerPluginFacade.IsApplicationOnline(), "Plugin failed to turn the application offline");
                }
                else
                {
                    ConsoleMessageQueueFacade.Enqueue(new LockSystemConsoleMessageQueueItem(), "");
                }
            }
            catch(Exception)
            {
               // _shutdownGuard.Dispose();
                //_shutdownGuard = null;

                throw;
            }

            _isApplicationOnline = false;
            _wasLastTurnOffSoft = softTurnOff;
        }



        public void TurnApplicationOnline()
        {
            Verify.IsFalse(this.IsApplicationOnline, "The application is already online");

            Log.LogVerbose("ApplicationOnlineHandlerFacade", "Turning on the application");

            if (_recompileCompositeGenerated)
            {
                try
                {
                    CodeGenerationManager.GenerateCompositeGeneratedAssembly();
                }
                catch (Exception ex)
                {
                    Log.LogError(LogTitle, "Failed to recompile Composite.Generated.dll");
                    Log.LogError(LogTitle, ex);
                }
            }            

            try
            {
                if (_wasLastTurnOffSoft == false)
                {
                    ApplicationOnlineHandlerPluginFacade.TurnApplicationOnline();
                    Verify.IsTrue(ApplicationOnlineHandlerPluginFacade.IsApplicationOnline(), "Plugin failed to turn the application online");
                }
            }
            finally
            {
                // Adding a sleep, so delayed notification from FileWatcher will not kill a newly spawned AppDomain
                //Thread.Sleep(250); 

                //_shutdownGuard.Dispose();
                //_shutdownGuard = null;

                //if (HostingEnvironment.IsHosted)
                //{
                //    HostingEnvironment.InitiateShutdown();
                //}
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


        public bool CanPutApplicationOffline(bool softTurnOff, out string errorMessage)
        {
            if(softTurnOff)
            {
                errorMessage = null;
                return true;
            }

            return ApplicationOnlineHandlerPluginFacade.CanPutApplicationOffline(out errorMessage);
        }
    }
}
