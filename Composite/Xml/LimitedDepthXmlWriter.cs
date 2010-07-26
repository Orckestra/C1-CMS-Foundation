using System;
using System.Xml;

namespace Composite.Xml
{
	internal class LimitedDepthXmlWriter : XmlWriter
	{
        private readonly XmlWriter _innerWriter;
        private readonly int _maxDepth;
        private int _depth;

        public LimitedDepthXmlWriter(XmlWriter innerWriter): this(innerWriter, 100)
        {
        }

        public LimitedDepthXmlWriter(XmlWriter innerWriter, int maxDepth)
        {
            _maxDepth = maxDepth;
            _innerWriter = innerWriter;
        }

        public override void Close()
        {
            _innerWriter.Close();
        }

        public override void Flush()
        {
            _innerWriter.Flush();
        }

        public override string LookupPrefix(string ns)
        {
            return _innerWriter.LookupPrefix(ns);
        }

        public override void WriteBase64(byte[] buffer, int index, int count)
        {
            _innerWriter.WriteBase64(buffer, index, count);
        }

        public override void WriteCData(string text)
        {
            _innerWriter.WriteCData(text);
        }

        public override void WriteCharEntity(char ch)
        {
            _innerWriter.WriteCharEntity(ch);
        }

        public override void WriteChars(char[] buffer, int index, int count)
        {
            _innerWriter.WriteChars(buffer, index, count);
        }

        public override void WriteComment(string text)
        {
            _innerWriter.WriteComment(text);
        }

        public override void WriteDocType(string name, string pubid, string sysid, string subset)
        {
            _innerWriter.WriteDocType(name, pubid, sysid, subset);
        }

        public override void WriteEndAttribute()
        {
            _innerWriter.WriteEndAttribute();
        }

        public override void WriteEndDocument()
        {
            _innerWriter.WriteEndDocument();
        }

        public override void WriteEndElement()
        {
            _depth--;

            _innerWriter.WriteEndElement();
        }

        public override void WriteEntityRef(string name)
        {
            _innerWriter.WriteEntityRef(name);
        }

        public override void WriteFullEndElement()
        {
            _innerWriter.WriteFullEndElement();
        }

        public override void WriteProcessingInstruction(string name, string text)
        {
            _innerWriter.WriteProcessingInstruction(name, text);
        }

        public override void WriteRaw(string data)
        {
            _innerWriter.WriteRaw(data);
        }

        public override void WriteRaw(char[] buffer, int index, int count)
        {
            _innerWriter.WriteRaw(buffer, index, count);
        }

        public override void WriteStartAttribute(string prefix, string localName, string ns)
        {
            _innerWriter.WriteStartAttribute(prefix, localName, ns);
        }

        public override void WriteStartDocument(bool standalone)
        {
            _innerWriter.WriteStartDocument(standalone);
        }

        public override void WriteStartDocument()
        {
            _innerWriter.WriteStartDocument();
        }

        public override void WriteStartElement(string prefix, string localName, string ns)
        {
            if (_depth++ > _maxDepth) ThrowException();

            _innerWriter.WriteStartElement(prefix, localName, ns);
        }

        public override WriteState WriteState
        {
            get { return _innerWriter.WriteState; }
        }

        public override void WriteString(string text)
        {
            _innerWriter.WriteString(text);
        }

        public override void WriteSurrogateCharEntity(char lowChar, char highChar)
        {
            _innerWriter.WriteSurrogateCharEntity(lowChar, highChar);
        }

        public override void WriteWhitespace(string ws)
        {
            _innerWriter.WriteWhitespace(ws);
        }

        private void ThrowException()
        {
            throw new InvalidOperationException(string.Format("Result xml has more the {0} nested tags. It is possible that xslt transformation contains an endless recursive call.", _maxDepth));
        }
    }
}
