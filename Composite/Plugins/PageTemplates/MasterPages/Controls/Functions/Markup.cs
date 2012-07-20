using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Xml.Linq;

using Composite.Core.Localization;
using Composite.Core.WebClient.Renderings.Page;
using Composite.Core.Xml;

namespace Composite.Plugins.PageTemplates.MasterPages.Controls.Functions
{
    /// <exclude />
    [ParseChildren(false)]
    public class Markup : Control
    {
        /// <exclude />
        protected XElement InnerContent { get; set; }

        /// <exclude />
        public Markup() { }

        /// <exclude />
        public Markup(XElement content)
        {
            InnerContent = content;
        }

        /// <exclude />
        protected override void OnInit(EventArgs e)
        {
            EnsureChildControls();

            base.OnInit(e);
        }

        /// <exclude />
        protected override void CreateChildControls()
        {
            if (InnerContent == null)
            {
                ProcessInternalControls();
            }

            if (InnerContent != null)
            {
                var functionContextContainer = PageRenderer.GetPageRenderFunctionContextContainer();
                var controlMapper = (IXElementToControlMapper) functionContextContainer.XEmbedableMapper;

                PageRenderer.ExecuteEmbeddedFunctions(InnerContent, functionContextContainer);

                var xhmlDocument = new XhtmlDocument(InnerContent);

                PageRenderer.NormalizeXhtmlDocument(xhmlDocument);
                PageRenderer.ResolveRelativePaths(xhmlDocument);

                NormalizeAspNetForms(xhmlDocument);

                AddNodesAsControls(xhmlDocument.Body.Nodes(), this, controlMapper);

                var headElement = xhmlDocument.Head;
                if (headElement != null && Page.Header != null)
                {
                    AddNodesAsControls(headElement.Nodes(), Page.Header, controlMapper);
                }

            }

            base.CreateChildControls();
        }

        
        private void NormalizeAspNetForms(XhtmlDocument xhtmlDocument)
        {
            // If current control is inside <form id="" runat="server"> tag all <asp:forms> tags will be removed from placeholder

            bool isInsideAspNetForm = false;

            var ansestor = this.Parent;
            while (ansestor != null)
            {
                if (ansestor is HtmlForm)
                {
                    isInsideAspNetForm = true;
                    break;
                }

                ansestor = ansestor.Parent;
            }

            if (!isInsideAspNetForm)
            {
                return;
            }

            List<XElement> aspNetFormElements = xhtmlDocument.Descendants(Namespaces.AspNetControls + "form").Reverse().ToList();

            foreach (XElement aspNetFormElement in aspNetFormElements)
            {
                aspNetFormElement.ReplaceWith(aspNetFormElement.Nodes());
            }
        }

        private void ProcessInternalControls()
        {
            string str = null;

            if (Controls.Count > 0)
            {
                var content = Controls[0] as LiteralControl;
                if (content != null)
                {
                    str = content.Text;
                }
            }

            if (!String.IsNullOrEmpty(str))
            {
                Controls.Clear();

                InnerContent = new XElement(Namespaces.Xhtml + "html",
                    new XAttribute(XNamespace.Xmlns + "f", Namespaces.Function10),
                    new XAttribute(XNamespace.Xmlns + "lang", LocalizationXmlConstants.XmlNamespace),
                        new XElement(Namespaces.Xhtml + "head"),
                        new XElement(Namespaces.Xhtml + "body", XElement.Parse(str)));
            }
        }

        private static void AddNodesAsControls(IEnumerable<XNode> nodes, Control parent, IXElementToControlMapper mapper)
        {
            foreach (var node in nodes)
            {
                var c = node.AsAspNetControl(mapper);
                parent.Controls.Add(c);
            }
        }
    }
}
