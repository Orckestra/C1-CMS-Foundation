using System.Xml.Linq;
using System.Web.UI;
using Composite.Functions;


namespace Composite.Core.WebClient.Renderings.Page
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public interface IXElementToControlMapper
	{
        /// <exclude />
        bool TryGetControlFromXElement(XElement element, out Control control);
	}
}
