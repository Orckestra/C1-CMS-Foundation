using System.Xml.Linq;


namespace Composite.Core.Xml
{
	internal static class XmlUtils
	{
        public static XName GetXName(string namespaceName, string localName)
        {
            if (string.IsNullOrEmpty(namespaceName) == false)
            {
                return ((XNamespace)namespaceName) + localName;
            }
            else
            {
                return localName;
            }
        }
	}
}
