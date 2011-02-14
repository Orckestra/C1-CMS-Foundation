using System.Xml.Linq;


namespace Composite.Functions
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public interface IFunctionResultToXEmbedableMapper
	{
        /// <exclude />
        bool TryMakeXEmbedable(FunctionContextContainer contextContainer, object resultObject, out XNode resultElement);
	}
}
