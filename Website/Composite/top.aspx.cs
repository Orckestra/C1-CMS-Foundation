using System;
using System.IO;
using Composite.Core.Configuration;



public partial class Composite_Management_Top : System.Web.UI.Page
{
    protected void Page_Init(object sender, EventArgs e)
    {
        var isCSSCompiled = File.Exists(Server.MapPath("~/Composite/styles/styles.min.css"));
        gruntholder.Visible = !isCSSCompiled;
        if (!isCSSCompiled)
        {
            return;
        }
        
        string myPathAndQuery = Request.Url.PathAndQuery;

        if (!myPathAndQuery.Contains("/Composite/"))
        {
            // not launching in /Composite/ folder (case sensitive)! The wysiwyg editor support code URL handling does case sensitive searches, so we fix it right here. Tnx to the sucky string features in xslt 1.0
            int badlyCaseIndex = myPathAndQuery.IndexOf("/composite/", StringComparison.OrdinalIgnoreCase);
            string fixedPathAndQuery = string.Format("{0}/Composite/{1}",
                                            myPathAndQuery.Substring(0, badlyCaseIndex),
                                            myPathAndQuery.Substring(badlyCaseIndex + 11));

            Response.Redirect(fixedPathAndQuery);
        }

        if (SystemSetupFacade.IsSystemFirstTimeInitialized == false)
        {
            if (System.Web.HttpContext.Current.Request.UserAgent == null)
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
