using Composite.ConfigurationSystem;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Renderings.Plugins.RenderingResponseHandler.Runtime
{
    internal sealed class RenderingResponseHandlerFactory : NameTypeFactoryBase<IRenderingResponseHandler>
	{
        public RenderingResponseHandlerFactory()
            : base(ConfigurationServices.ConfigurationSource)
        {
        }
	}
}
