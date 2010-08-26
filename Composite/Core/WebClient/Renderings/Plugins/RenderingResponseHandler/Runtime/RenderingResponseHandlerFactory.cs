using Composite.Core.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Core.WebClient.Renderings.Plugins.RenderingResponseHandler.Runtime
{
    internal sealed class RenderingResponseHandlerFactory : NameTypeFactoryBase<IRenderingResponseHandler>
	{
        public RenderingResponseHandlerFactory()
            : base(ConfigurationServices.ConfigurationSource)
        {
        }
	}
}
