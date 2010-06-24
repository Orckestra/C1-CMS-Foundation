using System;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Security.Plugins.UserPermissionDefinitionProvider
{
    [Assembler(typeof(NonConfigurableUserPermissionDefinitionProviderAssembler))]
    public sealed class NonConfigurableUserPermissionDefinitionProvider : UserPermissionDefinitionProviderData
    {
    }

    public sealed class NonConfigurableUserPermissionDefinitionProviderAssembler : IAssembler<IUserPermissionDefinitionProvider, UserPermissionDefinitionProviderData>
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:ValidateArgumentsOfPublicMethods")]
        public IUserPermissionDefinitionProvider Assemble(Microsoft.Practices.ObjectBuilder.IBuilderContext context, UserPermissionDefinitionProviderData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return (IUserPermissionDefinitionProvider)Activator.CreateInstance(objectConfiguration.Type);
        }
    }
}
