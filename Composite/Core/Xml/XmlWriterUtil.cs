using System.Xml;
using Composite.Core.IO;


namespace Composite.Core.Xml
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    internal static class XmlWriterUtil
    {
        /// <summary>
        /// This should be a part of the I/O layer
        /// </summary>
        public static XmlWriter Create(string path)
        {
            System.IO.Stream stream = new FileStream(path, System.IO.FileMode.Create, System.IO.FileAccess.Write, System.IO.FileShare.Read);

            XmlWriterSettings settings = new XmlWriterSettings();
            settings.CloseOutput = true;

            return XmlWriter.Create(stream, settings);
        }



        /// <summary>
        /// This should be a part of the I/O layer
        /// </summary>
        public static XmlWriter Create(string path, XmlWriterSettings settings)
        {
            System.IO.Stream stream = new FileStream(path, System.IO.FileMode.Create, System.IO.FileAccess.Write, System.IO.FileShare.Read);

            settings.CloseOutput = true;

            return XmlWriter.Create(stream, settings);
        }        
    }
}
