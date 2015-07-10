<%@ WebService Language="C#" Class="Composite.Services.PageService" %>

using System;
using System.Linq;
using System.Web.Services;
using System.Web.Services.Protocols;

using Composite.C1Console.Users;
using Composite.Core.Routing;
using Composite.Core.WebClient;
using Composite.Data;
using Composite.Data.Types;


namespace Composite.Services
{
    [WebService(Namespace = "http://www.composite.net/ns/management")]
    [SoapDocumentService(RoutingStyle = SoapServiceRoutingStyle.RequestElement)]
    public class PageService : System.Web.Services.WebService
    {
        [WebMethod]
        public string GetPageBrowserDefaultUrl(bool dummy)
        {
            using (DataConnection dataConnection = new DataConnection(PublicationScope.Unpublished, UserSettings.ActiveLocaleCultureInfo))
            {
                SitemapNavigator sitemapNavigator = new SitemapNavigator(dataConnection);
                PageNode homePageNode = sitemapNavigator.GetPageNodeByHostname(this.Context.Request.Url.Host);

                if (homePageNode == null)
                {
                    return "/";
                }

                return homePageNode.Url;
            }
        }

        [WebMethod]
        public string TranslateToInternalUrl(string url)
        {
            if (PageUrlHelper.IsInternalUrl(url))
            {
                return url;
            }

            var pageUrlData = PageUrls.ParseUrl(url);

            if (pageUrlData == null)
            {
                return string.Empty;
            }

            return PageUrls.BuildUrl(pageUrlData, UrlKind.Renderer, new UrlSpace());
        }

        [WebMethod]
        public string ConvertRelativePageUrlToAbsolute(string pageUrl)
        {
            if (pageUrl == string.Empty) return string.Empty;
            
            PageUrlData urlData = PageUrls.ParseUrl(pageUrl);
            if(urlData == null)
            {
                return pageUrl;
            }

            string publicUrl = PageUrls.BuildUrl(urlData, UrlKind.Public, new UrlSpace());

            if (publicUrl == null) return pageUrl;

            return AddServerUrl(publicUrl); 
        }

        [WebMethod]
        public string ConvertAbsolutePageUrlToRelative(string pageUrl)
        {
            if (pageUrl == string.Empty) return string.Empty;
            
            if(!DataFacade.GetData<IHostnameBinding>().AsEnumerable().Any())
            {
                return pageUrl;
            }

            PageUrlData urlData = PageUrls.ParseUrl(pageUrl);
            if (urlData == null)
            {
                return pageUrl;
            }

            string relativeRul = PageUrls.BuildUrl(urlData, UrlKind.Public, new UrlSpace {ForceRelativeUrls = true});
            
            if(relativeRul == null) return pageUrl;
            
            return AddServerUrl(relativeRul);
        }        
        
        private static string AddServerUrl(string url)
        {
            if(url.StartsWith("http"))
            {
                return url;
            }
            
            Uri requestUri = System.Web.HttpContext.Current.Request.Url;
            string serverLink = requestUri.AbsoluteUri.Substring(0, requestUri.AbsoluteUri.Length - requestUri.AbsolutePath.Length);
            
            return serverLink + url;
        }
    }
}