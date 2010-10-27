<%@ WebService Language="C#" Class="MarkupFormatService" %>

using System;
using System.Collections.Generic;
using Composite.Core.NewIO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Xml;
using System.Xml.Linq;

using Composite.Core.Xml;
using TidyNet;

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


    //[WebMethod]
    //public string AutoIndentFragment(string xml)
    //{
    //    try
    //    {
    //        XElement wrapperElement = XElement.Parse(string.Format("<wrapper>{0}</wrapper>", PrepareForIndention(xml)));

    //        List<XElement> mixedChildrenParents = wrapperElement.Descendants().Where(f => f.Nodes().Any(g => g is XText) && f.Elements().Any()).ToList();
    //        List<XNode> textNodes = mixedChildrenParents.Nodes().Where(f => f is XText).ToList();

    //        foreach (XNode textNode in textNodes)
    //        {
    //            textNode.ReplaceWith(new XElement(_tempNs + "TEXTNODE", textNode));
    //        }

    //        string indented = wrapperElement.Descendants().Select(x => x.ToString() + "\n").Aggregate(String.Concat);

    //        return CleanUpIndented(indented);

    //    }
    //    catch (XmlException)
    //    {
    //        throw;
    //    }
    //}


    [WebMethod]
    public string HtmlToXhtml(string html)
    {
        string declarations = "";
        string xhtml = "";
        int htmlElementStart = xhtml.IndexOf("<html", StringComparison.InvariantCultureIgnoreCase);
        if (htmlElementStart > 0) declarations = xhtml.Substring(0, htmlElementStart) + "\n";

        Regex tagStarterRegEx = new Regex("</?([a-zA-Z1-9]+)");
        MatchCollection tagStarterMatchCollection = tagStarterRegEx.Matches(html);
        foreach (string tagStarter in tagStarterMatchCollection.OfType<Match>().Select(f => f.Value).Distinct().OrderBy(f => f.Length))
        {
            html = html.Replace(tagStarter, tagStarter.ToLower());
        }

        byte[] htmlByteArray = Encoding.UTF8.GetBytes(html);
        using (System.IO.MemoryStream inputStream = new System.IO.MemoryStream(htmlByteArray))
        {
            using (System.IO.MemoryStream outputStream = new System.IO.MemoryStream())
            {
                Tidy tidy = GetXhtmlConfiguredTidy();
                TidyMessageCollection tidyMessages = new TidyMessageCollection();

                tidy.Parse(inputStream, outputStream, tidyMessages);
                if (tidyMessages.Errors == 0)
                {
                    outputStream.Position = 0;
                    StreamReader sr = new StreamReader(outputStream);
                    xhtml = declarations + sr.ReadToEnd();
                }
            }
        }

        XElement xhtmlElement = XElement.Parse(xhtml);

        return xhtml;
    }


    //private string PrepareForIndention(string xml)
    //{
    //    xml = xml.Replace("\xA0", _nbspNumeric).Replace(_nbsp, _nbspNumeric);
    //    xml = xml.Replace("xmlns=\"", "xmlns=\"#DEFAULTNS:");
    //    xml = xml.Replace("xmlns='", "xmlns='#DEFAULTNS:");

    //    return xml;
    //}


    //private string CleanUpIndented(string xml)
    //{
    //    xml = xml.Replace("\xA0", _nbspNumeric).Replace(_nbsp, _nbspNumeric);
    //    xml = xml.Replace("xmlns=\"#DEFAULTNS:", "xmlns=\"");
    //    xml = xml.Replace("xmlns='#DEFAULTNS:", "xmlns='");

    //    xml = xml.Replace("<TEXTNODE xmlns=\"" + _tempNs + "\">", "");

    //    xml = xml.Replace("</TEXTNODE>", "");

    //    string[] lines = xml.Split('\n');

    //    StringBuilder result = new StringBuilder();

    //    foreach (string line in lines.Where(f => f.Trim().Length > 0))
    //    {
    //        int charCounter = 0;
    //        while (line.Length > charCounter && line.Substring(charCounter, 1) == " ")
    //            charCounter++;

    //        result.Append(new string('\t', charCounter / 2) + line.Substring(charCounter));
    //    }

    //    return result.ToString();
    //}


    private static Tidy GetXhtmlConfiguredTidy()
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

        return t;
    }

}

