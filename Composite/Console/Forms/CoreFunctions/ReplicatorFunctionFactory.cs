using Composite.C1Console.Forms.Plugins.FunctionFactory;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.C1Console.Forms.CoreFunctions
{
    [ControlValueProperty("Value")]
    internal sealed class Replicator : IFormFunction
    {
        [BindableProperty()]
        [FormsProperty()]
        public object Value { get; set; }

        public object Execute()
        {
            return this.Value;
        }

    }



    [ConfigurationElementType(typeof(ReplicatorFunctionFactoryData))]
    internal sealed class ReplicatorFunctionFactory : IFormFunctionFactory
    {
        public IFormFunction CreateFunction()
        {
            return new Replicator();
        }
    }


    [Assembler(typeof(NonConfigurableFunctionFactoryAssembler))]
    internal sealed class ReplicatorFunctionFactoryData : FunctionFactoryData
    {
    }
}
