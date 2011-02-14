using System;
using System.Web.UI;
using Composite.Core.Extensions;
using Composite.Core.WebClient.UiControlLib.Foundation;

namespace Composite.Core.WebClient.UiControlLib
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class TextArea : BaseControl
    {
        /// <exclude />
        public TextArea(string tagName): base("ui:textbox")
        {
            // TODO: refactor
        }

        /// <exclude />
        protected override void OnInit(EventArgs e)
        {
            base.OnInit(e);

            // Loading postback data
            if (Page.IsPostBack)
            {
                Text = this.Page.Request.Form[ClientID];
            }
        }

        /// <exclude />
        protected override void RenderChildren(HtmlTextWriter writer)
        {
            writer.WriteBeginTag("textarea");
            writer.Write((char)'>');

            if(!Text.IsNullOrEmpty())
            {
                writer.WriteEncodedText(Text);
            }
            writer.WriteEndTag("textarea");
        }

        /// <exclude />
        protected override void RenderAttributes(HtmlTextWriter writer)
        {
            Attributes["name"] = ClientID;

            base.RenderAttributes(writer);
        }

        /// <exclude />
        public string Text
        {
            get; set;
        }
    }
}
