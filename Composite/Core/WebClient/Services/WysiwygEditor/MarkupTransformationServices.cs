using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Xml;
using System.Xml.Linq;
using System.Xml.Xsl;
using Composite.Core.IO;
using Composite.Core.Xml;
using TidyNet;


namespace Composite.Core.WebClient.Services.WysiwygEditor
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class TidyHtmlResult
    {
        /// <exclude />
        public XDocument Output { get; set; }
        
        /// <exclude />
        public string ErrorSummary { get; set; }
    }



    /// <summary>
    /// Summary description for HtmlTidyServices
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class MarkupTransformationServices
    {
        /// <exclude />
        public static IEnumerable<string> Html5specificElementNames = new List<string> { "article", "aside", "audio", "canvas", "command", "datalist", "details", "embed", "figcaption", "figure", "footer", "header", "hgroup", "keygen", "mark", "meter", "nav", "output", "progress", "rp", "rt", "ruby", "section", "source", "summary", "time", "video", "wbr", "main", "link", "meta", "i" };

        static readonly Regex _duplicateAttributesRegex = new Regex(@"<([^>]*?) (?<attributeName>\w*?)=(?<quote>"")([^>]*?)(\k<quote>)([^>]*?) (\k<attributeName>)=(?<quote2>"")([^>]*?)(\k<quote2>)([^>]*?)>", RegexOptions.Compiled);
        static readonly Regex _namespacePrefixedElement = new Regex(@"<([a-zA-Z0-9\._]*?):([a-zA-Z0-9\._]*)([^>]*?)(/?)>", RegexOptions.Multiline | RegexOptions.Compiled);
        static readonly Regex _elementWithNamespaceDeclaration = new Regex(@"<(.*?) xmlns:([a-zA-Z0-9\._]*)=""(.*?)""(.*?)(/?)>", RegexOptions.Compiled);
        static readonly Regex _elementsWithPrefixedAttributes = new Regex(@"<[^>]*? ([\w]):.*?>", RegexOptions.Compiled);
        static readonly Regex _customNamespaceDeclarations = new Regex(@"<(.*?) xmlns:(?<prefix>[a-zA-Z0-9\._]*?)=""(?<uri>.*?)""([^>]*?)>", RegexOptions.Compiled);

        /// <summary>
        /// Repairs an html fragment (makes it Xhtml) and executes a transformation on it.
        /// </summary>
        /// <param name="html">The html to repair</param>
        /// <param name="xsltPath">The path to the XSLT to use for transformation</param>
        /// <param name="xsltParameters"></param> 
        /// <param name="errorSummary">out value - warnings generated while repairing the html</param>
        /// <returns></returns>
        public static XDocument RepairXhtmlAndTransform(string html, string xsltPath, Dictionary<string, string> xsltParameters, out string errorSummary)
        {
            TidyHtmlResult tidyHtmlResult = MarkupTransformationServices.TidyHtml(html);

            errorSummary = tidyHtmlResult.ErrorSummary;
            XNode tidiedXhtml = tidyHtmlResult.Output;
            XDocument outputDocument = new XDocument();

            XslCompiledTransform xslt = XsltServices.GetCompiledXsltTransform(xsltPath);

            using (XmlWriter writer = outputDocument.CreateXhtmlWriter())
            {
                using (XmlReader reader = tidiedXhtml.CreateReader())
                {
                    if (xsltParameters != null && xsltParameters.Count > 0)
                    {
                        XsltArgumentList xsltArgumentList = new XsltArgumentList();
                        foreach (var xsltParameter in xsltParameters)
                        {
                            xsltArgumentList.AddParam(xsltParameter.Key, "", xsltParameter.Value );
                        }
                        xslt.Transform(reader, xsltArgumentList, writer);
                    }
                    else
                    {
                        xslt.Transform(reader, writer);
                    }
                }
            }

            return outputDocument;
        }


        /// <summary>
        /// Repairs an html fragment (makes it Xhtml) and executes a transformation on it.
        /// </summary>
        /// <param name="xml">The xml to repair</param>
        /// <param name="xsltPath">The path to the XSLT to use for transformation</param>        
        /// <returns></returns>
        public static XDocument RepairXmlAndTransform(string xml, string xsltPath)
        {
            XDocument tidiedXml = MarkupTransformationServices.TidyXml(xml);

            XDocument outputDocument = new XDocument();

            XslCompiledTransform xslt = XsltServices.GetCompiledXsltTransform(xsltPath);

            using (XmlWriter writer = outputDocument.CreateWriter())
            {
                using (XmlReader reader = tidiedXml.CreateReader())
                {
                    xslt.Transform(reader, writer);
                }
            }

            return outputDocument;
        }


        /// <summary>
        /// Cleans HTML documents or fragments into XHTML conformant markup
        /// </summary>
        /// <param name="htmlMarkup">The html to clean</param>
        /// <returns>A fully structured XHTML document, incl. html, head and body elements.</returns>
        public static TidyHtmlResult TidyHtml(string htmlMarkup)
        {
            Tidy tidy = GetXhtmlConfiguredTidy();

            List<string> namespacePrefixedElementNames = LocateNamespacePrefixedElementNames(htmlMarkup);
            Dictionary<string, string> namespacePrefixToUri = LocateNamespacePrefixToUriDeclarations(htmlMarkup);
            List<string> badNamespacePrefixedElementNames = namespacePrefixedElementNames
                .Where(s => !namespacePrefixToUri.Any(d => s.StartsWith(d.Key))).ToList();
            AllowNamespacePrefixedElementNames(tidy, namespacePrefixedElementNames);
            AllowHtml5ElementNames(tidy);

            string xhtml = ParseMarkup(htmlMarkup, tidy, out TidyMessageCollection tidyMessages);

            if (xhtml.IndexOf("<html>")>-1)
            {
                xhtml = xhtml.Replace("<html>", "<html xmlns=\"http://www.w3.org/1999/xhtml\">");
            }

            if (xhtml.IndexOf("xmlns=\"http://www.w3.org/1999/xhtml\"") == -1)
            {
                xhtml = xhtml.Replace("<html", "<html xmlns=\"http://www.w3.org/1999/xhtml\"");
            }

            xhtml = RemoveDuplicateAttributes(xhtml);
            xhtml = RemoveXmlDeclarations(xhtml);
            xhtml = UndoLowerCasingOfElementNames(xhtml, namespacePrefixedElementNames);
            xhtml = UndoLowerCasingOfNamespacePrefixes(xhtml, namespacePrefixToUri);
            StringBuilder messageBuilder = new StringBuilder();
            foreach (TidyMessage message in tidyMessages)
            {
                if (message.Level == MessageLevel.Warning)
                    messageBuilder.AppendLine(message.ToString());
            }

            List<string> badNamespacePrefixes = badNamespacePrefixedElementNames.Select(n => n.Substring(0, n.IndexOf(':'))).Union(LocateAttributeNamespacePrefixes(xhtml)).Distinct().Where(f => IsValidXmlName(f)).ToList();

            XDocument outputResult;
            if (badNamespacePrefixedElementNames.Any())
            {
                string badDeclared = string.Join(" ", badNamespacePrefixes.Select(p => $"xmlns:{p}='#bad'"));
                XDocument badDoc = XDocument.Parse($"<root {badDeclared}>{xhtml}</root>");
                badDoc.Descendants().Attributes().Where(e => e.Name.Namespace == "#bad").Remove();
                badDoc.Descendants().Where(e => e.Name.Namespace == "#bad").Remove();
                outputResult = new XDocument(badDoc.Root.Descendants().First());
            }
            else
            {
                outputResult = XDocument.Parse(xhtml, LoadOptions.PreserveWhitespace);
            }

            return new TidyHtmlResult { Output = outputResult, ErrorSummary = messageBuilder.ToString() };
        }

        private static string ParseMarkup(string markup, Tidy tidy, out TidyMessageCollection tidyMessages)
        {
            string result;

            tidyMessages = new TidyMessageCollection();
            byte[] htmlByteArray = Encoding.UTF8.GetBytes(markup);

            using (var inputStream = new MemoryStream(htmlByteArray))
            {
                using (var outputStream = new MemoryStream())
                {
                    tidy.Parse(inputStream, outputStream, tidyMessages);
                    outputStream.Position = 0;
                    using (var sr = new C1StreamReader(outputStream))
                    {
                        result = sr.ReadToEnd();
                    }
                }
            }

            if (tidyMessages.Errors > 0)
            {
                var errorMessageBuilder = new StringBuilder();
                foreach (TidyMessage message in tidyMessages)
                {
                    if (message.Level == MessageLevel.Error)
                        errorMessageBuilder.AppendLine(message.ToString());
                }
                throw new InvalidOperationException($"Failed to parse html:\n\n{errorMessageBuilder}");
            }

            return result;
        }


        /// <summary>
        /// Cleans HTML documents or fragments into XHTML conformant markup
        /// </summary>
        /// <param name="xmlMarkup">The html to clean</param>
        /// <returns></returns>
        public static XDocument TidyXml(string xmlMarkup)
        {
            try
            {
                return XhtmlDocument.Parse(xmlMarkup);
            }
            catch (Exception)
            {
                // take the slow road below...
            }

            Tidy tidy = GetXmlConfiguredTidy();

            List<string> namespacePrefixedElementNames = LocateNamespacePrefixedElementNames(xmlMarkup);
            AllowNamespacePrefixedElementNames(tidy, namespacePrefixedElementNames);
            AllowHtml5ElementNames(tidy);

            string xml = ParseMarkup(xmlMarkup, tidy, out TidyMessageCollection _);

            xml = RemoveDuplicateAttributes(xml);

            return XDocument.Parse(xml);
        }


        /// <exclude />
        public static string OutputBodyDescendants(XDocument source)
        {
            string bodyInnerXhtml = "";

            XmlWriterSettings settings = CustomizedWriterSettings();
            using (var memoryStream = new MemoryStream())
            {
                using (var writer = XmlWriter.Create(memoryStream, settings))
                {
                    XNamespace xhtml = "http://www.w3.org/1999/xhtml";
                    XElement bodyElement = source.Descendants(xhtml + "body").First();

                    foreach (XNode element in bodyElement.Nodes())
                    {
                        element.WriteTo(writer);
                    }

                    writer.Close();
                }

                memoryStream.Position = 0;
                using (var sr = new C1StreamReader(memoryStream))
                {
                    bodyInnerXhtml = sr.ReadToEnd();
                }
            }

            bodyInnerXhtml = bodyInnerXhtml.Replace(" xmlns=\"http://www.w3.org/1999/xhtml\"", "");

            var prefixToUriLookup = new Dictionary<string, string>();

            int lastLength = -1;
            while (bodyInnerXhtml.Length != lastLength)
            {
                lastLength = bodyInnerXhtml.Length;
                MatchCollection matchCollection = _customNamespaceDeclarations.Matches(bodyInnerXhtml);

                foreach (Match match in matchCollection)
                {
                    string prefix = match.Groups["prefix"].Value;
                    if (!prefixToUriLookup.ContainsKey(prefix))
                    {
                        prefixToUriLookup.Add(prefix, match.Groups["uri"].Value);
                    }
                }

                if (matchCollection.Count > 0)
                {
                    bodyInnerXhtml = _customNamespaceDeclarations.Replace(bodyInnerXhtml, "<$1$2>");
                }
            }

            foreach (var prefixInfo in prefixToUriLookup)
            {
                Regex namespacePrefixedElement = new Regex("<(" + prefixInfo.Key + @":[a-zA-Z0-9\._]*?)([^>]*?)( ?/?)>", RegexOptions.Compiled);
                bodyInnerXhtml = namespacePrefixedElement.Replace(bodyInnerXhtml, "<$1$2 xmlns:" + prefixInfo.Key + "=\"" + prefixInfo.Value + "\"$3>");
            }

            return bodyInnerXhtml;
        }


        private static XmlWriterSettings CustomizedWriterSettings()
        {
            return new XmlWriterSettings
            {
                OmitXmlDeclaration = true,
                ConformanceLevel = ConformanceLevel.Fragment,
                CloseOutput = false,
                Indent = true,
                IndentChars = "\t"
            };
        }


        private static string RemoveXmlDeclarations(string html)
        {
            Regex duplicateAttributesRegex = new Regex(@"<\?.*?>");

            int prevLength = -1;
            while (html.Length != prevLength)
            {
                prevLength = html.Length;
                html = duplicateAttributesRegex.Replace(html, "");
            }

            return html;
        }

        private static string RemoveDuplicateAttributes(string html)
        {
            // TODO: optimize, way to slow, takes 150ms!
            int prevLength = -1;
            while (html.Length != prevLength)
            {
                prevLength = html.Length;
                html = _duplicateAttributesRegex.Replace(html, @"<$1 ${attributeName}=""$2""$4$8>");
            }

            return html;
        }



        private static string UndoLowerCasingOfNamespacePrefixes(string html, Dictionary<string, string> namespacePrefixToUri)
        {
            foreach (var namespaceMapping in namespacePrefixToUri.Where(f => f.Key.ToLower() != f.Key))
            {
                Regex tidyCasedElement = new Regex(@"<(.*?) xmlns:" + namespaceMapping.Key.ToLower() + @"=""" + namespaceMapping.Value + @"""(.*?)>");
                html = tidyCasedElement.Replace(html, "<$1 xmlns:" + namespaceMapping.Key + @"=""" + namespaceMapping.Value + @"""$2>");
            }

            return html;
        }



        private static string UndoLowerCasingOfElementNames(string html, List<string> elementNames)
        {
            foreach (string elementName in elementNames.Where(f => f.ToLower() != f))
            {
                Regex tidyCasedElement = new Regex(@"<(/?)" + elementName.ToLower() + @"(.*?)>");
                html = tidyCasedElement.Replace(html, "<$1" + elementName + "$2>");
            }

            return html;
        }



        private static Tidy GetXhtmlConfiguredTidy()
        {
            var t = new Tidy();

            t.Options.RawOut = true;
            t.Options.TidyMark = false;

            t.Options.CharEncoding = CharEncoding.UTF8;
            t.Options.DocType = DocType.Omit;
            t.Options.WrapLen = 0;

            t.Options.BreakBeforeBR = true;
            t.Options.DropEmptyParas = true;
            t.Options.Word2000 = true;
            t.Options.MakeClean = false;
            t.Options.Xhtml = true;

            t.Options.QuoteNbsp = false;
            t.Options.NumEntities = true;
            t.Options.AllowElementPruning = false;
            t.Options.LogicalEmphasis = true;

            return t;
        }



        private static Tidy GetXmlConfiguredTidy()
        {
            Tidy t = new Tidy();

            t.Options.RawOut = true;
            t.Options.TidyMark = false;

            t.Options.CharEncoding = CharEncoding.UTF8;
            t.Options.DocType = DocType.Omit;
            t.Options.WrapLen = 0;

            t.Options.Xhtml = false;
            t.Options.XmlOut = true;

            t.Options.QuoteNbsp = false;
            t.Options.NumEntities = true;

            return t;
        }


        private static void AllowHtml5ElementNames(Tidy tidy)
        {
            foreach (string elementName in Html5specificElementNames)
            {
                tidy.Options.AddTag(elementName.ToLower());
            }
        }


        private static void AllowNamespacePrefixedElementNames(Tidy tidy, List<string> elementNames)
        {
            foreach (string elementName in elementNames.Where(en => en != "f:function" && en != "f:param")) // f:* written into TidyNet.dll to fix http://compositec1.codeplex.com/workitem/1144
            {
                tidy.Options.AddTag(elementName.ToLower());
            }
        }



        private static List<string> LocateNamespacePrefixedElementNames(string htmlMarkup)
        {
            var prefixedElementNames = new List<string>();

            MatchCollection matches = _namespacePrefixedElement.Matches(htmlMarkup);

            foreach (Match match in matches)
            {
                string prefixedElementName = $"{match.Groups[1].Value}:{match.Groups[2].Value}";
                if (!prefixedElementNames.Contains(prefixedElementName))
                {
                    prefixedElementNames.Add(prefixedElementName);
                }
            }
            return prefixedElementNames;
        }



        private static List<string> LocateAttributeNamespacePrefixes(string htmlMarkup)
        {
            List<string> prefixes = new List<string>();

            
            MatchCollection matches = _elementsWithPrefixedAttributes.Matches(htmlMarkup);

            foreach (Match match in matches)
            {
                string prefix = match.Groups[1].Value;
                if (prefixes.Contains(prefix) == false)
                {
                    prefixes.Add(prefix);
                }
            }
            return prefixes;
        }



        private static Dictionary<string, string> LocateNamespacePrefixToUriDeclarations(string htmlMarkup)
        {
            var prefixToUri = new Dictionary<string, string>();

            MatchCollection matches = _elementWithNamespaceDeclaration.Matches(htmlMarkup);

            foreach (Match match in matches)
            {
                string prefix = match.Groups[2].Value;
                string uri = match.Groups[3].Value;

                if (!prefixToUri.ContainsKey(prefix))
                {
                    prefixToUri.Add(prefix, uri);
                }
                else
                {
                    if (prefixToUri[prefix] != uri) throw new NotImplementedException($"The namespace prefix {prefix} is used to identify multiple namespaces. This may be legal XML but is not supported here");
                }
            }
            return prefixToUri;
        }




        private static bool IsValidXmlName(string name)
        {
            try
            {
                return name == XmlConvert.VerifyName(name);
            }
            catch (Exception)
            {
                return false;
            }
        }


    }
}
