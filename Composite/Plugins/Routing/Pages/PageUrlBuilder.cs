using System;
using System.Globalization;
using Composite.Core;
using Composite.Core.Collections.Generic;
using Composite.Core.Extensions;
using Composite.Core.Routing;
using Composite.Core.Routing.Foundation.PluginFacades;
using Composite.Core.Routing.Plugins.PageUrlsProviders;
using Composite.Core.WebClient;
using Composite.Data;
using Composite.Data.Types;

namespace Composite.Plugins.Routing.Pages
{
    internal class PageUrlBuilder: IPageUrlBuilder
    {
        private static readonly string LogTitle = typeof (PageUrlBuilder).FullName;

        private readonly Hashtable<Guid, string> _folderPaths = new Hashtable<Guid, string>();

        public Hashtable<string, Guid> UrlToIdLookup = new Hashtable<string, Guid>();
        public Hashtable<string, Guid> UrlToIdLookupLowerCased = new Hashtable<string, Guid>();
        public Hashtable<string, Guid> FriendlyUrlToIdLookup = new Hashtable<string, Guid>();
        public Hashtable<Guid, string> IdToUrlLookup = new Hashtable<Guid, string>();

        private readonly PublicationScope _publicationScope;
        private readonly CultureInfo _localizationScope;

        private readonly string _friendlyUrlPrefix;

        public PageUrlBuilder(PublicationScope publicationScope, CultureInfo localizationScope, UrlSpace urlSpace)
        {
            _publicationScope = publicationScope;
            _localizationScope = localizationScope;

            var localeMappedName = DataLocalizationFacade.GetUrlMappingName(localizationScope) ?? string.Empty;
            _friendlyUrlPrefix = localeMappedName.IsNullOrEmpty() ? string.Empty : "/" + localeMappedName;
        }

        public PageUrlSet BuildUrlSet(IPage page, Guid parentPageId)
        {
            Verify.ArgumentNotNull(page, "page");
            Verify.ArgumentCondition(page.DataSourceId.PublicationScope == _publicationScope, "page", "Page belongs to a wrong publication scope");
            Verify.ArgumentCondition(page.DataSourceId.LocaleScope.Name == _localizationScope.Name, "page", "Page belongs to a wrong localization scope");

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

            string lookupUrlLowerCased = lookupUrl.ToLowerInvariant();

            if (UrlToIdLookupLowerCased.ContainsKey(lookupUrlLowerCased))
            {
                Log.LogError(LogTitle, "Multiple pages share the same path '{0}', page ID: '{1}'. Duplicates are ignored.".FormatWith(lookupUrlLowerCased, page.Id));
                return null;
            }

            UrlToIdLookupLowerCased.Add(lookupUrlLowerCased, page.Id);
            UrlToIdLookup.Add(lookupUrl, page.Id);
            IdToUrlLookup.Add(page.Id, lookupUrl);

            string url = lookupUrl;
            if (dataScopeIdentifier.Name != DataScopeIdentifier.GetDefault().Name)
            {
                url += "?dataScope=" + dataScopeIdentifier.Name;
            }

            var pageUrls = new PageUrlSet { PublicUrl = url };

            if(!string.IsNullOrEmpty(page.FriendlyUrl))
            {
                string friendlyUrl = _friendlyUrlPrefix + MakeRelativeUrl(page.FriendlyUrl);
                string lowerCasedFriendlyUrl = friendlyUrl.ToLowerInvariant();

                if(!FriendlyUrlToIdLookup.ContainsKey(lowerCasedFriendlyUrl))
                {
                    pageUrls.FriendlyUrl = friendlyUrl;
                    FriendlyUrlToIdLookup.Add(lowerCasedFriendlyUrl, page.Id);
                }
            }
            
            return pageUrls;
        }

        private static string MakeRelativeUrl(string url)
        {
            return url.StartsWith("/") ? url : "/" + url;
        }
    }
}
