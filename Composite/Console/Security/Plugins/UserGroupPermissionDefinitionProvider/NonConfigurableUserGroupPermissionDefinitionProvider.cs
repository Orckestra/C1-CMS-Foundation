using System;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.C1Console.Security.Plugins.UserGroupPermissionDefinitionProvider
{
    [Assembler(typeof(NonConfigurableUserGroupPermissionDefinitionProviderAssembler))]
    internal sealed class NonConfigurableUserGroupPermissionDefinitionProvider : UserGroupPermissionDefinitionProviderData
    {
    }

    internal sealed class NonConfigurableUserGroupPermissionDefinitionProviderAssembler : IAssembler<IUserGroupPermissionDefinitionProvider, UserGroupPermissionDefinitionProviderData>
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:ValidateArgumentsOfPublicMethods")]
        public IUserGroupPermissionDefinitionProvider Assemble(Microsoft.Practices.ObjectBuilder.IBuilderContext context, UserGroupPermissionDefinitionProviderData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return (IUserGroupPermissionDefinitionProvider)Activator.CreateInstance(objectConfiguration.Type);
        }
    }
}
