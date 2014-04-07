using System.Xml.Linq;
using System;
using Composite.Core.Types;
using System.Linq;
using System.Collections.Generic;


namespace Composite.Core.Xml
{
    /// <summary>
    /// Represents an XHTML Document inside Composite C1. 
    /// 
    /// This structure can contain both head elements and body elements (content) and XhtmlDocuments that are being rendered
    /// can be nested within each other. The Composite C1 core will normalize such a nested structure when rendering a page, ensuring head elementsa flow to the top level
    /// document and body content is left, ultimately yielding one complete and correctly structured xhtml page.
    /// </summary>
    [XhtmlDocumentConverter]
    public sealed class XhtmlDocument : XDocument
    {
        private static readonly XName _html_XName = Namespaces.Xhtml + "html";
        private static readonly XName _head_XName = Namespaces.Xhtml + "head";
        private static readonly XName _body_XName = Namespaces.Xhtml + "body";

        /// <summary>
        /// Constructs an empty XhtmlDocument
        /// </summary>
        public XhtmlDocument()
            : base(new XElement(_html_XName,
                new XElement(_head_XName),
                new XElement(_body_XName)))
        { }



        /// <summary>
        /// Constructs a XhtmlDocument based on an existing html element
        /// </summary>
        /// <param name="htmlElement">Existing html element the XhtmlDocument should be cloned from</param>
        public XhtmlDocument(XElement htmlElement)
            : base(htmlElement)
        {
            this.Validate();
        }



        /// <summary>
        /// Constructs a XhtmlDocument based on an existing XDocument
        /// </summary>
        /// <param name="other">Existing XDocument instance the XhtmlDocument should be cloned from</param>
        public XhtmlDocument(XDocument other)
            : base(other)
        {
            this.Validate();
        }



        /// <summary>
        /// The head element for the XHTML Document
        /// </summary>
        public XElement Head
        {
            get
            {
                return this.Root.Element(_head_XName);
            }
        }



        /// <summary>
        /// The body element for the XHTML Document
        /// </summary>
        public XElement Body
        {
            get
            {
                return this.Root.Element(_body_XName);
            }
        }



        /// <summary>
        /// Returns true if the XhtmlDocument has empty head and body sections.
        /// </summary>
        public bool IsEmpty
        {
            get
            {
                bool hasContent = this.Head.Nodes().Any() || this.Body.Nodes().Any() || this.Body.Attributes().Any();

                return !hasContent;
            }
        }



        /// <summary>
        /// Parses a serialized xhtml document and returns XhtmlDocument.
        /// </summary>
        /// <param name="xhtml">xhtml to parse.</param>
        /// <returns>XhtmlDocument representing the supplied string</returns>
        public new static XhtmlDocument Parse(string xhtml)
        {
            var doc = new XhtmlDocument(XDocument.Parse(xhtml));

            List<XElement> sourceWhitespaceSensitiveElements = GetWhitespaceSensitiveElements(doc);

            if (sourceWhitespaceSensitiveElements.Any())
            {
                XhtmlDocument docWithWhitespaces = new XhtmlDocument(XDocument.Parse(xhtml, LoadOptions.PreserveWhitespace));
                List<XElement> fixedWhitespaceSensitiveElements = GetWhitespaceSensitiveElements(docWithWhitespaces);

                for (int i = 0; i < sourceWhitespaceSensitiveElements.Count; i++)
                {
                    sourceWhitespaceSensitiveElements[i].ReplaceWith(fixedWhitespaceSensitiveElements[i]);
                }
            }

            return doc;
        }



        /// <summary>
        /// Parses a serialized xhtml document and returns XhtmlDocument.
        /// </summary>
        /// <param name="xhtml">xhtml to parse.</param>
        /// <param name="options">This parameter is here for informative purposes - only LoadOptions.None is accepted, since anything else is a change to the DOM and a breeding ground for bugs</param>
        /// <returns>XhtmlDocument representing the supplied string</returns>
        public new static XhtmlDocument Parse(string xhtml, LoadOptions options)
        {
            if (options != LoadOptions.None)
                throw new NotImplementedException("PreserveWhitespace (anything but None) option is explicitly disallowed to prevent bugs - it will turn insignificant whitespace into text nodes, changing the DOM.");

            return Parse(xhtml);
        }


        private void Validate()
        {
            if (this.Root != null)
            {
                Verify.That(this.Root.Name == _html_XName, "Supplied XDocument must have a root named html belonging to the namespace xmlns=\"{0}\"", Namespaces.Xhtml);
                Verify.IsNotNull(this.Head, "XHTML document is missing <head /> element");
                Verify.IsNotNull(this.Body, "XHTML document is missing <body /> element");
            }
        }


        private static List<XElement> GetWhitespaceSensitiveElements(XhtmlDocument doc)
        {
            return doc.Descendants().Where(node => node.Name.Namespace == Namespaces.Xhtml && (node.Name.LocalName == "pre" || node.Name.LocalName == "textarea")).ToList();
        }
    }




    internal sealed class XhtmlDocumentConverterAttribute : ValueTypeConverterHelperAttribute
    {
        public override bool TryConvert(object value, Type targetType, out object targetValue)
        {
            Verify.ArgumentNotNull(value, "value");

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
