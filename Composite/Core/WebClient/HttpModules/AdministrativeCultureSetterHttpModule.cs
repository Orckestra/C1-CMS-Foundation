using System;
using System.Globalization;
using System.Threading;
using System.Web;
using Composite.C1Console.Security;
using Composite.C1Console.Users;
using Composite.Core.Configuration;

namespace Composite.Core.WebClient.HttpModules
{
    internal class AdministrativeCultureSetterHttpModule : IHttpModule
    {
        public void Init(HttpApplication context)
        {
            if (!SystemSetupFacade.IsSystemFirstTimeInitialized)
            {
                return;
            }

            context.AuthorizeRequest += context_AuthorizeRequest;
        }


        void context_AuthorizeRequest(object sender, EventArgs e)
        {
            HttpApplication application = (HttpApplication)sender;
            HttpContext context = application.Context;

            bool adminRootRequest = UrlUtils.IsAdminConsoleRequest(context);

            if (adminRootRequest)
            {
                if (UserValidationFacade.IsLoggedIn())
                {
                    Thread.CurrentThread.CurrentCulture = UserSettings.CultureInfo;
                    Thread.CurrentThread.CurrentUICulture = UserSettings.C1ConsoleUiLanguage;
                }
                else
                {
                    var defaultCulture = CultureInfo.CreateSpecificCulture(GlobalSettingsFacade.DefaultCultureName);

                    Thread.CurrentThread.CurrentCulture = defaultCulture;
                    Thread.CurrentThread.CurrentUICulture = defaultCulture;
                }
            }
        }


        public void Dispose()
        {
        }
    }
}
