using System;
using System.Web.UI;
using Composite.Core.ResourceSystem;
using Composite.Core.WebClient.UiControlLib.Foundation;



namespace Composite.Core.WebClient.UiControlLib
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class CheckBox : System.Web.UI.WebControls.CheckBox
    {
        /// <exclude />
        public string ItemLabel
        {
            get { return (string) ViewState[nameof(ItemLabel)]; }
            set { ViewState[nameof(ItemLabel)] = value; }
        }



        /// <exclude />
        protected override void Render(HtmlTextWriter writer)
        {
            writer.WriteBeginTag("ui:checkbox");

            writer.WriteAttribute("label", StringResourceSystemFacade.ParseString(this.ItemLabel ?? ""));

            if (!string.IsNullOrEmpty(this.ToolTip))
            {
                writer.WriteAttribute("title", StringResourceSystemFacade.ParseString(this.ToolTip ?? ""));
            }

            writer.WriteAttribute("name", this.UniqueID);

            if (this.AutoPostBack)
            {
                writer.WriteAttribute("callbackid", this.ClientID);
                writer.WriteAttribute("oncommand", "this.dispatchAction(PageBinding.ACTIONEVENT_DOPOSTBACK);");
            }

            writer.WriteAttribute("ischecked", this.Checked.ToString().ToLower());

            this.WriteClientAttributes(writer);

            writer.Write(HtmlTextWriter.SelfClosingTagEnd);
        }
    }
}