using System;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;

namespace Composite.C1Console.Security.Plugins.LoginProvider
{
    /// <summary>
    /// Default login provider configuration, you can use this if you require no custom configuration fields.
    /// </summary>
    [Assembler(typeof(NonConfigurableLoginProviderAssembler))]
    public class NonConfigurableLoginProvider : LoginProviderData
    {
    }

    /// <summary>
    /// Assembles login providers based on type only, i.e. without anhy custom configuration. 
    /// If your provider require custom configuration you should also make your own assembler and configuration classes.
    /// </summary>
    public sealed class NonConfigurableLoginProviderAssembler : IAssembler<ILoginProvider, LoginProviderData>
    {
        public ILoginProvider Assemble(Microsoft.Practices.ObjectBuilder.IBuilderContext context, LoginProviderData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            if (null == objectConfiguration) throw new ArgumentNullException("objectConfiguration");

            return (ILoginProvider)Activator.CreateInstance(objectConfiguration.Type);
        }
    }
}
