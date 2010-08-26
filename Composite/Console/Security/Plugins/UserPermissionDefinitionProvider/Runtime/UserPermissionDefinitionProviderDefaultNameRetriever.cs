using System;
using System.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.C1Console.Security.Plugins.UserPermissionDefinitionProvider.Runtime
{
    internal class UserPermissionDefinitionProviderDefaultNameRetriever : IConfigurationNameMapper
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
                UserPermissionDefinitionProviderSettings settings = configSource.GetSection(UserPermissionDefinitionProviderSettings.SectionName) as UserPermissionDefinitionProviderSettings;

                if (null == settings)
                {
                    throw new ConfigurationErrorsException(string.Format("Could not load configuration section {0}", UserPermissionDefinitionProviderSettings.SectionName));
                }

                return settings.DefaultUserPermissionDefinitionProvider;
            }
        }
    }
}
