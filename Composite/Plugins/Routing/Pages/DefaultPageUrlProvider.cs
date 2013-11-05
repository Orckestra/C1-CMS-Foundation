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
            string decodedRelativeUrl = HttpUtility.UrlDecode(relativeUrl);

            return IsPageRendererRequest(new UrlBuilder(relativeUrl).FilePath)
                || decodedRelativeUrl.StartsWith(InternalUrlPrefix, true)
                || decodedRelativeUrl.StartsWith(InternalUrlPrefixResolved, true);
        }

        internal static bool IsPageRendererRequest(string filePath)
        {
            return filePath.EndsWith("Renderers/Page.aspx", true);
        }

        public PageUrlData ParseInternalUrl(string relativeUrl)
        {
            UrlKind urlKind;
            return ParseInternalUrl(relativeUrl, out urlKind);
        }

        private PageUrlData ParseInternalUrl(string relativeUrl, out UrlKind urlKind)
        {
            var urlBuilder = new UrlBuilder(relativeUrl);

            if (IsPageRendererRequest(urlBuilder.FilePath))
            {
                urlKind = UrlKind.Renderer;
                return ParseRendererUrl(urlBuilder);
            }

            urlKind = UrlKind.Undefined;

            string decodedPath = HttpUtility.UrlDecode(urlBuilder.FullPath);

            string prefix = InternalUrlPrefix;

            if (!decodedPath.StartsWith(prefix, true))
            {
                prefix = InternalUrlPrefixResolved;
                if (!decodedPath.StartsWith(prefix, true))
                {
                    return null;
                }
            }

            int closingBracketOffset = decodedPath.IndexOf(')');
            if (closingBracketOffset < 0)
            {
                return null;
            }

            Guid pageId;
            if (!Guid.TryParse(decodedPath.Substring(prefix.Length, closingBracketOffset - prefix.Length), out pageId))
            {
                return null;
            }

            string pathInfo = decodedPath.Substring(closingBracketOffset + 1);

            bool isUnpublished = pathInfo.Contains(PageUrlBuilder.UrlMarker_Unpublished);
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
                if (cultureInfo.Equals(CultureInfo.InvariantCulture))
                {
                    cultureInfo = DataLocalizationFacade.DefaultLocalizationCulture;
                }
            }

            queryString.Remove("cultureInfo");

            urlKind = UrlKind.Internal;

            return new PageUrlData(pageId, isUnpublished ? PublicationScope.Unpublished : PublicationScope.Published, cultureInfo)
            {
                PathInfo = pathInfo,
                QueryParameters = queryString
            };
        }

        private static PageUrlData ParseRendererUrl(UrlBuilder urlBuilder)
        {
            NameValueCollection queryString = urlBuilder.GetQueryParameters();

            Verify.That(!string.IsNullOrEmpty(queryString["pageId"]), "Invalid query string. The 'pageId' parameter of the GUID type is expected.");

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
                if (cultureInfo.Equals(CultureInfo.InvariantCulture))
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

            string pathInfo = urlBuilder.PathInfo != null ? HttpUtility.UrlDecode(urlBuilder.PathInfo) : null;

            return new PageUrlData(pageId, publicationScope, cultureInfo)
            {
                PathInfo = pathInfo,
                QueryParameters = queryParameters,
            };
        }

        public PageUrlData ParseUrl(string absoluteUrl, out UrlKind urlKind)
        {
            Verify.ArgumentNotNullOrEmpty(absoluteUrl, "absoluteUrl");

            // Converting links 
            // "http://localhost" to "http://localhost/"
            // "http://localhost?..." to "http://localhost/?..."
            if((absoluteUrl.Count(c => c == '/') == 2) && absoluteUrl.Contains("//"))
            {
                int questionMarkIndex = absoluteUrl.IndexOf('?');
                if(questionMarkIndex > 0)
                {
                    absoluteUrl = absoluteUrl.Insert(questionMarkIndex, "/");
                }
                else
                {
                    absoluteUrl += "/";
                }
            }

            Uri uri = new Uri(absoluteUrl);

            string hostname = uri.DnsSafeHost;
            if(!IsKnownHostname(hostname))
            {
                urlKind = UrlKind.Undefined;
                return null;
            }

            string serverUrl = new UrlBuilder(absoluteUrl).ServerUrl;
            string relativeUrl = absoluteUrl.Substring(serverUrl.Length - 1);

            var urlSpace = new UrlSpace(hostname, relativeUrl);

            return ParseUrl(relativeUrl, urlSpace, out urlKind);
        }

        private bool IsKnownHostname(string hostname)
        {
            var context = HttpContext.Current;
            if(context != null && context.Request.Url.DnsSafeHost == hostname)
            {
                return true;
            }

            // Can be optimized
            return DataFacade.GetData<IHostnameBinding>().AsEnumerable().Any(b => b.Hostname == hostname);
        }

        public PageUrlData ParseUrl(string relativeUrl, UrlSpace urlSpace, out UrlKind urlKind)
        {
            var urlBuilder = new UrlBuilder(relativeUrl);

            if (IsInternalUrl(urlBuilder.FilePath))
            {
                return ParseInternalUrl(relativeUrl, out urlKind);
            }

            string filePathAndPathInfo = HttpUtility.UrlDecode(urlBuilder.FullPath);
            filePathAndPathInfo = RemoveUrlMarkers(filePathAndPathInfo, urlSpace);
            
            CultureInfo locale = GetCultureInfo(filePathAndPathInfo, urlSpace);
            if (locale == null)
            {
                urlKind = UrlKind.Undefined;
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
            urlKind = UrlKind.Public;

            string requestPath = filePathAndPathInfo;

            if(publicationScope == PublicationScope.Unpublished)
            {
                requestPath = requestPath.Replace(PageUrlBuilder.UrlMarker_Unpublished, string.Empty);
                if(requestPath == string.Empty)
                {
                    requestPath = "/";
                }
            }

            string loweredRequestPath = requestPath.ToLowerInvariant();
            string pagePath = loweredRequestPath;

            bool firstCheck = true;

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

                if (firstCheck)
                {
                    firstCheck = false;

                    if (pageUrlBuilder.FriendlyUrlToIdLookup.TryGetValue(loweredRequestPath, out pageId))
                    {
                        urlKind = UrlKind.Friendly;
                        break;
                    }
                }

                pagePath = ReducePath(pagePath);

                if (pagePath != null 
                    && !string.IsNullOrEmpty(pageUrlBuilder.UrlSuffix)
                    && !pagePath.Contains(pageUrlBuilder.UrlSuffix))
                {
                    break;
                }
            }

            if (pageId == Guid.Empty)
            {
                urlKind = UrlKind.Undefined;
                return null;
            }


            var queryParameters = urlBuilder.GetQueryParameters();

            string pathInfo = (pagePath.Length < requestPath.Length) ? requestPath.Substring(pagePath.Length) : null;

            return new PageUrlData(pageId, publicationScope, locale)
            {
                PathInfo = pathInfo, 
                QueryParameters = queryParameters,
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

                    if (DataLocalizationFacade.UrlMappingNames.Any(um => String.Equals(um, urlMappingName, StringComparison.OrdinalIgnoreCase)))
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

        public string BuildUrl(PageUrlData pageUrlData, UrlKind urlKind, UrlSpace urlSpace)
        {
            Verify.ArgumentCondition(urlKind != UrlKind.Undefined, "urlKind", "Url kind is undefined");

            /*var page = pageUrlData.Data;
            Verify.ArgumentCondition(page != null, "urlData", "Failed to get page from UrlData<IPage>");*/

            var cultureInfo = pageUrlData.LocalizationScope;
            var publicationScope = pageUrlData.PublicationScope;

            string legacyScopeName = GetLegacyPublicationScopeIdentifier(pageUrlData.PublicationScope);

            if (urlKind == UrlKind.Public)
            {
                var pageUrlBuilder = PageStructureInfo.GetPageUrlBuilder(publicationScope, cultureInfo, urlSpace) as PageUrlBuilder;

                var lookupTable = pageUrlBuilder.IdToUrlLookup;

                if (!lookupTable.ContainsKey(pageUrlData.PageId))
                {
                    return null;
                }

                var publicUrl = new UrlBuilder(lookupTable[pageUrlData.PageId]);
                if (publicationScope == PublicationScope.Unpublished)
                {
                    publicUrl.FilePath = UrlUtils.Combine(publicUrl.FilePath, PageUrlBuilder.UrlMarker_Unpublished);
                }

                if(urlSpace.ForceRelativeUrls)
                {
                    publicUrl.FilePath = UrlUtils.Combine(publicUrl.FilePath, PageUrlBuilder.UrlMarker_RelativeUrl);
                }

                string pathInfo = pageUrlData.PathInfo;
                if(pathInfo != null 
                    && pathInfo.StartsWith("/") 
                    && publicUrl.FilePath.EndsWith("/"))
                {
                    pathInfo = pathInfo.Substring(1);
                }

                publicUrl.PathInfo = pathInfo;
                if (pageUrlData.QueryParameters != null)
                {
                    publicUrl.AddQueryParameters(pageUrlData.QueryParameters);
                }

                return publicUrl;
            }

            if (urlKind == UrlKind.Renderer)
            {
                string basePath = UrlUtils.ResolvePublicUrl("Renderers/Page.aspx");
                UrlBuilder result = new UrlBuilder(basePath);

                result["pageId"] = pageUrlData.PageId.ToString();
                result["cultureInfo"] = cultureInfo.ToString();
                result["dataScope"] = legacyScopeName;

                result.PathInfo = pageUrlData.PathInfo;
                if (pageUrlData.QueryParameters != null)
                {
                    result.AddQueryParameters(pageUrlData.QueryParameters);
                }

                return result;
            }

            if (urlKind == UrlKind.Internal)
            {
                UrlBuilder result = new UrlBuilder("~/page(" + pageUrlData.PageId + ")");

                string pathInfo = string.Empty;

                if (publicationScope == PublicationScope.Unpublished)
                {
                    pathInfo = PageUrlBuilder.UrlMarker_Unpublished;
                }

                if(!pageUrlData.PathInfo.IsNullOrEmpty())
                {
                    pathInfo += pageUrlData.PathInfo;
                }
                result.PathInfo = pathInfo;


                result["cultureInfo"] = cultureInfo.ToString();
               
                if (pageUrlData.QueryParameters != null)
                {
                    result.AddQueryParameters(pageUrlData.QueryParameters);
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
