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
            var moduleInstance = new ModuleInstance();
            context.AuthenticateRequest += moduleInstance.AuthenticateRequest;
            context.EndRequest += moduleInstance.EndRequest;
        }

        private class ModuleInstance
        {
            private DataScope _dataScope;

            public void AuthenticateRequest(object sender, EventArgs e)
            {
                if (SystemSetupFacade.IsSystemFirstTimeInitialized == false) return;

                HttpApplication application = (HttpApplication)sender;
                HttpContext context = application.Context;

                bool adminRootRequest = context.Request.Path.StartsWith(UrlUtils.AdminRootPath, StringComparison.OrdinalIgnoreCase);

                if (adminRootRequest == true && UserValidationFacade.IsLoggedIn() == true)
                {
                    _dataScope = new DataScope(DataScopeIdentifier.Administrated, UserSettings.ActiveLocaleCultureInfo);
                }
            }

            public void EndRequest(object sender, EventArgs e)
            {
                if (_dataScope != null)
                {
                    _dataScope.Dispose();
                }
            }
        }

        public void Dispose()
        {
        }
    }
}
