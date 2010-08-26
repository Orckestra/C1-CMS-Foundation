using Composite.C1Console.Forms.Plugins.FunctionFactory;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.C1Console.Forms.CoreFunctions
{
    internal sealed class NullCheck : IFormFunction
    {
        public NullCheck()
        {
        }

        [FormsProperty()]
        public object WhenNull { get; set; }


        [FormsProperty()]
        public object WhenNotNull { get; set; }

        [RequiredValue()]
        [FormsProperty()]
        public object CheckValue { get; set; }

        public object Execute()
        {
            if (this.CheckValue == null)
            {
                return this.WhenNull;
            }
            else
            {
                return this.WhenNotNull;
            }
        }
    }


    [ConfigurationElementType(typeof(NullCheckFunctionFactoryData))]
    internal sealed class NullCheckFunctionFactory : IFormFunctionFactory
    {
        public IFormFunction CreateFunction()
        {
            return new NullCheck();
        }
    }


    [Assembler(typeof(NonConfigurableFunctionFactoryAssembler))]
    internal sealed class NullCheckFunctionFactoryData : FunctionFactoryData
    {
    }
}
