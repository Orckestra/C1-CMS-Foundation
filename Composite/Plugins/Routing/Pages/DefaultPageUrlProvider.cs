using System;
using System.Globalization;
using System.Linq;
using System.Collections.Specialized;
using System.Web;
using Composite.Core;
using Composite.Core.Extensions;
using Composite.Core.Routing;
using Composite.Core.Routing.Plugins.PageUrlsProviders;
using Composite.Core.Routing.Plugins.PageUrlsProviders.Runtime;
using Composite.Core.WebClient;
using Composite.Core.WebClient.Renderings.Page;
using Composite.Data;
using Composite.Data.Types;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;

namespace Composite.Plugins.Routing.Pages
{
    [ConfigurationElementType(typeof(NonConfigurablePageUrlProvider))]
    internal sealed class DefaultPageUrlProvider: IPageUrlProvider
    {

        public IPageUrlBuilder CreateUrlBuilder(PublicationScope publicationScope, CultureInfo localizationScope, UrlSpace urlSpace)
        {
            return new PageUrlBuilder(publicationScope, localizationScope, urlSpace);
        }

        public bool IsInternalUrl(string url)
        {
            return IsPageRendererRequest(new UrlBuilder(url).FilePath);
        }

        internal static bool IsPageRendererRequest(string filePath)
        {
            return filePath.EndsWith("Renderers/Page.aspx", true);
        }

        public UrlData<IPage> ParseInternalUrl(string url)
        {
            var urlBuilder = new UrlBuilder(url);

            if (!IsPageRendererRequest(urlBuilder.FilePath)) return null;

            NameValueCollection queryString = urlBuilder.GetQueryParameters();

            Verify.That(!string.IsNullOrEmpty(queryString["pageId"]), "Illigal query string. Expected param 'pageId' with guid.");

            string dataScopeName = queryString["dataScope"];

            PublicationScope publicationScope = PublicationScope.Published;

            if (dataScopeName != null
                && string.Compare(dataScopeName, DataScopeIdentifier.AdministratedName, StringComparison.OrdinalIgnoreCase) == 0)
            {
                publicationScope = PublicationScope.Unpublished;
            }


            string cultureInfoStr = queryString["cultureInfo"];
            if (cultureInfoStr.IsNullOrEmpty())
            {
                cultureInfoStr = queryString["CultureInfo"];
            }

            CultureInfo cultureInfo;
            if (!cultureInfoStr.IsNullOrEmpty())
            {
                cultureInfo = new CultureInfo(cultureInfoStr);
            }
            else
            {
                cultureInfo = LocalizationScopeManager.CurrentLocalizationScope;
                if (cultureInfo == CultureInfo.InvariantCulture)
                {
                    cultureInfo = DataLocalizationFacade.DefaultLocalizationCulture;
                }
            }

            Guid pageId = new Guid(queryString["pageId"]);

            var queryParameters = new NameValueCollection();

            var queryKeys = new[] { "pageId", "dataScope", "cultureInfo", "CultureInfo" };

            var notUsedKeys = queryString.AllKeys.Where(key => !queryKeys.Contains(key, StringComparer.OrdinalIgnoreCase));

            foreach (string key in notUsedKeys)
            {
                queryParameters.Add(key, queryString[key]);
            }

            IPage page;

            using(new DataScope(publicationScope, cultureInfo))
            {
                page = PageManager.GetPageById(pageId, true);
            }

            return new UrlData<IPage>
                       {
                           Data = page, 
                           PathInfo = urlBuilder.PathInfo, 
                           QueryParameters = queryParameters, 
                           UrlKind = UrlKind.Internal
                       };
        }

        public UrlData<IPage> ParseUrl(string url, UrlSpace urlSpace)
        {
            var urlBuilder = new UrlBuilder(url);

            if (IsPageRendererRequest(urlBuilder.FilePath))
            {
                return ParseInternalUrl(url);
            }

            string requestPath;
            Uri uri;

            if (Uri.TryCreate(urlBuilder.FilePath, UriKind.Absolute, out uri))
            {
                requestPath = HttpUtility.UrlDecode(uri.AbsolutePath).ToLower();
            }
            else
            {
                requestPath = urlBuilder.FilePath.ToLower();
            }

            string requestPathWithoutUrlMappingName;
            CultureInfo locale = GetCultureInfo(requestPath, urlSpace, out requestPathWithoutUrlMappingName);
            if (locale == null)
            {
                return null;
            }

            PublicationScope publicationScope = PublicationScope.Published;

            string dataScopeName = urlBuilder["dataScope"];
            if (!dataScopeName.IsNullOrEmpty() 
                && string.Compare(dataScopeName, DataScopeIdentifier.AdministratedName, StringComparison.OrdinalIgnoreCase) == 0)
            {
                publicationScope = PublicationScope.Unpublished;
            }

            var pageUrlBuilder = PageStructureInfo.GetPageUrlBuilder(publicationScope, locale) as PageUrlBuilder;    

            Guid pageId = Guid.Empty;
            var urlKind = UrlKind.Public;

            if (!pageUrlBuilder.UrlToIdLookupLowerCased.TryGetValue(requestPath.ToLower(), out pageId))
            {
                if (!pageUrlBuilder.FriendlyUrlToIdLookup.TryGetValue(requestPath.ToLower(), out pageId))
                {
                    return null;
                }

                urlKind = UrlKind.Friendly;
            }

            IPage page;
            using (new DataScope(publicationScope, locale))
            {
                page = PageManager.GetPageById(pageId, true);
            }

            var queryParameters = urlBuilder.GetQueryParameters();
            queryParameters.Remove("dataScope");

            return new UrlData<IPage>
            {
                Data = page,
                PathInfo = null, // TODO: path info
                QueryParameters = queryParameters,
                UrlKind = urlKind
            };
        }

        internal static CultureInfo GetCultureInfo(string requestPath, UrlSpace urlSpace, out string requestPathWithoutUrlMappingName)
        {
            // TODO: make pluggable, so it's possible to implement hostname dependency
            requestPathWithoutUrlMappingName = requestPath;

            int startIndex = requestPath.IndexOf('/', UrlUtils.PublicRootPath.Length) + 1;
            if (startIndex >= 0 && requestPath.Length > startIndex)
            {
                int endIndex = requestPath.IndexOf('/', startIndex + 1) - 1;
                if (endIndex >= 0)
                {
                    string urlMappingName = requestPath.Substring(startIndex, endIndex - startIndex + 1);

                    if (DataLocalizationFacade.UrlMappingNames.Contains(urlMappingName) == true)
                    {
                        CultureInfo cultureInfo = DataLocalizationFacade.GetCultureInfoByUrlMappingName(urlMappingName);

                        bool exists = DataLocalizationFacade.ActiveLocalizationNames.Contains(cultureInfo.Name);

                        if (exists)
                        {
                            requestPathWithoutUrlMappingName = requestPath.Remove(startIndex - 1, endIndex - startIndex + 2);

                            return cultureInfo;
                        }

                        return null;
                    }
                }
            }

            return DataLocalizationFacade.DefaultUrlMappingCulture;
        }

        public string BuildUrl(UrlData<IPage> urlData, UrlKind urlKind, UrlSpace urlSpace)
        {
            Verify.ArgumentCondition(urlKind != UrlKind.Undefined, "urlKind", "Url kind is undefined");

            var page = urlData.Data;
            Verify.ArgumentCondition(page != null, "urlData", "Failed to get page from UrlData<IPage>");

            var cultureInfo = page.DataSourceId.LocaleScope;
            var publicationScope = page.DataSourceId.PublicationScope;

            string legacyScopeName = GetLegacyPublicationScopeIdentifier(page.DataSourceId.PublicationScope);

            if (urlKind == UrlKind.Public)
            {
                var pageUrlBuilder = PageStructureInfo.GetPageUrlBuilder(publicationScope, cultureInfo) as PageUrlBuilder;

                var lookupTable = pageUrlBuilder.IdToUrlLookup;

                if (!lookupTable.ContainsKey(page.Id))
                {
                    return null;
                }

                var publicUrl = new UrlBuilder(lookupTable[page.Id]);
                if (publicationScope != PublicationScope.Published)
                {
                    publicUrl["dataScope"] = legacyScopeName;
                }

                return publicUrl;
            }

            if (urlKind == UrlKind.Internal)
            {
                string basePath = UrlUtils.ResolvePublicUrl("Renderers/Page.aspx");
                UrlBuilder result = new UrlBuilder(basePath);

                result["pageId"] = page.Id.ToString();
                result["cultureInfo"] = cultureInfo.ToString();
                result["dataScope"] = legacyScopeName;

                return result;
            }

            throw new NotImplementedException("Only 'Public' and 'Internal' url types are supported.");
        }

        private static string GetLegacyPublicationScopeIdentifier(PublicationScope publicationScope)
        {
            return publicationScope == PublicationScope.Published ? "public" : "administrated";
        }
    }
}
