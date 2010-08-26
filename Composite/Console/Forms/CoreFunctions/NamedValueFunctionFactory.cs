using System.Collections;
using Composite.C1Console.Forms.Plugins.FunctionFactory;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.C1Console.Forms.CoreFunctions
{
    [ControlValueProperty("Value")]
    internal sealed class NamedValue : IFormFunction
    {
        [BindableProperty()]
        [FormsProperty()]
        public object Value { get; set; }

        [RequiredValue()]
        [FormsProperty()]
        public string Name { get; set; }

        public object Execute()
        {
            return new DictionaryEntry(this.Name, this.Value);
        }

    }

    

    [ConfigurationElementType(typeof(NamedValueFunctionFactoryData))]
    internal sealed class NamedValueFunctionFactory : IFormFunctionFactory
    {
        public IFormFunction CreateFunction()
        {
            return new NamedValue();
        }
    }


    [Assembler(typeof(NonConfigurableFunctionFactoryAssembler))]
    internal sealed class NamedValueFunctionFactoryData : FunctionFactoryData
    {
    }
}
