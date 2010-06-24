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

public partial class Controls_evi : System.Web.UI.UserControl
{
    protected override void OnInit(EventArgs e)
    {
        lnkSearch.Text = "No";

        Page.Header.Title = "evi.ascx was here: " + DateTime.Now.ToLongTimeString();

        base.OnInit(e); 
    }


    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void lnkSearch_Click(object sender, EventArgs e)
    {
        lnkSearch.Text = "YES";
//        UpdatePanel1.Update();
                
    }
}
