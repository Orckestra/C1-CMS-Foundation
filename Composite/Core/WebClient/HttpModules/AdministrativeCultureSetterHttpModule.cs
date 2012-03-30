
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using Composite.C1Console.Security;
using Composite.Core.Logging;
using Composite.Data;
using System.Globalization;

namespace Composite.Core.WebClient.HttpModules
{
    internal class AdministrativeCultureSetterHttpModule : IHttpModule
    {
        public void Init(HttpApplication context)
        {
            context.AuthenticateRequest += new EventHandler(context_AuthenticateRequest);
        }


        void context_AuthenticateRequest(object sender, EventArgs e)
        {
            HttpApplication application = (HttpApplication)sender;
            HttpContext context = application.Context;

            bool adminRootRequest = context.Request.Path.StartsWith(UrlUtils.AdminRootPath, StringComparison.OrdinalIgnoreCase);

            if (adminRootRequest == true)
            {
                if (UserValidationFacade.IsLoggedIn() == true)
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
