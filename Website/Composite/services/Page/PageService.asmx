<%@ WebService Language="C#" Class="PageService" %>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Services;
using System.Web.Services.Protocols;

using Composite;
using Composite.Data;
using Composite.Core.WebClient;
using Composite.Data.Types;


[WebService(Namespace = "http://www.composite.net/ns/management")]
[SoapDocumentService(RoutingStyle = SoapServiceRoutingStyle.RequestElement)]
public class PageService : System.Web.Services.WebService
{
    [WebMethod]
    public string GetPageBrowserDefaultUrl(bool dummy)
    {
        using (var storage = Storage.Open(PublicationScope.Unpublished))
        {
            // NOTE: linq2sql conversion doesn't support string.EndsWith() function, when we have a parameter as an argument.
            IEnumerable<IPageHostNameBinding> hostNameMatches =
                from binding in storage.Get<IPageHostNameBinding>()
                where binding.HostName != null
                      && binding.HostName != string.Empty
                orderby binding.HostName.Length descending
                select binding;

            Guid pageId = Guid.Empty;

            string hostname = this.Context.Request.Url.Host.ToLower();

            foreach (var binding in hostNameMatches)
            {
                if (hostname.EndsWith(binding.HostName))
                {
                    pageId = binding.PageId;
                    break;
                }
            }

            if (pageId == Guid.Empty)
            {
                var pageManager = Composite.Data.PageManager.Create(PublicationScope.Unpublished);
                
                pageId = pageManager.GetChildrenIds(Guid.Empty).FirstOrDefault(rootPageId => pageManager.GetPageById(rootPageId) != null);
            }

            if (pageId == Guid.Empty)
            {
                return "/";
            }

            string url = new PageUrl(PublicationScope.Unpublished, storage.Locale, pageId).Build(PageUrlType.Published);

            return url ?? "/";
        }
    }



    [WebMethod]
    public string TranslateToInternalUrl(string url)
    {
        if (PageUrlHelper.IsInternalUrl(url))
        {
            return url;
        }

        var pageUrlOptions = PageUrl.Parse(url);

        if (pageUrlOptions == null)
        {
            return string.Empty;
        }

        return pageUrlOptions.Build(PageUrlType.Unpublished);
    }
}

