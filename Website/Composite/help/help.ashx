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
        string baseUriString = null;  // add logic with deep urls here
        
        if (string.IsNullOrEmpty(baseUriString))
        {
            baseUriString = ConfigurationManager.AppSettings["Composite.HelpPage.Url"];
        }
        else
        {
            Uri checkUri = new Uri(baseUriString);
            bool isCompositeServerRequest = checkUri.Host.ToLower().EndsWith("composite.net");
            if (!isCompositeServerRequest)
            {
                throw new InvalidOperationException("For security reasons I will only route requests to composite.net hosts");
            }
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