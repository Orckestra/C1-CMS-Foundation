using System.Xml;
using Composite.Core.NewIO;


namespace Composite.Core.Xml
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    internal static class XmlReaderUtil
    {
        public static XmlReader Create(string path)
        {
            System.IO.Stream stream = new FileStream(path, System.IO.FileMode.Open, System.IO.FileAccess.Read, System.IO.FileShare.Read);
            
            return XmlReader.Create(stream);
        }



        public static XmlReader Create(string path, XmlReaderSettings settings)
        {
            System.IO.Stream stream = new FileStream(path, System.IO.FileMode.Open, System.IO.FileAccess.Read, System.IO.FileShare.Read);

            return XmlReader.Create(stream, settings);
        }
    }
}
