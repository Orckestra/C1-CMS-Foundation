using System;
using Composite.Core.IO;
using Composite.Core.Configuration;
using System.IO;

public partial class Composite_Management_Top : System.Web.UI.Page
{
    const string gruntHolderFileUrl = "grunt.inc";
    const string welcomeHolderFileUrl = "welcome.inc";
    const string loginHolderFileUrl = "login.inc";

    protected void Page_PreInit(object sender, EventArgs e)
    {
        var isCSSCompiled = C1File.Exists(this.MapPath("styles/styles.min.css")) && C1File.Exists(this.MapPath("styles/styles.css"));
        if (!isCSSCompiled)
        {
            contentHolder.Text = C1File.ReadAllText(this.MapPath(gruntHolderFileUrl));
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
            contentHolder.Text = C1File.ReadAllText(MapPath(welcomeHolderFileUrl));
        }
        else
        {
            contentHolder.Text = C1File.ReadAllText(this.MapPath(loginHolderFileUrl));
        }
       
    }
}
