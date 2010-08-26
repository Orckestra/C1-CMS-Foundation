using System;
using Composite.Core.Configuration;
using Composite.Core.WebClient.Foundation.PluginFacades;
using Composite.Core.WebClient.Plugins.WebRequestHandler;


public partial class Composite_Management_Login : System.Web.UI.Page
{
    protected void Page_Init(object sender, EventArgs e)
    {
        if (SystemSetupFacade.IsSystemFirstTimeInitialized == false)
        {
            Response.Redirect("/Composite");
        }
        else
        {
            WebRequestHandler handler = WebRequestHandlerPluginFacade.GetHandler("Login");
            Form1.Controls.Add(handler);
        }
    }
}
