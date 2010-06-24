using System;
using System.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;



namespace Composite.Security.Plugins.UserGroupPermissionDefinitionProvider.Runtime
{
    internal class UserGroupPermissionDefinitionProviderDefaultNameRetriever : IConfigurationNameMapper
	{
        public string MapName(string name, IConfigurationSource configSource)
        {
            if (null == configSource) throw new ArgumentNullException("configSource");

            if (null != name)
            {
                return name;
            }
            else
            {
                UserGroupPermissionDefinitionProviderSettings settings = configSource.GetSection(UserGroupPermissionDefinitionProviderSettings.SectionName) as UserGroupPermissionDefinitionProviderSettings;

                if (null == settings)
                {
                    throw new ConfigurationErrorsException(string.Format("Could not load configuration section {0}", UserGroupPermissionDefinitionProviderSettings.SectionName));
                }

                return settings.DefaultUserGroupPermissionDefinitionProvider;
            }
        }
    }
}
