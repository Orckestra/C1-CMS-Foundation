using System;
using System.IO;
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
        /// <param name="inputUri">This could be a file or a url</param>
        public static XDocument Load(string inputUri)
        {
            XDocument document;

            using (Stream stream = UriResolver.GetStream(inputUri))
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
            using (C1FileStream stream = new C1FileStream(filename, FileMode.Create, FileAccess.Write, FileShare.Read))
            {
                document.Save(stream);
            }
        }



        public static string GetDocumentAsString(this XDocument document)
        {
            if (document == null) throw new ArgumentNullException("document");

            using (MemoryStream ms = new MemoryStream())
            {
                using (C1StreamWriter sw = new C1StreamWriter(ms))
                {
                    document.Save(sw);

                    ms.Seek(0, SeekOrigin.Begin);

                    using (C1StreamReader sr = new C1StreamReader(ms))
                    {
                        return sr.ReadToEnd();
                    }
                }
            }
        }
    }
}
