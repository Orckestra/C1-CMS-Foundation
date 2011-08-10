using System.Collections.Generic;
using Composite.C1Console.Forms;


namespace Composite.Functions.Forms
{
    [ControlValueProperty("Producers")]
    internal sealed class FunctionProducer : IFunctionProducer
    {
        public FunctionProducer()
        {
            this.Producers = new List<BaseParameterRuntimeTreeNode>();
        }


        [RequiredValue]
        public string name { get; set; }


        [FormsProperty()]
        public List<BaseParameterRuntimeTreeNode> Producers { get; private set; }



        public object GetResult()
        {            
            IFunction function = FunctionFacade.GetFunction(this.name);

            FunctionRuntimeTreeNode functionNode = new FunctionRuntimeTreeNode(function, this.Producers);

            return functionNode;    
        }
    }
}
