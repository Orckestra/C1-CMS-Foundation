<%@ WebService Language="C#" Class="Composite.Services.XhtmlTransformations" %>

using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Xml.Linq;
using Composite.C1Console.Security;
using Composite.C1Console.Users;
using Composite.Core;
using Composite.Core.Configuration;
using Composite.Core.Extensions;
using Composite.Core.Linq;
using Composite.Core.WebClient.Renderings;
using Composite.Data.DynamicTypes;
using Composite.Functions;
using Composite.Core.Logging;
using Composite.Core.ResourceSystem;
using Composite.Core.WebClient;
using Composite.Core.WebClient.Services.WysiwygEditor;
using Composite.Core.Xml;
using Composite.Data;
using Composite.Core.Types;

namespace Composite.Services
{

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
        private const string _markupWysiwygRepresentationAlt = "\n\n\n\n\n\n                              "; // like this so IE will make loading images have some width and height

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
                    var xsltParameters = new Dictionary<string, string>
                    {
                        {"requesthostname", HttpContext.Current.Request.Url.Host},
                        {"requestport", HttpContext.Current.Request.Url.Port.ToString()},
                        {"requestscheme", HttpContext.Current.Request.Url.Scheme},
                        {"requestapppath", UrlUtils.PublicRootPath}
                    };

                    structuredResult = MarkupTransformationServices.RepairXhtmlAndTransform(WrapInnerBody(htmlFragment), xsltPath, xsltParameters, out warnings);
                }
                catch (Exception ex)
                {
                    throw new InvalidOperationException("Parse failed for \n" + htmlFragment, ex);
                }

                List<XElement> htmlWysiwygImages = structuredResult
                    .Descendants(Namespaces.Xhtml + "img")
                    .Where(e => HasMarkup(e)
                                && e.Attribute("class") != null
                                && e.Attribute("class").Value.Contains("compositeHtmlWysiwygRepresentation")).ToList();

                foreach (var htmlWysiwygImageElement in htmlWysiwygImages)
                {
                    try
                    {
                        string html = GetMarkupValue(htmlWysiwygImageElement);
                        XElement functionElement = XElement.Parse(html);

                        if (IsFunctionAloneInParagraph(htmlWysiwygImageElement))
                        {
                            htmlWysiwygImageElement.Parent.ReplaceWith(functionElement);
                        }
                        else
                        {
                            htmlWysiwygImageElement.ReplaceWith(functionElement);
                        }
                    }
                    catch (Exception ex)
                    {
                        htmlWysiwygImageElement.ReplaceWith(new XText("HTML PARSE FAILED: " + ex.Message));
                    }
                }



                List<XElement> functionImages =
                    structuredResult
                    .Descendants()
                    .Where(e => e.Name.LocalName == "img"
                            && HasMarkup(e)
                           && e.Attribute("class") != null
                           && e.Attribute("class").Value.Contains("compositeFunctionWysiwygRepresentation")).ToList();

                foreach (var functionImageElement in functionImages)
                {
                    var nextNode = functionImageElement.NextNode;

                    // Removing "&#160;" symbols that may appear between function call images
                    if (nextNode != null
                        && nextNode.NextNode != null
                        && nextNode is XText
                        && nextNode.NextNode is XElement
                        && string.IsNullOrWhiteSpace((nextNode as XText).Value.Replace("&#160;", ""))
                        && functionImages.Contains(nextNode.NextNode as XElement))
                    {
                        nextNode.Remove();
                    }

                    // Replacing function call images with function markup
                    try
                    {
                        string functionMarkup = GetMarkupValue(functionImageElement);
                        XElement functionElement = XElement.Parse(functionMarkup);

                        if (IsFunctionAloneInParagraph(functionImageElement))
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


                IEnumerable<XElement> dataFieldReferenceImages =
                    structuredResult.Descendants(Namespaces.Xhtml + "img")
                    .Where(f => f.Attribute("class") != null
                                && f.Attribute("class").Value.Contains("compositeFieldReferenceWysiwygRepresentation"));

                foreach (var referenceImageElement in dataFieldReferenceImages.ToList())
                {
                    try
                    {
                        string[] parts = HttpUtility.UrlDecode(referenceImageElement.Attribute("data-markup").Value).Split('\\');
                        string typeName = parts[0];
                        string fieldName = parts[1];

                        referenceImageElement.ReplaceWith(DynamicTypeMarkupServices.GetReferenceElement(fieldName, typeName));
                    }
                    catch (Exception ex)
                    {
                        referenceImageElement.ReplaceWith(new XText("FIELD REFERENCE MARKUP PARSE FAILED: " + ex.Message));
                    }
                }

                FixTinyMceMalEncodingOfInternationalUrlHostNames(structuredResult);

                string bodyInnerXhtml = MarkupTransformationServices.OutputBodyDescendants(structuredResult);

                return new XhtmlTransformationResult
                {
                    Warnings = warnings,
                    XhtmlFragment = FixXhtmlFragment(bodyInnerXhtml)
                };
            }
            catch (Exception ex)
            {
                LoggingService.LogError("XhtmlTransformation", ex.ToString());

                throw;
            }
        }

        private static readonly List<XName> paragraphList = new List<XName>(){
                Namespaces.Xhtml + "p",
                Namespaces.Xhtml + "h1",
                Namespaces.Xhtml + "h2",
                Namespaces.Xhtml + "h3",
                Namespaces.Xhtml + "h4",
                Namespaces.Xhtml + "h5",
                Namespaces.Xhtml + "h6"};

        private static bool IsFunctionAloneInParagraph(XElement element)
        {
            if (element.ElementsBeforeSelf().Any(d => d.Name != Namespaces.Xhtml + "br")
                || element.ElementsAfterSelf().Any(d => d.Name != Namespaces.Xhtml + "br")
                || !paragraphList.Contains(element.Parent.Name)
                || element.Parent.Value.Replace("&#160;", "").Trim() != string.Empty)
                return false;

            return true;
        }

        private static string FixXhtmlFragment(string xhtmlFragment)
        {
            xhtmlFragment = Regex.Replace(xhtmlFragment, @"(\s)\r\n</script>", "$1</script>", RegexOptions.Multiline);
            return xhtmlFragment.Replace("\xA0", "&#160;").Replace("&nbsp;", "&#160;");
        }

        // Fixing issue where tiny 
        private void FixTinyMceMalEncodingOfInternationalUrlHostNames(XDocument xhtmlDoc)
        {
            var urlAttributes = xhtmlDoc.Descendants().Attributes().Where(f => f.Value.StartsWith("http://") || f.Value.StartsWith("https://"));
            foreach (XAttribute urlAttribute in urlAttributes)
            {
                string url = urlAttribute.Value;
                string urlWithoutProtocol = url.Substring(url.IndexOf("//", StringComparison.Ordinal) + 2);
                string urlHostWithPort = (urlWithoutProtocol.Contains("/") ? urlWithoutProtocol.Substring(0, urlWithoutProtocol.IndexOf('/')) : urlWithoutProtocol);
                string urlHost = (urlHostWithPort.Contains(":") ? urlHostWithPort.Substring(0, urlHostWithPort.IndexOf(':')) : urlHostWithPort);
                if (urlHost != HttpUtility.UrlDecode(urlHost))
                {
                    urlAttribute.Value = urlAttribute.Value.Replace(urlHost, HttpUtility.UrlDecode(urlHost));
                }
            }
        }


        [WebMethod]
        public XhtmlTransformationResult StructuredContentToTinyContent(string htmlFragment)
        {
            return StructuredContentToTinyContentMultiTemplate(htmlFragment, Guid.Empty, Guid.Empty, null, 0);
        }


        [WebMethod]
        public XhtmlTransformationResult StructuredContentToTinyContentMultiTemplate(string htmlFragment, Guid pageId, Guid pageTemplateId, string functionPreviewPlaceholderName, int width)
        {
            try
            {
                string warnings = "";
                string XhtmlPassXsltPath = Server.MapPath("..\\..\\transformations\\WysiwygEditor_StructuredContentToTinyContent.xsl");

                string html = WrapInnerBody(htmlFragment);

                XDocument xml = XDocument.Parse(html, LoadOptions.PreserveWhitespace);

                IEnumerable<XElement> functionRoots = xml
                    .Descendants(Namespaces.Function10 + "function")
                    .Where(f => f.Ancestors(Namespaces.Function10 + "function").Any() == false);

                foreach (var functionElement in functionRoots.ToList())
                {
                    string cssSelector = BuildAncestorCssSelector(functionElement);

                    functionElement.ReplaceWith(GetImageTagForFunctionCall(functionElement, pageId, pageTemplateId, functionPreviewPlaceholderName, cssSelector, width));
                }

                IEnumerable<XElement> dataFieldReferences = xml.Descendants(Namespaces.DynamicData10 + "fieldreference");
                foreach (var referenceElement in dataFieldReferences.ToList())
                {
                    referenceElement.ReplaceWith(GetImageTagForDynamicDataFieldReference(referenceElement));
                }

                var unHandledHtmlElementNames = new List<XName>
                                                    {
                                                        Namespaces.Xhtml + "audio",
                                                        Namespaces.Xhtml + "canvas",
                                                        Namespaces.Xhtml + "embed",
                                                        Namespaces.Xhtml + "iframe",
                                                        Namespaces.Xhtml + "map",
                                                        Namespaces.Xhtml + "object",
                                                        Namespaces.Xhtml + "script",
                                                        Namespaces.Xhtml + "noscript",
                                                        Namespaces.Xhtml + "video",
                                                        Namespaces.Xhtml + "svg"
                                                    };

                IEnumerable<XElement> langElements = xml.Descendants().Where(f => f.Name.Namespace == Namespaces.Localization10);
                foreach (var langElement in langElements.ToList())
                {
                    langElement.ReplaceWith(GetImageTagForLangElement(langElement));
                }

                IEnumerable<XElement> unHandledHtmlElements = xml.Descendants().Where(f => f.Name.Namespace != Namespaces.Xhtml || unHandledHtmlElementNames.Contains(f.Name));
                foreach (var unHandledHtmlElement in unHandledHtmlElements.ToList())
                {
                    unHandledHtmlElement.ReplaceWith(GetImageTagForHtmlElement(unHandledHtmlElement));
                }

                var xsltParameters = new Dictionary<string, string>
                {
                    {"requestapppath", UrlUtils.PublicRootPath}
                };

                XDocument structuredResult = MarkupTransformationServices.RepairXhtmlAndTransform(xml.ToString(), XhtmlPassXsltPath, xsltParameters, out warnings);

                string bodyInnerXhtml = MarkupTransformationServices.OutputBodyDescendants(structuredResult);

                return new XhtmlTransformationResult
                {
                    Warnings = warnings,
                    XhtmlFragment = FixXhtmlFragment(bodyInnerXhtml)
                };
            }
            catch (Exception ex)
            {
                Log.LogError("XhtmlTransformation", ex.ToString());
                throw;
            }
        }

        private string BuildAncestorCssSelector(XElement element)
        {
            var sb = new StringBuilder();

            foreach (var ancestor in element.Ancestors().Reverse())
            {
                if(ancestor.Name.LocalName == "html" || ancestor.Name.LocalName == "body") continue;

                if (sb.Length > 0)
                {
                    sb.Append(" ");
                }

                sb.Append(ancestor.Name.LocalName);
                string cssClasses = (string) ancestor.Attribute("class") ?? "";

                foreach (var cssClass in cssClasses.Split(new [] {" "}, StringSplitOptions.RemoveEmptyEntries))
                {
                    sb.Append(".").Append(cssClass);
                }
            }

            return sb.ToString();
        }

        [WebMethod]
        public string GetImageTagForFunctionCall(string functionMarkup)
        {
            return GetImageTagForFunctionCall2(functionMarkup, Guid.Empty, Guid.Empty, null, 0);
        }

        [WebMethod]
        public string GetImageTagForFunctionCall2(string functionMarkup, Guid functionPreviewPageId, Guid functionPreviewTemplateId, string functionPreviewPlaceholderName, int width)
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

            return GetImageTagForFunctionCall(functionElement, functionPreviewPageId, functionPreviewTemplateId, functionPreviewPlaceholderName, null, width)
                  .ToString(SaveOptions.DisableFormatting);
        }



        [WebMethod]
        public FunctionInfo GetFunctionInfo(string functionName)
        {
            IFunction function = FunctionFacade.GetFunction(functionName);

            var functionRuntimeTreeNode = new FunctionRuntimeTreeNode(function);

            return new FunctionInfo
            {
                FunctionMarkup = functionRuntimeTreeNode.Serialize().ToString(),
                RequireConfiguration = function.ParameterProfiles.Any(p => !p.IsInjectedValue)
            };
        }



        private XElement GetImageTagForDynamicDataFieldReference(XElement fieldReferenceElement)
        {
            string typeName = fieldReferenceElement.Attribute("typemanagername").Value;

            Type type = TypeManager.GetType(typeName);
            if (!typeof(IData).IsAssignableFrom(type))
            {
                string fieldName = fieldReferenceElement.Attribute("fieldname").Value;

                return GetImageTagForDynamicDataFieldReference(fieldName, fieldName, type.AssemblyQualifiedName, type.AssemblyQualifiedName);
            }

            DataTypeDescriptor typeDescriptor;
            DataFieldDescriptor fieldDescriptor;

            if (!DynamicTypeMarkupServices.TryGetDescriptors(fieldReferenceElement, out typeDescriptor, out fieldDescriptor))
            {
                return null;
            }

            return GetImageTagForDynamicDataFieldReference(fieldDescriptor, typeDescriptor);
        }


        private XElement GetImageTagForHtmlElement(XElement element)
        {
            string description = element.ToString().Replace(" xmlns=\"http://www.w3.org/1999/xhtml\"", "");
            string title = "HTML block";

            var descriptionLines = description.Split('\n');
            if (descriptionLines.Length > 6)
            {
                description = string.Format("{0}\n{1}\n{2}\n...\n{3}", descriptionLines[0], descriptionLines[1],
                                            descriptionLines[2], descriptionLines.Last());
            }

            int diplayImageHashCode;
            string imageUrl = GetFunctionBoxImageUrl("html", title, description, out diplayImageHashCode);

            return new XElement(Namespaces.Xhtml + "img",
                new XAttribute("alt", _markupWysiwygRepresentationAlt),
                new XAttribute("src", imageUrl),
                new XAttribute("class", "compositeHtmlWysiwygRepresentation"),
                GetMarkupAttribute(element.ToString())
                );
        }

        /*
                <lang:switch xmlns:lang="http://www.composite.net/ns/localization/1.0">
                    <lang:when culture="da-DK">DK<img src="/dk-logo.png" title="Dansk logo" /></lang:when>
                    <lang:when culture="en-US">EN<img src="/us-logo.png" title="American logo" /></lang:when>
                    <lang:default>No logo available</lang:default>
                </lang:switch>

        */
        private XElement GetImageTagForLangElement(XElement element)
        {
            XName switchName = Namespaces.Localization10 + "switch";
            XName stringName = Namespaces.Localization10 + "string";

            string title = "Language specific block";
            StringBuilder description = new StringBuilder();

            try
            {

                if (element.Name == stringName)
                {
                    description.AppendLine(element.Attribute("key").Value);
                }

                if (element.Name == switchName)
                {
                    foreach (var option in element.Elements().Where(e => e.Name.Namespace == Namespaces.Localization10))
                    {
                        int toGrab = Math.Min(35, option.Value.Length);
                        string ellipsis = (option.Value.Length > 35 ? "..." : "");
                        string descriptionContent = string.Format("{0}{1}",
                                option.Value.Substring(0, toGrab),
                                ellipsis);

                        if (String.IsNullOrWhiteSpace(option.Value) && option.Nodes().Any())
                        {
                            description.Append("(html code)");
                        }

                        switch (option.Name.LocalName)
                        {
                            case "when":
                                description.AppendFormat("{0}: {1}",
                                    option.Attribute("culture").Value,
                                    descriptionContent);
                                break;
                            case "default":
                                description.AppendLine();
                                description.AppendFormat("Default: {0}",
                                    descriptionContent);
                                break;
                        }
                        description.AppendLine("\n\n\n\n\n\n"); /* wtf - do I need this? */
                    }
                }
            }
            catch (Exception)
            {
                description.AppendLine("[ ERROR PARSING MARKUP ]");
            }

            int diplayImageHashCode;
            string imageUrl = GetFunctionBoxImageUrl("html", title, description.ToString(), out diplayImageHashCode);

            return new XElement(Namespaces.Xhtml + "img",
                new XAttribute("alt", _markupWysiwygRepresentationAlt),
                new XAttribute("src", imageUrl),
                new XAttribute("class", "compositeHtmlWysiwygRepresentation"),
                GetMarkupAttribute(element.ToString())
                );
        }


        private static string GetFunctionBoxImageUrl(string type, string title, string description, out int previewImageHashCode)
        {
            string imageUrl = "~/Renderers/FunctionBox?type={0}&title={1}&description={2}&lang={3}".FormatWith(
                HttpUtility.UrlEncode(type, Encoding.UTF8),
                HttpUtility.UrlEncode(title, Encoding.UTF8),
                UrlUtils.ZipContent(description.Trim()), // ZIPping description as it may contain xml tags f.e. <iframe />
                Thread.CurrentThread.CurrentUICulture.Name);

            previewImageHashCode = imageUrl.GetHashCode();
            imageUrl += "&hash=" + FunctionPreview.GetFunctionPreviewHash();

            return UrlUtils.ResolvePublicUrl(imageUrl);
        }

        private static string GetFunctionBoxImageUrl_Markup(
            string type,
            string title,
            string description,
            string markup,
            Guid functionPreviewPageId,
            Guid functionPreviewTemplatePageId,
            string functionPreviewPlaceholderName,
            string functionPreviewCssSelector,
            int viewWidth,
            bool editable,
            out int displayImageHashCode)
        {
            // TODO: cache ZipContent calls?
            string imageUrl = "~/Renderers/FunctionBox?type={0}&title={1}&description={2}&markup={3}&lang={4}".FormatWith(
                HttpUtility.UrlEncode(type, Encoding.UTF8),
                HttpUtility.UrlEncode(title, Encoding.UTF8),
                UrlUtils.ZipContent(description.Trim()), // ZIPping description as it may contain xml tags f.e. <iframe />
                UrlUtils.ZipContent(markup.Trim()),
                UserSettings.GetCurrentActiveLocaleCultureInfo(UserValidationFacade.GetUsername()));

            if (GlobalSettingsFacade.FunctionPreviewEnabled)
            {
                if (functionPreviewPageId != Guid.Empty)
                {
                    imageUrl += "&p=" + functionPreviewPageId;
                }

                if (functionPreviewTemplatePageId != Guid.Empty)
                {
                    imageUrl += "&t=" + functionPreviewTemplatePageId;
                }

                if (!string.IsNullOrEmpty(functionPreviewPlaceholderName))
                {
                    imageUrl += "&ph=" + functionPreviewPlaceholderName;
                }

                if (!string.IsNullOrEmpty(functionPreviewCssSelector))
                {
                    imageUrl += "&css=" + functionPreviewCssSelector;
                }

                if (viewWidth > 0)
                {
                    imageUrl += "&width=" + viewWidth;
                }
            }

            if (editable)
            {
                imageUrl += "&editable=true";
            }

            displayImageHashCode = imageUrl.GetHashCode();
            imageUrl += "&hash=" + FunctionPreview.GetFunctionPreviewHash();

            return UrlUtils.ResolvePublicUrl(imageUrl);
        }


        private XElement GetImageTagForDynamicDataFieldReference(DataFieldDescriptor dataField, DataTypeDescriptor dataTypeDescriptor)
        {
            string fieldLabel = dataField.Name;

            var profile = dataField.FormRenderingProfile;
            if (profile != null && profile.Label != null)
            {
                fieldLabel = StringResourceSystemFacade.ParseString(profile.Label);
            }

            return GetImageTagForDynamicDataFieldReference(dataField.Name, fieldLabel, dataTypeDescriptor.Name, dataTypeDescriptor.TypeManagerTypeName);
        }

        private XElement GetImageTagForDynamicDataFieldReference(string fieldName, string fieldLabel, string typeName, string uiFriendlyTypeName)
        {
            string imageUrl = string.Format("services/WysiwygEditor/FieldImage.ashx?name={0}&groupname={1}",
                HttpUtility.UrlEncode(fieldLabel, Encoding.UTF8),
                HttpUtility.UrlEncode(typeName, Encoding.UTF8));

            return new XElement(Namespaces.Xhtml + "img",
                new XAttribute("alt", fieldName),
                new XAttribute("src", Composite.Core.WebClient.UrlUtils.ResolveAdminUrl(imageUrl)),
                new XAttribute("class", "compositeFieldReferenceWysiwygRepresentation"),
                new XAttribute("data-markup", HttpUtility.UrlEncode(string.Format("{0}\\{1}", uiFriendlyTypeName, fieldName), Encoding.UTF8))
                );
        }



        private XElement GetImageTagForFunctionCall(
            XElement functionElement,
            Guid pageId,
            Guid pageTemplateId,
            string functionPreviewPlaceholderName,
            string functionPreviewCssSelector,
            int viewWidth)
        {
            string title;
            var description = new StringBuilder();
            string compactMarkup = functionElement.ToString(SaveOptions.DisableFormatting);

            bool error = false;
            bool hasParameters = false;

            try
            {
                var functionNode = (FunctionRuntimeTreeNode)FunctionFacade.BuildTree(functionElement);
                string functionName = functionNode.GetCompositeName();
                title = MakeTitleFromName(functionName);

                // description.AppendLine("[{0}]".FormatWith(functionName));

                string functionDescription = functionNode.GetDescription();
                if (!functionDescription.IsNullOrEmpty())
                {
                    functionDescription = StringResourceSystemFacade.ParseString(functionDescription);
                    description.AppendLine(functionDescription);
                }

                var setParams = functionNode.GetSetParameters().ToList();
                if (setParams.Any()) description.Append("\n");

                ICollection<ParameterProfile> parameterProfiles = FunctionFacade.GetFunction(functionName).ParameterProfiles.Evaluate();

                foreach (var setParam in setParams.Take(10))
                {
                    AddParameterInformation(description, setParam, parameterProfiles);
                }

                hasParameters = parameterProfiles.Any();

                if (setParams.Count > 10)
                {
                    description.AppendLine("....");
                }
            }
            catch (Exception ex)
            {
                // TODO: should be localized?
                title = "Invalid function call";
                description.AppendLine(ex.Message);
                error = true;
            }

            string markup = GetNormalizedMarkup(functionElement);

            int previewImageHashCode;

            string functionBoxUrl = error
                ? GetFunctionBoxImageUrl("warning", title, description.ToString(), out previewImageHashCode)
                : GetFunctionBoxImageUrl_Markup("function", title, description.ToString(), markup,
                                                pageId,
                                                pageTemplateId,
                                                functionPreviewPlaceholderName,
                                                functionPreviewCssSelector,
                                                viewWidth,
                                                hasParameters,
                                                out previewImageHashCode);

            var imagetag = new XElement(Namespaces.Xhtml + "img"
                , new XAttribute("alt", _markupWysiwygRepresentationAlt)
                , GetMarkupAttribute(compactMarkup)
                , new XAttribute("onload", "this.className += ' loaded';")
                , new XAttribute("class", "compositeFunctionWysiwygRepresentation" + (hasParameters ? " editable" : ""))
                );

            // Showing a cached preview image as a source to update the ui more fluent
            var cachedImageUrl = GetCachedPreviewImageUrl(previewImageHashCode);
            if (cachedImageUrl != null)
            {
                imagetag.Add(new XAttribute("src", cachedImageUrl));
            }

            if (functionBoxUrl != cachedImageUrl)
            {
                imagetag.Add(new XAttribute("data-src", functionBoxUrl));
            }

            PreviewImageCache[previewImageHashCode] = functionBoxUrl;

            return imagetag;
        }

        private static string GetCachedPreviewImageUrl(int previewImageHashCode)
        {
            string value;
            return PreviewImageCache.TryGetValue(previewImageHashCode, out value) ? value : null;
        }

        private static ConcurrentDictionary<int, string> PreviewImageCache = new ConcurrentDictionary<int, string>();

        private string GetNormalizedMarkup(XElement functionCall)
        {
            return XhtmlPrettifier.Prettify(functionCall.ToString(), "");
        }

        private XAttribute GetMarkupAttribute(string markup)
        {
            return new XAttribute("data-markup", HttpUtility.UrlEncode(markup).Replace("+"," "));
        }

        private bool HasMarkup(XElement element)
        {
            return element.Attribute("data-markup") != null;
        }

        private string GetMarkupValue(XElement element)
        {
            var result = element.Attribute("data-markup").Value;
            return HttpUtility.UrlDecode(result);
        }


        private void AddParameterInformation(StringBuilder description, BaseParameterRuntimeTreeNode parameter, IEnumerable<ParameterProfile> parameterProfiles)
        {
            ParameterProfile parameterProfile = parameterProfiles.FirstOrDefault(f => f.Name == parameter.Name);

            if (parameterProfile == null)
            {
                description.AppendFormat("[error] {0} is undefined", parameter.Name).AppendLine();
                return;
            }

            if (parameter.ContainsNestedFunctions || parameter is FunctionParameterRuntimeTreeNode
                || parameterProfile.Type.IsLazyGenericType() || parameterProfile.Type.IsAssignableFrom(typeof(XhtmlDocument)))
            {
                description.AppendLine("{0} = ....".FormatWith(parameter.Name));
                return;
            }

            try
            {
                object rawValue = parameter.GetValue();

                string paramValue = rawValue.ToString();
                string paramLabel = parameter.Name;

                try
                {
                    paramLabel = parameterProfile.LabelLocalized;
                    paramValue = GetValuePreview(parameterProfile, parameter, rawValue)
                                 ?? rawValue.ToString();
                }
                catch (Exception)
                {
                    // just fall back to listing param names and raw values...
                    paramValue = "[error]";
                }

                Guid tempGuid;
                if (!paramValue.IsNullOrEmpty() && Guid.TryParse(paramValue, out tempGuid))
                {
                    paramValue = "...";
                }

                if(paramValue.Length > 45)
                {
                    paramValue = paramValue.Substring(0, 42) + "...";
                }

                description.AppendLine("{0} = {1}".FormatWith(paramLabel, paramValue));
            }
            catch (Exception)
            {
                description.AppendLine("{0} = ...".FormatWith(parameter.Name));
            }
        }

        private string GetValuePreview(ParameterProfile parameterProfile, BaseParameterRuntimeTreeNode parameter, object rawValue)
        {
            if (typeof(IDataReference).IsAssignableFrom(parameterProfile.Type))
            {
                IDataReference dataReference = ValueTypeConverter.Convert(parameter.GetValue(), parameterProfile.Type) as IDataReference;
                if (dataReference != null)
                {
                    return dataReference.Data.GetLabel();
                }
                return null;
            }

            if (parameterProfile.Type == typeof(XhtmlDocument) || parameterProfile.Type == typeof(Lazy<XhtmlDocument>))
            {
                var serialized = parameter.Serialize();

                var headXName = Namespaces.Xhtml + "head";
                var textNodes = serialized.DescendantNodes()
                    .OfType<XText>()
                    .Where(tn => !tn.Value.IsNullOrEmpty() && !tn.Ancestors().Any(a => a.Name == headXName))
                    .ToList();

                if (!textNodes.Any())
                {
                    return "(HTML)";

                }
                return "HTML: " + string.Join(" ", textNodes.Take(5)).Replace( Environment.NewLine, " " ).Trim();
            }

            if (rawValue is XNode || rawValue is IEnumerable<XNode>)
            {
                return "...";
            }

            if (rawValue is IEnumerable<string>)
            {
                var values = rawValue as IEnumerable<string>;
                return "[" + String.Join(", ", values.Take(100).Select(v => "'" + v + "'")) + "]";
            }

            return null;
        }

        private string WrapInnerBody(string innerBodyMarkup)
        {
            innerBodyMarkup = XmlUtils.RemoveXmlDeclaration(innerBodyMarkup);
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
                if (letter != letter.ToLowerInvariant())
                {
                    bool nextLetterIsLower = (i < titleBase.Length - 1) && (titleBase.Substring(i + 1, 1).ToLowerInvariant() == titleBase.Substring(i + 1, 1));

                    if (!lastWasUpper || nextLetterIsLower)
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
    }
}