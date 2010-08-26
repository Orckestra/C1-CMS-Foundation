using System.Configuration;
using Composite.Core.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.C1Console.Security.Plugins.UserPermissionDefinitionProvider.Runtime
{
    internal class UserPermissionDefinitionProviderSettings : SerializableConfigurationSection
    {
        public const string SectionName = "Composite.C1Console.Security.Plugins.UserPermissionDefinitionProviderConfiguration";

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
