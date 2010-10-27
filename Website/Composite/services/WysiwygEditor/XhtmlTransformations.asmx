<%@ WebService Language="C#" Class="XhtmlTransformations" %>

using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using Composite.Core.NewIO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Xml;
using System.Xml.Linq;
using System.Xml.Xsl;

using Composite.Data.DynamicTypes;
using Composite.Functions;
using Composite.Core.Logging;
using Composite.Core.ResourceSystem;
using Composite.Core.WebClient.Services.WysiwygEditor;
using Composite.Core.Xml;
using Composite.Data;
using Composite.Core.Types;


public class XhtmlTransformationResult
{
    public string XhtmlFragment { get; set; }
    public string Warnings { get; set; }
}


public class FunctionInfo
{
    public string FunctionMarkup { get; set; }
    public bool RequireConfiguration { get; set; }
}



[WebService(Namespace = "http://www.composite.net/ns/management")]
[SoapDocumentService(RoutingStyle = SoapServiceRoutingStyle.RequestElement)]
public class XhtmlTransformations : System.Web.Services.WebService
{
    private const string _nbsp = "&nbsp;";
    private const string _nbspNumeric = "&#160;";
    
    [WebMethod]
    public XhtmlTransformationResult MsWordContentToTinyContent(string htmlFragment)
    {
        try
        {
            string warnings = "";
            string xsltPath = Server.MapPath("..\\..\\transformations\\WysiwygEditor_MsWordContentToTinyContent.xsl");

            XDocument structuredResult;

            structuredResult = MarkupTransformationServices.RepairXhtmlAndTransform(WrapInnerBody(htmlFragment), xsltPath, null, out warnings);

            string bodyInnerXhtml = MarkupTransformationServices.OutputBodyDescendants(structuredResult);

            XhtmlTransformationResult result = new XhtmlTransformationResult();
            result.Warnings = warnings;
            result.XhtmlFragment = bodyInnerXhtml.Replace("\xA0", _nbspNumeric).Replace(_nbsp, _nbspNumeric);

            return result;
        }
        catch (Exception ex)
        {
            LoggingService.LogWarning("XhtmlTransformation", ex.ToString());

            throw;
        }
    }


    [WebMethod]
    public XhtmlTransformationResult TinyContentToStructuredContent(string htmlFragment)
    {
        try
        {
            string warnings = "";
            string xsltPath = Server.MapPath("..\\..\\transformations\\WysiwygEditor_TinyContentToStructuredContent.xsl");

            XDocument structuredResult;
            try
            {
                Dictionary<string, string> xsltParameters = new Dictionary<string, string>();
                xsltParameters.Add("requesthostname", HttpContext.Current.Request.Url.Host);
                xsltParameters.Add("requestport", HttpContext.Current.Request.Url.Port.ToString());
                xsltParameters.Add("requestscheme", HttpContext.Current.Request.Url.Scheme);

                structuredResult = MarkupTransformationServices.RepairXhtmlAndTransform(WrapInnerBody(htmlFragment), xsltPath, xsltParameters, out warnings);
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException("Parse failed for \n" + htmlFragment, ex);
            }

            List<XElement> functionImages = structuredResult.Descendants(Namespaces.Xhtml + "img").Where(f => f.Attribute("class") != null && f.Attribute("class").Value == "compositeFunctionWysiwygRepresentation").ToList();
            functionImages.AddRange(structuredResult.Descendants("img").Where(f => f.Attribute("alt") != null));

            foreach (var functionImageElement in functionImages)
            {
                try
                {
                    string functionMarkup = HttpUtility.UrlDecode(functionImageElement.Attribute("alt").Value);
                    XElement functionElement = XElement.Parse(functionMarkup);

                    bool functionAloneInParagraph =
                        functionImageElement.ElementsBeforeSelf().Any() == false &&
                        functionImageElement.ElementsAfterSelf().Any() == false &&
                        functionImageElement.Parent.Name == Namespaces.Xhtml + "p" &&
                        functionImageElement.Parent.Value.Replace("&#160;", "").Trim() == "";

                    if (functionAloneInParagraph == true)
                    {
                        functionImageElement.Parent.ReplaceWith(functionElement);
                    }
                    else
                    {
                        functionImageElement.ReplaceWith(functionElement);
                    }
                }
                catch (Exception ex)
                {
                    functionImageElement.ReplaceWith(new XText("FUNCTION MARKUP PARSE FAILED: " + ex.Message));
                }
            }


            IEnumerable<XElement> dataFieldReferenceImages = structuredResult.Descendants(Namespaces.Xhtml + "img").Where(f => f.Attribute("class") != null && f.Attribute("class").Value == "compositeFieldReferenceWysiwygRepresentation");
            foreach (var referenceImageElement in dataFieldReferenceImages.ToList())
            {
                try
                {
                    string[] parts = HttpUtility.UrlDecode(referenceImageElement.Attribute("alt").Value).Split('\\');
                    string typeName = parts[0];
                    string fieldName = parts[1];

                    referenceImageElement.ReplaceWith(DynamicTypeMarkupServices.GetReferenceElement(fieldName, typeName));
                }
                catch (Exception ex)
                {
                    referenceImageElement.ReplaceWith(new XText("FIELD REFERENCE MARKUP PARSE FAILED: " + ex.Message));
                }
            }

            List<string> pathAttributeNames = new List<string> { "src", "href" };

            // Fix TinyMCE's fetish for turning absolute URLs into relative URLs
            var dottedPathAttributes =
                from xhtmlAttribute in structuredResult.Descendants().Where(f => f.Name.Namespace == Namespaces.Xhtml).Attributes()
                where pathAttributeNames.Contains(xhtmlAttribute.Name.LocalName)
                        && xhtmlAttribute.Value.StartsWith("../")
                select xhtmlAttribute;

            foreach (XAttribute dottedAttribute in dottedPathAttributes)
            {
                dottedAttribute.Value = string.Format("/{0}", dottedAttribute.Value.Replace("../", ""));
            }
            
            FixTinyMceMalEncodingOfInternationalUrlHostNames(structuredResult);
            
            string bodyInnerXhtml = MarkupTransformationServices.OutputBodyDescendants(structuredResult);

            XhtmlTransformationResult result = new XhtmlTransformationResult();
            result.Warnings = warnings;
            result.XhtmlFragment = bodyInnerXhtml.Replace("\xA0", _nbspNumeric).Replace(_nbsp, _nbspNumeric);

            return result;
        }
        catch (Exception ex)
        {
            LoggingService.LogError("XhtmlTransformation", ex.ToString());

            throw;
        }
    }



    // Fixing issue where tiny 
    private void FixTinyMceMalEncodingOfInternationalUrlHostNames(XDocument xhtmlDoc)
    {
        var urlAttributes = xhtmlDoc.Descendants().Attributes().Where(f => f.Value.StartsWith("http://") || f.Value.StartsWith("https://"));
        foreach (XAttribute urlAttribute in urlAttributes)
        {
            string url = urlAttribute.Value;
            string urlWithoutProtocol = url.Substring(url.IndexOf("//") + 2);
            string urlHostWithPort = (urlWithoutProtocol.Contains("/") ? urlWithoutProtocol.Substring(0, urlWithoutProtocol.IndexOf("/")) : urlWithoutProtocol);
            string urlHost = (urlHostWithPort.Contains(":") ? urlHostWithPort.Substring(0, urlHostWithPort.IndexOf(":")) : urlHostWithPort);
            if (urlHost != HttpUtility.UrlDecode(urlHost))
            {
                urlAttribute.Value = urlAttribute.Value.Replace(urlHost, HttpUtility.UrlDecode(urlHost));
            }
        }
    }
    


    [WebMethod]
    public XhtmlTransformationResult StructuredContentToTinyContent(string htmlFragment)
    {
        try
        {
            string warnings = "";
            string XhtmlPassSsltPath = Server.MapPath("..\\..\\transformations\\WysiwygEditor_StructuredContentToTinyContent.xsl");

            string html = WrapInnerBody(htmlFragment);

            XDocument xml = MarkupTransformationServices.TidyXml(html);

            IEnumerable<XElement> functionRoots = xml.Descendants(Namespaces.Function10 + "function").Where(f => f.Ancestors(Namespaces.Function10 + "function").Count() == 0);
            foreach (var functionElement in functionRoots.ToList())
            {
                functionElement.ReplaceWith(GetImageTagForFunctionCall(functionElement));
            }

            IEnumerable<XElement> dataFieldReferences = xml.Descendants(Namespaces.DynamicData10 + "fieldreference");
            foreach (var referenceElement in dataFieldReferences.ToList())
            {
                referenceElement.ReplaceWith(GetImageTagForDynamicDataFieldReference(referenceElement));
            }

            XDocument structuredResult = MarkupTransformationServices.RepairXhtmlAndTransform(xml.ToString(), XhtmlPassSsltPath, null, out warnings);

            string bodyInnerXhtml = MarkupTransformationServices.OutputBodyDescendants(structuredResult);

            XhtmlTransformationResult result = new XhtmlTransformationResult();
            result.Warnings = warnings;
            result.XhtmlFragment = bodyInnerXhtml.Replace("\xA0", _nbspNumeric).Replace(_nbsp, _nbspNumeric);

            return result;
        }
        catch (Exception ex)
        {
            LoggingService.LogError("XhtmlTransformation", ex.ToString());
            throw;
        }
    }

    [WebMethod]
    public string GetImageTagForFunctionCall(string functionMarkup)
    {
        XElement functionElement;

        try
        {
            functionElement = XElement.Parse(functionMarkup);
        }
        catch (Exception ex)
        {
            throw new ArgumentException("Unable to parse functionMarkup as XML", ex);
        }

        return GetImageTagForFunctionCall(functionElement).ToString(SaveOptions.DisableFormatting);
    }



    [WebMethod]
    public FunctionInfo GetFunctionInfo(string functionName)
    {
        IFunction function = FunctionFacade.GetFunction(functionName);

        FunctionRuntimeTreeNode functionRuntimeTreeNode = new FunctionRuntimeTreeNode(function);

        FunctionInfo functionInfo = new FunctionInfo();

        functionInfo.FunctionMarkup = functionRuntimeTreeNode.Serialize().ToString();
        functionInfo.RequireConfiguration = (function.ParameterProfiles.Count() > 0);

        return functionInfo;
    }



    private XElement GetImageTagForDynamicDataFieldReference(XElement fieldReferenceElement)
    {
        DataTypeDescriptor typeDescriptor;
        DataFieldDescriptor fieldDescriptor;

        if (DynamicTypeMarkupServices.TryGetDescriptors(fieldReferenceElement, out typeDescriptor, out fieldDescriptor))
        {
            return GetImageTagForDynamicDataFieldReference(fieldDescriptor, typeDescriptor);
        }
        else
        {
            return null;
        }

    }


    private XElement GetImageTagForDynamicDataFieldReference(DataFieldDescriptor dataField, DataTypeDescriptor dataTypeDescriptor)
    {
        string fieldLabel = dataField.Name;

        if (dataField.FormRenderingProfile != null && dataField.FormRenderingProfile.Label != null)
        {
            fieldLabel = StringResourceSystemFacade.ParseString(dataField.FormRenderingProfile.Label);
        }

        string imageUrl = string.Format("services/WysiwygEditor/FieldImage.ashx?name={0}&groupname={1}", HttpUtility.UrlEncodeUnicode(fieldLabel), HttpUtility.UrlEncodeUnicode(dataTypeDescriptor.Name));

        return new XElement(Namespaces.Xhtml + "img",
            new XAttribute("src", Composite.Core.WebClient.UrlUtils.ResolveAdminUrl(imageUrl)),
            new XAttribute("class", "compositeFieldReferenceWysiwygRepresentation"),
            new XAttribute("alt", HttpUtility.UrlEncodeUnicode(string.Format("{0}\\{1}", dataTypeDescriptor.TypeManagerTypeName, dataField.Name)))
            );
    }



    private XElement GetImageTagForFunctionCall(XElement functionElement)
    {
        //Validate element - no dont - dead functions then throw exceptions :(
        //        FunctionRuntimeTreeNode functionNode = (FunctionRuntimeTreeNode)FunctionFacade.BuildTree(functionElement);

        string compactMarkup = functionElement.ToString(SaveOptions.DisableFormatting);
        string title;
        string description;
        try
        {
            FunctionRuntimeTreeNode functionNode = (FunctionRuntimeTreeNode)FunctionFacade.BuildTree(functionElement);
            string functionName = functionNode.GetCompositeName();
            title = MakeTitleFromName(functionName);
            description = string.Format("[{0}]", functionName);
            string functionDescription = functionNode.GetDescription();
            if (string.IsNullOrEmpty(functionDescription) == false)
            {
                functionDescription = StringResourceSystemFacade.ParseString(functionDescription);
                description = description + "\n\n" + functionDescription;
            }

            var setParams = functionNode.GetSetParameters().ToList();
            if (setParams.Any() == true) description += "\n";

            IEnumerable<ParameterProfile> parameterProfiles = FunctionFacade.GetFunction(functionName).ParameterProfiles;

            foreach (var setParam in setParams)
            {
                if (setParam.ContainsNestedFunctions == true || setParam is FunctionParameterRuntimeTreeNode)
                {

                    description += string.Format("\n{0} = {1}", setParam.Name, "....");
                }
                else
                {
                    try
                    {
                        string paramValue = setParam.GetValue().ToString();
                        string paramLabel = setParam.Name;

                        try
                        {
                            ParameterProfile parameterProfile = parameterProfiles.Where(f => f.Name == setParam.Name).FirstOrDefault();
                            if (parameterProfile != null)
                            {
                                paramLabel = parameterProfile.LabelLocalized;
                                if (typeof(IDataReference).IsAssignableFrom(parameterProfile.Type))
                                {
                                    IDataReference dataReference = ValueTypeConverter.Convert(setParam.GetValue(), parameterProfile.Type) as IDataReference;
                                    if (dataReference != null)
                                    {
                                        paramValue = dataReference.Data.GetLabel();
                                    }
                                }
                            }
                        }
                        catch (Exception)
                        {
                            // just fall back to listing param names and raw values...
                        }

                        if (string.IsNullOrEmpty(paramValue) == false && paramValue.Length > 50)
                            paramValue = paramValue.Substring(0, 45) + "...";
                        description += string.Format("\n{0} = {1}", paramLabel, paramValue);
                    }
                    catch (Exception)
                    {
                        description += string.Format("\n{0} = {1}", setParam.Name, "....");
                    }
                }
            }
        }
        catch (Exception ex)
        {
            title = "[parse error]";
            description = string.Format("Failed to parse the function markup.\n{0}", ex.Message);
        }

        string tmpUrl = string.Format("services/WysiwygEditor/YellowBox.ashx?title={0}&description={1}", HttpUtility.UrlEncodeUnicode(title), HttpUtility.UrlEncodeUnicode(description));

        string yellowBoxUrl = Composite.Core.WebClient.UrlUtils.ResolveAdminUrl(tmpUrl);

        XElement imagetag = new XElement("img"
            , new XAttribute("alt", HttpUtility.UrlEncodeUnicode(compactMarkup))
            , new XAttribute("src", yellowBoxUrl)
            , new XAttribute("class", "compositeFunctionWysiwygRepresentation")
            );

        return imagetag;
    }



    private string WrapInnerBody(string innerBodyMarkup)
    {
        if (innerBodyMarkup.StartsWith("<html") && innerBodyMarkup.Contains(Namespaces.Xhtml.NamespaceName))
        {
            return innerBodyMarkup;
        }

        return string.Format("<html xmlns=\"http://www.w3.org/1999/xhtml\"><head><title>None</title></head><body>{0}</body></html>", innerBodyMarkup);
    }



    private string MakeTitleFromName(string name)
    {
        string[] nameParts = name.Split('.');
        string titleBase = nameParts[nameParts.Length - 1];

        StringBuilder sb = new StringBuilder(titleBase.Substring(0, 1).ToUpper());

        bool lastWasUpper = true;

        for (int i = 1; i < titleBase.Length; i++)
        {
            string letter = titleBase.Substring(i, 1);
            if (letter != letter.ToLower())
            {
                bool nextLetterIsLower = (i < titleBase.Length - 1) && (titleBase.Substring(i + 1, 1).ToLower() == titleBase.Substring(i + 1, 1));

                if (lastWasUpper == false || nextLetterIsLower == true)
                {
                    sb.Append(" ");
                }
                lastWasUpper = true;
            }
            else
            {
                lastWasUpper = false;
            }
            sb.Append(letter);
        }

        return sb.ToString();
    }

    /*
     * NOT USED!
     */
    [WebMethod]
    public string MsWordContentCleanup(string htmlFragment)
    {
        try
        {
            htmlFragment = CleanWordHtml(htmlFragment);
            //htmlFragment = FixEntities(htmlFragment);
            return htmlFragment;
        }
        catch (Exception ex)
        {
            LoggingService.LogError("XhtmlTransformation", ex.ToString());
            throw;
        }
    }

    /*
     * NOT USED!
     */
    private string CleanWordHtml(string html)
    {
        StringCollection sc = new StringCollection();
        // get rid of unnecessary tag spans (comments and title)
        sc.Add(@"<!--(\w|\W)+?-->");
        sc.Add(@"<title>(\w|\W)+?</title>");
        // Get rid of classes and styles
        sc.Add(@"\s?class=\w+");
        sc.Add(@"\s+style='[^']+'");
        // Get rid of unnecessary tags
        sc.Add(
        @"<(meta|link|/?o:|/?style|/?div|/?st\d|/?head|/?html|body|/?body|/?span|!\[)[^>]*?>");
        // Get rid of empty paragraph tags
        sc.Add(@"(<[^>]+>)+&nbsp;(</\w+>)+");
        // remove bizarre v: element attached to <img> tag
        sc.Add(@"\s+v:\w+=""[^""]+""");
        // remove extra lines
        sc.Add(@"(\n\r){2,}");
        foreach (string s in sc)
        {
            html = Regex.Replace(html, s, "", RegexOptions.IgnoreCase);
        }
        return html;
    }

    /*
     * NOT USED!
     */
    private string FixEntities(string html)
    {
        NameValueCollection nvc = new NameValueCollection();
        nvc.Add("\"", "&quot;");
        nvc.Add("\"", "&quot;");
        foreach (string key in nvc.Keys)
        {
            html = html.Replace(key, nvc[key]);
        }
        return html;
    }

}


