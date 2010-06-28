using Composite.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.Application.Plugins.ApplicationStartupHandler
{
    [ConfigurationElementType(typeof(NonConfigurableApplicationStartupHandler))]
    internal class ApplicationStartupHandlerData : NameTypeManagerTypeConfigurationElement
	{
	}
}
