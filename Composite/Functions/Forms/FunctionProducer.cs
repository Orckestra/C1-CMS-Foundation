using System.Collections.Generic;
using System.Xml.Linq;
using Composite.Forms;
using Composite.Functions.Foundation;


namespace Composite.Functions.Forms
{
    [ControlValueProperty("Producers")]
    internal sealed class FunctionProducer : IFunctionProducer
    {
        public FunctionProducer()
        {
            this.Producers = new List<XElement>();
        }


        [RequiredValue]
        public string name { get; set; }


        [FormsProperty()]
        public List<XElement> Producers { get; private set; }



        public XElement GetResult()
        {
            XElement element = new XElement(
                    (XNamespace)FunctionTreeConfigurationNames.NamespaceName + FunctionTreeConfigurationNames.FunctionTagName,
                    new XAttribute(FunctionTreeConfigurationNames.NameAttributeName, this.name)
                );

            foreach (XElement childElement in this.Producers)
            {
                element.Add(childElement);
            }

            return element;
        }
    }
}
