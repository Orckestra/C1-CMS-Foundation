using System.IO;
using System.Xml;
using Composite.Core.IO;


namespace Composite.Core.Xml
{
    /// <summary>   
    /// This class contains Composite IO versions of System.Xml.XmlWriter/System.Xml.XmlTextWriter Create.
    /// These method should be used instead of the ones in System.Xml.XmlWriter/System.Xml.XmlTextWriter.
    /// </summary>
    public static class XmlWriterUtils
    {
        /// <summary>
        /// Creates a new XmlWriter
        /// </summary>
        /// <param name="path">Path to file</param>
        /// <returns>Returns the newly created XmlWriter</returns>
        public static XmlWriter Create(string path)
        {
            Stream stream = new C1FileStream(path, FileMode.Create, FileAccess.Write, FileShare.Read);

            XmlWriterSettings settings = new XmlWriterSettings();
            settings.CloseOutput = true;

            return XmlWriter.Create(stream, settings);
        }



        /// <summary>
        /// Creates a new XmlWriter
        /// </summary>
        /// <param name="path">Path to file</param>
        /// <param name="settings">An instance to XmlWriterSettings</param>
        /// <returns>Returns the newly created XmlWriter</returns>
        public static XmlWriter Create(string path, XmlWriterSettings settings)
        {
            Stream stream = new C1FileStream(path, FileMode.Create, FileAccess.Write, FileShare.Read);

            settings.CloseOutput = true;

            return XmlWriter.Create(stream, settings);
        }        
    }
}
