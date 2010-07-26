using System.Web.UI;

namespace Composite.StandardPlugins.Forms.WebChannel.UiControlFactories.Base
{
    public abstract class UserControlBase : UserControl
    {
        protected abstract void BindStateToProperties();

        protected abstract void InitializeViewState();

        public abstract string GetDataFieldClientName();

        internal void BindStateToControlProperties()
        {
            this.BindStateToProperties();
        }

        internal void InitializeWebViewState()
        {
            this.InitializeViewState();
        }

        public string FormControlLabel { get; set; }
    }
}
