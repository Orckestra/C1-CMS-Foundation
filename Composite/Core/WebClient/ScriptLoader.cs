using System;
using System.Collections.Generic;
using System.Configuration;
using System.Diagnostics;
using System.Diagnostics.CodeAnalysis;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Hosting;
using System.Xml.Linq;
using Composite.Core.IO;
using Composite.Core.Xml;


namespace Composite.Core.WebClient
{
    
    /// <summary>
    /// A common Scriptloader class for Razor and Aspx Pages.
    /// </summary>
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class ScriptLoader
    {
        static bool _hasServerToServerConnection;

        private readonly HttpContext _ctx;        
        private readonly string _type;
        private readonly bool _updateManagerDisabled;
        private readonly CompositeScriptMode _mode;

        private readonly IEnumerable<string> _defaultscripts;


        /// <exclude />
        public ScriptLoader(string type, string directive = null, bool updateManagerDisabled = false)
        {
            _ctx = HttpContext.Current;
            _type = type;
            _updateManagerDisabled = updateManagerDisabled;

            if (directive == "compile")
            {
                _mode = CompositeScriptMode.COMPILE;
            }
            else if (CookieHandler.Get("mode") == "develop")
            {
                _mode = CompositeScriptMode.DEVELOP;
            }
            else
            {
                _mode = CompositeScriptMode.OPERATE;
            }

            string folderPath = Path.Combine(_ctx.Request.PhysicalApplicationPath, "Composite");

            switch (type)
            {
                case "top":
                    _defaultscripts = ScriptHandler.GetTopScripts(_mode, folderPath);

                    break;
                case "sub":
                    _defaultscripts = ScriptHandler.GetSubScripts(_mode, folderPath);
                    break;
            }
        }



        /// <summary>
        /// Create and render the markup for Razor Pages
        /// </summary>
        /// <param name="type"></param>
        /// <param name="directive"></param>
        /// <returns></returns>
        public static string Render(string type , string directive = null)
        {
            return new ScriptLoader(type, directive).Render();
        }
        

        /// <exclude />
        public string Render()
        {
            var builder = new StringBuilder();
            switch (_mode)
            {
                case CompositeScriptMode.OPERATE:
                case CompositeScriptMode.DEVELOP:
                    RenderMarkup(builder);
                    break;
                case CompositeScriptMode.COMPILE:
                    CompileScript(builder);
                    break;
            }
            return builder.ToString();
        }


        #region Private Methods

        private void CompileScript(StringBuilder writer)
        {
            try
            {
                string folderPath = Path.Combine(_ctx.Request.PhysicalApplicationPath, "Composite");

                string targetPath = folderPath + "\\scripts\\compressed";


                ScriptHandler.MergeScripts(_type, _defaultscripts, folderPath, targetPath);
                if (_type == "top")
                {
                    ScriptHandler.BuildTopLevelClassNames(_defaultscripts, folderPath, targetPath);
                }
            }
            catch (Exception e)
            {
                Log.LogError(typeof(ScriptLoader).FullName, new InvalidOperationException("Failed to compile scripts", e));

                writer.Append("<p> Failed to compile scripts. Exception text:");
                writer.Append(HttpUtility.HtmlEncode(e.ToString()));
                writer.Append("</p>");
            }
        }


        /**
         * Render markup
         */
        private void RenderMarkup(StringBuilder builder)
        {
            //string thisVirtualFolder = Composite.Core.IO.Path.GetDirectoryName(this.AppRelativeVirtualPath);
            //string parentVirtualFolder = thisVirtualFolder.Substring(0, thisVirtualFolder.LastIndexOf(Composite.Core.IO.Path.DirectorySeparatorChar));
            //string fullPathWindowsStyle = parentVirtualFolder.Replace( "~", HttpContext.Current.Request.ApplicationPath );

            string root = UrlUtils.AdminRootPath;

            string scriptMarkup = GetScriptMarkup();


            foreach (string ss in _defaultscripts)
            {
                string relativeLink = ss.Replace("${root}", root);

                string filePath = PathUtil.Resolve(ss.Replace("${root}", "~/Composite"));
                if (C1File.Exists(filePath))
                {
                    DateTime lastModified = C1File.GetLastWriteTimeUtc(filePath);
                    relativeLink += "?timestamp=" + lastModified.GetHashCode();
                }

                builder.AppendLine(
                    scriptMarkup.Replace("${scriptsource}", relativeLink)
                );
            }

            if (_type == "top")
            {
                // We emit a version number - which we want the client to remember
                _ctx.Response.Cache.SetExpires(DateTime.Now.AddYears(-10));
                _ctx.Response.Cache.SetCacheability(HttpCacheability.Private);

                var url = _ctx.Request.Url;
                bool isLocalHost = url.Host.ToLowerInvariant() == "localhost";

                _hasServerToServerConnection = HasServerToServerConnection(); 

                builder.AppendLine(@"<script type=""text/javascript"">");

                Func<bool, string> toJson = b => b.ToString().ToLowerInvariant();

                builder.AppendFormat(@"Application.hasExternalConnection = {0};", toJson(_hasServerToServerConnection));
                builder.AppendFormat(@"Application.isDeveloperMode = {0};", toJson(_mode == CompositeScriptMode.DEVELOP));
                builder.AppendFormat(@"Application.isLocalHost = {0};", toJson(isLocalHost));
                builder.AppendFormat(@"Application.isOnPublicNet = {0};", toJson(UrlIsOnPublicNet(url)));

                builder.AppendLine(@"</script>");

			}
            else
            {
                if (!_updateManagerDisabled)
                {
                    builder.AppendLine(@"<script type=""text/javascript"">");
                    builder.AppendLine(@"UpdateManager.xhtml = null;");
                    builder.AppendLine(@"</script>");
                }
            }
        }

        
        /// <summary>
        /// When there are lots of scripts around, Mozilla cannot grok the closing 
        /// script tag. It throws a "Error: mismatched tag. Expected: &lt;/head&gt;". 
        /// Explorer, on the other hand, needs the closing script tag.
        /// </summary>
        private string GetScriptMarkup()
        {
            string userAgent = _ctx.Request.UserAgent;

            if (userAgent != null && userAgent.IndexOf("Gecko", StringComparison.InvariantCulture) > -1)
            {
                return @"<script type=""application/javascript"" src=""${scriptsource}""/>";
            }

            return @"<script type=""text/javascript"" src=""${scriptsource}""></script>";
        }

        /**
         * Attempt remote connection. We test the connection by 
         * looking for the exact document title "Start" in the response. 
         */
        [SuppressMessage("Composite.IO", "Composite.DoNotUseConfigurationManagerClass:DoNotUseConfigurationManagerClass")]
        private static bool HasServerToServerConnection()
        {
            bool result = false;
            try
            {
                string uri = ConfigurationManager.AppSettings["Composite.StartPage.Url"];

                if (string.IsNullOrEmpty(uri))
                {
                    return false;
                }

                XDocument loaded = null;
                Task task = Task.Factory.StartNew(() => loaded = TryLoad(uri));

                task.Wait(2500);
                if (task.IsCompleted && loaded != null)
                {
                    XElement titleElement = loaded.Descendants(Namespaces.Xhtml + "title").FirstOrDefault();
                    result = (titleElement != null && titleElement.Value == "Start");
                }
            }
            catch (Exception) { }
            return result;
        }


        private bool UrlIsOnPublicNet(Uri currentUri)
        {
            if (currentUri.HostNameType != UriHostNameType.Dns) return false;

            string hostname = currentUri.Host.ToLowerInvariant();

            if (hostname.IndexOf('.') == -1) return false;

            IPHostEntry dnsResult;
            try
            {
                dnsResult = System.Net.Dns.GetHostEntry(hostname);
            }
            catch (SocketException)
            {
                return false;
            }
            
            if (dnsResult.AddressList.Length == 0)
            {
                return false;
            }

            var address = dnsResult.AddressList.First().MapToIPv6();
            return !address.IsIPv6SiteLocal && !address.IsIPv6LinkLocal;
        }

        /// <exclude />
        public static bool UnbundledScriptsAvailable()
        {
            var filePath = HostingEnvironment.MapPath(UrlUtils.AdminRootPath + "/scripts/source/top/interfaces/IAcceptable.js");

            return C1File.Exists(filePath);
        }

        [DebuggerStepThrough]
        private static XDocument TryLoad(string uri)
        {
            try
            {
                return XDocumentUtils.Load(uri);
            }
            catch
            {
                /* silent */
                return null;
            }
        }

        #endregion
    }

}