using System;
using Composite.Core.NewIO;
using System.Web.UI;
using Composite.Core.WebClient.Foundation.PluginFacades;
using Composite.Core.WebClient.Plugins.WebRequestHandler;


namespace Composite.Core.WebClient
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
            string requestName = System.IO.Path.GetFileNameWithoutExtension(requestPath);

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
