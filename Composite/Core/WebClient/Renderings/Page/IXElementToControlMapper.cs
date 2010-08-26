using System.Xml.Linq;
using System.Web.UI;
using Composite.Functions;


namespace Composite.Core.WebClient.Renderings.Page
{
	internal interface IXElementToControlMapper
	{
        bool TryGetControlFromXElement(XElement element, out Control control);
	}
}
