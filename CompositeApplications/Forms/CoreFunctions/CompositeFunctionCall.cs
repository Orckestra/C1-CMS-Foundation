using Composite.Forms.Plugins.FunctionFactory;
using Composite.Functions;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Forms.CoreFunctions
{
    [ControlValueProperty("Parameters")]
    public sealed class CompositeFunctionCall : IFormFunction
    {
        public CompositeFunctionCall()
        {
        }

        [FormsProperty()]
        [RequiredValue()]
        public string Name { get; set; }

        public object Execute()
        {
            return FunctionFacade.Execute<object>(FunctionFacade.GetFunction(this.Name));
        }

    }


    [ConfigurationElementType(typeof(CompositeFunctionCallFunctionFactoryData))]
    public sealed class CompositeFunctionCallFunctionFactory : IFormFunctionFactory
    {
        public IFormFunction CreateFunction()
        {
            return new CompositeFunctionCall();
        }
    }


    [Assembler(typeof(NonConfigurableFunctionFactoryAssembler))]
    public sealed class CompositeFunctionCallFunctionFactoryData : FunctionFactoryData
    {
    }
}
