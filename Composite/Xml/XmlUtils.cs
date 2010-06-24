using System.Xml.Linq;


namespace Composite.Xml
{
	public static class XmlUtils
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
