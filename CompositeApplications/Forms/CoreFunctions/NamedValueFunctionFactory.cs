using System.Collections;
using Composite.Forms.Plugins.FunctionFactory;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Forms.CoreFunctions
{
    [ControlValueProperty("Value")]
    public sealed class NamedValue : IFormFunction
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
    public sealed class NamedValueFunctionFactory : IFormFunctionFactory
    {
        public IFormFunction CreateFunction()
        {
            return new NamedValue();
        }
    }


    [Assembler(typeof(NonConfigurableFunctionFactoryAssembler))]
    public sealed class NamedValueFunctionFactoryData : FunctionFactoryData
    {
    }
}
