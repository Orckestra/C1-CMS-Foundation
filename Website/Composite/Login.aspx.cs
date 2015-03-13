using System;
using System.Web.Hosting;
using Composite.C1Console.Security;
using Composite.Core.Configuration;

public partial class Composite_Management_Login : System.Web.UI.Page
{
    protected void Page_Init(object sender, EventArgs e)
    {
        if (!SystemSetupFacade.IsSystemFirstTimeInitialized)
        {
            Response.Redirect("/Composite");
            return;
        }

        if (UserValidationFacade.IsLoggedIn())
        {
            RedirectToReturnUrl();
            return;
        }

        if (Request.RequestType == "POST")
        {
            OnPost();
        }
    }

    private void RedirectToReturnUrl()
    {
        var returnUrl = Request.QueryString["ReturnUrl"];

        try
        {
            Uri uri = new Uri(returnUrl);
            if (uri.Host != Request.Url.Host)
            {
                returnUrl = null; // prevent "Arbitrary Redirection" attacks
            }
        }
        catch (Exception) { }

        if (!string.IsNullOrEmpty(returnUrl))
        {
            Response.Redirect(returnUrl, false);
            return;
        }

        Response.Redirect(HostingEnvironment.ApplicationVirtualPath, false);
    }

    private void OnPost()
    {
        bool isValid = true;

        string username = Request.Form["txtUsername"];
        string password = Request.Form["txtPassword"];

        if (string.IsNullOrEmpty(username))
        {
            isValid = false;
            txtUsername.Attributes["class"] = "error";
        }

        if (string.IsNullOrEmpty(password))
        {
            isValid = false;
            txtPassword.Attributes["class"] = "error";
        }

        txtUsername.Attributes.Add("value", username);

        if(isValid)
        {
            if(UserValidationFacade.FormValidateUser(username, password) == LoginResult.Success)
            {
                RedirectToReturnUrl();
                return;
            }

            divLoginFailed.Visible = true;
        }
    }
}
