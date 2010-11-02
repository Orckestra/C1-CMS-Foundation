using System.Xml;
using Composite.Core.IO;


namespace Composite.Core.Xml
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    internal static class XmlDocumentUtil
    {
        public static void Load(XmlDocument document, string filename)
        {
            using (var stream = new FileStream(filename, System.IO.FileMode.Open))
            {
                document.Load(stream);
            }
        }



        public static void Save(XmlDocument document, string filename)
        {
            using (var stream = new FileStream(filename, System.IO.FileMode.Create, System.IO.FileAccess.Write, System.IO.FileShare.Read))
            {
                document.Save(stream);
            }
        }
    }
}
