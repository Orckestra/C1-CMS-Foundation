using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;

using Composite.WebClient.Plugins.WebRequestHandler;

namespace Composite.WebClient.Plugins.WebRequestHandler.Runtime
{
    public class WebRequestHandlerCustomFactory : AssemblerBasedCustomFactory<WebRequestHandler, WebRequestHandlerData>
    {
        protected override WebRequestHandlerData GetConfiguration(string name, IConfigurationSource configurationSource)
        {
            WebRequestHandlerSettings settings = (WebRequestHandlerSettings)configurationSource.GetSection(WebRequestHandlerSettings.SectionName);
            return settings.WebRequestHandlers.Get(name);
        }
    }
}
