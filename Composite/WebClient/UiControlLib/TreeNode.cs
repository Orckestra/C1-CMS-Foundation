using System;
using System.ComponentModel;
using System.Web.UI;
using System.Web.UI.WebControls;

using Composite.WebClient.UiControlLib.Foundation;
using Composite.ResourceSystem;

namespace Composite.WebClient.UiControlLib
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class TreeNode : LinkButton
    {
        [Category("Appearance"), DefaultValue(""), Description("Image to show as tree node bullet")]
        public virtual string ImageUrl { get; set; }

        public override void Focus()
        {
            this.Focused = true;
        }

        public virtual bool Focused { get; set; }

        protected override void Render(HtmlTextWriter writer)
        {
            writer.WriteBeginTag("ui:treenode");

            writer.WriteAttribute("label", StringResourceSystemFacade.ParseString(this.Text));

            writer.WriteAttribute("id", this.ClientID);

            // bool checksumAttrRequired = false;

            if(!Focused)
            {
                writer.WriteAttribute("callbackid", this.ClientID);
            }

            if (string.IsNullOrEmpty(this.ImageUrl) == false)
            {
                writer.WriteAttribute("image", this.ImageUrl);
            }

            if(this.Focused)
            {
                // checksumAttrRequired = true;
                writer.WriteAttribute("focused", "true");
            }

            //if(checksumAttrRequired)
            //{
            //    writer.WriteAttribute("checksum", DateTime.Now.Ticks.ToString());
            //}

            //if (this.Focused == true)
            //{
            //    writer.WriteAttribute("focused", "true");
            //    if (string.IsNullOrEmpty(this.OnClientClick) == false)
            //    {
            //        writer.WriteAttribute("onbindingfocus", this.OnClientClick);
            //    }
            //}
            //else
            //{
            //    string clientScripting = string.Format("this.dispatchAction(PageBinding.ACTION_DOPOSTBACK);{0}", this.OnClientClick);
            //    writer.WriteAttribute("onbindingfocus", clientScripting);
            //}

            this.WriteClientAttributes(writer);

            writer.Write( HtmlTextWriter.SelfClosingTagEnd );
        }
    }
}