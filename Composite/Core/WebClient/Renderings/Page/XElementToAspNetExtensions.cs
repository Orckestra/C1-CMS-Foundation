using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Xml.Linq;

using Composite.Core.Instrumentation;
using Composite.Core.Xml;


namespace Composite.Core.WebClient.Renderings.Page
{
    /// <summary>
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public static class XElementToAspNetExtensions
    {
        private static readonly XName XName_Id = "id";
        private static readonly XName XName_Xmlns = "xmlns";
        private static readonly XName XName_Title = Namespaces.Xhtml + "title";
        private static readonly XName XName_Meta = Namespaces.Xhtml + "meta";

        /// <exclude />
        public static Control AsAspNetControl(this XhtmlDocument xhtmlDocument)
        {
            return xhtmlDocument.AsAspNetControl(NoMappingMapper.GetInstance());
        }



        /// <exclude />
        public static Control AsAspNetControl(this XhtmlDocument xhtmlDocument, IXElementToControlMapper controlMapper)
        {
            using (TimerProfilerFacade.CreateTimerProfiler())
            {
                var htmlControl = new HtmlGenericControl("html");
                CopyAttributes(xhtmlDocument.Root, htmlControl);

                HtmlHead headControl = xhtmlDocument.BuildHtmlHeadControl(controlMapper);

                Control bodyControl = xhtmlDocument.Body.AsAspNetControl(controlMapper);

                htmlControl.Controls.Add(headControl);
                htmlControl.Controls.Add(bodyControl);

                PlaceHolder pageHolder = new PlaceHolder();
                if (xhtmlDocument.DocumentType != null)
                {
                    string docType = xhtmlDocument.DocumentType.ToString();
                    var offset = docType.IndexOf("[]", StringComparison.Ordinal);
                    if (offset >= 0)
                    {
                        docType = docType.Remove(offset, 2);
                    }

                    pageHolder.Controls.Add(new LiteralControl(docType));
                }
                pageHolder.Controls.Add(htmlControl);

                return pageHolder;
            }
        }



        /// <exclude />
        public static Control AsAspNetControl(this XNode xnode)
        {
            return xnode.AsAspNetControl(NoMappingMapper.GetInstance());
        }



        /// <exclude />
        public static Control AsAspNetControl(this XNode xnode, IXElementToControlMapper controlMapper)
        {
            if (xnode is XElement element) return element.AsAspNetControl(controlMapper);
            if (xnode is XDocument document) return document.Root.AsAspNetControl(controlMapper);

            if (xnode is XText text) return new LiteralControl(text.Value);
            if (xnode is XComment comment) return new LiteralControl($"<!--{comment.Value}-->");

            throw new NotImplementedException($"Type '{xnode.GetType().Name}' not handled");
        }



        /// <exclude />
        public static Control AsAspNetControl(this XElement element)
        {
            return element.AsAspNetControl(NoMappingMapper.GetInstance());
        }



        /// <exclude />
        public static Control AsAspNetControl(this XElement element, IXElementToControlMapper controlMapper)
        {
            Control control;

            if (!controlMapper.TryGetControlFromXElement(element, out control))
            {
                if (IsHtmlControlElement(element) || element.Attribute(XName_Id) != null)
                {
                    control = new HtmlGenericControl(element.Name.LocalName)
                    {
                        ClientIDMode = ClientIDMode.Static
                    };
                    CopyAttributes(element, (HtmlControl)control);
                    ExportChildNodes(element.Nodes(), control, controlMapper);
                }
                else
                {
                    XElement copy = CopyWithoutNamespace(element, Namespaces.Xhtml);
                    control = new LiteralControl(copy.ToString());
                }
            }

            return control;
        }



        private static XElement CopyWithoutNamespace(XElement source, XNamespace namespaceToRemove)
        {
            XNamespace sourceNs = source.Name.Namespace;
            XName newName = sourceNs.Equals(namespaceToRemove) ? source.Name.LocalName : source.Name;
            XElement copy = new XElement(newName);

            if (!sourceNs.Equals(namespaceToRemove) 
                && sourceNs != source.Parent.Name.Namespace 
                && source.Attribute(XName_Xmlns) == null
                && (sourceNs == Namespaces.Xhtml.NamespaceName || sourceNs == Namespaces.Svg.NamespaceName))
            {
                copy.Add(new XAttribute(XName_Xmlns, source.Name.Namespace));
            }

            copy.Add(source.Attributes().Where(a => a.Name.Namespace == namespaceToRemove)
                                                .Select(a => new XAttribute(a.Name.LocalName, a.Value)));

            Func<XAttribute, bool> isNotHtmlRelatedNsDeclaration = 
                ns => !ns.IsNamespaceDeclaration 
                || (ns.Value != Namespaces.Xhtml.NamespaceName && ns.Value != Namespaces.Svg.NamespaceName);

            copy.Add(source.Attributes().Where(a => a.Name.Namespace != namespaceToRemove && isNotHtmlRelatedNsDeclaration(a))
                                        .Select(a => new XAttribute(a.Name, a.Value)));

            foreach (XNode child in source.Nodes())
            {
                if (child is XElement)
                {
                    copy.Add(CopyWithoutNamespace(child as XElement, namespaceToRemove));
                }
                else
                {
                    copy.Add(child);
                }
            }

            return copy;
        }


        private static bool IsHtmlControlElement(XElement element)
        {
            var name = element.Name;
            string xnamespace = element.Name.Namespace.NamespaceName;
            if (xnamespace == Namespaces.Xhtml.NamespaceName || xnamespace == string.Empty)
            {
                switch (name.LocalName)
                {
                    case "input":
                    case "base":
                    case "param":
                    case "img":
                    case "br":
                    case "hr":
                        return false;
                    default:
                        return true;
                }
            }
            return false;
        }



        private static void ExportChildNodes(IEnumerable<XNode> nodes, Control containerControl, IXElementToControlMapper controlMapper)
        {
            foreach (var childNode in nodes)
            {
                if (childNode is XElement element)
                {
                    containerControl.Controls.Add(element.AsAspNetControl(controlMapper));
                    continue;
                }

                if (childNode is XCData cdata)
                {
                    if (!childNode.Ancestors().Any(f => f.Name.LocalName == "script"))
                    {
                        var literal = new LiteralControl(cdata.Value);
                        containerControl.Controls.Add(literal);
                        continue;
                    }
                }

                if (childNode is XText)
                {
                    var literal = new LiteralControl(childNode.ToString());
                    containerControl.Controls.Add(literal);
                    continue;
                }

                if (childNode is XComment)
                {
                    containerControl.Controls.Add(new LiteralControl(childNode + "\n"));
                    continue;
                }

                throw new NotImplementedException($"Unhandled XNode type '{childNode.GetType()}'");
            }
        }

        /// <exclude />
        public static void CopyAttributes(this XElement source, HtmlControl target)
        {
            CopyAttributes(source, target, true);
        }


        /// <exclude />
        public static void CopyAttributes(this XElement source, HtmlControl target, bool copyXmlnsAttribute)
        {
            foreach (var attribute in source.Attributes())
            {
                if (attribute.Name.LocalName == "id")
                {
                    target.ID = attribute.Value;
                    continue;
                }

                if (attribute.Name.Namespace == Namespaces.XmlNs)
                {
                    string namespaceName = attribute.Value;

                    if (namespaceName != "http://www.w3.org/1999/xhtml"
                        && !namespaceName.StartsWith("http://www.composite.net/ns"))
                    {
                        target.Attributes.Add($"xmlns:{attribute.Name.LocalName}", attribute.Value);
                    }

                    continue;
                }

                string localName = attribute.Name.LocalName;
                if (localName != XName_Xmlns
                    || (copyXmlnsAttribute
                        && (source.Parent == null || source.Name.Namespace != source.Parent.Name.Namespace)))
                {
                    string htmlAttributeName;

                    if (attribute.Name.Namespace != source.Name.Namespace
                        && attribute.Name.Namespace.NamespaceName != string.Empty)
                    {
                        string namespacePrefix = source.GetPrefixOfNamespace(attribute.Name.NamespaceName);

                        htmlAttributeName = namespacePrefix + ":" + localName;
                    }
                    else
                    {
                        htmlAttributeName = localName;
                    }

                    target.Attributes.Add(htmlAttributeName, attribute.Value);
                }
            }
        }


        internal static void MergeToHeadControl(this XhtmlDocument xhtmlDocument, HtmlHead headControl, IXElementToControlMapper controlMapper)
        {
            XElement headSource = xhtmlDocument.Head;

            if (headSource == null) return;

            CopyAttributes(headSource, headControl);

            XElement titleElement = headSource.Elements(XName_Title).LastOrDefault();
            if (titleElement != null)
            {
                HtmlTitle existingControl = headControl.Controls.OfType<HtmlTitle>().FirstOrDefault();

                if (existingControl != null)
                {
                    headControl.Controls.Remove(existingControl);
                }

                // NOTE: we aren't using headControl.Title property since it adds "<title>" tag as the last one
                headControl.Controls.AddAt(0, new HtmlTitle { Text = HttpUtility.HtmlEncode(titleElement.Value) });
            }

            var metaTags = headSource.Elements().Where(f => f.Name == XName_Meta);
            int metaTagPosition = Math.Min(1, headControl.Controls.Count);
            foreach (var metaTag in metaTags)
            {
                var metaControl = new HtmlMeta();
                foreach (var attribute in metaTag.Attributes())
                {
                    if (attribute.Name.LocalName == "id")
                    {
                        metaControl.ID = attribute.Value;
                    }
                    else
                    {
                        metaControl.Attributes.Add(attribute.Name.LocalName, attribute.Value);
                    }
                }
                headControl.Controls.AddAt(metaTagPosition++, metaControl);
            }

            ExportChildNodes(headSource.Nodes().Where(f => 
                !(f is XElement element) || (element.Name != XName_Title && element.Name != XName_Meta)), 
                headControl, controlMapper);

            headControl.RemoveDuplicates();
        }



        private static void RemoveDuplicates(this HtmlHead headControl)
        {
            HashSet<string> uniqueIdValues = new HashSet<string>();
            HashSet<string> uniqueMetaNameValues = new HashSet<string>();
            HashSet<string> uniqueScriptAttributes = new HashSet<string>();
            HashSet<string> uniqueLinkAttributes = new HashSet<string>();

            IEnumerable<HtmlControl> controls = headControl.Controls.OfType<HtmlControl>();

            // Leaving last instances of each meta tag, and first instances of script/link tags
            var priorityOrderedControls = new List<HtmlControl>();

            var ignoreCase = StringComparison.OrdinalIgnoreCase;
            priorityOrderedControls.AddRange(controls.Where(c => c.TagName.Equals("meta", ignoreCase)).Reverse());
            priorityOrderedControls.AddRange(controls.Where(c => !c.TagName.Equals("meta", ignoreCase)));

            foreach (HtmlControl c in priorityOrderedControls)
            {
                bool remove = IsDuplicate(uniqueIdValues, c.ClientID);

                if (c.Controls.Count == 0)
                {
                    switch (c.TagName.ToLower())
                    {
                        case "meta":
                            remove = remove || IsDuplicate(uniqueMetaNameValues, c.Attributes["name"]);
                            break;
                        case "script":
                            remove = remove || IsDuplicate(uniqueScriptAttributes, c.AttributesAsString());
                            break;
                        case "link":
                            remove = remove || IsDuplicate(uniqueLinkAttributes, c.AttributesAsString());
                            break;
                    }
                }

                if (remove)
                {
                    headControl.Controls.Remove(c);
                }
            }
        }


        private static string AttributesAsString(this HtmlControl c)
        {
            var str = new StringBuilder(c.ClientID);
            var keys = c.Attributes.Keys.Cast<string>().OrderBy(f => f);

            foreach (string key in keys)
            {
                str.Append(key);
                str.Append("=\"");
                str.Append(c.Attributes[key]);
                str.Append("\" ");
            }

            return str.ToString();
        }

        private static bool IsDuplicate(HashSet<string> uniqueList, string uniqueString)
        {
            if (!string.IsNullOrEmpty(uniqueString))
            {
                var lowered = uniqueString.ToLowerInvariant();
                if (uniqueList.Contains(lowered))
                {
                    return true;
                }

                uniqueList.Add(lowered);
            }

            return false;
        }

        private static HtmlHead BuildHtmlHeadControl(this XhtmlDocument xhtmlDocument, IXElementToControlMapper controlMapper)
        {
            var headControl = new HtmlHead();

            xhtmlDocument.MergeToHeadControl(headControl, controlMapper);

            return headControl;
        }


        #region Private helper class
        private class NoMappingMapper : IXElementToControlMapper
        {
            private static readonly NoMappingMapper _instance = new NoMappingMapper();

            public static IXElementToControlMapper GetInstance()
            {
                return _instance;
            }

            public bool TryGetControlFromXElement(XElement element, out Control control)
            {
                control = null;
                return false;
            }
        }
        #endregion
    }
}
