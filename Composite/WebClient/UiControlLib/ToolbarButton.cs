using System.ComponentModel;
using System.Web.UI;
using System.Web.UI.WebControls;

using Composite.WebClient.UiControlLib.Foundation;
using Composite.ResourceSystem;

namespace Composite.WebClient.UiControlLib
{
    public class ToolbarButton : LinkButton
    {
        [Category("Behavior"), DefaultValue(""), Description("The id as the ui client should see")]
        public virtual string CustomClientId { get; set; }

        [Category("Appearance"), DefaultValue(""), Description("Image to show in the buttom")]
        public virtual string ImageUrl { get; set; }

        [Category("Appearance"), DefaultValue(""), Description("Image to show in the buttom when the button is disabled")]
        public virtual string ImageUrlWhenDisabled { get; set; }

        [Category("Behavior"), DefaultValue(""), Description("ID of ui:broadcaster to observe")]
        public virtual string ObservesClientBroadcaster { get; set; }


        protected override void Render(HtmlTextWriter writer)
        {
            writer.WriteBeginTag("ui:toolbarbutton");

            writer.WriteAttribute("label", StringResourceSystemFacade.ParseString(this.Text));
            writer.WriteAttribute("callbackid", this.ClientID);
			
			/*
			 * PageBinding.ACTION_DOPOSTBACK emitted by default when callbackid is specified. 
			 * Note that this uncomment has disabled support for further clientside oncommand actions...
			 *
            string clientScripting = string.Format("this.dispatchAction(PageBinding.ACTION_DOPOSTBACK);{0}", this.OnClientClick);
            writer.WriteAttribute("oncommand", clientScripting);
            */

            if (string.IsNullOrEmpty(this.CustomClientId) == false)
            {
                writer.WriteAttribute("id", this.CustomClientId);
            }
            else
            {
                writer.WriteAttribute("id", this.ClientID);
            }

            if (string.IsNullOrEmpty(this.ObservesClientBroadcaster) == false)
            {
                writer.WriteAttribute("observes", this.ObservesClientBroadcaster);
            }
            if (string.IsNullOrEmpty(this.ImageUrl) == false)
            {
                writer.WriteAttribute("image", this.ImageUrl);
            }
            if (string.IsNullOrEmpty(this.ImageUrlWhenDisabled) == false)
            {
                writer.WriteAttribute("image-disabled", this.ImageUrlWhenDisabled);
            }
            if (this.Enabled == false)
            {
                writer.WriteAttribute("isdisabled", "true");
            }

            this.WriteClientAttributes(writer);

            writer.Write( HtmlTextWriter.SelfClosingTagEnd );
        }
    }
}