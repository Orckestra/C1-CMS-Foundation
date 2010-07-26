using Composite.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.Security.Plugins.UserPermissionDefinitionProvider
{
    [ConfigurationElementType(typeof(NonConfigurableUserPermissionDefinitionProvider))]
    internal class UserPermissionDefinitionProviderData : NameTypeManagerTypeConfigurationElement
	{
	}
}
