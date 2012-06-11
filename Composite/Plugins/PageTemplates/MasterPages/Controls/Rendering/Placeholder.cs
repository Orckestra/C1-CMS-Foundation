using System;
using System.Linq;
using System.Xml.Linq;

using Composite.Core.Localization;
using Composite.Core.Xml;
using Composite.Plugins.PageTemplates.MasterPages.Controls.F;

namespace Composite.Plugins.PageTemplates.MasterPages.Controls.Rendering
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class Placeholder : Markup
    {
        private string _placeholderId;

        /// <exclude />
        public string PlaceholderID
        {
            get { return _placeholderId;  }
            set { _placeholderId = value;  } 
        }

        /// <exclude />
        public string Title { get; set; }

        /// <exclude />
        public bool Default { get; set; }

        /// <exclude />
        public bool HasBody
        {
            get
            {
                EnsureChildControls();

                if (Content == null)
                {
                    return false;
                }

                var body = new XhtmlDocument(Content).Body;

                return body != null && body.Nodes().Any();
            }
        }

        /// <exclude />
        public XhtmlDocument Content
        {
            get { return InnerContent == null ? null : new XhtmlDocument(base.InnerContent); }
            set { InnerContent = value != null ? value.Root : null; }
        }

        /// <exclude />
        protected override void CreateChildControls()
        {
            DataBind();

            if (InnerContent == null)
            {
                var renderingInfo = MasterPagePageRenderer.GetRenderingInfo(this.Page);

                string placeholderId = PlaceholderID ?? ID;

                if (placeholderId != null)
                {
                    var content = renderingInfo.Contents.SingleOrDefault(c => c.PlaceHolderId == placeholderId);
                    if (content == null)
                    {
                        InnerContent = new XElement(Namespaces.Xhtml + "html",
                                new XAttribute(XNamespace.Xmlns + "f", Namespaces.Function10),
                                new XAttribute(XNamespace.Xmlns + "lang", LocalizationXmlConstants.XmlNamespace),
                                    new XElement(Namespaces.Xhtml + "head"),
                                    new XElement(Namespaces.Xhtml + "body"));
                    }
                    else
                    {
                        if (content.Content.StartsWith("<html"))
                        {
                            try
                            {
                                InnerContent = XhtmlDocument.Parse(content.Content).Root;
                            }
                            catch (ArgumentException) { }
                        }
                        else
                        {
                            InnerContent = new XElement(Namespaces.Xhtml + "html",
                               new XAttribute(XNamespace.Xmlns + "f", Namespaces.Function10),
                                   new XElement(Namespaces.Xhtml + "head"),
                                   new XElement(Namespaces.Xhtml + "body", XElement.Parse(content.Content)));
                        }
                    }
                }
            }

            base.CreateChildControls();
        }
    }
}
