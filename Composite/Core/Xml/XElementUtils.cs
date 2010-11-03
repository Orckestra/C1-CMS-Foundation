using System;
using System.Linq;
using System.Xml.Linq;
using Composite.Core.IO;


namespace Composite.Core.Xml
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class XElementUtils
    {
        /// <summary>
        /// This should be a part of the I/O layer
        /// </summary>
        public static XElement Load(string fileName)
        {
            XElement element;

            using (FileStream stream = new FileStream(fileName, System.IO.FileMode.Open, System.IO.FileAccess.Read))
            {
                element = XElement.Load(stream);
            }

            return element;
        }



        /// <summary>
        /// This should be a part of the I/O layer
        /// </summary>
        public static void SaveToPath(this XElement element, string fileName)
        {
            using (FileStream stream = new FileStream(fileName, System.IO.FileMode.Create, System.IO.FileAccess.Write))
            {                
                element.Save(stream);
            }
        }



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
