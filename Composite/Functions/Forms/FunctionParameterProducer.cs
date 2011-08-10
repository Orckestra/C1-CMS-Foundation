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


        [FormsProperty()]
        public List<BaseRuntimeTreeNode> Producers { get; private set; }



        public object GetResult()
        {
            if (this.value != null)
            {
                if (this.value is FunctionRuntimeTreeNode)
                {
                    return new FunctionParameterRuntimeTreeNode(this.name, this.value as FunctionRuntimeTreeNode);
                }
                else if (this.value is string)
                {
                    return new ConstantParameterRuntimeTreeNode(this.name, this.value as string);
                }
                else
                {
                    throw new NotImplementedException();
                }
            }
            else if ((Producers.Count == 1) && (Producers[0] is FunctionRuntimeTreeNode))
            {
                return new FunctionParameterRuntimeTreeNode(this.name, Producers[0] as FunctionRuntimeTreeNode);
            }
            else if (Producers.OfType<ConstantParameterRuntimeTreeNode>().Count() == Producers.Count)
            {
                IEnumerable<string> values = Producers.OfType<ConstantParameterRuntimeTreeNode>().Select(f => (string)f.GetValue());

                return new ConstantParameterRuntimeTreeNode(this.name, values);                
            }
            else
            {
                throw new NotImplementedException();
            }            
        }
	}
}
