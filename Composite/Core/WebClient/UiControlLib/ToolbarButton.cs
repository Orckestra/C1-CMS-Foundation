using System.ComponentModel;
using System.Web.UI;
using System.Web.UI.WebControls;

using Composite.Core.WebClient.UiControlLib.Foundation;
using Composite.Core.ResourceSystem;

namespace Composite.Core.WebClient.UiControlLib
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class ToolbarButton : LinkButton
    {
        /// <exclude />
        [Category("Behavior"), DefaultValue(""), Description("The id as the UI client should see")]
        public virtual string CustomClientId { get; set; }

        /// <exclude />
        [Category("Appearance"), DefaultValue(""), Description("Image to show on the button")]
        public virtual string ImageUrl { get; set; }

        /// <exclude />
        [Category("Appearance"), DefaultValue(""), Description("Image to show on the button when it is disabled")]
        public virtual string ImageUrlWhenDisabled { get; set; }

        /// <exclude />
        [Category("Behavior"), DefaultValue(""), Description("ID of ui:broadcaster to observe")]
        public virtual string ObservesClientBroadcaster { get; set; }


        /// <exclude />
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