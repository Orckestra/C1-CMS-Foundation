using Composite.ConfigurationSystem;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Application.Plugins.ApplicationOnlineHandler.Runtime
{
    internal sealed class ApplicationOnlineHandlerFactory : NameTypeFactoryBase<IApplicationOnlineHandler>
	{
        public ApplicationOnlineHandlerFactory()
            : base(ConfigurationServices.ConfigurationSource)
        {
        }
	}
}
