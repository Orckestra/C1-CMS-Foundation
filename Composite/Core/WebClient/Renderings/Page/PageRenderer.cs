using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Xml.Linq;
using Composite.Core.Caching;
using Composite.Core.Routing;
using Composite.Core.Routing.Pages;
using Composite.Data;
using Composite.Data.Types;
using Composite.Functions;
using Composite.Core.Instrumentation;
using Composite.Core.Localization;
using Composite.Core.WebClient.Renderings.Template;
using Composite.Core.Xml;
using Composite.C1Console.Security;
using Composite.Core.Configuration;
using Composite.Plugins.PageTemplates.XmlPageTemplates;

namespace Composite.Core.WebClient.Renderings.Page
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public static class PageRenderer
    {
        private static readonly string LogTitle = typeof(PageRenderer).Name;
        private static readonly NameBasedAttributeComparer _nameBasedAttributeComparer = new NameBasedAttributeComparer();

        private static readonly XName XName_function = Namespaces.Function10 + "function";
        private static readonly XName XName_Id = "id";
        private static readonly XName XName_Name = "name";

        /// <exclude />
        public static FunctionContextContainer GetPageRenderFunctionContextContainer()
        {
            var mapper = new XEmbeddedControlMapper();

            var contextContainer = new FunctionContextContainer
            {
                XEmbedableMapper = mapper,
                SuppressXhtmlExceptions = GlobalSettingsFacade.PrettifyRenderFunctionExceptions 
                                            || PageRenderer.RenderingReason == RenderingReason.ScreenshotGeneration 
            };

            return contextContainer;
        }



        /// <exclude />
        public static Control Render(this IPage page, IEnumerable<IPagePlaceholderContent> placeholderContents, FunctionContextContainer functionContextContainer)
        {
            Verify.ArgumentNotNull(page, "page");
            Verify.ArgumentNotNull(functionContextContainer, "functionContextContainer");
            Verify.ArgumentCondition(functionContextContainer.XEmbedableMapper is XEmbeddedControlMapper,
                "functionContextContainer", $"Unknown or missing XEmbedableMapper on context container. Use {nameof(GetPageRenderFunctionContextContainer)}().");

            CurrentPage = page;

            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                string url = PageUrls.BuildUrl(page);

                using (TimerProfilerFacade.CreateTimerProfiler(url ?? "(no url)"))
                {
                    var cultureInfo = page.DataSourceId.LocaleScope;
                    System.Threading.Thread.CurrentThread.CurrentCulture = cultureInfo;
                    System.Threading.Thread.CurrentThread.CurrentUICulture = cultureInfo;

                    XEmbeddedControlMapper mapper = (XEmbeddedControlMapper)functionContextContainer.XEmbedableMapper;

                    XDocument document = TemplateInfo.GetTemplateDocument(page.TemplateId);

                    ResolvePlaceholders(document, placeholderContents);

                    Control c = Render(document, functionContextContainer, mapper, page);

                    return c;
                }
            }
        }

        /// <exclude />
        public static XhtmlDocument ParsePlaceholderContent(IPagePlaceholderContent placeholderContent)
        {
            if (string.IsNullOrEmpty(placeholderContent?.Content))
            {
                return new XhtmlDocument();
            }

            if (placeholderContent.Content.StartsWith("<html"))
            {
                try
                {
                    return XhtmlDocument.Parse(placeholderContent.Content);
                }
                catch (Exception) { }
            }

            return XhtmlDocument.Parse($"<html xmlns='{Namespaces.Xhtml}'><head/><body>{placeholderContent.Content}</body></html>");
        }


        /// <summary>
        /// Replaces &lt;rendering:placeholder  ... /&gt; tags with provided placeholder contents. Used by <see cref="XmlPageRenderer"/>.
        /// </summary>
        /// <param name="document">The document to be updated.</param>
        /// <param name="placeholderContents">The placeholder content to be used.</param>
        internal static void ResolvePlaceholders(XDocument document, IEnumerable<IPagePlaceholderContent> placeholderContents)
        {
            using (TimerProfilerFacade.CreateTimerProfiler())
            {
                var placeHolders = 
                    (from  placeholder in document.Descendants(RenderingElementNames.PlaceHolder)
                    let idAttribute = placeholder.Attribute(RenderingElementNames.PlaceHolderIdAttribute)
                    where idAttribute != null
                    select new { Element = placeholder, IdAttribute = idAttribute}).ToList();

                foreach (var placeholder in placeHolders)
                {
                    string placeHolderId = placeholder.IdAttribute.Value;
                    placeholder.IdAttribute.Remove();

                    IPagePlaceholderContent placeHolderContent =
                        placeholderContents.FirstOrDefault(f => f.PlaceHolderId == placeHolderId);

                    XhtmlDocument xhtmlDocument = ParsePlaceholderContent(placeHolderContent);
                    placeholder.Element.ReplaceWith(xhtmlDocument.Root);
                }
            }
        }



        /// <exclude />
        public static Control Render(this IPage page, IEnumerable<IPagePlaceholderContent> placeholderContents)
        {
            return page.Render(placeholderContents, GetPageRenderFunctionContextContainer());
        }



        /// <exclude />
        public static Guid CurrentPageId => CurrentPage?.Id ?? Guid.Empty;


        /// <summary>
        /// Returns <value>true</value> if the page is rendered in a "Preview" mode
        /// </summary>
        public static RenderingReason RenderingReason
        {
            get
            {
                return RequestLifetimeCache.TryGet<RenderingReason>("PageRenderer.RenderingReason");
            }
            set
            {
                RequestLifetimeCache.Add("PageRenderer.RenderingReason", value);
            }
        }

        /// <exclude />
        public static IPage CurrentPage
        {
            get
            {
                return RequestLifetimeCache.TryGet<IPage>("PageRenderer.IPage");
            }
            set
            {
                var currentValue = CurrentPage;
                if (currentValue == value)
                {
                    return;
                }

                Verify.IsNull(currentValue, "CurrentPage is already set");

                RequestLifetimeCache.Add("PageRenderer.IPage", value);
            }
        }



        /// <exclude />
        public static CultureInfo CurrentPageCulture => CurrentPage?.DataSourceId.LocaleScope;


        /// <exclude />
        [Obsolete]
        public static IEnumerable<IData> GetCurrentPageAssociatedData(Type type)
        {
            return PageRenderer.CurrentPage.GetReferees(type);
        }



        /// <exclude />
        [Obsolete]
        public static IEnumerable<IData> GetCurrentPageAssociatedData<T>() where T : IData
        {
            return PageRenderer.CurrentPage.GetReferees(typeof(T));
        }


        internal static void ProcessXhtmlDocument(XhtmlDocument xhtmlDocument, IPage page)
        {
            using (Profiler.Measure("Normalizing XHTML document"))
            {
                NormalizeXhtmlDocument(xhtmlDocument);
            }

            using (Profiler.Measure("Resolving relative paths"))
            {
                ResolveRelativePaths(xhtmlDocument);
            }

            using (Profiler.Measure("Appending C1 meta tags"))
            {
                AppendC1MetaTags(page, xhtmlDocument);
            }

            using (Profiler.Measure("Sorting <head> elements"))
            {
                PrioritizeHeadNodes(xhtmlDocument);
            }

            using (Profiler.Measure("Parsing localization strings"))
            {
                LocalizationParser.Parse(xhtmlDocument);
            }

            using (Profiler.Measure("Converting URLs from internal to public format (XhtmlDocument)"))
            {
                InternalUrls.ConvertInternalUrlsToPublic(xhtmlDocument);
            }

            var filters = ServiceLocator.GetServices<IPageContentFilter>().OrderBy(f => f.Order).ToList();
            if (filters.Any())
            {
                using (Profiler.Measure("Executing page content filters"))
                {
                    filters.ForEach(filter =>
                    {
                        using (Profiler.Measure($"Filter: {filter.GetType().FullName}"))
                        {
                            filter.Filter(xhtmlDocument, page);
                        }
                    });
                }
            }
        }

        private static bool IsMetaTag(XElement e) => e.Name.LocalName.Equals("meta", StringComparison.OrdinalIgnoreCase);

        private static bool CheckForDuplication(HashSet<string> values, string value)
        {
            if (!string.IsNullOrWhiteSpace(value))
            {
                if (values.Contains(value)) return true;

                values.Add(value);
            }
            
            return false;
        }

        private static string AttributesAsString(this XElement e)
        {
            var str = new StringBuilder();
            foreach (var attr in e.Attributes().OrderBy(a => a.Name.NamespaceName).ThenBy(a => a.Name.LocalName))
            {
                str.Append(attr.Name.LocalName);
                str.Append("=\"");
                str.Append(attr.Value);
                str.Append("\" ");
            }

            return str.ToString();
        }

        /// <exclude />
        public static void ProcessDocumentHead(XhtmlDocument xhtmlDocument)
        {
            RemoveDuplicates(xhtmlDocument.Head);
        }

        private static void RemoveDuplicates(XElement head)
        {
            var uniqueIdValues = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
            var uniqueMetaNameValues = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
            var uniqueScriptAttributes = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
            var uniqueLinkAttributes = new HashSet<string>(StringComparer.OrdinalIgnoreCase);

            var priorityOrderedElements = new List<XElement>();

            priorityOrderedElements.AddRange(head.Elements().Where(IsMetaTag));
            priorityOrderedElements.Reverse();
            priorityOrderedElements.AddRange(head.Elements().Where(e => !IsMetaTag(e)));

            foreach (var e in priorityOrderedElements)
            {
                var id = (string)e.Attribute(XName_Id);

                bool toBeRemoved = CheckForDuplication(uniqueIdValues, id);

                if (!toBeRemoved && !e.Nodes().Any())
                {
                    switch (e.Name.LocalName.ToLowerInvariant())
                    {
                        case "meta":
                            var name = (string)e.Attribute(XName_Name);
                            toBeRemoved = CheckForDuplication(uniqueMetaNameValues, name);
                            break;
                        case "script":
                            toBeRemoved = CheckForDuplication(uniqueScriptAttributes, e.AttributesAsString());
                            break;
                        case "link":
                            toBeRemoved = CheckForDuplication(uniqueLinkAttributes, e.AttributesAsString());
                            break;
                    }
                }

                if (toBeRemoved)
                {
                    e.Remove();
                }
            }
        }


        /// <exclude />
        public static Control Render(XDocument document, FunctionContextContainer contextContainer, IXElementToControlMapper mapper, IPage page)
        {
            using (TimerProfilerFacade.CreateTimerProfiler())
            {
                using (Profiler.Measure("Executing embedded functions"))
                {
                    ExecuteEmbeddedFunctions(document.Root, contextContainer);
                }

                using (Profiler.Measure("Resolving page fields"))
                {
                    ResolvePageFields(document, page);
                }

                using (Profiler.Measure("Normalizing ASP.NET forms"))
                {
                    NormalizeAspNetForms(document);
                }

                if (document.Root.Name != RenderingElementNames.Html)
                {
                    return new LiteralControl(document.ToString());
                }

                var xhtmlDocument = new XhtmlDocument(document);

                ProcessXhtmlDocument(xhtmlDocument, page);

                using (Profiler.Measure("Converting XHTML document into an ASP.NET control"))
                {
                    return xhtmlDocument.AsAspNetControl(mapper);
                }
            }
        }


        private static void PrioritizeHeadNodes(XhtmlDocument xhtmlDocument)
        {
            var prioritizedHeadNodes = new List<Tuple<int, XNode>>();
            foreach (var node in xhtmlDocument.Head.Nodes().ToList())
            {
                int p = GetHeadNodePriority(node);
                prioritizedHeadNodes.Add(new Tuple<int, XNode>(p, node));
                node.Remove();
            }
            xhtmlDocument.Head.Add(prioritizedHeadNodes.OrderBy(f => f.Item1).Select(f => f.Item2));
        }

        private static string AttributeValueLowered(this XElement element, string attributeName)
        {
            string value = (string)element.Attribute(attributeName);
            return value?.ToLowerInvariant();
        }

        private static int GetHeadNodePriority(XNode headNode)
        {
            if (headNode is XElement headElement)
            {
                if (headElement.Name.LocalName == "title") return 0;
                if (headElement.Name.LocalName == "meta")
                {
                    if (headElement.AttributeValueLowered("http-equiv") == "content-type") return 10;
                    if (headElement.Attribute("charset") != null) return 11;
                    if (headElement.Attribute("http-equiv") != null) return 11;

                    if (headElement.AttributeValueLowered("name") == "description") return 12;

                    if (headElement.Attribute("name") != null) return 20;

                    if (headElement.Attribute("property") != null) return 25;

                    return 20;
                }
                if (headElement.Name.LocalName == "link") return 30;
                if (headElement.Name.LocalName == "script") return 40;
            }

            return 100;
        }


        /// <summary>
        /// Appends the c1 meta tags to the head section. Those tag are used later on by SEO assistant.
        /// </summary>
        /// <param name="page">The page.</param>
        /// <param name="xhtmlDocument">The XHTML document.</param>
        public static void AppendC1MetaTags(IPage page, XhtmlDocument xhtmlDocument)
        {
            if (UserValidationFacade.IsLoggedIn())
            {
                bool emitMenuTitleMetaTag = string.IsNullOrEmpty(page.MenuTitle) == false;
                bool emitUrlMetaTag = string.IsNullOrEmpty(page.UrlTitle) == false;

                if (emitMenuTitleMetaTag || emitUrlMetaTag)
                {
                    xhtmlDocument.Head.Add(
                        new XComment("The C1.* meta tags are only emitted when you are logged in"),
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

                    if (emitUrlMetaTag)
                    {
                        var editPreview = PageRenderer.RenderingReason == RenderingReason.PreviewUnsavedChanges;

                        string url = PageUrls.BuildUrl(page) ?? PageUrls.BuildUrl(page, UrlKind.Internal);

                        var pageUrl = string.Format("{0}{1}{2}",
                            url.Replace("/c1mode(unpublished)", "").Replace("/c1mode(relative)",""),
                            editPreview ? "/" + page.UrlTitle : C1PageRoute.GetPathInfo(),
                            editPreview ? "" : HttpContext.Current.Request.Url.Query);

                        xhtmlDocument.Head.Add(
                            new XElement(Namespaces.Xhtml + "meta",
                                new XAttribute("name", "C1.urlseowords"),
                                new XAttribute("content", pageUrl)));
                    }
                }
            }
        }


        /// <exclude />
        public static void ResolveRelativePaths(XhtmlDocument xhtmlDocument)
        {
            IEnumerable<XElement> xhtmlElements = xhtmlDocument.Descendants().Where(f => f.Name.Namespace == Namespaces.Xhtml);
            IEnumerable<XAttribute> pathAttributes = xhtmlElements.Attributes().Where(f => f.Name.LocalName == "src" || f.Name.LocalName == "href" || f.Name.LocalName == "action");

            string applicationVirtualPath = UrlUtils.PublicRootPath;

            List<XAttribute> relativePathAttributes = pathAttributes.Where(f => f.Value.StartsWith("~/") || f.Value.StartsWith("%7E/")).ToList();

            foreach (XAttribute relativePathAttribute in relativePathAttributes)
            {
                int tildePrefixLength = (relativePathAttribute.Value.StartsWith("~") ? 1 : 3);
                relativePathAttribute.Value = applicationVirtualPath + relativePathAttribute.Value.Substring(tildePrefixLength);
            }

            if (applicationVirtualPath.Length > 1)
            {
                List<XAttribute> hardRootedPathAttributes = pathAttributes.Where(f => f.Value.StartsWith("/Renderers/")).ToList();

                foreach (XAttribute hardRootedPathAttribute in hardRootedPathAttributes)
                {
                    hardRootedPathAttribute.Value = applicationVirtualPath + hardRootedPathAttribute.Value;
                }
            }
        }



        private static void NormalizeAspNetForms(XDocument document)
        {
            var aspNetFormXName = Namespaces.AspNetControls + "form";
            List<XElement> aspNetFormElements = document.Descendants(aspNetFormXName).Reverse().ToList();

            foreach (XElement aspNetFormElement in aspNetFormElements)
            {
                if (aspNetFormElement.Ancestors(aspNetFormXName).Any())
                {
                    aspNetFormElement.ReplaceWith(aspNetFormElement.Nodes());
                }
            }
        }


        /// <exclude />
        public static void ResolvePageFields(XDocument document, IPage page)
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
                if (string.IsNullOrEmpty(page.Description))
                {
                    elem.Remove();
                    continue;
                }

                elem.ReplaceWith(new XElement(Namespaces.Xhtml + "meta",
                    new XAttribute("name", "description"),
                    new XAttribute("content", page.Description)));
            }
        }

        /// <summary>
        /// Executes functions that match the predicate recursively,
        /// 
        /// </summary>
        /// <param name="element"></param>
        /// <param name="functionContext"></param>
        /// <param name="functionShouldBeExecuted">A predicate that defines whether a function should be executed based on its name.</param>
        /// <returns><value>True</value> if all of the functions has matched the predicate</returns>
        internal static bool ExecuteFunctionsRec(
            XElement element, 
            FunctionContextContainer functionContext,
            Predicate<string> functionShouldBeExecuted = null)
        {
            if (element.Name != XName_function)
            {
                var children = element.Elements();
                if (element.Elements(XName_function).Any())
                {
                    // Allows replacing the function elements without breaking the iterator
                    children = children.ToList(); 
                }

                bool allChildrenExecuted = true;
                foreach (var childElement in children)
                {
                    if (!ExecuteFunctionsRec(childElement, functionContext, functionShouldBeExecuted))
                    {
                        allChildrenExecuted = false;
                    }
                }
                return allChildrenExecuted;
            }

            bool allRecFunctionsExecuted = true;

            string functionName = (string) element.Attribute("name");
            object result;
            try
            {
                // Evaluating function calls in parameters
                IEnumerable<XElement> parameters = element.Elements();

                bool allParametersEvaluated = true;
                foreach (XElement parameterNode in parameters.ToList())
                {
                    if (!ExecuteFunctionsRec(parameterNode, functionContext, functionShouldBeExecuted))
                    {
                        allParametersEvaluated = false;
                    }
                }

                if (!allParametersEvaluated)
                {
                    return false;
                }

                if (functionShouldBeExecuted != null &&
                    !functionShouldBeExecuted(functionName))
                {
                    return false;
                }

                // Executing a function call
                BaseRuntimeTreeNode runtimeTreeNode = FunctionTreeBuilder.Build(element);
                result = runtimeTreeNode.GetValue(functionContext);

                if (result != null)
                {
                    // Evaluating functions in a result of a function call
                    result = functionContext.MakeXEmbedable(result);

                    foreach (XElement xelement in GetXElements(result).ToList())
                    {
                        if (!ExecuteFunctionsRec(xelement, functionContext, functionShouldBeExecuted))
                        {
                            allRecFunctionsExecuted = false;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                using (Profiler.Measure("PageRenderer. Logging exception: " + ex.Message))
                {
                    XElement errorBoxHtml;

                    if (!functionContext.ProcessException(functionName, ex, LogTitle, out errorBoxHtml))
                    {
                        throw;
                    }

                    result = errorBoxHtml;
                }
            }

            ReplaceFunctionWithResult(element, result);

            return allRecFunctionsExecuted;
        }

        /// <exclude />
        public static void ExecuteEmbeddedFunctions(XElement element, FunctionContextContainer functionContext)
        {
            ExecuteFunctionsRec(element, functionContext, null);
        }

        /// <summary>
        /// Executes all cacheable (not dynamic) functions and returns <value>True</value> 
        /// if all of the functions were cacheable.
        /// </summary>
        /// <param name="element"></param>
        /// <param name="functionContext"></param>
        /// <returns></returns>
        internal static bool ExecuteCacheableFunctions(XElement element, FunctionContextContainer functionContext)
        {
            return ExecuteFunctionsRec(element, functionContext, name =>
            {
                var function = FunctionFacade.GetFunction(name);
                return !(function is IDynamicFunction df && df.PreventFunctionOutputCaching);
            });
        }

        private static void ReplaceFunctionWithResult(XElement functionCall, object result)
        {
            if (result == null)
            {
                functionCall.Remove();
                return;
            }

            if (result is XAttribute && functionCall.Parent != null)
            {
                functionCall.Parent.Add(result);
                functionCall.Remove();
            }
            else
            {
                functionCall.ReplaceWith(result);
            }
        }

        private static IEnumerable<XElement> GetXElements(object source)
        {
            if (source is XElement element)
            {
                yield return element;
            }

            if (source is IEnumerable<XNode> nodes)
            {
                foreach (var xElement in nodes.OfType<XElement>())
                {
                    yield return xElement;
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

        /// <exclude />
        public static void NormalizeXhtmlDocument(XhtmlDocument rootDocument)
        {
            using (TimerProfilerFacade.CreateTimerProfiler())
            {
                while (true)
                {
                    XElement nestedDocument = rootDocument.Root.Descendants(XhtmlDocument.XName_html).FirstOrDefault();

                    if (nestedDocument == null) break;
                    
                    var nestedHead = nestedDocument.Element(XhtmlDocument.XName_head);
                    var nestedBody = nestedDocument.Element(XhtmlDocument.XName_body);

                    Verify.IsNotNull(nestedHead, "XHTML document is missing <head /> element");
                    Verify.IsNotNull(nestedBody, "XHTML document is missing <body /> element");

                    rootDocument.Root.Add(nestedDocument.Attributes().Except(rootDocument.Root.Attributes(), _nameBasedAttributeComparer));

                    rootDocument.Head.Add(nestedHead.Nodes());

                    rootDocument.Head.Add(nestedHead.Attributes().Except(rootDocument.Head.Attributes(), _nameBasedAttributeComparer));
                    rootDocument.Body.Add(nestedBody.Attributes().Except(rootDocument.Body.Attributes(), _nameBasedAttributeComparer));

                    nestedDocument.ReplaceWith(nestedBody.Nodes());
                }
            }
        }



        /// <exclude />
        public static bool DisableAspNetPostback(Control c)
        {
            bool formDisabled;
            DisableAspNetPostback(c, out formDisabled);
            return formDisabled;
        }


        private static void DisableAspNetPostback(Control c, out bool formDisabled)
        {
            formDisabled = false;

            if (c is HtmlForm form)
            {
                form.Attributes.Add("onsubmit", "alert('Postback disabled in preview mode'); return false;");
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
                if (formDisabled) break;
            }
        }
    }
}
