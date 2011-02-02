<%@ WebHandler Language="C#" Class="FileNotFoundHandler" %>

using System;
using System.Web;
using System.Globalization;
using Composite.Data;
using Composite.Core.WebClient.Renderings;
using Composite.Core.WebClient.Renderings.Page;
using Composite.Core.WebClient;


public class FileNotFoundHandler : IHttpHandler
{
    public void ProcessRequest(HttpContext context)
    {
        string path = GetRequestedPath(context);

        PageUrl pageUrl;

        if (Composite.Data.PageUrl.TryParseFriendlyUrl(path, out pageUrl))
        {
            string redurectUrl = pageUrl.Build(PageUrlType.Public).ToString();
            Composite.Core.Log.LogVerbose("Friendly URL", redurectUrl);
            context.Response.Redirect(redurectUrl);
            return;
        }
            
        context.Response.StatusCode = 404;
        context.Response.Write(string.Format("File '{0}' not found", HttpUtility.HtmlEncode(path)));
    }


    private string GetRequestedPath(HttpContext context)
    {
        string path = context.Request.QueryString["aspxerrorpath"];

        if (string.IsNullOrEmpty(path) == true)
        {
            string rawRequestInfo = HttpUtility.UrlDecode(context.Request.QueryString.ToString());
            if (string.IsNullOrEmpty(rawRequestInfo) == false && rawRequestInfo.StartsWith("404;") && rawRequestInfo.Length > 4)
            {
                string uriFromIisAsString = rawRequestInfo.Substring(4);
                Uri uriFromIis = new Uri(uriFromIisAsString);
                path = uriFromIis.LocalPath;
            }
        }

        if (string.IsNullOrEmpty(path) == true)
            throw new ArgumentException("Missing path information - expected aspxerrorpath parameter or '404;uri' formatted query string.");

        path = path.Replace("\\", "/");
        

        return path;
    }


    public bool IsReusable
    {
        get
        {
            return false;
        }
    }
}