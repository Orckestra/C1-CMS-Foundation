using System;
using System.Data;
using System.Configuration;
using System.Collections;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using System.Xml.Linq;

public partial class CompositeMarkupInOutView : System.Web.UI.UserControl
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (string.IsNullOrEmpty(this.Attributes["in"]) == false)
        {
            this.inMarkupHolder.Text = this.Attributes["in"];
        }
        else
        {
            this.InputRelated01.Visible = false;
            this.InputRelated02.Visible = false;
            this.inMarkupHolder.Visible = false;
            this.outMarkupHolder.Height = 400;
        }

        this.outMarkupHolder.Text = this.Attributes["out"];

        if (string.IsNullOrEmpty(this.Attributes["error"]) == false)
        {
            string error = this.Attributes["error"];

            string errorType = error.Substring(0, error.IndexOf('\n'));
            string errorDescription = error.Substring(error.IndexOf('\n')+1);

            this.ErrorTypeLabel.Text = HttpUtility.HtmlEncode( errorType );
            this.ErrorDescriptionLabel.Text = HttpUtility.HtmlEncode( errorDescription );

            this.ErrorDetailsPlaceHolder.Visible = true;
            this.OutputSourceViewerPlaceHolder.Visible = false;
        }
    }
}
