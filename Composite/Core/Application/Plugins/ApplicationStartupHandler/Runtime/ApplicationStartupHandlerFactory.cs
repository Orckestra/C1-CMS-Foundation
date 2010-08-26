using Composite.Core.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Core.Application.Plugins.ApplicationStartupHandler.Runtime
{
    internal sealed class ApplicationStartupHandlerFactory : NameTypeFactoryBase<IApplicationStartupHandler>
	{
        public ApplicationStartupHandlerFactory()
            : base(ConfigurationServices.ConfigurationSource)
        {
        }
	}
}
