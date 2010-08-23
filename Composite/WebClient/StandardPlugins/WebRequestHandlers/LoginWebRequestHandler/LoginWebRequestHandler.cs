using System;
using System.Web;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;

using Composite.Extensions;
using Composite.GlobalSettings;
using Composite.ResourceSystem;
using Composite.Security;
using Composite.WebClient.Plugins.WebRequestHandler;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.StandardPlugins.WebClient.WebRequestHandlers.LoginWebRequestHandler
{
    [ConfigurationElementType(typeof(LoginHandlerData))]
    internal class LoginWebRequestHandler : WebRequestHandler
    {
        static LoginWebRequestHandler()
        {
            //TODO: Fix CultureInfo
            //if (null == LoginHandlerResources.Culture) LoginHandlerResources.Culture = Composite.Management.OLD.GlobalizationService.CultureInfoProxy;
        }

        public LoginWebRequestHandler()
        {
            this.Init += new System.EventHandler(LoginHandler_Init);
        }

        void LoginHandler_Init(object sender, System.EventArgs e)
        {
            UserValidationFacade.ValidationType validationType = UserValidationFacade.ValidationType.None;

            validationType = UserValidationFacade.GetValidationType();

            switch (validationType)
            {
                case UserValidationFacade.ValidationType.Form:
                    HandleFormAuthentication();
                    break;
                case UserValidationFacade.ValidationType.Windows:
                    HandleWindowsAuthentication();
                    break;
                case UserValidationFacade.ValidationType.None:
                    throw new ApplicationException("This site is not configured to use a authentication mechanism");
                default:
                    throw new ApplicationException("This site is configured to use a authentication mechanism unknown to this plug-in");
            }
        }

        private void HandleFormAuthentication()
        {
            RenderLoginForm();
        }

        private void RenderLoginForm()
        {
            LoginForm lf = new LoginForm();
            this.Controls.Add(lf);
        }

        private void HandleWindowsAuthentication()
        {
            if (String.IsNullOrEmpty(Request.ServerVariables["LOGON_USER"]))
            {
                string problemDescription = StringResourceSystemFacade.GetString("Composite.Management", "LoginWebRequestHandler.WrongUserNameOrPassword");
                this.Controls.Add(new LiteralControl(problemDescription));

                SendHttpStatus401();
            }
            else
            {
                string windowsAuthenticatedFullName = Request.ServerVariables["LOGON_USER"];

                string userName = null;
                string domainName = null;

                Utilities.ParseUserLoginString(windowsAuthenticatedFullName, out userName, out domainName);


                if (true == UserValidationFacade.WindowsValidateUser(userName, domainName))
                {
                    RedirectAuthenticatedUserToRequestedPage();
                }
                else
                {
                    string problemDescription = String.Format(StringResourceSystemFacade.GetString("Composite.Management", "LoginWebRequestHandler.UserNameNotRegistered"), domainName, userName);
                    this.Controls.Add(new LiteralControl(problemDescription));
                    Button retryLoginButton = new Button();
                    retryLoginButton.Text = StringResourceSystemFacade.GetString("Composite.Management", "LoginWebRequestHandler.LogInAsOtherUser");
                    retryLoginButton.Click += new EventHandler(retryLoginButton_Click);
                    this.Controls.Add(retryLoginButton);
                    this.RetryLoginButtonEnabled = true;
                }

            }
        }

        private void RedirectAuthenticatedUserToRequestedPage()
        {
            string returnUrl = this.Page.Request["ReturnUrl"];
            if (string.IsNullOrEmpty(returnUrl))
            {
                returnUrl = "~";
            }
            this.Page.Response.Redirect(returnUrl);
        }

        private bool RetryLoginButtonEnabled
        {
            get
            {
                return bool.Parse(this.Response.Cookies["RetryLoginButtonEnabled"].Value);
            }
            set
            {
                this.Response.Cookies.Add(new HttpCookie("RetryLoginButtonEnabled", value.ToString()));
            }
        }

        void retryLoginButton_Click(object sender, EventArgs e)
        {
            if (this.RetryLoginButtonEnabled)
            {
                SendHttpStatus401();
                this.RetryLoginButtonEnabled = false;
            }
        }



        private void SendHttpStatus401()
        {
            Context.Items["SendHttpStatus401"] = true; // Should be catched in global.asax Application_EndRequest() and converted into a Http Status 401
        }

        private HttpRequest Request
        {
            get
            {
                return this.Page.Request;
            }
        }

        private HttpResponse Response
        {
            get
            {
                return this.Page.Response;
            }
        }
    }

    internal sealed class LoginForm : Control
    {
        private TextBox userNameTextBox;
        private TextBox passwordTextBox;
        private Button loginButton;

        protected override void OnInit(EventArgs e)
        {
            base.OnInit(e);

            this.Page.Header.Title = GlobalSettingsFacade.ApplicationName;

            this.Controls.Add(GetLoginBox());
        }

        private HtmlImage _image;
        private Panel _msgPlaceholder;

        private Control GetLoginBox()
        {
            string appName = GlobalSettingsFacade.ApplicationName;

            userNameTextBox = new TextBox();
            userNameTextBox.ID = "user_Name";
            userNameTextBox.Style.Add(HtmlTextWriterStyle.Width, "12em");
            userNameTextBox.Style.Add(HtmlTextWriterStyle.BackgroundColor, "white");
            userNameTextBox.Style.Add("border", "1px solid #C5C5C5");

            passwordTextBox = new TextBox();
            passwordTextBox.ID = "pass_word";
            passwordTextBox.Style.Add(HtmlTextWriterStyle.Width, "12em");
            passwordTextBox.Style.Add(HtmlTextWriterStyle.BackgroundColor, "white");
            passwordTextBox.Style.Add("border", "1px solid #C5C5C5");

            passwordTextBox.TextMode = TextBoxMode.Password;

            loginButton = new Button();
            loginButton.Text = String.Format(" {0} ", GetText("Login"));

            loginButton.Click += new EventHandler(loginButton_Click);

            string headerImgUrl = PathUtils.GetResourceUrl(@"AllUsersAllowedFiles\Arrow.png");

            string headerImgTag = "<img src='" + headerImgUrl + "' style='position: relative; top: 5px; left: -5px;'/>";
            LiteralControl header = new LiteralControl(String.Format("<h1>{0} {1}</h1>", headerImgTag, GetText("Header").FormatWith(appName)));

            _image = new HtmlImage();
            _image.Src = PathUtils.GetResourceUrl("AllUsersAllowedFiles\\IconLock.png");
            _image.Style.Add("float", "right");
            _image.Style.Add(HtmlTextWriterStyle.Margin, "0 1em 0 1em");

            HtmlTable table = new HtmlTable();

            AddRow(table, GetText("Username"), userNameTextBox);
            AddRow(table, GetText("Password"), passwordTextBox);
            AddRow(table, "", loginButton);

            _msgPlaceholder = new Panel();
            _msgPlaceholder.Style.Add(HtmlTextWriterStyle.Height, "1.5em");
            _msgPlaceholder.Style.Add(HtmlTextWriterStyle.MarginTop, "0.8em");

            Panel p = new Panel();

            p.Controls.Add(_image);
            p.Controls.Add(header);
            p.Controls.Add(table);
            p.Controls.Add(_msgPlaceholder);

            //            HtmlForm form = new HtmlForm();

            //            form.Controls.Add( p );

            return p;
        }

        private void AddRow(HtmlTable table, string labelText, Control control)
        {

            HtmlTableRow row = new HtmlTableRow();
            HtmlTableCell cellA = new HtmlTableCell();
            HtmlTableCell cellB = new HtmlTableCell();

            if (string.IsNullOrEmpty(labelText) == false)
            {
                Label label = new Label();
                label.AssociatedControlID = control.ID;
                label.Text = labelText + ":";

                cellA.Controls.Add(label);
                cellA.Style.Add("padding-right", "0.3em");
            }
            else
            {
                cellB.Align = "right";
                cellB.Style.Add("padding-top", "1em");
            }
            cellB.Controls.Add(control);

            row.Cells.Add(cellA);
            row.Cells.Add(cellB);

            table.Rows.Add(row);
        }

        void loginButton_Click(object sender, EventArgs e)
        {
            if (string.IsNullOrEmpty(userNameTextBox.Text) == false && String.IsNullOrEmpty(passwordTextBox.Text) == false)
            {
                if (UserValidationFacade.FormValidateUser(userNameTextBox.Text, passwordTextBox.Text) == true)
                {
                    RedirectAuthenticatedUserToRequestedPage();
                }
                else
                {
                    _image.Src = PathUtils.GetResourceUrl("AllUsersAllowedFiles\\IconExclamation.png");
                    _image.Alt = "Logged " + Page.Request.UserHostName;
                    string failAlert = String.Format("<strong>{0}</strong>", GetText("LoginFailed"));

                    _msgPlaceholder.Controls.Add(new LiteralControl(failAlert));
                }
            }
        }

        private void RedirectAuthenticatedUserToRequestedPage()
        {
            string returnUrl = this.Page.Request["ReturnUrl"];
            if (string.IsNullOrEmpty(returnUrl))
            {
                returnUrl = "~";
            }
            this.Page.Response.Redirect(returnUrl);
        }

        private static string GetText(string key)
        {
            return StringResourceSystemFacade.GetString("Composite.Management", "LoginWebRequestHandler." + key);
        }
    }



    [Assembler(typeof(NonConfigurableWebRequestHandlerAssembler))]
    internal class LoginHandlerData : WebRequestHandlerData
    {
    }
}
