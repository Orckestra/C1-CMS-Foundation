using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Composite.Core.NewIO;
using System.Xml;
using System.Xml.Schema;

namespace Composite.Core.Xml
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    internal static class XmlSchemaSetUtils
    {
        public static XmlSchema AddFromPath(this XmlSchemaSet xmlSchemaSet, string targetNamespace, string path)
        {
            using (StreamReader streamReader = new StreamReader(path))
            {
                using (XmlReader xmlReader = XmlReader.Create(streamReader))
                {
                    return xmlSchemaSet.Add(targetNamespace, xmlReader);                    
                }
            }
        }
    }
}
