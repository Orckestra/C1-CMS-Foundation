using System;
using System.Web;
using Composite.C1Console.Security;
using Composite.C1Console.Users;
using Composite.C1Console.Actions;
using Composite.C1Console.Events;
using Composite.C1Console.Elements.Foundation;
using Composite.Core.Configuration;
using Composite.Data;

namespace Composite.Core.WebClient.HttpModules
{
    internal class AdministrativeDataScopeSetterHttpModule : IHttpModule
    {
        private static bool _consoleArtifactsInitialized = false;
        private static object _consoleArtifactsInitializeLock = new object();

        public void Init(HttpApplication context)
        {
            if (!SystemSetupFacade.IsSystemFirstTimeInitialized)
            {
                return;
            }

            var moduleInstance = new ModuleInstance();
            context.AuthorizeRequest += moduleInstance.AuthorizeRequest;
            context.EndRequest += moduleInstance.EndRequest;
        }

        private class ModuleInstance
        {
            private DataScope _dataScope;

            public void AuthorizeRequest(object sender, EventArgs e)
            {
                if (!SystemSetupFacade.IsSystemFirstTimeInitialized) return;

                HttpApplication application = (HttpApplication)sender;
                HttpContext context = application.Context;

                bool adminRootRequest = UrlUtils.IsAdminConsoleRequest(context);

                if (adminRootRequest && UserValidationFacade.IsLoggedIn())
                {
                    _dataScope = new DataScope(DataScopeIdentifier.Administrated, UserSettings.ActiveLocaleCultureInfo);

                    if (!_consoleArtifactsInitialized)
                    {
                        lock(_consoleArtifactsInitializeLock)
                        {
                            if (!_consoleArtifactsInitialized && !SystemSetupFacade.SetupIsRunning)
                            {
                                HookingFacade.EnsureInitialization();
                                FlowControllerFacade.Initialize();
                                ConsoleFacade.Initialize();
                                ElementProviderLoader.LoadAllProviders();
                                _consoleArtifactsInitialized = true;
                            }
                        }
                    }
                }
            }

            public void EndRequest(object sender, EventArgs e)
            {
                _dataScope?.Dispose();
                _dataScope = null;
            }
        }

        public void Dispose()
        {
        }
    }
}
