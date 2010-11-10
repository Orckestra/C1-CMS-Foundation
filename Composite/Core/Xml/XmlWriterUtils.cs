using System.Xml;
using Composite.Core.IO;
using System.IO;


namespace Composite.Core.Xml
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    internal static class XmlWriterUtils
    {
        /// <summary>
        /// This should be a part of the I/O layer
        /// </summary>
        public static XmlWriter Create(string path)
        {
            Stream stream = new C1FileStream(path, FileMode.Create, FileAccess.Write, FileShare.Read);

            XmlWriterSettings settings = new XmlWriterSettings();
            settings.CloseOutput = true;

            return XmlWriter.Create(stream, settings);
        }



        /// <summary>
        /// This should be a part of the I/O layer
        /// </summary>
        public static XmlWriter Create(string path, XmlWriterSettings settings)
        {
            Stream stream = new C1FileStream(path, FileMode.Create, FileAccess.Write, FileShare.Read);

            settings.CloseOutput = true;

            return XmlWriter.Create(stream, settings);
        }        
    }
}
