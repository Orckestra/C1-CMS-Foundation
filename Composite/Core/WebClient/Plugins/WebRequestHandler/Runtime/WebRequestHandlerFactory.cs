using Composite.Core.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Core.WebClient.Plugins.WebRequestHandler.Runtime
{
    internal class WebRequestHandlerFactory : NameTypeFactoryBase<WebRequestHandler>
    {
        public WebRequestHandlerFactory()            
            : base(ConfigurationServices.ConfigurationSource)
        {            
        }
    }
}
