using Composite.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.Application.Plugins.ApplicationOnlineHandler
{
    [ConfigurationElementType(typeof(NonConfigurableApplicationOnlineHandler))]
    internal class ApplicationOnlineHandlerData : NameTypeManagerTypeConfigurationElement
	{
	}
}
