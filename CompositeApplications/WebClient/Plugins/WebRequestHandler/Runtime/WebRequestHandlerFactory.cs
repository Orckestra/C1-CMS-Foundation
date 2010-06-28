using Composite.Configuration;
using Composite.WebClient.Plugins.WebRequestHandler;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Composite.ConfigurationSystem;


namespace Composite.WebClient.Plugins.WebRequestHandler.Runtime
{
    internal class WebRequestHandlerFactory : NameTypeFactoryBase<WebRequestHandler>
    {
        public WebRequestHandlerFactory()            
            : base(ConfigurationServices.ConfigurationSource)
        {            
        }
    }
}
