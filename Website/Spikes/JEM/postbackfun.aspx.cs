using System;
using System.Data;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;

/// <summary>
/// Summary description for postbackfun
/// </summary>
public partial class postbackfun : Composite.WebClient.XhtmlPage
{
    public void UpdaterButton_Click(object sender, EventArgs args)
    {

        this.fakedUpdatePanel_OFF.Visible = !this.fakedUpdatePanel_OFF.Visible;
        this.fakedUpdatePanel_ON.Visible = !this.fakedUpdatePanel_ON.Visible;
    }
}
