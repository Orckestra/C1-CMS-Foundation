using Composite.Forms.Plugins.FunctionFactory;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Forms.CoreFunctions
{
    [ControlValueProperty("Value")]
    public sealed class Replicator : IFormFunction
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
    public sealed class ReplicatorFunctionFactory : IFormFunctionFactory
    {
        public IFormFunction CreateFunction()
        {
            return new Replicator();
        }
    }


    [Assembler(typeof(NonConfigurableFunctionFactoryAssembler))]
    public sealed class ReplicatorFunctionFactoryData : FunctionFactoryData
    {
    }
}
