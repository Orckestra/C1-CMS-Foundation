using System.Xml.Linq;
using System.Web.UI;
using Composite.Functions;


namespace Composite.Renderings.Page
{
	internal interface IXElementToControlMapper
	{
        bool TryGetControlFromXElement(XElement element, out Control control);
	}
}
