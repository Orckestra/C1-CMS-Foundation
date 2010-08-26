using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;

using Composite.Core.WebClient.Plugins.WebRequestHandler;

namespace Composite.Core.WebClient.Plugins.WebRequestHandler.Runtime
{
    internal class WebRequestHandlerCustomFactory : AssemblerBasedCustomFactory<WebRequestHandler, WebRequestHandlerData>
    {
        protected override WebRequestHandlerData GetConfiguration(string name, IConfigurationSource configurationSource)
        {
            WebRequestHandlerSettings settings = (WebRequestHandlerSettings)configurationSource.GetSection(WebRequestHandlerSettings.SectionName);
            return settings.WebRequestHandlers.Get(name);
        }
    }
}
