using Composite.Core.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.C1Console.Security.Plugins.HookRegistrator
{
    [ConfigurationElementType(typeof(NonConfigurableHookRegistrator))]
	internal class HookRegistratorData : NameTypeManagerTypeConfigurationElement
	{
	}
}
