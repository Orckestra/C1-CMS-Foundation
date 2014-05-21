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
            return Load(inputUri, LoadOptions.None);
        }


        /// <summary>
        /// This should be a part of the I/O layer
        /// </summary>
        /// <param name="loadOptions">Load options.</param>
        /// <param name="inputUri">This could be a file or a url</param>
        public static XDocument Load(string inputUri, LoadOptions loadOptions)
        {
            if (inputUri.Contains("://"))
            {
                using (Stream stream = UriResolver.GetStream(inputUri))
                {
                    return XDocument.Load(stream, loadOptions);
                }
            }

            return XDocument.Load(inputUri, loadOptions);
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



        /// <summary>
        /// This should be a part of the I/O layer
        /// </summary>
        public static void SaveToFile(this XDocument document, string filename)
        {
            Save(document, filename);
        }



        /// <exclude />
        public static string GetDocumentAsString(this XDocument document)
        {
            Verify.ArgumentNotNull(document, "document");

            using (var ms = new MemoryStream())
            {
                using (var sw = new C1StreamWriter(ms))
                {
                    document.Save(sw);

                    ms.Seek(0, SeekOrigin.Begin);

                    using (var sr = new C1StreamReader(ms))
                    {
                        return sr.ReadToEnd();
                    }
                }
            }
        }
    }
}
