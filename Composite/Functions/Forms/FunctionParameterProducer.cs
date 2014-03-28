using System;
using System.Collections.Generic;
using System.Linq;
using Composite.C1Console.Forms;


namespace Composite.Functions.Forms
{
    [ControlValueProperty("Producers")]
	internal sealed class FunctionParameterProducer : IFunctionProducer 
	{
        public FunctionParameterProducer()
        {
            this.Producers = new List<BaseRuntimeTreeNode>();
        }


        [RequiredValue]
        public string name { get; set; }

        
        public object value { get; set; }


        [FormsProperty]
        public List<BaseRuntimeTreeNode> Producers { get; private set; }



        public object GetResult()
        {
            if (this.value != null)
            {
                if (this.value is FunctionRuntimeTreeNode)
                {
                    return new FunctionParameterRuntimeTreeNode(this.name, this.value as FunctionRuntimeTreeNode);
                }
                if (this.value is string)
                {
                    return new ConstantParameterRuntimeTreeNode(this.name, this.value as string);
                }

                throw new NotImplementedException();
            }

            if (Producers.Count == 1)
            {
                var functionNode = Producers[0] as FunctionRuntimeTreeNode;
                if (functionNode != null)
                {
                    return new FunctionParameterRuntimeTreeNode(this.name, functionNode);
                }

                var constantObjectNode = Producers[0] as ConstantObjectParameterRuntimeTreeNode;
                if (constantObjectNode != null)
                {
                    return new ConstantObjectParameterRuntimeTreeNode(this.name, constantObjectNode.GetValue());
                }
            }

            if (Producers.All(p => p is ConstantParameterRuntimeTreeNode))
            {
                IEnumerable<string> values = Producers.OfType<ConstantParameterRuntimeTreeNode>().Select(f => (string)f.GetValue());

                return new ConstantParameterRuntimeTreeNode(this.name, values);                
            }

            throw new NotImplementedException();
        }
	}
}
