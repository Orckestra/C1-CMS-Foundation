using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml.Linq;
using System.Xml;


namespace Composite.Core.Xml
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class XNodeExtensionMethods
    {
        /// <summary>
        /// Returns an XPath to the specified XObject for documentation purposes. Namespaces
        /// are not handled by this function and using the returned XPath to look up the element
        /// is not guaranteed to work.
        /// </summary>
        /// <param name="xObject"></param>
        /// <returns></returns>
        public static string GetXPath(this XObject xObject)
        {
            StringBuilder sb = new StringBuilder();

            GetXPath(xObject, sb);

            return sb.ToString();
        }


        
        private static void GetXPath(this XObject xObject, StringBuilder currentPath)
        {
            if (xObject == null) throw new ArgumentNullException("xObject");

            XElement element = xObject as XElement;
            if (element != null)
            {
                if (element.Parent != null)
                {
                    if (element.HasSameSiblings() == false)
                    {
                        currentPath.Insert(0, element.Name.LocalName);
                        currentPath.Insert(0, "/");
                    }
                    else
                    {
                        int count = 1 + element.GetSameSiblingsBeforeCount();

                        currentPath.Insert(0, "]");
                        currentPath.Insert(0, count);
                        currentPath.Insert(0, "[");
                        currentPath.Insert(0, element.Name.LocalName);
                        currentPath.Insert(0, "/");
                    }

                    GetXPath(element.Parent, currentPath);
                    return;
                }
                else
                {
                    currentPath.Insert(0, element.Name.LocalName);
                    currentPath.Insert(0, "/");
                    return;
                }
            }

            XAttribute attribute = xObject as XAttribute;
            if (attribute != null)
            {
                currentPath.Insert(0, attribute.Name);
                currentPath.Insert(0, "@");

                GetXPath(attribute.Parent, currentPath);
                return;
            }

            throw new NotSupportedException("Only XElement and XAttribute supported");
        }


        /// <exclude />
        public static string[] InlineElements = new string[]
        {
            "a", 
            "abbr", 
            "acronym", 
            "b", 
            "basefont", 
            "bdo", 
            "big", 
            "br", 
            "cite", 
            "code", 
            "dfn", 
            "em", 
            "font", 
            "i", 
            "img", 
            "input", 
            "kbd", 
            "label", 
            "q", 
            "s", 
            "samp", 
            "select", 
            "small", 
            "span", 
            "strike", 
            "strong", 
            "sub", 
            "sup", 
            "textarea", 
            "tt", 
            "u", 
            "var"
        };

        private static readonly HashSet<string> InlineElementsLookup = new HashSet<string>(InlineElements);

        /// <exclude />
        public static bool IsBlockElement(this XNode node)
        {
            if (node == null) return false;

            XElement element = node as XElement;
            if (element == null) return false;

            if (element.Name.Namespace == Namespaces.Xhtml)
            {
                if (InlineElementsLookup.Contains(element.Name.LocalName.ToLower())) 
                    return false;
            }

            return true;
        }



        /// <exclude />
        public static bool IsWhitespaceAware(this XNode node)
        {
            if (node == null) return false;

            XElement element = node as XElement;
            if (element == null) return false;

            if ((element.Name.LocalName.ToLower() != "pre") && (element.Name.LocalName.ToLower() != "textarea")) return false;

            return true;
        }      
    }
}
