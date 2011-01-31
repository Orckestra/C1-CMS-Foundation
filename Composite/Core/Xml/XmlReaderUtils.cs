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
            return Create(path, null);
        }



        /// <summary>
        /// This should be a part of the I/O layer
        /// </summary>
        public static XmlReader Create(string path, XmlReaderSettings settings)
        {
            MemoryStream memoryStream = new MemoryStream();

            using (Stream stream = new C1FileStream(path, FileMode.Open, FileAccess.Read, FileShare.Read))
            {
                StreamUtils.CopyStream(stream, memoryStream);
            }

            memoryStream.Seek(0, SeekOrigin.Begin);

            if (settings == null)
            {
                return XmlReader.Create(memoryStream);
            }
            else
            {
                return XmlReader.Create(memoryStream, settings);
            }
        }
    }
}
