using Composite.Core.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.Core.Application.Plugins.ApplicationStartupHandler
{
    [ConfigurationElementType(typeof(NonConfigurableApplicationStartupHandler))]
    internal class ApplicationStartupHandlerData : NameTypeManagerTypeConfigurationElement
	{
	}
}
