using Composite.Core.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.C1Console.Security.Plugins.UserPermissionDefinitionProvider
{
    [ConfigurationElementType(typeof(NonConfigurableUserPermissionDefinitionProvider))]
    internal class UserPermissionDefinitionProviderData : NameTypeManagerTypeConfigurationElement
	{
	}
}
