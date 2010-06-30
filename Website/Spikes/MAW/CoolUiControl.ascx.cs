using System;
using System.Collections;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;
using Composite.StandardPlugins.Forms.WebChannel.UiControlFactories;
using Composite.Forms;

public partial class Spikes_MAW_CoolUiControl : UserControlBasedUiControl
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    public override void InitializeViewState()
    {
        this.Text.Text = this.Value;
        this.CaptionLabel.Text = this.Caption;
    }

    public override void BindStateToControlProperties()
    {
        this.Value = this.Text.Text;
    }

   // [BindableProperty()]
   // [FormsProperty()]
    public string Value { get; set; }

   // [FormsProperty()]
    public string Caption { get; set; }
    
}
