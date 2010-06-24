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
public partial class dmitryfun : Composite.WebClient.XhtmlPage
{

	private void Page_Load(object sender, EventArgs args)
	{
		/*
		 * This will force the NET mumbojumbo to appear in  
		 * the output: __doPostback and related hidden fields.
		 */
		this.GetPostBackEventReference ( this, string.Empty );
	}

    public void UpdaterButton_Click(object sender, EventArgs args)
    {
		Response.Cache.SetNoStore();
        this.fakedUpdatePanel_OFF.Visible = !this.fakedUpdatePanel_OFF.Visible;
        this.fakedUpdatePanel_ON.Visible = !this.fakedUpdatePanel_ON.Visible;
    }
}
