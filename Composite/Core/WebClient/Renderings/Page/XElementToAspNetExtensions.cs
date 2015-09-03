using System;
using System.Collections;
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
                HtmlGenericControl htmlControl = new HtmlGenericControl("html");
                CopyAttributes(xhtmlDocument.Root, htmlControl);

                HtmlHead headControl = xhtmlDocument.BuildHtmlHeadControl(controlMapper);

                Control bodyControl = xhtmlDocument.Body.AsAspNetControl(controlMapper);

                htmlControl.Controls.Add(headControl);
                htmlControl.Controls.Add(bodyControl);

                PlaceHolder pageHolder = new PlaceHolder();
                if (xhtmlDocument.DocumentType != null)
                {
                    string docType = xhtmlDocument.DocumentType.ToString();
                    if (docType.Contains("[]"))
                    {
                        docType = docType.Remove(docType.IndexOf("[]"), 2);
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
            if (xnode is XElement) return ((XElement)xnode).AsAspNetControl(controlMapper);
            if (xnode is XDocument) return ((XDocument)xnode).Root.AsAspNetControl(controlMapper);

            if (xnode is XText) return new LiteralControl(((XText)xnode).Value);
            if (xnode is XComment) return new LiteralControl(string.Format("<!--{0}-->", ((XComment)xnode).Value));

            throw new NotImplementedException(string.Format("Type '{0}' not handled", xnode.GetType().Name));
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

            if (controlMapper.TryGetControlFromXElement(element, out control) == false)
            {
                if (IsHtmlControlElement(element) || element.Attribute("id") != null)
                {
                    control = new HtmlGenericControl(element.Name.LocalName);
                    control.ClientIDMode = ClientIDMode.Static;
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
                && source.Attribute("xmlns") == null
                && (sourceNs == Namespaces.Xhtml.NamespaceName || sourceNs == Namespaces.Svg.NamespaceName))
            {
                copy.Add(new XAttribute("xmlns", source.Name.Namespace));
            }

            copy.Add(source.Attributes().Where(a => a.Name.Namespace == namespaceToRemove)
                                                .Select(a => new XAttribute(a.Name.LocalName, a.Value)));

            Func<XAttribute, bool> isNotHtmlRelatedNsDeclaration = 
                ns => !ns.IsNamespaceDeclaration || (ns.Value != Namespaces.Xhtml.NamespaceName && ns.Value != Namespaces.Svg.NamespaceName);

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
                if (childNode is XElement)
                {
                    containerControl.Controls.Add(((XElement)childNode).AsAspNetControl(controlMapper));
                    continue;
                }

                if (childNode is XCData)
                {
                    if (!childNode.Ancestors().Any(f => f.Name.LocalName == "script"))
                    {
                        XCData cdata = (XCData)childNode;
                        LiteralControl literal = new LiteralControl(cdata.Value);
                        containerControl.Controls.Add(literal);
                        continue;
                    }
                }

                if (childNode is XText)
                {
                    LiteralControl literal = new LiteralControl(childNode.ToString());
                    containerControl.Controls.Add(literal);
                    continue;
                }

                if (childNode is XComment)
                {
                    containerControl.Controls.Add(new LiteralControl(childNode.ToString() + "\n"));
                    continue;
                }

                throw new NotImplementedException(string.Format("Unhandled XNode type '{0}'", childNode.GetType()));
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
                        target.Attributes.Add(string.Format("xmlns:{0}", attribute.Name.LocalName), attribute.Value);
                    }

                    continue;
                }

                string localName = attribute.Name.LocalName;
                if (localName != "xmlns"
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

            XElement titleElement = headSource.Elements(Namespaces.Xhtml + "title").LastOrDefault();
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

            var metaTags = headSource.Elements().Where(f => f.Name == Namespaces.Xhtml + "meta");
            int metaTagPosition = Math.Min(1, headControl.Controls.Count);
            foreach (var metaTag in metaTags)
            {
                HtmlMeta metaControl = new HtmlMeta();
                foreach (var attribute in metaTag.Attributes())
                {
                    metaControl.Attributes.Add(attribute.Name.LocalName, attribute.Value);
                }
                headControl.Controls.AddAt(metaTagPosition++, metaControl);
            }

            ExportChildNodes(headSource.Nodes().Where(f => ((f is XElement) == false || ((XElement)f).Name != Namespaces.Xhtml + "title" && ((XElement)f).Name != Namespaces.Xhtml + "meta")), headControl, controlMapper);

            headControl.RemoveDuplicates();
        }



        private static void RemoveDuplicates(this HtmlHead headControl)
        {
            HashSet<string> uniqueIdValues = new HashSet<string>();
            HashSet<string> uniqueMetaNameValues = new HashSet<string>();
            HashSet<string> uniqueMetaPropertyValues = new HashSet<string>();
            HashSet<string> uniqueScriptAttributes = new HashSet<string>();
            HashSet<string> uniqueLinkAttributes = new HashSet<string>();

            IEnumerable<HtmlControl> controls = headControl.Controls.OfType<HtmlControl>();

            // Leaving last instances of each meta tag, and first instances of script/link tags
            var priorityOrderedControls = new List<HtmlControl>();
            priorityOrderedControls.AddRange(controls.Where(c => c.TagName.ToLowerInvariant() == "meta").Reverse());
            priorityOrderedControls.AddRange(controls.Where(c => c.TagName.ToLowerInvariant() != "meta"));

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
            List<string> keys = new List<string>();
            IEnumerator keysEnum = c.Attributes.Keys.GetEnumerator();

            while (keysEnum.MoveNext())
                keys.Add((string)keysEnum.Current);

            StringBuilder str = new StringBuilder(c.ClientID);

            foreach (string key in keys.OrderBy(f => f))
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
                if (uniqueList.Contains(uniqueString.ToLowerInvariant()))
                {
                    return true;
                }

                uniqueList.Add(uniqueString.ToLowerInvariant());
            }

            return false;
        }

        private static HtmlHead BuildHtmlHeadControl(this XhtmlDocument xhtmlDocument, IXElementToControlMapper controlMapper)
        {
            HtmlHead headControl = new HtmlHead();

            xhtmlDocument.MergeToHeadControl(headControl, controlMapper);

            return headControl;
        }


        #region Private helper class
        private class NoMappingMapper : IXElementToControlMapper
        {
            private static NoMappingMapper _instance = new NoMappingMapper();

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
