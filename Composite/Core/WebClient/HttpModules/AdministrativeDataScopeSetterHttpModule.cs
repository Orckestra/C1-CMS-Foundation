using System;
using System.Web;
using Composite.C1Console.Security;
using Composite.Data;
using Composite.C1Console.Users;
using Composite.Core.Configuration;


namespace Composite.Core.WebClient.HttpModules
{
    internal class AdministrativeDataScopeSetterHttpModule : IHttpModule
    {
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
