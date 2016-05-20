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
        private const string HttpContextItemsKey = nameof(AdministrativeDataScopeSetterHttpModule) + ":DataScope";

        public void Init(HttpApplication context)
        {
            context.AuthenticateRequest += AuthenticateRequest;
            context.EndRequest += EndRequest;
        }

        private static void AuthenticateRequest(object sender, EventArgs e)
        {
            if (!SystemSetupFacade.IsSystemFirstTimeInitialized) return;

            HttpContext context = ((HttpApplication)sender).Context;

            bool adminRootRequest = UrlUtils.IsAdminConsoleRequest(context);

            if (adminRootRequest && UserValidationFacade.IsLoggedIn())
            {
                var dataScope = new DataScope(DataScopeIdentifier.Administrated, UserSettings.ActiveLocaleCultureInfo);
                context.Items[HttpContextItemsKey] = dataScope;
            }

        }

        private static void EndRequest(object sender, EventArgs e)
        {
            HttpContext context = ((HttpApplication)sender).Context;
            var dataScope = context.Items[HttpContextItemsKey] as DataScope;

            dataScope?.Dispose();
        }

        public void Dispose()
        {
        }
    }
}
