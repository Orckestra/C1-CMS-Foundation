using System;
using System.Collections.Generic;
using System.Configuration;
using System.Diagnostics;
using System.IO;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Xml.Linq;
using System.Linq;

using Composite.Core.WebClient;


public partial class ScriptLoaderControl : System.Web.UI.UserControl
{
    static bool _hasServerToServerConnection = false;


    private CompositeScriptMode _mode = CompositeScriptMode.OPERATE;
    private IEnumerable<string> _defaultscripts;
    public string type;
    public string directive;
	

    /**
     * Notice that automatic compression doesn't work!
     */
    protected void Page_Load(object sender, EventArgs e)
    {
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

        string folderPath = Path.Combine(HttpContext.Current.Request.PhysicalApplicationPath, "Composite");

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
	


    protected override void Render(HtmlTextWriter writer)
    {
        switch (_mode)
        {
            case CompositeScriptMode.OPERATE:
            case CompositeScriptMode.DEVELOP:
                RenderMarkup(writer);
                break;
            case CompositeScriptMode.COMPILE:
                CompileScript(writer);
                break;
        }
    }
	


    /**
     * Compile script
     */
    private void CompileScript(HtmlTextWriter writer)
    {
        try
        {
            string folderPath = Path.Combine(HttpContext.Current.Request.PhysicalApplicationPath, "Composite");

            string targetPath = folderPath + "\\scripts\\compressed";


            ScriptHandler.MergeScripts(type, _defaultscripts, folderPath, targetPath);
            if (type == "top")
            {
                ScriptHandler.BuildTopLevelClassNames(_defaultscripts, folderPath, targetPath);
            }
        }
        catch (Exception e)
        {
            Composite.Core.Logging.LoggingService.LogError(typeof(ScriptLoaderControl).FullName, new InvalidOperationException("Failed to compile scripts", e));

            writer.Write("<p> Failed to compile scripts. Exception text:");
            writer.Write(HttpUtility.HtmlEncode(e.ToString()));
            writer.Write("</p>");
        }
    }



    /**
     * Render markup
     */
    private void RenderMarkup(HtmlTextWriter writer)
    {
        //string thisVirtualFolder = Composite.Core.IO.Path.GetDirectoryName(this.AppRelativeVirtualPath);
        //string parentVirtualFolder = thisVirtualFolder.Substring(0, thisVirtualFolder.LastIndexOf(Composite.Core.IO.Path.DirectorySeparatorChar));
        //string fullPathWindowsStyle = parentVirtualFolder.Replace( "~", HttpContext.Current.Request.ApplicationPath );

        string _root = Composite.Core.WebClient.UrlUtils.AdminRootPath;

        string _scriptmarkup = _getScriptMarkup();
        string _scriptsource = null;
		
        StringBuilder _builder = new StringBuilder();

        foreach (string ss in _defaultscripts)
        {
            _scriptsource = ss.Replace("${root}", _root);
            _builder.AppendLine(
                _scriptmarkup.Replace("${scriptsource}", _scriptsource)
            );
        }
        
        // TODO: elsehow
        if (type == "top")
        {
            // We emit a version number - which we want the client to remember
            this.Response.Cache.SetExpires(DateTime.Now.AddYears(-10));
            this.Response.Cache.SetCacheability(HttpCacheability.Private);

            _hasServerToServerConnection = _HasServerToServerConnection();
            _builder.AppendLine(@"<script type=""text/javascript"">");
            _builder.AppendLine(string.Format(@"Application.hasExternalConnection = {0};", _hasServerToServerConnection.ToString().ToLower()));
            _builder.AppendLine(@"</script>");

            if (_mode == CompositeScriptMode.DEVELOP)
            {
                bool isLocalHost = (Request.Url.Host.ToLower() == "localhost");
                string boolean = isLocalHost ? "true" : "false";

                _builder.AppendLine(@"<script type=""text/javascript"">");
                _builder.AppendLine(@"Application.isDeveloperMode = true;");
                _builder.AppendLine(@"Application.isLocalHost = " + boolean + ";");
                _builder.AppendLine(@"</script>");
            }
        }
        else 
        {
        	_builder.AppendLine(@"<script type=""text/javascript"">");
        	_builder.AppendLine(@"UpdateManager.xhtml = null;");
        	_builder.AppendLine(@"</script>");
        }
        
        writer.Write(_builder.ToString());
    }
	
    /**
     * When there are lots of scripts around, Mozilla cannot grok the closing 
     * script tag. It throws a "Error: mismatched tag. Expected: </head>". 
     * Explorer, on the other hand, needs the closing script tag.
     */
    private string _getScriptMarkup()
    {
        string userAgent = Request.UserAgent;

        if(userAgent != null && userAgent.IndexOf("Gecko") > -1) 
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

}