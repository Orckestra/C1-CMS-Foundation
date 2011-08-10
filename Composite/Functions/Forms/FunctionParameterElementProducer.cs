using Composite.C1Console.Forms;


namespace Composite.Functions.Forms
{
    [ControlValueProperty("Producers")]
    internal class FunctionParameterElementProducer : IFunctionProducer
    {
        [RequiredValue]
        public string value { get; set; }

        public object GetResult()
        {
            return new ConstantParameterRuntimeTreeNode("_HHH_", this.value);
        }
    }
}
