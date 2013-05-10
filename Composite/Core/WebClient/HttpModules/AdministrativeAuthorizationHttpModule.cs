using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Hosting;
using System.Xml.Linq;
using Composite.C1Console.Security;
using Composite.Core.IO;
using Composite.Core.Logging;
using Composite.Core.Xml;
using System.IO;


namespace Composite.Core.WebClient.HttpModules
{
    /// <summary>
    ///  Http Module that ensures that only authenticated users can access /Composite/* files not explicitly allowed to everyone.
    ///  Also ensure that HTTPS rules are enforced.
    /// </summary>
    internal class AdministrativeAuthorizationHttpModule : IHttpModule
    {
        private static List<string> _allAllowedPaths = new List<string>();
        private static string _adminRootPath;
        private static string _loginPagePath;
        private static object _lock = new object();
        private static bool _allowC1ConsoleRequests = false;
        private static bool _forceHttps = true;
        private static bool _allowFallbackToHttp = true;
        private static Nullable<int> _customHttpsPortNumber = null;

        private const string webauthorizationRelativeConfigPath = "~/Composite/webauthorization.config";
        private const string c1ConsoleAccessRelativeConfigPath = "~/App_Data/Composite/Configuration/C1ConsoleAccess.xml";
        private const string unsecureRedirectRelativePath = "~/Composite/unsecure.aspx";
        private const string loginPagePathAttributeName = "loginPagePath";
        private const string allowElementName = "allow";
        private const string allow_pathAttributeName = "path";

        static AdministrativeAuthorizationHttpModule()
        {
            if (C1Directory.Exists(HostingEnvironment.MapPath(UrlUtils.AdminRootPath)))
            {
                LoadConfiguration();
            }
            else
            {
                _allowC1ConsoleRequests = false;
            }
        }


        
        public void Dispose()
        {
        }



        public void Init(HttpApplication context)
        {
            context.AuthenticateRequest += new EventHandler(context_AuthenticateRequest);
        }



        private bool AlwaysAllowUnsecured(string requestPath)
        {
            string fileName = Path.GetFileName(requestPath);
            return fileName.StartsWith("unsecure") ||
                fileName == "blank.png" ||
                fileName == "box.png" ||
                fileName == "button.png" ||
                fileName == "startcomposite.png" ||
                fileName == "default.css.aspx";

        }



        private void context_AuthenticateRequest(object sender, EventArgs e)
        {
            HttpApplication application = (HttpApplication)sender;
            HttpContext context = application.Context;

            string currentPath = context.Request.Path.ToLowerInvariant();

            if (currentPath.StartsWith(_adminRootPath) == true)
            {
                if (!_allowC1ConsoleRequests)
                {
                    context.Response.StatusCode = 403;
                    context.Response.Write("ACCESS DISABLED");
                    context.Response.End();
                    throw new System.Security.SecurityException("~/Composite requests not allowed on this site");
                }

                // https check
                if (_forceHttps && context.Request.Url.Scheme != "https")
                {
                    if (!AlwaysAllowUnsecured(context.Request.Url.LocalPath) && !UserOptedOutOfHttps(context))
                    {
                        context.Response.Redirect(string.Format("{0}?fallback={1}&httpsport={2}", unsecureRedirectRelativePath, _allowFallbackToHttp.ToString().ToLower(), _customHttpsPortNumber));
                    }
                }

                // access check
                if (UserValidationFacade.IsLoggedIn() == false)
                {
                    if (_allAllowedPaths.Any(p => currentPath.StartsWith(p, StringComparison.OrdinalIgnoreCase)) == false)
                    {
                        LoggingService.LogWarning("Authorization", string.Format("DENIED {0} access to {1}", context.Request.UserHostAddress, currentPath));
                        string redirectUrl = string.Format("{0}?ReturnUrl={1}", _loginPagePath, HttpUtility.UrlEncodeUnicode(context.Request.Url.PathAndQuery));
                        context.Response.Redirect(redirectUrl, true);
                    }
                }
            }
        }



        private bool UserOptedOutOfHttps(HttpContext context)
        {
            if (!_allowFallbackToHttp)
            {
                return false;
            }

            HttpCookie cookie = context.Request.Cookies["avoidc1consolehttps"];
            return cookie != null && cookie.Value == "true";
        }



        private static void LoadConfiguration()
        {
            lock (_lock)
            {
                _adminRootPath = UrlUtils.AdminRootPath.ToLowerInvariant();

                if (_adminRootPath.EndsWith("/") == false)
                    _adminRootPath = string.Format("{0}/", _adminRootPath);

                LoadAllowedPaths();
                _allowC1ConsoleRequests = true;
                LoadC1ConsoleAccessConfig();
            }
        }



        private static void LoadC1ConsoleAccessConfig()
        {
            // defaults - keeping these if config file is missing or fucked up somehow
            _forceHttps = false;
            _allowFallbackToHttp = true;
            _customHttpsPortNumber = null;

            string c1ConsoleAccessConfigPath = HostingEnvironment.MapPath(c1ConsoleAccessRelativeConfigPath);

            if (File.Exists(c1ConsoleAccessConfigPath))
            {
                try
                {
                    XDocument accessDoc = XDocument.Load(c1ConsoleAccessConfigPath);
                    _allowC1ConsoleRequests = _allowC1ConsoleRequests && (bool)accessDoc.Root.Attribute("enabled");

                    XElement protocolElement = accessDoc.Root.Element("ClientProtocol");
                    _forceHttps = (bool)protocolElement.Attribute("forceHttps");
                    _allowFallbackToHttp = (bool)protocolElement.Attribute("allowFallbackToHttp");

                    var customHttpsPortNumberAttrib = protocolElement.Attribute("customHttpsPortNumber");

                    if (customHttpsPortNumberAttrib != null && customHttpsPortNumberAttrib.Value.Length > 0)
                    {
                        _customHttpsPortNumber = (int)customHttpsPortNumberAttrib;
                    }
                }
                catch (Exception ex)
                {
                    LoggingService.LogError("Authorization", string.Format("Problem parsing '{0}'. Will use defaults and allow normal access. Error was '{1}'", c1ConsoleAccessRelativeConfigPath, ex.Message));
                }
            }
        }



        private static void LoadAllowedPaths()
        {
            _allAllowedPaths.Clear();

            string webauthorizationConfigPath = HostingEnvironment.MapPath(webauthorizationRelativeConfigPath);

            Verify.That(C1File.Exists(webauthorizationConfigPath), "Missing file '{0}'.", webauthorizationRelativeConfigPath);


            XDocument webauthorizationConfigDocument = XDocumentUtils.Load(webauthorizationConfigPath);

            XAttribute loginPagePathAttribute = Verify.ResultNotNull<XAttribute>(webauthorizationConfigDocument.Root.Attribute("loginPagePath"), "Missing '{0}' attribute on '{1}' root element", loginPagePathAttributeName, webauthorizationRelativeConfigPath);
            string relativeLoginPagePath = Verify.StringNotIsNullOrWhiteSpace(loginPagePathAttribute.Value, "Unexpected empty '{0}' attribute on '{1}' root element", loginPagePathAttributeName, webauthorizationRelativeConfigPath);

            _loginPagePath = UrlUtils.ResolveAdminUrl(relativeLoginPagePath);

            foreach (XElement allowElement in webauthorizationConfigDocument.Root.Elements(allowElementName))
            {
                XAttribute relativePathAttribute = Verify.ResultNotNull<XAttribute>(allowElement.Attribute(allow_pathAttributeName), "Missing '{0}' attribute on '{1}' element in '{2}'.", allow_pathAttributeName, allowElement, webauthorizationRelativeConfigPath);
                string relativePath = Verify.StringNotIsNullOrWhiteSpace(relativePathAttribute.Value, "Empty '{0}' attribute on '{1}' element in '{2}'.", allow_pathAttributeName, allowElement, webauthorizationRelativeConfigPath);

                string fullPath = UrlUtils.ResolveAdminUrl(relativePath).ToLowerInvariant();
                _allAllowedPaths.Add(fullPath);
            }
        }
    }
}