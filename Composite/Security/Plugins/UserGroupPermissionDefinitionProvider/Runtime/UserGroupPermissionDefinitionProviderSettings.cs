using System.Configuration;
using Composite.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.Security.Plugins.UserGroupPermissionDefinitionProvider.Runtime
{
    public class UserGroupPermissionDefinitionProviderSettings : SerializableConfigurationSection
	{
        public const string SectionName = "Composite.Security.Plugins.UserGroupPermissionDefinitionProviderConfiguration";

        private const string _userGroupPermissionDefinitionProviderPluginsPropertyName = "UserGroupPermissionDefinitionProviderPlugins";
        [ConfigurationProperty(_userGroupPermissionDefinitionProviderPluginsPropertyName, IsRequired = true)]
        public NameTypeManagerTypeConfigurationElementCollection<UserGroupPermissionDefinitionProviderData> UserGroupPermissionDefinitionProvidersPlugins
        {
            get
            {
                return (NameTypeManagerTypeConfigurationElementCollection<UserGroupPermissionDefinitionProviderData>)base[_userGroupPermissionDefinitionProviderPluginsPropertyName];
            }
        }



        private const string _defaultProviderProperty = "defaultProvider";
        [ConfigurationProperty(_defaultProviderProperty, IsRequired = true)]
        public string DefaultUserGroupPermissionDefinitionProvider
        {
            get { return (string)base[_defaultProviderProperty]; }
            set { base[_defaultProviderProperty] = value; }
        }
	}
}
