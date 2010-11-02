using System.Xml;
using Composite.Core.IO;


namespace Composite.Core.Xml
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class XmlReaderUtil
    {
        /// <summary>
        /// This should be a part of the I/O layer
        /// </summary>
        public static XmlReader Create(string path)
        {
            System.IO.Stream stream = new FileStream(path, System.IO.FileMode.Open, System.IO.FileAccess.Read, System.IO.FileShare.Read);
            
            return XmlReader.Create(stream);
        }



        /// <summary>
        /// This should be a part of the I/O layer
        /// </summary>
        public static XmlReader Create(string path, XmlReaderSettings settings)
        {
            System.IO.Stream stream = new FileStream(path, System.IO.FileMode.Open, System.IO.FileAccess.Read, System.IO.FileShare.Read);

            return XmlReader.Create(stream, settings);
        }
    }
}
