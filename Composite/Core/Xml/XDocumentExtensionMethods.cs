using System;
using System.IO;
using System.Xml.Linq;


namespace Composite.Core.Xml
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public static class XDocumentExtensionMethods
	{
        public static string GetDocumentAsString(this XDocument document)
        {
            if (document == null) throw new ArgumentNullException("document");

            using (MemoryStream ms = new MemoryStream())
            {
                using (StreamWriter sw = new StreamWriter(ms))
                {
                    document.Save(sw);


                    ms.Seek(0, SeekOrigin.Begin);

                    using (StreamReader sr = new StreamReader(ms))
                    {
                        return sr.ReadToEnd();
                    }
                }
            }
        }
	}
}
