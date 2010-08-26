using Composite.Core.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Core.Application.Plugins.ApplicationOnlineHandler.Runtime
{
    internal sealed class ApplicationOnlineHandlerFactory : NameTypeFactoryBase<IApplicationOnlineHandler>
	{
        public ApplicationOnlineHandlerFactory()
            : base(ConfigurationServices.ConfigurationSource)
        {
        }
	}
}
