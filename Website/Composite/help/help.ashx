<%@ WebHandler Language="C#" Class="HelpHandler" %>

using System;
using System.IO;
using System.Configuration;
using System.Text;
using System.Net;
using System.Xml.Linq;
using System.Web;
using System.Xml;
using System.Xml.Xsl;
using System.Xml.XPath;
using System.Web.Configuration;
using Composite;
using Composite.C1Console.Users;
using Composite.Core.Configuration;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Core.WebClient;


public class HelpHandler : IHttpHandler 
{
    public void ProcessRequest (HttpContext context) 
    {
        ResponseContent responseContent = RequestHelpPage(context);

        context.Response.ContentType = responseContent.ContentType;
        context.Response.Write(responseContent.Content);
    }



    private ResponseContent RequestHelpPage(HttpContext context)
    {
        string sourceUriString = BuildHelpServerUrl(context);
        Uri sourceUri = new Uri(sourceUriString);

        HttpWebRequest request = (HttpWebRequest)HttpWebRequest.Create(sourceUri);
        request.UserAgent = context.Request.Headers["User-Agent"];
        request.Timeout = 2000;

        WebResponse webResponse = request.GetResponse();

        using (Stream responseStream = webResponse.GetResponseStream())
        {
            using(C1StreamReader sr = new C1StreamReader(responseStream))
            {
                return new ResponseContent { Content = sr.ReadToEnd(), ContentType = webResponse.ContentType };
            }
        }
    }



    private string BuildHelpServerUrl(HttpContext context)
    {
        string baseUriString = ConfigurationManager.AppSettings["Composite.Help.Contents.Url"];
        string contentRequestId = (context.Request.QueryString["id"].IsNullOrEmpty() ? "Composite.Help.Contents.Url" : context.Request.QueryString["id"]);
        bool isDeepContentRequest = true;

        switch (contentRequestId)
        {
            case "Composite.Help.Contents.Url":
                isDeepContentRequest = false;
                break;
            case "Composite.Help.Bookmarks.Url":
                baseUriString = ConfigurationManager.AppSettings["Composite.Help.Bookmarks.Url"];
                isDeepContentRequest = false;
                break;
            case "Composite.Help.Search.Url":
                baseUriString = ConfigurationManager.AppSettings["Composite.Help.Search.Url"];
                isDeepContentRequest = false;
                break;
            case "Composite.Help.Index.Url":
                baseUriString = ConfigurationManager.AppSettings["Composite.Help.Index.Url"];
                isDeepContentRequest = false;
                break;
            default:
                break;
        }

        if (isDeepContentRequest)
        {
            Uri helpPageUri = new Uri(baseUriString);
            baseUriString = string.Format("{0}://{1}/{2}", helpPageUri.Scheme, helpPageUri.Host, context.Request.QueryString["id"]);
        }

        string userCultureName = Composite.C1Console.Users.UserSettings.CultureInfo.Name;
        string productVersion = RuntimeInformation.ProductVersion.ToString(4);
        string installationId = InstallationInformationFacade.InstallationId.ToString();
        string browser = context.Request.UserAgent.IndexOf("Gecko") > -1 ? "mozilla" : "explorer";
        string platform = context.Request.Browser.Platform;

        string sourceUriString = string.Format("{0}?culture={1}&version={2}&installation={3}&browser={4}&platform={5}",
            baseUriString,
			HttpUtility.UrlEncode(userCultureName, Encoding.UTF8),
			HttpUtility.UrlEncode(productVersion, Encoding.UTF8),
			HttpUtility.UrlEncode(installationId, Encoding.UTF8),
			HttpUtility.UrlEncode(browser, Encoding.UTF8),
			HttpUtility.UrlEncode(platform, Encoding.UTF8));

        return sourceUriString;
    }
    
 
    public bool IsReusable 
    {
        get 
        {
            return false;
        }
    }


    private class ResponseContent
    {
        public string Content { get; set; }
        public string ContentType { get; set; }
    }

}