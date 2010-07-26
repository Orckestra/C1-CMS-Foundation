using System;
using System.Linq;
using System.Xml.Linq;


namespace Composite.Xml
{
    internal static class XElementExtensionMethods
    {
        public static bool HasSameSiblings(this XElement element)
        {
            if (element == null) throw new ArgumentNullException("element");

            if (element.Parent == null) return false;

            return element.Parent.Elements().Where(f => f.Name == element.Name).Count() > 1;
        }



        public static int GetSameSiblingsBeforeCount(this XElement element)
        {
            if (element == null) throw new ArgumentNullException("element");

            return element.NodesBeforeSelf().Where(f => f is XElement && ((XElement)f).Name == element.Name).Count();
        }


        /// <summary>
        /// Returns the value of the XElement attribute with the specified name. 
        /// </summary>
        /// <param name="element"></param>
        /// <param name="attributeName">The name of the attribute to (try to) get</param>
        /// <returns>The value of the attribute or null if the attribute does not exist.</returns>
        public static string GetAttributeValue(this XElement element, string attributeName)
        {
            if (element == null) throw new ArgumentNullException("element");
            if (string.IsNullOrEmpty(attributeName)) throw new ArgumentNullException("attributeName");

            XAttribute valueAttribute = element.Attribute(attributeName);

            if (valueAttribute == null)
            {
                return null;
            }
            else
            {
                return valueAttribute.Value;
            }
        }
    }
}
