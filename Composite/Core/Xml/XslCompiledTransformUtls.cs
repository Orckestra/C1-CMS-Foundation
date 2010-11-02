using System.Xml;
using System.Xml.Xsl;
using Composite.Core.IO;


namespace Composite.Core.Xml
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class XslCompiledTransformUtls
    {
        /// <summary>
        /// This should be a part of the I/O layer
        /// </summary>
        public static void LoadFromPath(this XslCompiledTransform xslCompiledTransform, string path)
        {
            using (StreamReader streamReader = new StreamReader(path))
            {
                using (XmlReader xmlReader = XmlReader.Create(streamReader))
                {
                    xslCompiledTransform.Load(xmlReader);
                }
            }
        }



        /// <summary>
        /// This should be a part of the I/O layer
        /// </summary>
        public static void LoadFromPath(this XslCompiledTransform xslCompiledTransform, string path, XsltSettings settings, XmlResolver stylesheetResolver)
        {
            using (StreamReader streamReader = new StreamReader(path))
            {
                using (XmlReader xmlReader = XmlReader.Create(streamReader))
                {
                    xslCompiledTransform.Load(xmlReader, settings, stylesheetResolver);
                }
            }
        }
    }
}
