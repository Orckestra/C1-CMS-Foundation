using System;
using System.Web;
using Composite;
using Composite.Core.Configuration;
using Composite.Core.WebClient;

/**
 * Simply store developermode on session. 
 */
public partial class AppInitializerControl : System.Web.UI.UserControl
{
    protected void Page_Init(object sender, EventArgs e)
    {

        /*
         * Set the browsing mode cookie.
         */
        string mode = Request.QueryString["mode"];

        if (String.IsNullOrEmpty(mode))
        {
            CookieHandler.Set("mode", "operate");
        }
        else
        {
            CookieHandler.Set("mode", mode == "develop" ? "develop" : "operate");
        }

        /*
         * Set the version cookie. If version doesn't match 
         * last session version, redirect to upgraded page.
         */
        string nowversion = Composite.RuntimeInformation.ProductVersion.ToString();

        bool isUpdated = false;
        if (CookieHandler.Get("CompositeVersionString") != null)
        {
            string oldversion = CookieHandler.Get("CompositeVersionString");
            if (nowversion != oldversion)
            {
                var installationAge = DateTime.Now - SystemSetupFacade.GetFirstTimeStart();
                isUpdated = installationAge.TotalMinutes > 5;
            }
        }

        CookieHandler.Set("CompositeVersionString", nowversion, DateTime.Now.AddDays(28));

        if (!RuntimeInformation.IsDebugBuild && isUpdated)
        {
            string url = "updated.aspx";
            if (CookieHandler.Get("mode") == "develop")
            {
                url += "?mode=develop";	// TODO: copy entire querystring (no intellisense here)!
            }
            Response.Redirect(url);
        }
    }
}