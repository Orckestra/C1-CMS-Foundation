<%@ WebService Language="C#" Class="PageService" %>

using System;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Globalization;
using Composite.Renderings;
using Composite.Renderings.Page;
using System.Text;
using Composite.WebClient;
using Composite.Data;
using System.Collections.Generic;
using Composite.Data.Types;


[WebService(Namespace = "http://www.composite.net/ns/management")]
[SoapDocumentService(RoutingStyle = SoapServiceRoutingStyle.RequestElement)]
public class PageService : System.Web.Services.WebService
{
    [WebMethod]
    public string GetPageBrowserDefaultUrl(bool dummy)
    {
        using (new DataScope(DataScopeIdentifier.Administrated))
        {
            // NOTE: linq2sql conversion doesn't support string.EndsWith() function, when we have a parameter as an argument.
            IEnumerable<IPageHostNameBinding> hostNameMatches =
                from binding in DataFacade.GetData<IPageHostNameBinding>()
                where binding.HostName != null
                      && binding.HostName != string.Empty
                orderby binding.HostName.Length descending
                select binding;

            string url = null;

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
                pageId = PageManager.GetChildrenIDs(Guid.Empty).FirstOrDefault(rootPageId => PageManager.GetPageById(rootPageId) != null);
            }

            if (pageId == Guid.Empty)
            {
                return "/";
            }
            else
            {
                PageStructureInfo.GetIdToUrlLookup().TryGetValue(pageId, out url);
                                
                if (url != null)
                {
                    return url + "?dataScope=administrated";
                }
                else
                {
                    return "/";
                }
            }
        }
    }



    [WebMethod]
    public string TranslateToInternalUrl(string url)
    {
        if (PageUrlHelper.IsInternalUrl(url))
        {
            return url;
        }

        var pageUrlOptions = PageUrlHelper.ParsePublicUrl(url);

        if (pageUrlOptions == null)
        {
            return string.Empty;
        }

        return PageUrlHelper.BuildUrl(UrlType.Internal, pageUrlOptions).ToString();
    }
}

