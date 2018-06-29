using System;
using System.Collections.Generic;
using System.Xml;
using System.Xml.Linq;
using System.Xml.Xsl;
using Composite.Core.IO;
using Composite.Core.Xml;


namespace Composite.Core.WebClient
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public static class XsltServices
	{
        private static Dictionary<string, XslCompiledTransform> _xsltLookup = new Dictionary<string, XslCompiledTransform>();
        private static Dictionary<string, DateTime> _xsltFileTimestamps = new Dictionary<string, DateTime>();
        private static object _lock = new object();

        /// <exclude />
        public static XslCompiledTransform GetCompiledXsltTransform(string stylesheetPath)
        {
            lock (_lock)
            {
                DateTime lastXsltFileWrite = C1File.GetLastWriteTime(stylesheetPath);

                bool compiledVersionExists = _xsltLookup.ContainsKey(stylesheetPath);
                bool reloadFresh = (DateTime.Now - lastXsltFileWrite).TotalMinutes < 30;

                if (compiledVersionExists == false || lastXsltFileWrite > _xsltFileTimestamps[stylesheetPath] || reloadFresh)
                {
                    XslCompiledTransform xslt = new XslCompiledTransform();
                    using (XmlReader reader = XmlReaderUtils.Create(stylesheetPath))
                    {
                        xslt.Load(reader);
                    }

                    if (compiledVersionExists)
                    {
                        _xsltLookup.Remove(stylesheetPath);
                        _xsltFileTimestamps.Remove(stylesheetPath);
                    }

                    _xsltLookup.Add(stylesheetPath, xslt);
                    _xsltFileTimestamps.Add(stylesheetPath, lastXsltFileWrite);
                }
            }

            return _xsltLookup[stylesheetPath];
        }



        /// <exclude />
        public static XDocument XslTransform(this XDocument sourceDocument, string xsltFilePath)
        {
            XDocument outputDocument = new XDocument();

            XslCompiledTransform xslt = XsltServices.GetCompiledXsltTransform(xsltFilePath);

            using (XmlWriter writer = outputDocument.CreateWriter())
            {
                using (XmlReader reader = sourceDocument.CreateReader())
                {
                    xslt.Transform(reader, writer);
                }
            }

            return outputDocument;
        }
    }
}
