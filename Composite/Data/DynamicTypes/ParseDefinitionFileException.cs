using System;
using System.Xml;
using System.Xml.Linq;

namespace Composite.Data.DynamicTypes
{
    [Serializable]
    internal class ParseDefinitionFileException : Exception
    {
        private readonly XObject _source;

        public ParseDefinitionFileException(string message, XObject source) 
            : base(GetMessage(message, source))
        {
            _source = source;
            Line = (source as IXmlLineInfo).LineNumber;
            Position = (source as IXmlLineInfo).LinePosition;
        }

        public override string Source
        {
            get
            {
                return _source.BaseUri;
            }
        }

        public int Line { get; private set; }
        public int Position { get; private set; }

        private static string GetMessage(string message, XObject source)
        {
            var lineInfo = source as IXmlLineInfo;

            return string.Format("{0} ({1}:{2}): {3}", source.BaseUri, lineInfo.LineNumber, lineInfo.LinePosition, message);
        }
    }
}
