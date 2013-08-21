using System;
using System.Collections.Generic;
using System.Configuration;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Xml.Linq;

namespace Composite.Core.WebClient
{
    
    /// <summary>
    /// A common Scriptloader class for Razor and Aspx Pages.
    /// </summary>
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class ScriptLoader
    {
        static bool _hasServerToServerConnection = false;

        private readonly HttpContext _ctx;        
        private readonly string _type;
        private readonly CompositeScriptMode _mode;

        private IEnumerable<string> _defaultscripts;



        public ScriptLoader(string type, string directive = null)
        {
            _ctx = HttpContext.Current;
            _type = type;

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


        #region Private Methods

        public string Render()
        {
            StringBuilder _builder = new StringBuilder();
            switch (_mode)
            {
                case CompositeScriptMode.OPERATE:
                case CompositeScriptMode.DEVELOP:
                    RenderMarkup(_builder);
                    break;
                case CompositeScriptMode.COMPILE:
                    CompileScript(_builder);
                    break;
            }
            return _builder.ToString();
        }


        private void CompileScript(StringBuilder writer)
        {
            try
            {
                string folderPath = Path.Combine(HttpContext.Current.Request.PhysicalApplicationPath, "Composite");

                string targetPath = folderPath + "\\scripts\\compressed";


                ScriptHandler.MergeScripts(_type, _defaultscripts, folderPath, targetPath);
                if (_type == "top")
                {
                    ScriptHandler.BuildTopLevelClassNames(_defaultscripts, folderPath, targetPath);
                }
            }
            catch (Exception e)
            {
                Composite.Core.Logging.LoggingService.LogError(typeof(ScriptLoader).FullName, new InvalidOperationException("Failed to compile scripts", e));

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

            string _root = Composite.Core.WebClient.UrlUtils.AdminRootPath;

            string _scriptmarkup = _getScriptMarkup();
            string _scriptsource = null;



            foreach (string ss in _defaultscripts)
            {
                _scriptsource = ss.Replace("${root}", _root);
                builder.AppendLine(
                    _scriptmarkup.Replace("${scriptsource}", _scriptsource)
                );
            }

            if (_type == "top")
            {
                // We emit a version number - which we want the client to remember
                _ctx.Response.Cache.SetExpires(DateTime.Now.AddYears(-10));
                _ctx.Response.Cache.SetCacheability(HttpCacheability.Private);

                _hasServerToServerConnection = _HasServerToServerConnection();
                builder.AppendLine(@"<script type=""text/javascript"">");
                builder.AppendLine(string.Format(@"Application.hasExternalConnection = {0};", _hasServerToServerConnection.ToString().ToLower()));
                builder.AppendLine(@"</script>");

                if (_mode == CompositeScriptMode.DEVELOP)
                {
                    bool isLocalHost = (_ctx.Request.Url.Host.ToLowerInvariant() == "localhost");
                    string boolean = isLocalHost ? "true" : "false";

                    builder.AppendLine(@"<script type=""text/javascript"">");
                    builder.AppendLine(@"Application.isDeveloperMode = true;");
                    builder.AppendLine(@"Application.isLocalHost = " + boolean + ";");
                    builder.AppendLine(@"</script>");
                }
            }
            else
            {
                builder.AppendLine(@"<script type=""text/javascript"">");
                builder.AppendLine(@"UpdateManager.xhtml = null;");
                builder.AppendLine(@"</script>");
            }


        }

        /**
         * When there are lots of scripts around, Mozilla cannot grok the closing 
         * script tag. It throws a "Error: mismatched tag. Expected: </head>". 
         * Explorer, on the other hand, needs the closing script tag.
         */
        private string _getScriptMarkup()
        {
            string userAgent = _ctx.Request.UserAgent;

            if (userAgent != null && userAgent.IndexOf("Gecko") > -1)
            {
                return @"<script type=""application/javascript"" src=""${scriptsource}""/>";
            }

            return @"<script type=""text/javascript"" src=""${scriptsource}""></script>";
        }

        /**
         * Attempt remote connection. We stress-test the connection by 
         * looking for the exact document title "Start" in the response. 
         */
        private static bool _HasServerToServerConnection()
        {
            bool result = false;
            try
            {
                string uri = ConfigurationManager.AppSettings["Composite.StartPage.Url"];

                XDocument loaded = null;
                System.Threading.Tasks.Task task = System.Threading.Tasks.Task.Factory.StartNew(() => loaded = TryLoad(uri));

                task.Wait(2500);
                if (task.IsCompleted && loaded != null)
                {
                    XElement titleElement = loaded.Descendants(Composite.Core.Xml.Namespaces.Xhtml + "title").FirstOrDefault();
                    result = (titleElement != null && titleElement.Value == "Start");
                }
            }
            catch (Exception) { }
            return result;
        }

        [DebuggerStepThrough]
        private static XDocument TryLoad(string uri)
        {
            try
            {
                return XDocument.Load(uri);
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