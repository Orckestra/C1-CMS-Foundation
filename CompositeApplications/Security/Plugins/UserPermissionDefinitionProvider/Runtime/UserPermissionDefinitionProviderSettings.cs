using System.Configuration;
using Composite.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.Security.Plugins.UserPermissionDefinitionProvider.Runtime
{
    public class UserPermissionDefinitionProviderSettings : SerializableConfigurationSection
    {
        public const string SectionName = "Composite.Security.Plugins.UserPermissionDefinitionProviderConfiguration";

        private const string _userPermissionDefinitionProviderPluginsPropertyName = "UserPermissionDefinitionProviderPlugins";
        [ConfigurationProperty(_userPermissionDefinitionProviderPluginsPropertyName, IsRequired = true)]
        public NameTypeManagerTypeConfigurationElementCollection<UserPermissionDefinitionProviderData> UserPermissionDefinitionProvidersPlugins
        {
            get
            {
                return (NameTypeManagerTypeConfigurationElementCollection<UserPermissionDefinitionProviderData>)base[_userPermissionDefinitionProviderPluginsPropertyName];
            }
        }



        private const string _defaultProviderProperty = "defaultProvider";
        [ConfigurationProperty(_defaultProviderProperty, IsRequired = true)]
        public string DefaultUserPermissionDefinitionProvider
        {
            get { return (string)base[_defaultProviderProperty]; }
            set { base[_defaultProviderProperty] = value; }
        }
    }
}
