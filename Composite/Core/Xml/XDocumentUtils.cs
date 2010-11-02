using System;
using System.Xml.Linq;
using Composite.Core.IO;


namespace Composite.Core.Xml
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class XDocumentUtils
    {
        /// <summary>
        /// This should be a part of the I/O layer
        /// </summary>
        public static XDocument Load(string filename)
        {
            XDocument document;

            using (FileStream stream = new FileStream(filename, System.IO.FileMode.Open, System.IO.FileAccess.Read))
            {
                document = XDocument.Load(stream);
            }

            return document;
        }



        /// <summary>
        /// This should be a part of the I/O layer
        /// </summary>
        public static void Save(XDocument document, string filename)
        {
            using (FileStream stream = new FileStream(filename, System.IO.FileMode.Create, System.IO.FileAccess.Write, System.IO.FileShare.Read))
            {
                document.Save(stream);
            }
        }



        public static string GetDocumentAsString(this XDocument document)
        {
            if (document == null) throw new ArgumentNullException("document");

            using (System.IO.MemoryStream ms = new System.IO.MemoryStream())
            {
                using (StreamWriter sw = new StreamWriter(ms))
                {
                    document.Save(sw);


                    ms.Seek(0, System.IO.SeekOrigin.Begin);

                    using (StreamReader sr = new StreamReader(ms))
                    {
                        return sr.ReadToEnd();
                    }
                }
            }
        }
    }
}
