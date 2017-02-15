using System.Xml.Linq;
using System;
using Composite.Core.Types;
using System.Linq;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Xml;
using Composite.Core.IO;


namespace Composite.Core.Xml
{
    /// <summary>
    /// Represents an XHTML Document inside C1 CMS. 
    /// 
    /// This structure can contain both head elements and body elements (content) and XhtmlDocuments that are being rendered
    /// can be nested within each other. The C1 CMS core will normalize such a nested structure when rendering a page, ensuring head elementsa flow to the top level
    /// document and body content is left, ultimately yielding one complete and correctly structured xhtml page.
    /// </summary>
    [XhtmlDocumentConverter]
    public sealed class XhtmlDocument : XDocument
    {
        private static readonly XName _html_XName = Namespaces.Xhtml + "html";
        private static readonly XName _head_XName = Namespaces.Xhtml + "head";
        private static readonly XName _body_XName = Namespaces.Xhtml + "body";

        private static readonly string XhtmlFragmentDtdInternalSubset = null;
        private static readonly string EntityFileName = PathUtil.Resolve("~/App_Data/Composite/Configuration/Entities.xml");

        static XhtmlDocument()
        {
            if (File.Exists(EntityFileName))
            {
                var doc = XDocument.Load(EntityFileName);

                var sb = new StringBuilder();

                foreach (var element in doc.Root.Elements())
                {
                    string name = (string) element.Attribute("name");
                    string xmlsafe = (string) element.Attribute("xmlsafe");

                    if (!string.IsNullOrEmpty(name) && xmlsafe != null)
                    {
                        sb.AppendFormat(@"<!ENTITY {0} '{1}'>", name, xmlsafe);
                    }
                }

                XhtmlFragmentDtdInternalSubset = sb.ToString();
            }
        }

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


        /// <summary>
        /// Parses an xhtml fragment of into an XhtmlDocument.
        /// </summary>
        /// <param name="fragment"></param>
        /// <returns></returns>
        public static XhtmlDocument ParseXhtmlFragment(string fragment)
        {
            if (string.IsNullOrEmpty(fragment))
            {
                return new XhtmlDocument();
            }

            var nodes = new List<XNode>();

            using (var stringReader = new StringReader(fragment))
            {
                var xmlReaderSettings = new XmlReaderSettings
                {
                    IgnoreWhitespace = true,
                    DtdProcessing = DtdProcessing.Parse,
                    MaxCharactersFromEntities = 10000000,
                    XmlResolver = null,
                    ConformanceLevel = ConformanceLevel.Fragment // Allows multiple XNode-s
                };

                var inputContext = FragmentContainsHtmlEntities(fragment) ? GetXhtmlFragmentParserContext() : null;

                using (var xmlReader = XmlReader.Create(stringReader, xmlReaderSettings, inputContext))
                {
                    xmlReader.MoveToContent();

                    while (!xmlReader.EOF)
                    {
                        XNode node = XNode.ReadFrom(xmlReader);
                        nodes.Add(node);
                    }
                }
            }

            if (nodes.Count == 1 && nodes[0] is XElement && (nodes[0] as XElement).Name.LocalName == "html")
            {
                return new XhtmlDocument(nodes[0] as XElement);
            }

            var document = new XhtmlDocument();
            document.Body.Add(nodes);

            return document;
        }

        private static bool FragmentContainsHtmlEntities(string fragment)
        {
            int searchOffset = 0;

            while (searchOffset != -1)
            {
                int ampersandOffset = fragment.IndexOf("&", searchOffset, StringComparison.Ordinal);
                if (ampersandOffset == -1)
                {
                    return false;
                }

                searchOffset = ampersandOffset + 1;

                int symbolsLeft = fragment.Length - ampersandOffset - 1;
                if ((symbolsLeft > 0 && fragment[ampersandOffset + 1] == '#')
                    || (symbolsLeft >= 4
                        && fragment[ampersandOffset + 1] == 'a'
                        && fragment[ampersandOffset + 2] == 'm'
                        && fragment[ampersandOffset + 3] == 'p'
                        && fragment[ampersandOffset + 4] == ';')
                    || (symbolsLeft >= 5
                        && fragment[ampersandOffset + 1] == 'a'
                        && fragment[ampersandOffset + 2] == 'p'
                        && fragment[ampersandOffset + 3] == 'o'
                        && fragment[ampersandOffset + 4] == 's'
                        && fragment[ampersandOffset + 5] == ';')
                    || (symbolsLeft >= 5
                        && fragment[ampersandOffset + 1] == 'q'
                        && fragment[ampersandOffset + 2] == 'u'
                        && fragment[ampersandOffset + 3] == 'o'
                        && fragment[ampersandOffset + 4] == 't'
                        && fragment[ampersandOffset + 5] == ';')
                    || (symbolsLeft >= 3
                        && fragment[ampersandOffset + 1] == 'g'
                        && fragment[ampersandOffset + 2] == 't'
                        && fragment[ampersandOffset + 3] == ';')
                    || (symbolsLeft >= 3
                        && fragment[ampersandOffset + 1] == 'l'
                        && fragment[ampersandOffset + 2] == 't'
                        && fragment[ampersandOffset + 3] == ';'))
                {
                    continue;
                }

                return true;
            }

            // this line should not be reachable
            return false;
        }

        private static XmlParserContext GetXhtmlFragmentParserContext()
        {
            if (XhtmlFragmentDtdInternalSubset == null)
            {
                return null;
            }

            return new XmlParserContext(null, null, "internal",
                String.Empty,
                String.Empty,
                XhtmlFragmentDtdInternalSubset,
                String.Empty,
                String.Empty,
                XmlSpace.Default,
                Encoding.UTF8);
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
