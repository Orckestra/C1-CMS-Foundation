using System;
using System.IO;
using System.Web.UI;
using Composite.WebClient.Foundation.PluginFacades;
using Composite.WebClient.Plugins.WebRequestHandler;


namespace Composite.WebClient
{
    internal class PathToWebRequestHandlerMappingPage : System.Web.UI.Page
    {

        public PathToWebRequestHandlerMappingPage()
        {
            this.Init += new EventHandler(LoadAndAttachHandler);

        }

        private void LoadAndAttachHandler(Object o, EventArgs e)
        {
            string requestPath = Request.Path;
            string requestName = Path.GetFileNameWithoutExtension(requestPath);

            WebRequestHandlerData requestHandlerData = WebRequestHandlerPluginFacade.GetConfigurationForHandler(requestName);

            if (requestHandlerData == null)
            {
                throw new ApplicationException("No WebRequestHandler could be located for '" + requestName + "'. Please note that names are case sensitive");
            }

            string templateControlFile = requestHandlerData.TemplateControlFile;
            string placeholderId = requestHandlerData.TemplateControlPlaceholderId;

            Control c = this.LoadControl(templateControlFile);
            this.Controls.Add(c);

            WebRequestHandler handler = WebRequestHandlerPluginFacade.GetHandler(requestName);
            Control placeHolder = c.FindControl(placeholderId);
            placeHolder.Controls.Add(handler);
        }

    }

}
