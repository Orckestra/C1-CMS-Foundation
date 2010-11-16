using System.Xml;
using System.Xml.Schema;
using Composite.Core.IO;


namespace Composite.Core.Xml
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    internal static class XmlSchemaSetUtils
    {
        /// <summary>
        /// This should be a part of the I/O layer
        /// </summary>
        public static XmlSchema AddFromPath(this XmlSchemaSet xmlSchemaSet, string targetNamespace, string path)
        {
            using (C1StreamReader streamReader = new C1StreamReader(path))
            {
                using (XmlReader xmlReader = XmlReader.Create(streamReader))
                {
                    return xmlSchemaSet.Add(targetNamespace, xmlReader);                    
                }
            }
        }
    }
}
