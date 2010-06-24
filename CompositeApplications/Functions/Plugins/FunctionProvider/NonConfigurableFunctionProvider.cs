using System;

using Microsoft.Practices.ObjectBuilder;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Functions.Plugins.FunctionProvider
{
    [Assembler(typeof(NonConfigurableFunctionProviderAssembler))]
    public sealed class NonConfigurableFunctionProvider : FunctionProviderData
    {
    }

    public sealed class NonConfigurableFunctionProviderAssembler : IAssembler<IFunctionProvider, FunctionProviderData>
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:ValidateArgumentsOfPublicMethods")]
        public IFunctionProvider Assemble(IBuilderContext context, FunctionProviderData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return (IFunctionProvider)Activator.CreateInstance(objectConfiguration.Type);
        }
    }
}
