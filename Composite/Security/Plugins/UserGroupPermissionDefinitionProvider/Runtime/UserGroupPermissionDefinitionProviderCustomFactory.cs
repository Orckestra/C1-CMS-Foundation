using System.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Security.Plugins.UserGroupPermissionDefinitionProvider.Runtime
{
    internal class UserGroupPermissionDefinitionProviderCustomFactory : AssemblerBasedCustomFactory<IUserGroupPermissionDefinitionProvider, UserGroupPermissionDefinitionProviderData>
	{
        protected override UserGroupPermissionDefinitionProviderData GetConfiguration(string name, IConfigurationSource configurationSource)
        {
            UserGroupPermissionDefinitionProviderSettings settings = (UserGroupPermissionDefinitionProviderSettings)configurationSource.GetSection(UserGroupPermissionDefinitionProviderSettings.SectionName);

            if (null == settings)
            {
                throw new ConfigurationErrorsException(string.Format("The configuration section '{0}' was not found in the configuration", UserGroupPermissionDefinitionProviderSettings.SectionName));
            }

            return settings.UserGroupPermissionDefinitionProvidersPlugins.Get(name);
        }
	}
}
