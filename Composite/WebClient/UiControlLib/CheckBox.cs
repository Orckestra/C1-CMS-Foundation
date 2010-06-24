
using System.ComponentModel;
using System.Web.UI;
using System.Web.UI.WebControls;

using Composite.WebClient.UiControlLib.Foundation;
using System;
using Composite.ResourceSystem;


namespace Composite.WebClient.UiControlLib
{
    public class CheckBox : System.Web.UI.WebControls.CheckBox
    {
        public string ItemLabel { get; set; }



        protected override void Render(HtmlTextWriter writer)
        {
            writer.WriteBeginTag("ui:checkbox");

            writer.WriteAttribute("label", StringResourceSystemFacade.ParseString((this.ItemLabel ?? "")));

            if (string.IsNullOrEmpty(this.ToolTip) == false)
            {
                writer.WriteAttribute("title", StringResourceSystemFacade.ParseString((this.ToolTip ?? "")));
            }

            writer.WriteAttribute("name", this.UniqueID);

            if (this.AutoPostBack == true)
            {
                throw new NotImplementedException("The CheckBox AutoPostBack feature is volatile. Event is not raised in certain circumstances");
            }

            writer.WriteAttribute("ischecked", this.Checked.ToString().ToLower());

            this.WriteClientAttributes(writer);

            writer.Write(HtmlTextWriter.SelfClosingTagEnd);
        }



    }
}