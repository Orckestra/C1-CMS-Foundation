using System;
using Composite.Core.Configuration;



public partial class Composite_Management_Top : System.Web.UI.Page
{
    protected void Page_Init(object sender, EventArgs e)
    {
        if (SystemSetupFacade.IsSystemFirstTimeInitialized == false)
        {
            if(System.Web.HttpContext.Current.Request.UserAgent == null)
            {
                Response.Redirect("unknownbrowser.aspx");
                return;
            }

            introholder.Visible = true;
            splashholder.Visible = false;
        }
        else
        {
            introholder.Visible = false;
            splashholder.Visible = true;
        }
    }
}
