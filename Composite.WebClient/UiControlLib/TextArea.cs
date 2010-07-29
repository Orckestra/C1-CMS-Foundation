using System;
using System.Web.UI;
using Composite.Extensions;
using Composite.WebClient.UiControlLib.Foundation;

namespace Composite.WebClient.UiControlLib
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class TextArea : BaseControl
    {
        public TextArea(string tagName): base("ui:textbox")
        {
            // TODO: refactor
        }

        protected override void OnInit(EventArgs e)
        {
            base.OnInit(e);

            // Loading postback data
            if (Page.IsPostBack)
            {
                Text = this.Page.Request.Form[ClientID];
            }
        }

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

        protected override void RenderAttributes(HtmlTextWriter writer)
        {
            Attributes["name"] = ClientID;

            base.RenderAttributes(writer);
        }

        public string Text
        {
            get; set;
        }
    }
}
