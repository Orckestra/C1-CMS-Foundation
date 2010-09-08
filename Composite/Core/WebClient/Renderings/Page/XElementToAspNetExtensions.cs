using System.Web.UI.HtmlControls;
using System.Xml.Linq;
using System.Web.UI;
using System.Linq;
using System;
using Composite.Core.Xml;
using System.Web.UI.WebControls;
using System.Collections.Generic;
using Composite.Core.Instrumentation;
using System.Web;



namespace Composite.Core.WebClient.Renderings.Page
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class XElementToAspNetExtensions
    {
        public static Control AsAspNetControl(this XhtmlDocument xhtmlDocument)
        {
            return xhtmlDocument.AsAspNetControl(NoMappingMapper.GetInstance());
        }



        public static Control AsAspNetControl(this XhtmlDocument xhtmlDocument, IXElementToControlMapper controlMapper)
        {
            using (TimerProfiler timerProfiler = TimerProfilerFacade.CreateTimerProfiler())
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
                    if (docType.Contains("[]") == true)
                    {
                        docType = docType.Remove(docType.IndexOf("[]"), 2);
                    }

                    pageHolder.Controls.Add(new LiteralControl(docType));
                }
                pageHolder.Controls.Add(htmlControl);

                return pageHolder;
            }
        }



        public static Control AsAspNetControl(this XNode xnode)
        {
            return xnode.AsAspNetControl(NoMappingMapper.GetInstance());
        }



        public static Control AsAspNetControl(this XNode xnode, IXElementToControlMapper controlMapper)
        {
            if (xnode is XElement) return ((XElement)xnode).AsAspNetControl(controlMapper);
            if (xnode is XDocument) return ((XDocument)xnode).Root.AsAspNetControl(controlMapper);

            if (xnode is XText) return new LiteralControl(((XText)xnode).Value);
            if (xnode is XComment) return new LiteralControl(string.Format("<!--{0}-->", ((XComment)xnode).Value));

            throw new NotImplementedException(string.Format("Type '{0}' not handled", xnode.GetType().Name));
        }



        public static Control AsAspNetControl(this XElement element)
        {
            return element.AsAspNetControl(NoMappingMapper.GetInstance());
        }



        public static Control AsAspNetControl(this XElement element, IXElementToControlMapper controlMapper)
        {
            Control control;

            if (controlMapper.TryGetControlFromXElement(element, out control) == false)
            {
                if (IsEncapsulationElement(element) == true)
                {
                    control = new HtmlGenericControl(element.Name.LocalName);
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
            XElement copy;

            if (source.Name.Namespace == namespaceToRemove)
            {
                copy = new XElement(source.Name.LocalName);
            }
            else
            {
                copy = new XElement(source.Name);
            }

            var attributesCleaned = source.Attributes().Where(f => f.Name.Namespace == namespaceToRemove).Select(f => new XAttribute(f.Name.LocalName, f.Value));
            var attributesRaw = source.Attributes().Where(f => f.Name.Namespace != namespaceToRemove && f.Name.LocalName != "xmlns");

            copy.Add(attributesCleaned);
            copy.Add(attributesRaw);

            foreach (XElement child in source.Elements())
            {
                copy.Add(CopyWithoutNamespace(child, namespaceToRemove));
            }

            return copy;
        }


        private static bool IsEncapsulationElement(XElement element)
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
                    case "link":
                    case "meta":
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
                }
                else
                {
                    if (childNode is XText)
                    {
                        LiteralControl literal = new LiteralControl(childNode.ToString());
                        containerControl.Controls.Add(literal);
                    }
                    else
                    {
                        if (childNode is XComment)
                        {
                            containerControl.Controls.Add(new LiteralControl(childNode.ToString() + "\n"));
                        }
                        else
                        {
                            throw new NotImplementedException(string.Format("Unhandled XNode type '{0}'", childNode.GetType()));
                        }
                    }
                }
            }
        }



        public static void CopyAttributes(this XElement source, HtmlControl target)
        {
            foreach (var attribute in source.Attributes())
            {
                if (attribute.Name.LocalName == "id")
                {
                    target.ID = attribute.Value;
                }
                else
                {
                    if (attribute.Name.Namespace == Namespaces.XmlNs)
                    {
                        if (attribute.Value.StartsWith("http://www.composite.net/ns") == false)
                        {
                            target.Attributes.Add(string.Format("xmlns:{0}", attribute.Name.LocalName), attribute.Value);
                        }
                    }
                    else
                    {
                        if (attribute.Name.LocalName != "xmlns" || (source.Parent == null || source.Name.Namespace != source.Parent.Name.Namespace))
                        {
                            target.Attributes.Add(attribute.Name.LocalName, attribute.Value);
                        }
                    }
                }
            }
        }



        private static HtmlHead BuildHtmlHeadControl(this XhtmlDocument xhtmlDocument, IXElementToControlMapper controlMapper)
        {
            XElement headSource = xhtmlDocument.Head;

            HtmlHead headControl = new HtmlHead();
            CopyAttributes(headSource, headControl);

            XElement titleElement = headSource.Elements(Namespaces.Xhtml + "title").LastOrDefault();
            if (titleElement != null)
            {
                // NOTE: we aren't using headControl.Title property since it adds "<title>" tag as the last one
                headControl.Controls.Add(new HtmlTitle { Text = HttpUtility.HtmlEncode(titleElement.Value) });
            }

            ExportChildNodes(headSource.Nodes().Where(f => ((f is XElement) == false || ((XElement)f).Name != Namespaces.Xhtml + "title")), headControl, controlMapper);

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
