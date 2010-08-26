using System;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;

namespace Composite.C1Console.Security.Plugins.LoginProvider
{
    [Assembler(typeof(NonConfigurableLoginProviderAssembler))]
    internal class NonConfigurableLoginProvider : LoginProviderData
    {
    }

    internal sealed class NonConfigurableLoginProviderAssembler : IAssembler<ILoginProvider, LoginProviderData>
    {
        public ILoginProvider Assemble(Microsoft.Practices.ObjectBuilder.IBuilderContext context, LoginProviderData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            if (null == objectConfiguration) throw new ArgumentNullException("objectConfiguration");

            return (ILoginProvider)Activator.CreateInstance(objectConfiguration.Type);
        }
    }
}
