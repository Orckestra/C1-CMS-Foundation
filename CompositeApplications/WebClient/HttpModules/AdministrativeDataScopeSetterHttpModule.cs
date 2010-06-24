using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using Composite.Security;
using Composite.Logging;
using Composite.Data;
using Composite.Users;


namespace Composite.WebClient.HttpModules
{
    public class AdministrativeDataScopeSetterHttpModule : IHttpModule
    {
        public void Init(HttpApplication context)
        {
            context.AuthenticateRequest += new EventHandler(context_AuthenticateRequest);
            context.EndRequest += new EventHandler(context_EndRequest);
        }



        void context_AuthenticateRequest(object sender, EventArgs e)
        {
            HttpApplication application = (HttpApplication)sender;
            HttpContext context = application.Context;

            bool adminRootRequest = context.Request.Path.ToLower().StartsWith(UrlUtils.AdminRootPath.ToLower());

            if (adminRootRequest == true && UserValidationFacade.IsLoggedIn() == true)
            {
                // TODO: Optimaze, getting UserSettings.ActiveLocaleCultureInfo takes 5ms for every request.
                context.Items.Add("AdministrativeDataScopeSetterHttpModule.DataScope", new DataScope(DataScopeIdentifier.Administrated, UserSettings.ActiveLocaleCultureInfo));
            }
        }



        void context_EndRequest(object sender, EventArgs e)
        {
            HttpApplication application = (HttpApplication)sender;
            HttpContext context = application.Context;

            if (context.Items.Contains("AdministrativeDataScopeSetterHttpModule.DataScope") == true)
            {
                DataScope dataScope = (DataScope)context.Items["AdministrativeDataScopeSetterHttpModule.DataScope"];

                dataScope.Dispose();
            }
        }

        
        
        public void Dispose()
        {
        }
    }
}
