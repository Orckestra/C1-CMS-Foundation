using System.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.C1Console.Security.Plugins.UserPermissionDefinitionProvider.Runtime
{
    internal class UserPermissionDefinitionProviderCustomFactory : AssemblerBasedCustomFactory<IUserPermissionDefinitionProvider, UserPermissionDefinitionProviderData>
    {
        protected override UserPermissionDefinitionProviderData GetConfiguration(string name, IConfigurationSource configurationSource)
        {
            UserPermissionDefinitionProviderSettings settings = (UserPermissionDefinitionProviderSettings)configurationSource.GetSection(UserPermissionDefinitionProviderSettings.SectionName);

            if (null == settings)
            {
                throw new ConfigurationErrorsException(string.Format("The configuration section '{0}' was not found in the configuration", UserPermissionDefinitionProviderSettings.SectionName));
            }

            return settings.UserPermissionDefinitionProvidersPlugins.Get(name);
        }
    }
}
