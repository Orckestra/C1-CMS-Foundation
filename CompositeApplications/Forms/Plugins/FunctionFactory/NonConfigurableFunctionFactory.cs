using Microsoft.Practices.ObjectBuilder;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using System;


namespace Composite.Forms.Plugins.FunctionFactory
{
    [Assembler(typeof(NonConfigurableFunctionFactoryAssembler))]
    internal sealed class NonConfigurableFunctionFactory : FunctionFactoryData
    {
    }



    internal sealed class NonConfigurableFunctionFactoryAssembler : IAssembler<IFormFunctionFactory, FunctionFactoryData>
    {
        public IFormFunctionFactory Assemble(IBuilderContext context, FunctionFactoryData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return (IFormFunctionFactory)Activator.CreateInstance(objectConfiguration.Type);            
        }
    }
}
