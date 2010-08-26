using System.Collections.Generic;
using System.Xml.Linq;
using Composite.C1Console.Forms;
using Composite.Functions.Foundation;


namespace Composite.Functions.Forms
{
    [ControlValueProperty("Producers")]
	internal sealed class FunctionParameterProducer : IFunctionProducer 
	{
        public FunctionParameterProducer()
        {
            this.Producers = new List<XElement>();
        }


        [RequiredValue]
        public string name { get; set; }

        
        public string value { get; set; }


        [FormsProperty()]
        public List<XElement> Producers { get; private set; }



        public XElement GetResult()
        {
            XElement element = new XElement(
                    (XNamespace)FunctionTreeConfigurationNames.NamespaceName + FunctionTreeConfigurationNames.ParamTagName,
                    new XAttribute(FunctionTreeConfigurationNames.NameAttributeName, this.name)
                );

            if (this.value != null)
            {
                element.Add(new XAttribute(FunctionTreeConfigurationNames.ValueAttributeName, this.value));
            }

            foreach (XElement childElement in this.Producers)
            {
                element.Add(childElement);
            }

            return element;
        }
	}
}
