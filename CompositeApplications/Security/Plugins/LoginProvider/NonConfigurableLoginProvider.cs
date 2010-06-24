using System;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;

namespace Composite.Security.Plugins.LoginProvider
{
    [Assembler(typeof(NonConfigurableLoginProviderAssembler))]
    public class NonConfigurableLoginProvider : LoginProviderData
    {
    }

    public sealed class NonConfigurableLoginProviderAssembler : IAssembler<ILoginProvider, LoginProviderData>
    {
        public ILoginProvider Assemble(Microsoft.Practices.ObjectBuilder.IBuilderContext context, LoginProviderData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            if (null == objectConfiguration) throw new ArgumentNullException("objectConfiguration");

            return (ILoginProvider)Activator.CreateInstance(objectConfiguration.Type);
        }
    }
}
