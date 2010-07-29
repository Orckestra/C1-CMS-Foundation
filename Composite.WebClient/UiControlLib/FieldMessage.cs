
using System;
using System.Web.UI;
using System.Web.UI.WebControls;

using System.Web;
using Composite.ResourceSystem;

namespace Composite.WebClient.UiControlLib
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class FieldMessage : Label
    {
        public FieldMessage(string targetName, string text)
        {
            this.TargetName = targetName;
            this.Text = text;
        }

        public virtual string TargetName { get; set; }

        protected override void Render(HtmlTextWriter writer)
        {
            writer.WriteBeginTag("ui:errorset");
            writer.WriteAttribute("timestamp", HttpUtility.HtmlAttributeEncode(DateTime.Now.Ticks.ToString()));
            writer.Write(HtmlTextWriter.TagRightChar);
            

            writer.WriteBeginTag("ui:error");

            writer.WriteAttribute("text", HttpUtility.HtmlAttributeEncode(StringResourceSystemFacade.ParseString(this.Text)));
            writer.WriteAttribute("targetname", HttpUtility.HtmlAttributeEncode(this.TargetName));

            writer.Write(HtmlTextWriter.SelfClosingTagEnd);

            writer.WriteEndTag("ui:errorset");
        }
    }
}