<%@ WebHandler Language="C#" Class="HelpHandler" %>

using System;
using System.Configuration;
using System.Text;
using System.IO;
using System.Net;
using System.Xml.Linq;
using System.Web;
using System.Xml;
using System.Xml.Xsl;
using System.Xml.XPath;
using System.Web.Configuration;
using Composite.GlobalSettings;
using Composite;
using Composite.Extensions;
using Composite.Users;
using Composite.WebClient;

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
        string baseUriString = ConfigurationManager.AppSettings["Composite.Help.Contents.Url"];

        bool isStartPageRequest = context.Request.QueryString["id"].IsNullOrEmpty();

        if (!isStartPageRequest)
        {
            Uri helpPageUri = new Uri(baseUriString);
            baseUriString = string.Format("{0}://{1}/{2}", helpPageUri.Scheme, helpPageUri.Host, context.Request.QueryString["id"]);
        }
        
        string userCultureName = Composite.Users.UserSettings.CultureInfo.Name;
        string productVersion = RuntimeInformation.ProductVersion.ToString(4);
        string installationId = InstallationInformationFacade.InstallationId.ToString();
        string browser = context.Request.UserAgent.IndexOf("Gecko") > -1 ? "mozilla" : "explorer";
        string platform = context.Request.Browser.Platform;

        string sourceUriString = string.Format("{0}?culture={1}&version={2}&installation={3}&browser={4}&platform={5}",
            baseUriString,
            HttpUtility.UrlEncodeUnicode(userCultureName),
            HttpUtility.UrlEncodeUnicode(productVersion),
            HttpUtility.UrlEncodeUnicode(installationId),
            HttpUtility.UrlEncodeUnicode(browser),
            HttpUtility.UrlEncodeUnicode(platform));

        Uri sourceUri = new Uri(sourceUriString);

        HttpWebRequest request = (HttpWebRequest)HttpWebRequest.Create(sourceUri);
        request.UserAgent = context.Request.Headers["User-Agent"];
        request.Timeout = 2000;

        WebResponse webResponse = request.GetResponse();

        using (Stream responseStream = webResponse.GetResponseStream())
        {
            using( StreamReader sr = new StreamReader(responseStream))
            {
                return new ResponseContent { Content = sr.ReadToEnd(), ContentType = webResponse.ContentType };
            }
        }
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