using System.IO;
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
            using (Stream stream = new C1FileStream(filename, FileMode.Open))
            {
                document.Load(stream);
            }
        }



        public static void Save(XmlDocument document, string filename)
        {
            using (Stream stream = new C1FileStream(filename, FileMode.Create, FileAccess.Write, FileShare.Read))
            {
                document.Save(stream);
            }
        }
    }
}
