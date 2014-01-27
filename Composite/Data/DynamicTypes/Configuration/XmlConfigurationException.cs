using System;
using System.Configuration;
using System.Xml;
using System.Xml.Linq;

namespace Composite.Data.DynamicTypes.Configuration
{
    internal class XmlConfigurationException : ConfigurationException
    {
        private readonly XObject _xobject;

        public XmlConfigurationException(string message, XObject xObject)
            : base(message)
        {
            _xobject = xObject;
        }

        public XObject XObject
        {
            get { return _xobject; }
        }

        public override int Line
        {
            get
            {
                return ((IXmlLineInfo) XObject).LineNumber;
            }
        }

        public override string Filename
        {
            get
            {
                const string fileUriPrefix = "file:///";
                string baseUri = XObject.Document.BaseUri;

                return baseUri.StartsWith(fileUriPrefix, StringComparison.Ordinal) 
                    ? baseUri.Substring(fileUriPrefix.Length)
                    : baseUri;
            }
        }
    }
}
