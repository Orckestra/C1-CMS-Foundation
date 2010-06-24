using System;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Security.Plugins.LoginSessionStore
{
    [Assembler(typeof(NonConfigurableSessionDataProviderAssembler))]
    public sealed class NonConfigurableLoginSessionStore : LoginSessionStoreData
    {
    }

    public sealed class NonConfigurableSessionDataProviderAssembler : IAssembler<ILoginSessionStore, LoginSessionStoreData>
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:ValidateArgumentsOfPublicMethods")]
        public ILoginSessionStore Assemble(Microsoft.Practices.ObjectBuilder.IBuilderContext context, LoginSessionStoreData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return (ILoginSessionStore)Activator.CreateInstance(objectConfiguration.Type);
        }
    }

}
