using System;
using System.ComponentModel;
using System.Web.UI;
using System.Web.UI.WebControls;

using Composite.Core.WebClient.UiControlLib.Foundation;
using Composite.Core.ResourceSystem;

namespace Composite.Core.WebClient.UiControlLib
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class TreeNode : LinkButton
    {
        /// <exclude />
        [Category("Appearance"), DefaultValue(""), Description("Image to show as tree node bullet")]
        public virtual string ImageUrl
        {
            get { return ViewState["imageUrl"] as string; }
            set { ViewState["imageUrl"] = value; }
        }


        /// <exclude />
        public override void Focus()
        {
            this.Focused = true;
        }


        /// <exclude />
        public virtual bool Focused { get; set; }


        /// <exclude />
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

            if (!string.IsNullOrEmpty(this.ImageUrl))
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

            //if (this.Focused)
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