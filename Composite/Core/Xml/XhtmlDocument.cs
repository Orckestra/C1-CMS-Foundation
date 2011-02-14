using System.Xml.Linq;
using Composite.Core.Xml;
using System;
using Composite.Core.Types;


namespace Composite.Core.Xml
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [XhtmlDocumentConverter()]
	public sealed class XhtmlDocument : XDocument
	{
        /// <exclude />
        public XhtmlDocument()
            : base( new XElement( Namespaces.Xhtml + "html",
                new XElement(Namespaces.Xhtml + "head"),
                new XElement(Namespaces.Xhtml + "body")))
        { }



        /// <exclude />
        public XhtmlDocument(XElement htmlElement)
            : base(htmlElement)
        {
            this.Validate();
        }



        /// <exclude />
        public XhtmlDocument(XDocument other)
            : base(other)
        {
            this.Validate();
        }



        /// <exclude />
        public XElement Head
        {
            get
            {
                return this.Root.Element(Namespaces.Xhtml + "head");
            }
        }


        /// <exclude />
        public XElement Body
        {
            get
            {
                return this.Root.Element(Namespaces.Xhtml + "body");
            }
        }


        /// <exclude />
        public new static XhtmlDocument Parse(string xhtml)
        {
            return new XhtmlDocument(XDocument.Parse(xhtml));
        }



        private void Validate()
        {
            if (this.Root != null)
            {
                if (this.Root.Name != Namespaces.Xhtml + "html") throw new ArgumentException(string.Format("Supplied XDocument must have a root named html belonging to the namespace '{0}'", Namespaces.Xhtml));
                if (this.Head == null) throw new InvalidOperationException("XHTML document is missing <head /> element");
                if (this.Body == null) throw new InvalidOperationException("XHTML document is missing <body /> element");
            }
        }
    }




    internal sealed class XhtmlDocumentConverterAttribute : ValueTypeConverterHelperAttribute
    {
        public override bool TryConvert(object value, Type targetType, out object targetValue)
        {
            if (value == null) throw new ArgumentNullException("value");

            if (targetType == typeof(XhtmlDocument) && value is XElement)
            {
                XElement valueCasted = (XElement)value;
                targetValue = new XhtmlDocument(valueCasted);
                return true;
            }

            if (targetType == typeof(XElement) && value is XhtmlDocument)
            {
                XhtmlDocument valueCasted = (XhtmlDocument)value;
                targetValue = valueCasted.Root;
                return true;
            }

            if (targetType == typeof(XNode) && value is XhtmlDocument)
            {
                XhtmlDocument valueCasted = (XhtmlDocument)value;
                targetValue = valueCasted.Root;
                return true;
            }

            targetValue = null;
            return false;
        }
    }
}
