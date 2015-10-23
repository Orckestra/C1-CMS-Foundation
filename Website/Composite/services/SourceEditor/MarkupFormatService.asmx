<%@ WebService Language="C#" Class="Composite.Services.MarkupFormatService" %>

using System;
using System.IO;
using System.Collections.Generic;
using Composite.Core.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Xml;
using System.Xml.Linq;
using Composite.Core.Xml;
using Composite.Core.WebClient.Services.WysiwygEditor;
using TidyNet;


namespace Composite.Services
{
    [WebService(Namespace = "http://www.composite.net/ns/management")]
    [SoapDocumentService(RoutingStyle = SoapServiceRoutingStyle.RequestElement)]
    public class MarkupFormatService : System.Web.Services.WebService
    {
        private XNamespace _tempNs = "#MarkupFormatServiceTemp";
        private const string _nbsp = "&nbsp;";
        private const string _nbspNumeric = "&#160;";

        [WebMethod]
        public string AutoIndentDocument(string xml)
        {
            try
            {
                var server = HttpContext.Current.Server;

                string decodedXml = server.UrlDecode(xml);
                string result = XhtmlPrettifier.Prettify(decodedXml);
                return server.UrlEncode(result).Replace("+", "%20");
            }
            catch (Exception)
            {
                throw;
            }
        }

        [WebMethod]
        public string AutoIndentXml(string xml)
        {
            try
            {
                var server = HttpContext.Current.Server;

                string decodedXml = server.UrlDecode(xml);

                StringBuilder sb = new StringBuilder();
                XmlWriterSettings xws = new XmlWriterSettings();
                xws.OmitXmlDeclaration = true;
                xws.Indent = true;
                xws.IndentChars = "\t";
                using (XmlWriter xw = XmlWriter.Create(sb, xws)) {
                    XDocument.Parse(decodedXml).Save(xw);
                }

                var result = sb.ToString();
                return server.UrlEncode(result).Replace("+", "%20");
            }
            catch (Exception)
            {
                throw;
            }
        }

        private static Tidy GetXhtml5ConfiguredTidy()
        {
            Tidy t = new Tidy();

            t.Options.RawOut = true;
            t.Options.TidyMark = false;

            t.Options.CharEncoding = CharEncoding.UTF8;
            t.Options.DocType = DocType.Omit;
            t.Options.AllowElementPruning = false;
            t.Options.WrapLen = 0;
            t.Options.TabSize = 2;
            t.Options.Spaces = 4;
            t.Options.SmartIndent = false;

            t.Options.BreakBeforeBR = false;
            t.Options.DropEmptyParas = false;
            t.Options.Word2000 = true;
            t.Options.MakeClean = true;
            t.Options.Xhtml = false;
            t.Options.XmlOut = true;
            t.Options.XmlTags = false;

            t.Options.QuoteNbsp = false;
            t.Options.NumEntities = true;

            // Feed tidy the html5 specific tags...
			foreach (string elementName in MarkupTransformationServices.Html5specificElementNames)
            {
                t.Options.AddTag(elementName.ToLower());
            }

            
            return t;
        }

    }
}
