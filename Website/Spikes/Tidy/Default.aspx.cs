using System;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Xml;
using System.Collections.Generic;
using System.Xml.Linq;
using System.Xml.Xsl;
using System.IO;
using System.Drawing;
using System.Text;
using System.Text.RegularExpressions;

using Composite.WebClient.Services.WysiwygEditor;



public partial class Spikes_Tidy_Default : System.Web.UI.Page
{
    private static Dictionary<string, XslCompiledTransform> _compiledXslts = new Dictionary<string, XslCompiledTransform>();
    private static object _lock = new object();



    protected void Page_Load(object sender, EventArgs e)
    {
        this.errConsoleTextBox.Visible = false;
    }



    protected void tinyToSourceButton_Click(object sender, EventArgs e)
    {
        try
        {

            string tinyHtml = this.tinyMceMockTextBox.Text;
            string errorsAndWarnings = "";
            XDocument structuredResult = RepairAndTransform(tinyHtml, "TinyContentToStructuredContent.xslt", out errorsAndWarnings);

            this.sourceCodeMockTextBox.Text = OutputBodyDescendants(structuredResult);

            this.Controls.Add(new LiteralControl(errorsAndWarnings));
        }
        catch (Exception ex)
        {
            HandleException(ex);
        }
    }



    private void HandleException(Exception ex)
    {
        this.errConsoleTextBox.Text = ex.ToString();
        this.errConsoleTextBox.Visible = true;
    }



    private XDocument RepairAndTransform(string html, string xsltPath, out string errorSummary)
    {
        TidyHtmlResult tidyHtmlResult = MarkupTransformationServices.TidyHtml(html);

        errorSummary = tidyHtmlResult.ErrorSummary;
        XNode tidiedXhtml = tidyHtmlResult.Output;

        XDocument outputDocument = new XDocument();

        XslCompiledTransform xslt = GetCompiledXsltTransform(Page.MapPath(xsltPath));

        using (XmlWriter writer = outputDocument.CreateWriter())
        {
            using (XmlReader reader = tidiedXhtml.CreateReader())
            {
                xslt.Transform(reader, writer);
            }
        }

        return outputDocument;
    }



    private XNode ExecuteTransformations(XNode source, List<string> stylesheetPaths)
    {
        return null;
    }

    private XslCompiledTransform GetCompiledXsltTransform(string stylesheetPath)
    {
        XslCompiledTransform xslt;

        lock (_lock)
        {
            if (_compiledXslts.TryGetValue(stylesheetPath, out xslt) == false)
            {
                xslt = new XslCompiledTransform();

                using (XmlReader reader = XmlReader.Create(stylesheetPath))
                {
                    xslt.Load(reader);
                }

                //                _compiledXslts.Add(stylesheetPath, xslt);
            }
        }

        return xslt;
    }



    private string OutputBodyDescendants(XDocument source)
    {
        XslCompiledTransform xslt = new XslCompiledTransform();

        StringBuilder resultBuilder = new StringBuilder();

        using (XmlReader reader = XmlReader.Create(Page.MapPath("ExtractBodyDescendants.xslt")))
        {
            xslt.Load(reader);
        }

        XmlWriterSettings settings = CustomizedWriterSettings(xslt);
        using (MemoryStream memoryStream = new MemoryStream())
        {
            using (XmlWriter writer = XmlWriter.Create(memoryStream, settings))
            {
                using (XmlReader reader = source.CreateReader())
                {
                    xslt.Transform(reader, writer);
                }
                writer.Flush();
                memoryStream.Position = 0;
                StreamReader sr = new StreamReader(memoryStream);
                resultBuilder.Append(sr.ReadToEnd());
            }
        }

        resultBuilder.Replace(" xmlns=\"http://www.w3.org/1999/xhtml\"", "");

        string regexData = resultBuilder.ToString();

        Regex customNamespaceDeclarations = new Regex(@"<(.*?) xmlns:(?<prefix>[a-zA-Z0-9\._]*?)=""(?<uri>.*?)""(.*?)>", RegexOptions.Compiled);
        Dictionary<string, string> prefixToUriLookup = new Dictionary<string, string>();

        int lastLength = -1;
        while (regexData.Length != lastLength)
        {
            lastLength = regexData.Length;
            MatchCollection matchCollection = customNamespaceDeclarations.Matches(regexData);

            foreach (Match match in matchCollection)
            {
                string prefix = match.Groups["prefix"].Value;
                if (prefixToUriLookup.ContainsKey(prefix) == false)
                {
                    prefixToUriLookup.Add(prefix, match.Groups["uri"].Value);
                }
            }

            regexData = customNamespaceDeclarations.Replace(regexData, "<$1$2>");
        }

        foreach (var prefixInfo in prefixToUriLookup)
        {
            Regex namespacePrefixedElement = new Regex("<("+prefixInfo.Key+@":[a-zA-Z0-9\._]*?)(.*?)( ?/?)>", RegexOptions.Compiled);
            regexData = namespacePrefixedElement.Replace( regexData, "<$1$2 xmlns:"+prefixInfo.Key+"=\""+ prefixInfo.Value + "\"$3>");
        }


        return regexData;
    }



    private static XmlWriterSettings CustomizedWriterSettings(XslCompiledTransform xslt)
    {
        XmlWriterSettings settings = xslt.OutputSettings.Clone();
        settings.OmitXmlDeclaration = true;
        settings.ConformanceLevel = ConformanceLevel.Fragment;
        settings.CloseOutput = false;
        settings.Indent = true;
        settings.IndentChars = "\t";

        return settings;
    }


    private void Debug(object obj) { throw new Exception(obj.ToString()); }


    protected void SourceToTinyButton_Click(object sender, EventArgs e)
    {
        try
        {
            string sourceCodeHtml = this.sourceCodeMockTextBox.Text;

//            string ns = Namespace.Function.ToString();

            sourceCodeHtml = string.Format("<html xmlns=\"http://www.w3.org/1999/xhtml\"><body>{0}</body></html>", sourceCodeHtml);

            string errorsAndWarnings = "";
            XDocument structuredResult = RepairAndTransform(sourceCodeHtml, "StructuredContentToTinyContent.xslt", out errorsAndWarnings);
            this.Controls.Add( new LiteralControl( errorsAndWarnings ) );
            this.recreatedTinyMceMockTextBox.Text = OutputBodyDescendants(structuredResult);
        }
        catch (Exception ex)
        {
            HandleException(ex);
        }

    }
}


//    private string OutputBodyDescendants(XDocument source)
//    {
//        XslCompiledTransform xslt = new XslCompiledTransform();

//        StringBuilder resultBuilder = new StringBuilder();

//        using (XmlReader reader = XmlReader.Create(Page.MapPath("ExtractBodyDescendants.xslt")))
//        {
//            xslt.Load(reader);
//        }

//        XmlWriterSettings settings = CustomizedWriterSettings(xslt);
//        using (MemoryStream memoryStream = new MemoryStream())
//        {
//            using (XmlWriter writer = XmlWriter.Create(memoryStream, settings))
//            {
//                using (XmlReader reader = source.CreateReader())
//                {
//                    xslt.Transform(reader, writer);
//                }
//                writer.Flush();
//                memoryStream.Position = 0;
//                StreamReader sr = new StreamReader(memoryStream);
//                resultBuilder.Append(sr.ReadToEnd());
//            }
//        }

//        string ns = Namespace.Function.ToString();

//        resultBuilder = new StringBuilder();

//        XNamespace xhtml = "http://www.w3.org/1999/xhtml";
//        var bodyDescendants = source.Descendants(xhtml + "body");

//        var body = bodyDescendants.First();

//        foreach (var bodyDescendant in body.Nodes())
//        {
//            resultBuilder.Append(bodyDescendant.ToString());
//        }

//        throw new Exception(resultBuilder.ToString());

//        resultBuilder.Replace(" xmlns=\"http://www.w3.org/1999/xhtml\"", "");

//        Regex customNamespaceDeclarations = new Regex(@"<(.*?) xmlns:(?<prefix>[a-zA-Z0-9\._]*?)=""(?<uri>.*?)""(.*?)>", RegexOptions.Compiled);

//        string regexData = resultBuilder.ToString();

//        Dictionary<string, string> prefixToUriLookup = new Dictionary<string, string>();

//        int lastLength = -1;
//        while (regexData.Length != lastLength)
//        {
//            lastLength = regexData.Length;
//            MatchCollection matchCollection = customNamespaceDeclarations.Matches(regexData);

//            foreach (Match match in matchCollection)
//            {
//                string prefix = match.Groups["prefix"].Value;
//                if (prefixToUriLookup.ContainsKey(prefix) == false)
//                {
//                    prefixToUriLookup.Add(prefix, match.Groups["uri"].Value);
//                }
//            }

//            regexData = customNamespaceDeclarations.Replace(regexData, "<$1$2>");
//        }

////        throw new Exception(regexData);

//        foreach (var prefixInfo in prefixToUriLookup)
//        {
//            Regex namespacePrefixedElement = new Regex("<("+prefixInfo.Key+@":[a-zA-Z0-9\._]*?)(.*?)( ?/?)>", RegexOptions.Compiled);
//            regexData = namespacePrefixedElement.Replace( regexData, "<$1$2 xmlns:"+prefixInfo.Key+"=\""+ prefixInfo.Value + "\"$3>");
//        }


//        string output = regexData;

////        string matchPattern = "<run:rendering(.*?)(( /)?)>";
////        string replacePattern = "<run:rendering$1 xmlns:run=\"" + ns + "\"$2>";

////        return Regex.Replace(resultBuilder.ToString(), matchPattern, replacePattern); ;

//        return output;
//    }



