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
        private static readonly string InternalUrlPrefix = "~/page(";
        private static readonly string InternalUrlPrefixResolved = UrlUtils.PublicRootPath + "/page(";

        public IPageUrlBuilder CreateUrlBuilder(PublicationScope publicationScope, CultureInfo localizationScope, UrlSpace urlSpace)
        {
            return new PageUrlBuilder(publicationScope, localizationScope, urlSpace);
        }

        public bool IsInternalUrl(string relativeUrl)
        {
            return IsPageRendererRequest(new UrlBuilder(relativeUrl).FilePath)
                || relativeUrl.StartsWith(InternalUrlPrefix, true)
                || relativeUrl.StartsWith(InternalUrlPrefixResolved, true);
        }

        internal static bool IsPageRendererRequest(string filePath)
        {
            return filePath.EndsWith("Renderers/Page.aspx", true);
        }

        public UrlData<IPage> ParseInternalUrl(string relativeUrl)
        {
            var urlBuilder = new UrlBuilder(relativeUrl);

            if (IsPageRendererRequest(urlBuilder.FilePath))
            {
                return ParseRendererUrl(urlBuilder);
            }

            string prefix = InternalUrlPrefix;

            if (!relativeUrl.StartsWith(prefix, true))
            {
                prefix = InternalUrlPrefixResolved;
                if (!relativeUrl.StartsWith(prefix, true))
                {
                    return null;
                }
            }

            int closingBracketOffset = relativeUrl.IndexOf(")");
            if (closingBracketOffset < 0)
            {
                return null;
            }

            Guid pageId;
            if (!Guid.TryParse(relativeUrl.Substring(prefix.Length, closingBracketOffset - prefix.Length), out pageId))
            {
                return null;
            }

            string pathInfo = urlBuilder.FilePath.Substring(closingBracketOffset + 1);

            bool isUnpublished = relativeUrl.Contains(PageUrlBuilder.UrlMarker_Unpublished);
            if (isUnpublished)
            {
                pathInfo = pathInfo.Replace(PageUrlBuilder.UrlMarker_Unpublished, string.Empty);
            }

            NameValueCollection queryString = urlBuilder.GetQueryParameters();
            string cultureInfoStr = queryString["cultureInfo"];

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

            queryString.Remove("cultureInfo");

            IPage page;

            using (new DataScope(isUnpublished ? PublicationScope.Unpublished : PublicationScope.Published, cultureInfo))
            {
                page = PageManager.GetPageById(pageId, true);
            }

            if (page == null)
            {
                return null;
            }

            return new UrlData<IPage>
            {
                Data = page,
                PathInfo = pathInfo,
                QueryParameters = queryString,
                UrlKind = UrlKind.Internal
            };
        }

        private static UrlData<IPage> ParseRendererUrl(UrlBuilder urlBuilder)
        {
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

            using (new DataScope(publicationScope, cultureInfo))
            {
                page = PageManager.GetPageById(pageId, true);
            }

            if (page == null)
            {
                return null;
            }

            return new UrlData<IPage>
            {
                Data = page,
                PathInfo = urlBuilder.PathInfo,
                QueryParameters = queryParameters,
                UrlKind = UrlKind.Renderer
            };
        }

        public UrlData<IPage> ParseUrl(string absoluteUrl)
        {
            Verify.ArgumentNotNullOrEmpty(absoluteUrl, "absoluteUrl");

            Uri uri = new Uri(absoluteUrl);

            string hostname = uri.DnsSafeHost;

            string serverUrl = new UrlBuilder(absoluteUrl).ServerUrl;
            string relativeUrl = absoluteUrl.Substring(serverUrl.Length - 1);

            var urlSpace = new UrlSpace(hostname, relativeUrl);

            return ParseUrl(relativeUrl, urlSpace);
        }

        public UrlData<IPage> ParseUrl(string relativeUrl, UrlSpace urlSpace)
        {
            var urlBuilder = new UrlBuilder(relativeUrl);

            if (IsInternalUrl(urlBuilder.FilePath))
            {
                return ParseInternalUrl(relativeUrl);
            }

            string requestPath;
            Uri uri;


            string filePathAndPathInfo = urlBuilder.FilePath + (urlBuilder.PathInfo ?? string.Empty);
            filePathAndPathInfo = RemoveUrlMarkers(filePathAndPathInfo, urlSpace);
            

            if (Uri.TryCreate(filePathAndPathInfo, UriKind.Absolute, out uri))
            {
                requestPath = HttpUtility.UrlDecode(uri.AbsolutePath);
            }
            else
            {
                requestPath = filePathAndPathInfo;
            }

            CultureInfo locale = GetCultureInfo(requestPath, urlSpace);
            if (locale == null)
            {
                return null;
            }

            PublicationScope publicationScope = PublicationScope.Published;

            if (filePathAndPathInfo.Contains(PageUrlBuilder.UrlMarker_Unpublished))
            {
                publicationScope = PublicationScope.Unpublished;
            }

            var pageUrlBuilder = PageStructureInfo.GetPageUrlBuilder(publicationScope, locale, urlSpace) as PageUrlBuilder;    
            Verify.IsNotNull(pageUrlBuilder, "Failed to get instance of PageUrlBuilder");

            Guid pageId = Guid.Empty;
            var urlKind = UrlKind.Public;

            if(publicationScope == PublicationScope.Unpublished)
            {
                requestPath = requestPath.Replace(PageUrlBuilder.UrlMarker_Unpublished, string.Empty);
                if(requestPath == string.Empty)
                {
                    requestPath = "/";
                }
            }

            string loweredRequestPath = requestPath.ToLower();
            string pagePath = loweredRequestPath;

            while (pagePath != null)
            {
                if (pageUrlBuilder.UrlToIdLookupLowerCased.TryGetValue(pagePath, out pageId))
                {
                    break;
                }

                if (pageUrlBuilder.RedirectUrlToIdLookupLowerCased.TryGetValue(pagePath, out pageId))
                {
                    urlKind = UrlKind.Redirect;
                    break;
                }

                pagePath = ReducePath(pagePath);

                if (pagePath != null 
                    && !string.IsNullOrEmpty(pageUrlBuilder.UrlSuffix)
                    && !pagePath.Contains(pageUrlBuilder.UrlSuffix))
                {
                    break;
                }
            }

            if(pageId == Guid.Empty)
            {
                if (!pageUrlBuilder.FriendlyUrlToIdLookup.TryGetValue(loweredRequestPath, out pageId))
                {
                    return null;
                }
                
                pagePath = loweredRequestPath;
                urlKind = UrlKind.Friendly;
            }

            IPage page;
            using (new DataScope(publicationScope, locale))
            {
                page = PageManager.GetPageById(pageId, true);
            }

            var queryParameters = urlBuilder.GetQueryParameters();

            string pathInfo = (pagePath.Length < requestPath.Length) ? requestPath.Substring(pagePath.Length) : null;

            return new UrlData<IPage>
            {
                Data = page,
                PathInfo = pathInfo, 
                QueryParameters = queryParameters,
                UrlKind = urlKind
            };
        }

        private static string RemoveUrlMarkers(string filePath, UrlSpace urlSpace)
        {
            if (urlSpace.ForceRelativeUrls && filePath.Contains(PageUrlBuilder.UrlMarker_RelativeUrl))
            {
                filePath = filePath.Replace(PageUrlBuilder.UrlMarker_RelativeUrl, string.Empty);
            }

            if (filePath == string.Empty)
            {
                filePath = "/";
            }

            return filePath;
        }

        internal static CultureInfo GetCultureInfo(string requestPath, UrlSpace urlSpace)
        {
            int startIndex = requestPath.IndexOf('/', UrlUtils.PublicRootPath.Length) + 1;

            // TODO: fix condition (startIndex >= 0) is always true
            if (startIndex >= 0 && requestPath.Length > startIndex)
            {
                int endIndex = requestPath.IndexOf('/', startIndex + 1) - 1;
                if(endIndex < 0)
                {
                    endIndex = requestPath.Length - 1;
                }
                
                if (endIndex > startIndex)
                {
                    string urlMappingName = requestPath.Substring(startIndex, endIndex - startIndex + 1);

                    if (DataLocalizationFacade.UrlMappingNames.Contains(urlMappingName))
                    {
                        CultureInfo cultureInfo = DataLocalizationFacade.GetCultureInfoByUrlMappingName(urlMappingName);

                        bool exists = DataLocalizationFacade.ActiveLocalizationNames.Contains(cultureInfo.Name);

                        if (exists)
                        {
                            return cultureInfo;
                        }

                        return null;
                    }
                }
            }

            if (!urlSpace.ForceRelativeUrls)
            {
                string host = urlSpace.Hostname;
                var hostnameBinding = DataFacade.GetData<IHostnameBinding>().AsEnumerable().FirstOrDefault(b => b.Hostname == host);

                if (hostnameBinding != null
                    && !hostnameBinding.IncludeCultureInUrl)
                {
                    return new CultureInfo(hostnameBinding.Culture);
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
                var pageUrlBuilder = PageStructureInfo.GetPageUrlBuilder(publicationScope, cultureInfo, urlSpace) as PageUrlBuilder;

                var lookupTable = pageUrlBuilder.IdToUrlLookup;

                if (!lookupTable.ContainsKey(page.Id))
                {
                    return null;
                }

                var publicUrl = new UrlBuilder(lookupTable[page.Id]);
                if (publicationScope == PublicationScope.Unpublished)
                {
                    publicUrl.FilePath = UrlUtils.Combine(publicUrl.FilePath, PageUrlBuilder.UrlMarker_Unpublished);
                }

                if(urlSpace.ForceRelativeUrls)
                {
                    publicUrl.FilePath = UrlUtils.Combine(publicUrl.FilePath, PageUrlBuilder.UrlMarker_RelativeUrl);
                }

                string pathInfo = urlData.PathInfo;
                if(pathInfo != null 
                    && pathInfo.StartsWith("/") 
                    && publicUrl.FilePath.EndsWith("/"))
                {
                    pathInfo = pathInfo.Substring(1);
                }

                publicUrl.PathInfo = pathInfo;
                if (urlData.QueryParameters != null)
                {
                    publicUrl.AddQueryParameters(urlData.QueryParameters);
                }

                return publicUrl;
            }

            if (urlKind == UrlKind.Renderer)
            {
                string basePath = UrlUtils.ResolvePublicUrl("Renderers/Page.aspx");
                UrlBuilder result = new UrlBuilder(basePath);

                result["pageId"] = page.Id.ToString();
                result["cultureInfo"] = cultureInfo.ToString();
                result["dataScope"] = legacyScopeName;

                result.PathInfo = urlData.PathInfo;
                if (urlData.QueryParameters != null)
                {
                    result.AddQueryParameters(urlData.QueryParameters);
                }

                return result;
            }

            if (urlKind == UrlKind.Internal)
            {
                UrlBuilder result = new UrlBuilder("~/page(" + page.Id + ")");

                string pathInfo = string.Empty;

                if (publicationScope == PublicationScope.Unpublished)
                {
                    pathInfo = PageUrlBuilder.UrlMarker_Unpublished;
                }

                if(!urlData.PathInfo.IsNullOrEmpty())
                {
                    pathInfo += urlData.PathInfo;
                }
                result.PathInfo = pathInfo;


                result["cultureInfo"] = cultureInfo.ToString();
               
                if (urlData.QueryParameters != null)
                {
                    result.AddQueryParameters(urlData.QueryParameters);
                }

                return result;
            }

            throw new NotImplementedException("Only 'Public' and 'Internal' url types are supported.");
        }

        private static string GetLegacyPublicationScopeIdentifier(PublicationScope publicationScope)
        {
            return publicationScope == PublicationScope.Published ? "public" : "administrated";
        }

        private static string ReducePath(string path)
        {
            // /A/B/ -> /A/B
            // /A/B -> /A
			// /A -> null
            if(path.Length < 3)
            {
                return null;
            }

            int offset = path.LastIndexOf('/');
            if (offset < 1) return null;
            return path.Substring(0, offset);
        }
    }
}
