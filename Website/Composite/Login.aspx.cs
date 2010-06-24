using System;

using Composite.WebClient.Foundation.PluginFacades;
using Composite.WebClient.Plugins.WebRequestHandler;


public partial class Composite_Management_Login : System.Web.UI.Page
{
    protected void Page_Init(object sender, EventArgs e)
    {
        WebRequestHandler handler = WebRequestHandlerPluginFacade.GetHandler("Login");
        Form1.Controls.Add(handler);
    }
}
