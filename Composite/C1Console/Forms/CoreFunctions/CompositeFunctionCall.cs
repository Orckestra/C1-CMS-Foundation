using Composite.C1Console.Forms.Plugins.FunctionFactory;
using Composite.Functions;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.C1Console.Forms.CoreFunctions
{
    [ControlValueProperty("Parameters")]
    internal sealed class CompositeFunctionCall : IFormFunction
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
    internal sealed class CompositeFunctionCallFunctionFactory : IFormFunctionFactory
    {
        public IFormFunction CreateFunction()
        {
            return new CompositeFunctionCall();
        }
    }


    [Assembler(typeof(NonConfigurableFunctionFactoryAssembler))]
    internal sealed class CompositeFunctionCallFunctionFactoryData : FunctionFactoryData
    {
    }
}
