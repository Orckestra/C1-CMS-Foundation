using System;
using System.Data;
using System.Configuration;
using System.Collections;
using System.Collections.Generic;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;

public partial class HttpHeadersControl : System.Web.UI.UserControl
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Request.UserAgent != null && Request.UserAgent.IndexOf("Gecko") > -1)
        {
            Response.ContentType = "application/xhtml+xml";
        }
        
		// Force NET mumbojumbo scripts to appear - needed for UpdateManager.js
		this.Page.ClientScript.GetPostBackEventReference ( this, string.Empty );
    }
    
	protected override void Render(HtmlTextWriter writer)
    {
    	// Make hidden field "__EVENTVALIDATION" appear - needed for UpdateManager.js
		this.Page.ClientScript.RegisterForEventValidation ( "TemporaryIdForEventValidation" );
		base.Render (writer);
    }
}
