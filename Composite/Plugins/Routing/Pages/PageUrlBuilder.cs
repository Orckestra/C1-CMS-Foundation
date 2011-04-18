using System;
using System.Globalization;
using Composite.Core.Collections.Generic;
using Composite.Core.Routing.Plugins.PageUrlsProviders;
using Composite.Core.WebClient;
using Composite.Data;
using Composite.Data.Types;

namespace Composite.Plugins.Routing.Pages
{
    internal class PageUrlBuilder: IPageUrlBuilder
    {
        private readonly Hashtable<Guid, string> _folderPaths = new Hashtable<Guid, string>();

        public Hashtable<string, Guid> UrlToIdLookup = new Hashtable<string, Guid>();
        public Hashtable<string, Guid> UrlToIdLookupLowerCased = new Hashtable<string, Guid>();
        public Hashtable<Guid, string> IdToUrlLookup = new Hashtable<Guid, string>();

        public PageUrlSet BuildUrlSet(IPage page, Guid parentPageId)
        {
            Verify.ArgumentNotNull(page, "page");

            DataScopeIdentifier dataScopeIdentifier = page.DataSourceId.DataScopeIdentifier;
            CultureInfo cultureInfo = page.DataSourceId.LocaleScope;

            string parentPath;
            if (parentPageId == Guid.Empty)
            {
                parentPath = string.Empty;
            }
            else
            {
                Verify.That(_folderPaths.ContainsKey(parentPageId), "Method BuildUrlInternal() should be called for parent page before running for childildren, so 'urlBuildingCache' parameter will contains parent pages data.");
                parentPath = _folderPaths[parentPageId];
            }

            string folderPath = string.Format("{0}/{1}", parentPath, page.UrlTitle);

            _folderPaths.Add(page.Id, folderPath);

            string baseUrl;
            string urlMappingName = DataLocalizationFacade.GetUrlMappingName(cultureInfo);
            if (urlMappingName != "")
            {
                baseUrl = string.Format("{0}/{1}{2}", UrlUtils.PublicRootPath, urlMappingName, folderPath);
            }
            else
            {
                baseUrl = UrlUtils.PublicRootPath + folderPath;
            }

            string lookupUrl = baseUrl + ".aspx"; 

            UrlToIdLookup.Add(lookupUrl, page.Id);
            UrlToIdLookupLowerCased.Add(lookupUrl.ToLowerInvariant(), page.Id);
            IdToUrlLookup.Add(page.Id, lookupUrl);

            string url = lookupUrl;
            if (dataScopeIdentifier.Name != DataScopeIdentifier.GetDefault().Name)
            {
                url += "?dataScope=" + dataScopeIdentifier.Name;
            }

            var pageUrls = new PageUrlSet();
            pageUrls.PublicUrl = url;

            // TODO: friendly urls & redirect urls
            return pageUrls;
        }
    }
}
