using Composite.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.Security.Plugins.HookRegistrator
{
    [ConfigurationElementType(typeof(NonConfigurableHookRegistrator))]
	internal class HookRegistratorData : NameTypeManagerTypeConfigurationElement
	{
	}
}
