using System.Xml.Linq;


namespace Composite.Functions
{
	public interface IFunctionResultToXEmbedableMapper
	{
        bool TryMakeXEmbedable(FunctionContextContainer contextContainer, object resultObject, out XNode resultElement);
	}
}
