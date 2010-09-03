using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Xml.Linq;
using Composite.Core.Caching;
using Composite.Core.Collections.Generic;
using Composite.Data;
using Composite.Data.Types;
using Composite.Functions;
using Composite.Core.Instrumentation;
using Composite.Core.Localization;
using Composite.Core.Logging;
using Composite.Core.Parallelization;
using Composite.Core.WebClient.Renderings.Template;
using Composite.Core.WebClient;
using Composite.Core.Xml;
using Composite.C1Console.Security;


namespace Composite.Core.WebClient.Renderings.Page
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class PageRenderer
    {
        private static readonly XNamespace _aspNetControlReferenceNamespace = "#asp.net.control";
        private static readonly XName _aspNetControlReference = _aspNetControlReferenceNamespace + "control";

        private static readonly NameBasedAttributeComparer _nameBasedAttributeComparer = new NameBasedAttributeComparer();


        public static FunctionContextContainer GetPageRenderFunctionContextContainer()
        {
            XEmbeddedControlMapper mapper = new XEmbeddedControlMapper();

            FunctionContextContainer contextContainer = new FunctionContextContainer();
            contextContainer.XEmbedableMapper = mapper;

            return contextContainer;
        }



        public static Control Render(this IPage page, IEnumerable<IPagePlaceholderContent> placeholderContents, FunctionContextContainer functionContextContainer)
        {
            Verify.ArgumentNotNull(page, "page");

            string url;

            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                PageStructureInfo.TryGetPageUrl(page.Id, out url);

                using (TimerProfilerFacade.CreateTimerProfiler(url ?? "(no url)"))
                {
                    var cultureInfo = new CultureInfo(page.CultureName);
                    System.Threading.Thread.CurrentThread.CurrentCulture = cultureInfo;
                    System.Threading.Thread.CurrentThread.CurrentUICulture = cultureInfo;

                    if (functionContextContainer == null) throw new ArgumentNullException("functionContextContainer");
                    if ((functionContextContainer.XEmbedableMapper is XEmbeddedControlMapper) == false) throw new ArgumentException("Unknown or missing XEmbedable mapper on context container. Use GetPageRenderFunctionContextContainer().");

                    RequestLifetimeCache.Add("PageRenderer.IPage", page);

                    XEmbeddedControlMapper mapper = (XEmbeddedControlMapper)functionContextContainer.XEmbedableMapper;

                    XDocument document = TemplateInfo.GetTemplateDocument(page.TemplateId);

                    ResolvePlaceholders(document, page, placeholderContents);

                    Control c = ExecuteFunctions(document, functionContextContainer, mapper, page);

                    return c;
                }
            }
        }



        private static void ResolvePlaceholders(XDocument document, IPage page, IEnumerable<IPagePlaceholderContent> placeholderContents)
        {
            using (TimerProfilerFacade.CreateTimerProfiler())
            {
                List<XElement> placeHolders = document.Descendants(RenderingElementNames.PlaceHolder).ToList();

                if (placeHolders.Any() == true)
                {
                    foreach (XElement placeHolder in placeHolders.Where(f => f.Attribute(RenderingElementNames.PlaceHolderIdAttribute) != null))
                    {
                        IPagePlaceholderContent placeHolderContent = placeholderContents.Where(f => f.PlaceHolderId == placeHolder.Attribute(RenderingElementNames.PlaceHolderIdAttribute).Value).FirstOrDefault();

                        string placeHolderId = null;
                        if (placeHolder.Attribute("id") != null)
                        {
                            placeHolderId = placeHolder.Attribute("id").Value;
                            placeHolder.Attribute("id").Remove();
                        }

                        if (placeHolderContent != null && string.IsNullOrEmpty(placeHolderContent.Content)==false)
                        {
                            bool contentParsedAsXhtmlDocument = false; // backwards compatability check
                            if (placeHolderContent.Content.StartsWith("<html")==true)
                            {
                                try
                                {
                                    XhtmlDocument xhtmlDocument = XhtmlDocument.Parse(placeHolderContent.Content);
                                    placeHolder.ReplaceWith(xhtmlDocument.Root);
                                    contentParsedAsXhtmlDocument = true;
                                }
                                catch (Exception) {}
                            }

                            if (contentParsedAsXhtmlDocument==false)
                            {
                                XhtmlDocument xhtmlDocument = XhtmlDocument.Parse(string.Format("<html xmlns='{0}'><head/><body>{1}</body></html>", Namespaces.Xhtml, placeHolderContent.Content));
                                placeHolder.ReplaceWith(xhtmlDocument.Root);
                                contentParsedAsXhtmlDocument = true;
                            }
                        }
                        else
                        {
                            placeHolder.ReplaceWith(new XhtmlDocument().Root);
                        }

                        if (placeHolderId != null)
                        {
                            try
                            {
                                placeHolder.Add(new XAttribute("id", placeHolderId));
                            }
                            catch (Exception ex)
                            {
                                throw new InvalidOperationException(string.Format("Failed to set id '{0}' on element", placeHolderId), ex);
                            }
                        }
                    }
                }
            }
        }



        public static Control Render(this IPage page, IEnumerable<IPagePlaceholderContent> placeholderContents)
        {
            return page.Render(placeholderContents, GetPageRenderFunctionContextContainer());
        }



        public static Guid CurrentPageId
        {
            get
            {

                if (RequestLifetimeCache.HasKey("PageRenderer.IPage") == true)
                {
                    return RequestLifetimeCache.TryGet<IPage>("PageRenderer.IPage").Id;
                }
                else
                {
                    return Guid.Empty;
                }
            }
        }


        public static IPage CurrentPage
        {
            get
            {
                if (RequestLifetimeCache.HasKey("PageRenderer.IPage") == true)
                {
                    return RequestLifetimeCache.TryGet<IPage>("PageRenderer.IPage");
                }
                else
                {
                    return null;
                }
            }
            set
            {
                RequestLifetimeCache.Add("PageRenderer.IPage", value);
            }
        }


        public static CultureInfo CurrentPageCulture
        {
            get
            {
                if (RequestLifetimeCache.HasKey("PageRenderer.IPage") == true)
                {
                    return CultureInfo.CreateSpecificCulture(RequestLifetimeCache.TryGet<IPage>("PageRenderer.IPage").CultureName);
                }
                else
                {
                    return null;
                }
            }
        }


        public static IEnumerable<IData> GetCurrentPageAssociatedData(Type type)
        {
            return PageRenderer.CurrentPage.GetReferees(type);
        }



        public static IEnumerable<IData> GetCurrentPageAssociatedData<T>() where T : IData
        {
            foreach (IData data in PageRenderer.CurrentPage.GetReferees(typeof(T)))
            {
                yield return (T)data;
            }
        }



        private static Control ExecuteFunctions(XDocument document, FunctionContextContainer contextContainer, IXElementToControlMapper mapper, IPage page)
        {
            using (TimerProfilerFacade.CreateTimerProfiler())
            {
                ExecuteEmbeddedFunctions(document.Root, contextContainer);

                ResolvePageFields(document, page);

                NormalizeAspNetForms(document);

                if (document.Root.Name == Namespaces.Xhtml + "html")
                {
                    XhtmlDocument xhtmlDocument = new XhtmlDocument(document);
                    NormalizeXhtmlDocument(xhtmlDocument);

                    ResolveRelativePaths(xhtmlDocument);

                    AppendC1MetaTags(page, xhtmlDocument);

                    LocalizationParser.Parse(xhtmlDocument);

                    return xhtmlDocument.AsAspNetControl(mapper);
                }
                else
                {
                    return new LiteralControl(document.ToString());
                }
            }
        }



        private static void AppendC1MetaTags(IPage page, XhtmlDocument xhtmlDocument)
        {
            if (UserValidationFacade.IsLoggedIn())
            {
                bool emitMenuTitleMetaTag = string.IsNullOrEmpty(page.MenuTitle) == false;
                bool emitUrlTitleMetaTag = string.IsNullOrEmpty(page.UrlTitle) == false;

                if (emitMenuTitleMetaTag || emitUrlTitleMetaTag)
                {
                    xhtmlDocument.Head.Add(
                        new XComment("The following C1 head tags are only emitted when you are logged in"),
                        new XElement(Namespaces.Xhtml + "link",
                            new XAttribute("rel", "schema.C1"),
                            new XAttribute("href", "http://www.composite.net/ns/c1/seoassistant")));

                    if (emitMenuTitleMetaTag)
                    {
                        xhtmlDocument.Head.Add(
                            new XElement(Namespaces.Xhtml + "meta",
                                new XAttribute("name", "C1.menutitle"),
                                new XAttribute("content", page.MenuTitle)));
                    }

                    if (emitUrlTitleMetaTag)
                    {
                        xhtmlDocument.Head.Add(
                            new XElement(Namespaces.Xhtml + "meta",
                                new XAttribute("name", "C1.urltitle"),
                                new XAttribute("content", page.UrlTitle)));
                    }
                }
            }
        }



        private static void ResolveRelativePaths(XhtmlDocument xhtmlDocument)
        {
            IEnumerable<XElement> xhtmlElements = xhtmlDocument.Descendants().Where(f => f.Name.Namespace == Namespaces.Xhtml);
            IEnumerable<XAttribute> pathAttributes = xhtmlElements.Attributes().Where(f => f.Name.LocalName == "src" || f.Name.LocalName == "href" || f.Name.LocalName == "action");

            List<XAttribute> relativePathAttributes = pathAttributes.Where(f => f.Value.StartsWith("~/")).ToList();

            string applicationVirtualPath = UrlUtils.PublicRootPath;

            foreach (XAttribute relativePathAttribute in relativePathAttributes)
            {
                relativePathAttribute.Value = applicationVirtualPath + relativePathAttribute.Value.Substring(1);
            }
        }



        private static void NormalizeAspNetForms(XDocument document)
        {
            List<XElement> aspNetFormElements = document.Descendants(Namespaces.AspNetControls + "form").Reverse().ToList();

            foreach (XElement aspNetFormElement in aspNetFormElements)
            {
                if (aspNetFormElement.Ancestors(Namespaces.AspNetControls + "form").Any())
                {
                    aspNetFormElement.ReplaceWith(aspNetFormElement.Nodes());
                }
            }

        }


        private static void ResolvePageFields(XDocument document, IPage page)
        {
            foreach (XElement elem in document.Descendants(RenderingElementNames.PageTitle).ToList())
            {
                elem.ReplaceWith(page.Title);
            }

            foreach (XElement elem in document.Descendants(RenderingElementNames.PageAbstract).ToList())
            {
                elem.ReplaceWith(page.Description);
            }


            foreach (XElement elem in document.Descendants(RenderingElementNames.PageMetaTagDescription).ToList())
            {
                if (string.IsNullOrEmpty(page.Description) == false)
                {
                    elem.ReplaceWith(
                        new XElement(Namespaces.Xhtml + "meta",
                            new XAttribute("name", "Description"),
                            new XAttribute("content", page.Description)));
                }
                else
                {
                    elem.Remove();
                }
            }

        }



        public static void ExecuteEmbeddedFunctions(XElement element, FunctionContextContainer contextContainer)
        {
            using (TimerProfilerFacade.CreateTimerProfiler())
            {
                IEnumerable<XElement> functionCallDefinitions = element.DescendantsAndSelf(Namespaces.Function10 + "function").Where(f => f.Ancestors(Namespaces.Function10 + "function").Count() == 0);

                var functionCalls = functionCallDefinitions.ToList();
                if (functionCalls.Count == 0) return;

                object[] functionExecutionResults = new object[functionCalls.Count];

                ParallelFacade.For("PageRenderer. Embedded function execution", 0, functionCalls.Count, i =>
                {
                        XElement functionCallDefinition = functionCalls[i];

                        object functionResult;
                        try
                        {
                            // Evaluating function calls in parameters
                            IEnumerable<XElement> parameters = functionCallDefinition.Elements();
                            if (parameters != null)
                            {
                                foreach (XElement parameterNode in parameters.ToList())
                                {
                                    ExecuteEmbeddedFunctions(parameterNode, contextContainer);
                                }
                            }

                            // Executing a function call
                            BaseRuntimeTreeNode runtimeTreeNode = FunctionTreeBuilder.Build(functionCallDefinition);

                            object result = runtimeTreeNode.GetValue(contextContainer);

                            if (result != null)
                            {
                                // Evaluating functions in a result of a function call
                                object embedableResult = contextContainer.MakeXEmbedable(result);

                                foreach (XElement xelement in GetXElements(embedableResult))
                                {
                                    ExecuteEmbeddedFunctions(xelement, contextContainer);
                                }

                                functionResult = embedableResult;
                            }
                            else
                            {
                                functionResult = null;
                            }
                        }
                        catch (Exception ex)
                        {
                            LoggingService.LogError("PageRenderer", ex);

                            XElement errorDescriptionElement = GetErrorDescriptionHtmlElement(ex);
                            functionResult = errorDescriptionElement;
                        }

                        functionExecutionResults[i] = functionResult;
                });

                // Applying changes
                for(int i=0; i < functionCalls.Count; i++)
                {
                    XElement functionCall = functionCalls[i];
                    object functionCallResult = functionExecutionResults[i];
                    if(functionCallResult != null)
                    {
                        functionCall.ReplaceWith(functionCallResult);
                    }
                    else
                    {
                        functionCall.Remove();
                    }
                }
            }
        }


        private static XElement GetErrorDescriptionHtmlElement(Exception ex)
        {
            if (Composite.C1Console.Security.UserValidationFacade.IsLoggedIn() == true)
            {
                var errorMessage = new StringBuilder();
                while(ex != null)
                {
                    errorMessage.Append(ex.Message).Append(" - ");
                    ex = ex.InnerException;
                }

                return new XElement(Namespaces.Xhtml + "span",
                    new XAttribute("class", "c1errordetails"),
                    new XAttribute("style", "border: 2px solid red; padding: 2px 6px 2px 6px; cursor: pointer; font-weight: bold; background-color: InfoBackground; color: InfoText; -moz-border-radius: 4px; -moz-box-shadow: 1px 1px 3px 0 rgba(0,0,0,0.75);"),
                    new XAttribute("onclick", "alert(this.title);"),
                    new XAttribute("title", errorMessage),
                    " Error in Function ");
            }
            return new XElement(Namespaces.Xhtml + "span",
                new XAttribute("class", "c1error"),
                "[ ERROR ]");
        }



        private static IEnumerable<XElement> GetXElements(object source)
        {
            if (source is XElement)
            {
                yield return (XElement)source;
            }

            if (source is IEnumerable<XElement>)
            {
                foreach (XElement xelement in (IEnumerable<XElement>)source)
                {
                    yield return xelement;
                }
            }
        }

        private class HeadNodeFilter
        {
            readonly HashSet<string> _alreadyUsed = new HashSet<string>();

            public  IEnumerable<XNode> Filter(IEnumerable<XNode> headElements)
            {
                foreach (XNode node in headElements)
                {
                    var element = node as XElement;

                    if (element != null)
                    {
                        // Skipping elements with already used "id" attributes
                        var idAttr = element.Attribute("id");
                        if (idAttr != null)
                        {
                            string id = idAttr.Value;

                            if (_alreadyUsed.Contains(id))
                            {
                                continue;
                            }

                            _alreadyUsed.Add(id);
                        }
                        //else
                        //{
                        //    string localName = element.Name.LocalName;
                        //    if (localName == "link" || (localName == "script" && element.Attribute("src") != null))
                        //    {
                        //        string text = element.ToString();
                        //        if (_alreadyUsed.Contains(text))
                        //        {
                        //            continue;
                        //        }

                        //        _alreadyUsed.Add(text);
                        //    }
                        //}
                    }
                    yield return node;
                }
            }
        }


        private class NameBasedAttributeComparer : IEqualityComparer<XAttribute>
        {
            public bool Equals(XAttribute x, XAttribute y)
            {
                return x.Name == y.Name;
            }

            public int GetHashCode(XAttribute obj)
            {
                return obj.Name.GetHashCode();
            }
        }

        private static void NormalizeXhtmlDocument(XhtmlDocument rootDocument)
        {
            var headNodeFilter = new HeadNodeFilter();
            

            using (TimerProfilerFacade.CreateTimerProfiler())
            {
                XElement nestedDocument = rootDocument.Root.Descendants(Namespaces.Xhtml + "html").FirstOrDefault();

                while (nestedDocument != null)
                {
                    XhtmlDocument nestedXhtml = new XhtmlDocument(nestedDocument);

                    rootDocument.Root.Add(nestedXhtml.Root.Attributes().Except(rootDocument.Root.Attributes(), _nameBasedAttributeComparer));
                    rootDocument.Head.Add(headNodeFilter.Filter(nestedXhtml.Head.Nodes()));
                    rootDocument.Head.Add(nestedXhtml.Head.Attributes().Except(rootDocument.Head.Attributes(), _nameBasedAttributeComparer));
                    rootDocument.Body.Add(nestedXhtml.Body.Attributes().Except(rootDocument.Body.Attributes(), _nameBasedAttributeComparer));

                    nestedDocument.ReplaceWith(nestedXhtml.Body.Nodes());

                    nestedDocument = rootDocument.Root.Descendants(Namespaces.Xhtml + "html").FirstOrDefault();
                }
            }
        }



        public static bool DisableAspNetPostback(Control c)
        {
            bool formDisabled = false;
            DisableAspNetPostback(c, out formDisabled);
            return formDisabled;
        }


        private static void DisableAspNetPostback(Control c, out bool formDisabled)
        {
            formDisabled = false;

            if (c is HtmlForm)
            {
                ((HtmlForm)c).Attributes.Add("onsubmit", "alert('Postback disabled in preview mode'); return false;");
                formDisabled = true;
                return;
            }

            if (c is HtmlHead)
            {
                return;
            }

            foreach (Control child in c.Controls)
            {
                DisableAspNetPostback(child, out formDisabled);
                if (formDisabled == true) break;
            }
        }
    }
}
