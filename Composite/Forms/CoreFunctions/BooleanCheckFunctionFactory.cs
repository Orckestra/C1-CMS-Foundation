using Composite.Forms.Plugins.FunctionFactory;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Forms.CoreFunctions
{
    public sealed class BooleanCheckFunction : IFormFunction
    {
        public BooleanCheckFunction()
        {
        }

        [FormsProperty()]
        public object WhenTrue { get; set; }


        [FormsProperty()]
        public object WhenFalse { get; set; }


        [RequiredValue()]
        [FormsProperty()]
        public bool CheckValue { get; set; }

        public object Execute()
        {
            if (this.CheckValue == true)
            {
                return this.WhenTrue;
            }
            else
            {
                return this.WhenFalse;
            }
        }
    }


    [ConfigurationElementType(typeof(BooleanCheckFunctionFactoryData))]
    public sealed class BooleanCheckFunctionFactory : IFormFunctionFactory
    {
        public IFormFunction CreateFunction()
        {
            return new BooleanCheckFunction();
        }
    }


    [Assembler(typeof(NonConfigurableFunctionFactoryAssembler))]
    public sealed class BooleanCheckFunctionFactoryData : FunctionFactoryData
    {
    }
}
