using Composite.Core.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.Core.Application.Plugins.ApplicationOnlineHandler
{
    [ConfigurationElementType(typeof(NonConfigurableApplicationOnlineHandler))]
    internal class ApplicationOnlineHandlerData : NameTypeManagerTypeConfigurationElement
	{
	}
}
