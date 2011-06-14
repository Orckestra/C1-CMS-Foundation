using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Composite.Core;
using Composite.Core.Collections.Generic;
using Composite.Core.Extensions;
using Composite.Core.Routing;
using Composite.Core.Routing.Plugins.PageUrlsProviders;
using Composite.Core.WebClient;
using Composite.Data;
using Composite.Data.Types;

namespace Composite.Plugins.Routing.Pages
{
    internal class PageUrlBuilder: IPageUrlBuilder
    {
        public static readonly string UrlMarker_RelativeUrl = "/c1mode(relative)";
        public static readonly string UrlMarker_Unpublished = "/c1mode(unpublished)";
        private static readonly string DefaultPageUrlSuffix = ".aspx";

        private static readonly string LogTitle = typeof (PageUrlBuilder).FullName;

        private readonly Hashtable<Guid, string> _folderPaths = new Hashtable<Guid, string>();
        private readonly Hashtable<Guid, string> _redirectFolderPaths = new Hashtable<Guid, string>();

        public Hashtable<string, Guid> UrlToIdLookup = new Hashtable<string, Guid>();
        public Hashtable<string, Guid> UrlToIdLookupLowerCased = new Hashtable<string, Guid>();
        public Hashtable<string, Guid> RedirectUrlToIdLookupLowerCased = new Hashtable<string, Guid>();
        public Hashtable<string, Guid> FriendlyUrlToIdLookup = new Hashtable<string, Guid>();
        public Hashtable<Guid, string> IdToUrlLookup = new Hashtable<Guid, string>();

        private UrlSpace _urlSpace;
        private bool _forceRelativeUrls;

        // public Hashtable<Guid, IHostnameBinding> HostnameBindings = new Hashtable<Guid, IHostnameBinding>();
        private List<IHostnameBinding> _hostnameBindings = new List<IHostnameBinding>();

        private IHostnameBinding _hostnameBinding;

        private readonly PublicationScope _publicationScope;
        private readonly CultureInfo _localizationScope;

        private readonly string _friendlyUrlPrefix;

        public string UrlSuffix { get; private set;}
        
        public PageUrlBuilder(PublicationScope publicationScope, CultureInfo localizationScope, UrlSpace urlSpace)
        {
            _publicationScope = publicationScope;
            _localizationScope = localizationScope;

            var localeMappedName = DataLocalizationFacade.GetUrlMappingName(localizationScope) ?? string.Empty;
            _friendlyUrlPrefix = localeMappedName.IsNullOrEmpty() ? string.Empty : "/" + localeMappedName;

            _forceRelativeUrls = urlSpace != null && urlSpace.ForceRelativeUrls;

            if (!_forceRelativeUrls
                && urlSpace != null 
                && urlSpace.Hostname != null)
            {
                List<IHostnameBinding> hostnameBindings = DataFacade.GetData<IHostnameBinding>().ToList();

                _hostnameBinding = hostnameBindings.FirstOrDefault(b => b.Hostname == urlSpace.Hostname);

                bool knownHostname = _hostnameBinding != null;
                 
                if(knownHostname)
                {
                    _hostnameBindings = hostnameBindings;

                    _urlSpace = urlSpace;
                }
            }

            UrlSuffix = DataFacade.GetData<IUrlConfiguration>().Select(c => c.PageUrlSuffix).FirstOrDefault() ?? DefaultPageUrlSuffix;
        }

        public PageUrlSet BuildUrlSet(IPage page, Guid parentPageId)
        {
            Verify.ArgumentNotNull(page, "page");
            Verify.ArgumentCondition(page.DataSourceId.PublicationScope == _publicationScope, "page", "Page belongs to a wrong publication scope");
            Verify.ArgumentCondition(page.DataSourceId.LocaleScope.Name == _localizationScope.Name, "page", "Page belongs to a wrong localization scope");

            DataScopeIdentifier dataScopeIdentifier = page.DataSourceId.DataScopeIdentifier;
            CultureInfo cultureInfo = page.DataSourceId.LocaleScope;

            string parentPath;

            IHostnameBinding appliedHostnameBinding = null;

            // Checking if it is a root-level page
            if (parentPageId == Guid.Empty)
            {
                parentPath = GetRootPageBaseUrl(page.Id, cultureInfo, out appliedHostnameBinding);
            }
            else
            {
                Verify.That(_folderPaths.ContainsKey(parentPageId), "Method BuildUrlInternal() should be called for parent page before running for childildren, so 'urlBuildingCache' parameter will contains parent pages data.");
                parentPath = _folderPaths[parentPageId];
            }

            // Building folderPath & lookup url
            string lookupUrl, folderPath;
            
            if (page.UrlTitle == string.Empty 
                || (appliedHostnameBinding != null
                    && !appliedHostnameBinding.IncludeHomePageInUrl
                    && appliedHostnameBinding.HomePageId == page.Id))
            {
                // Extensionless root url
                lookupUrl = folderPath = (parentPath == "" ? "/" : parentPath);
            }
            else
            {
                string parentPathWithSlash = parentPath + (parentPath.EndsWith("/") ? "" : "/");

                string urlTitle = page.UrlTitle;

#if URLDEBUG
                urlTitle = UrlFormattersPluginFacade.FormatUrl(urlTitle, true);
#endif 

                folderPath = parentPathWithSlash + urlTitle;
                lookupUrl = folderPath + UrlSuffix;
            }


            _folderPaths.Add(page.Id, folderPath);

            string lookupUrlLowerCased = lookupUrl.ToLowerInvariant();

            if (UrlToIdLookupLowerCased.ContainsKey(lookupUrlLowerCased))
            {
                Log.LogError(LogTitle, "Multiple pages share the same path '{0}', page ID: '{1}'. Duplicates are ignored.".FormatWith(lookupUrlLowerCased, page.Id));
                return null;
            }

            UrlToIdLookupLowerCased.Add(lookupUrlLowerCased, page.Id);
            UrlToIdLookup.Add(lookupUrl, page.Id);
            IdToUrlLookup.Add(page.Id, lookupUrl);


            // Building redirect folder path & url

            string redirectParentPath = (parentPageId == Guid.Empty)
                                            ? GetRedirectBaseUrl(cultureInfo) 
                                            : _redirectFolderPaths[parentPageId];

            if (redirectParentPath != null)
            {
                string redirectLookupUrl;
                string redirectFolderPath;

                

                if (!page.UrlTitle.IsNullOrEmpty())
                {
                    string parentPathWithTrailingSlash = redirectParentPath + (redirectParentPath.EndsWith("/") ? "" : "/");
                    redirectFolderPath = parentPathWithTrailingSlash + page.UrlTitle;
                    redirectLookupUrl = redirectFolderPath + UrlSuffix;
                }
                else
                {
                    redirectLookupUrl = redirectFolderPath = redirectParentPath;
                }

                if (redirectLookupUrl != lookupUrl || UrlSuffix == string.Empty)
                {
                    _redirectFolderPaths.Add(page.Id, redirectFolderPath);

                    string redirectLookupUrlLowerCased = redirectLookupUrl.ToLower();

                    if (redirectLookupUrlLowerCased != lookupUrlLowerCased)
                    {
                        RedirectUrlToIdLookupLowerCased.Add(redirectLookupUrlLowerCased, page.Id);
                    }
                    
                    if(UrlSuffix == string.Empty)
                    {
                        RedirectUrlToIdLookupLowerCased.Add(redirectLookupUrlLowerCased + ".aspx", page.Id);
                    }
                }
            }


            string url = lookupUrl;

            if(_forceRelativeUrls)
            {
                url = UrlUtils.Combine(url, UrlMarker_RelativeUrl);
            }

            if (dataScopeIdentifier.Name == DataScopeIdentifier.AdministratedName)
            {
                url = UrlUtils.Combine(url, UrlMarker_Unpublished);
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

        private string GetRedirectBaseUrl(CultureInfo cultureInfo)
        {
            string cultureUrlMapping = DataLocalizationFacade.GetUrlMappingName(cultureInfo);

            if (cultureUrlMapping != "")
            {
                return UrlUtils.PublicRootPath + "/" + cultureUrlMapping;
            }

            return UrlUtils.PublicRootPath;
        }

        private string GetRootPageBaseUrl(Guid pageId, CultureInfo cultureInfo, out IHostnameBinding appliedHostnameBinding)
        {
            string cultureUrlMapping = DataLocalizationFacade.GetUrlMappingName(cultureInfo);

            if (!_forceRelativeUrls && _hostnameBindings.Any())
            {
                IHostnameBinding match = _hostnameBindings.FirstOrDefault(b => b.HomePageId == pageId && b.Culture == cultureInfo.Name);

                if(match == null)
                {
                    match = _hostnameBindings.FirstOrDefault(b => b.HomePageId == pageId);
                }

                if(match != null)
                {
                    string result = string.Empty;

                    if (match.Hostname != _urlSpace.Hostname)
                    {
                        result = "http://" + match.Hostname;
                    }

                    result += UrlUtils.PublicRootPath;

                    if (match.IncludeCultureInUrl || match.Culture != cultureInfo.Name)
                    {
                        if (cultureUrlMapping != string.Empty)
                        {
                            result += "/" + cultureUrlMapping;
                        }
                    }

                    appliedHostnameBinding = match;

                    return result;
                }
            }

            appliedHostnameBinding = _hostnameBinding;

            if (cultureUrlMapping != ""
                && (_hostnameBinding == null
                    || _hostnameBinding.IncludeCultureInUrl
                    || _hostnameBinding.Culture != cultureInfo.Name))
            {
                appliedHostnameBinding = _hostnameBinding;

                return UrlUtils.PublicRootPath + "/" + cultureUrlMapping;
            }

            return UrlUtils.PublicRootPath;
        }

        private static string MakeRelativeUrl(string url)
        {
            return url.StartsWith("/") ? url : "/" + url;
        }
    }
}
