using System.IO;
using System.Xml;
using Composite.Core.IO;


namespace Composite.Core.Xml
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class XmlReaderUtils
    {
        /// <summary>
        /// This should be a part of the I/O layer
        /// </summary>
        public static XmlReader Create(string path)
        {
            Stream stream = new C1FileStream(path, FileMode.Open, FileAccess.Read, FileShare.Read);
            
            return XmlReader.Create(stream);
        }



        /// <summary>
        /// This should be a part of the I/O layer
        /// </summary>
        public static XmlReader Create(string path, XmlReaderSettings settings)
        {
            Stream stream = new C1FileStream(path, FileMode.Open, FileAccess.Read, FileShare.Read);

            return XmlReader.Create(stream, settings);
        }
    }
}
