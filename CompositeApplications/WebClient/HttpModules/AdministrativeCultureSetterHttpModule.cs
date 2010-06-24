
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using Composite.Security;
using Composite.Logging;
using Composite.Data;
using System.Globalization;

namespace Composite.WebClient.HttpModules
{
    public class AdministrativeCultureSetterHttpModule : IHttpModule
    {
        public void Init(HttpApplication context)
        {
            context.AuthenticateRequest += new EventHandler(context_AuthenticateRequest);
        }


        void context_AuthenticateRequest(object sender, EventArgs e)
        {
            HttpApplication application = (HttpApplication)sender;
            HttpContext context = application.Context;

            bool adminRootRequest = context.Request.Path.ToLower().StartsWith(UrlUtils.AdminRootPath.ToLower());

            if (adminRootRequest == true)
            {
                if (UserValidationFacade.IsLoggedIn() == true)
                {
                    System.Threading.Thread.CurrentThread.CurrentCulture = Users.UserSettings.CultureInfo;
                }
                else
                {
                    System.Threading.Thread.CurrentThread.CurrentCulture = CultureInfo.CreateSpecificCulture(Composite.GlobalSettings.GlobalSettingsFacade.DefaultCultureName);
                }
            }
        }


        public void Dispose()
        {
        }
    }
}
