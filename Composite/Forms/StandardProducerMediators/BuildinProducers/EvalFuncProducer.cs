using System.Xml.Linq;
using Composite.Functions;
using Composite.Xml;
using System.Text;


namespace Composite.Forms.StandardProducerMediators.BuildinProducers
{
    [ControlValueProperty("Markup")]
    public sealed class EvalFuncProducer : IBuildinProducer
	{
        public XElement Markup { get; set; }

        public override string ToString()
        {
            BaseRuntimeTreeNode baseRuntimeTreeNode = FunctionTreeBuilder.Build(this.Markup);

            XDocument result = (XDocument)baseRuntimeTreeNode.GetValue();

            XhtmlDocument xhtmlDocument = result as XhtmlDocument;
            if (xhtmlDocument != null)
            {
                StringBuilder sb = new StringBuilder();
                
                foreach (XElement element in xhtmlDocument.Body.Elements())
                {
                    sb.AppendLine(element.ToString());
                }

                return sb.ToString();
            }

            return result.ToString();
        }
	}
}
