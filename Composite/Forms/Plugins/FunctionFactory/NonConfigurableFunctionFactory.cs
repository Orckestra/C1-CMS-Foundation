using Microsoft.Practices.ObjectBuilder;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using System;


namespace Composite.Forms.Plugins.FunctionFactory
{
    [Assembler(typeof(NonConfigurableFunctionFactoryAssembler))]
    public sealed class NonConfigurableFunctionFactory : FunctionFactoryData
    {
    }



    public sealed class NonConfigurableFunctionFactoryAssembler : IAssembler<IFormFunctionFactory, FunctionFactoryData>
    {
        public IFormFunctionFactory Assemble(IBuilderContext context, FunctionFactoryData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return (IFormFunctionFactory)Activator.CreateInstance(objectConfiguration.Type);            
        }
    }
}
