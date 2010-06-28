using System;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;


namespace Composite.Elements.Plugins.ElementProvider
{
    [Assembler(typeof(NonConfigurableHooklessElementProviderAssembler))]
    internal class NonConfigurableHooklessElementProvider : HooklessElementProviderData
    {
    }


    internal sealed class NonConfigurableHooklessElementProviderAssembler : IAssembler<IHooklessElementProvider, HooklessElementProviderData>
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:ValidateArgumentsOfPublicMethods")]
        public IHooklessElementProvider Assemble(IBuilderContext context, HooklessElementProviderData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return (IHooklessElementProvider)Activator.CreateInstance(objectConfiguration.Type);
        }
    }
}
