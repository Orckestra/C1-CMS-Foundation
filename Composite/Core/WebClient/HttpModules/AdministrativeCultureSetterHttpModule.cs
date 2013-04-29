using System;
using System.Globalization;
using System.Web;
using Composite.C1Console.Security;

namespace Composite.Core.WebClient.HttpModules
{
    internal class AdministrativeCultureSetterHttpModule : IHttpModule
    {
        public void Init(HttpApplication context)
        {
            context.AuthenticateRequest += context_AuthenticateRequest;
        }


        void context_AuthenticateRequest(object sender, EventArgs e)
        {
            HttpApplication application = (HttpApplication)sender;
            HttpContext context = application.Context;

            bool adminRootRequest = UrlUtils.IsAdminConsoleRequest(context);

            if (adminRootRequest)
            {
                if (UserValidationFacade.IsLoggedIn())
                {
                    System.Threading.Thread.CurrentThread.CurrentCulture = C1Console.Users.UserSettings.CultureInfo;
                    System.Threading.Thread.CurrentThread.CurrentUICulture = C1Console.Users.UserSettings.C1ConsoleUiLanguage;
                }
                else
                {
                    System.Threading.Thread.CurrentThread.CurrentCulture = CultureInfo.CreateSpecificCulture(Composite.Core.Configuration.GlobalSettingsFacade.DefaultCultureName);
                    System.Threading.Thread.CurrentThread.CurrentUICulture = CultureInfo.CreateSpecificCulture(Composite.Core.Configuration.GlobalSettingsFacade.DefaultCultureName);
                }
            }
        }


        public void Dispose()
        {
        }
    }
}
