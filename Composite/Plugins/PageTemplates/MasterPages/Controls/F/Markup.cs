using System;
using System.Collections.Generic;
using System.Web.UI;
using System.Xml.Linq;

using Composite.Core.Localization;
using Composite.Core.WebClient.Renderings.Page;
using Composite.Core.Xml;

namespace Composite.Plugins.PageTemplates.MasterPages.Controls.F
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

                AddNodesAsControls(xhmlDocument.Body.Nodes(), this, controlMapper);

                var headElement = xhmlDocument.Head;
                if (headElement != null && Page.Header != null)
                {
                    AddNodesAsControls(headElement.Nodes(), Page.Header, controlMapper);
                }

            }

            base.CreateChildControls();
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
