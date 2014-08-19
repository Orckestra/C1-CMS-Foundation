using System.Xml.Linq;


namespace Composite.Core.Xml
{
    /// <summary>
    /// 
    /// </summary>
	public static class XmlUtils
	{
        /// <summary>
        /// Builds an XName - will use null namespace if namespaceName is null or empty.
        /// </summary>
        /// <param name="namespaceName">Namespace of element</param>
        /// <param name="localName">Local name of element</param>
        /// <returns>Corosponding XName</returns>
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

        /// <summary>
        /// Removes the XML declaration (like &lt;?xml version="1.0" encoding="utf-8"?&gt;) if present from the provided agrument. 
        /// </summary>
        /// <param name="xml">The string to remove XML declaration from</param>
        /// <returns>The XML document without any XML declaration</returns>
        public static string RemoveXmlDeclaration(string xml)
        {
            xml = xml.Trim();

            if (xml.StartsWith("<?xml") && xml.Contains("?>"))
            {
                xml = xml.Substring(xml.IndexOf("?>") + 2);	
            }

            return xml;
        }
	}
}
