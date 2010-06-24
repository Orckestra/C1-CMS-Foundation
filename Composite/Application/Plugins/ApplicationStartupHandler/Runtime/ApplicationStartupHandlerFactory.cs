using Composite.ConfigurationSystem;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Application.Plugins.ApplicationStartupHandler.Runtime
{
    internal sealed class ApplicationStartupHandlerFactory : NameTypeFactoryBase<IApplicationStartupHandler>
	{
        public ApplicationStartupHandlerFactory()
            : base(ConfigurationServices.ConfigurationSource)
        {
        }
	}
}
