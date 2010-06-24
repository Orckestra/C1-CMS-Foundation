using System.Xml.Linq;


namespace Composite.Functions.Forms
{
    public interface IFunctionProducer
	{
        XElement GetResult();
	}
}
