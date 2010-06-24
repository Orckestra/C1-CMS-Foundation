using Composite.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.Security.Plugins.HookRegistrator
{
    [ConfigurationElementType(typeof(NonConfigurableHookRegistrator))]
	public class HookRegistratorData : NameTypeManagerTypeConfigurationElement
	{
	}
}
