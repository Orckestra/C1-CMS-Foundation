using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Globalization;
using System.Linq;
using System.Collections.Specialized;
using System.Text;
using System.Web;
using Composite.Core;
using Composite.Core.Collections.Generic;
using Composite.Core.Extensions;
using Composite.Core.Routing;
using Composite.Core.Routing.Plugins.PageUrlsProviders;
using Composite.Core.Routing.Plugins.PageUrlsProviders.Runtime;
using Composite.Core.WebClient;
using Composite.Data;
using Composite.Data.Types;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.Plugins.Routing.Pages
{
    [ConfigurationElementType(typeof(NonConfigurablePageUrlProvider))]
    internal sealed class DefaultPageUrlProvider: IPageUrlProvider
    {
        public static readonly string UrlMarker_RelativeUrl = "/c1mode(relative)";
        public static readonly string UrlMarker_Unpublished = "/c1mode(unpublished)";

        private static readonly string InternalUrlPrefix = "~/page(";
        private static readonly string InternalUrlPrefixResolved = UrlUtils.PublicRootPath + "/page(";

         private static readonly Hashtable<Tuple<DataScopeIdentifier, string>, Hashtable<string, Guid>> _friendlyUrls
            = new Hashtable<Tuple<DataScopeIdentifier, string>, Hashtable<string, Guid>>();

        public static string UrlSuffix { get; private set;}

        static DefaultPageUrlProvider()
        {
            DataEvents<IPage>.OnAfterAdd += (a, b) => UpdateFriendlyUrl((IPage) b.Data);
            DataEvents<IPage>.OnAfterUpdate += (a, b) => UpdateFriendlyUrl((IPage) b.Data);

            DataEvents<IHostnameBinding>.OnAfterAdd += (a, b) => _hostnameBindings = null;
            DataEvents<IHostnameBinding>.OnAfterUpdate += (a, b) => _hostnameBindings = null;
            DataEvents<IHostnameBinding>.OnDeleted += (a, b) => _hostnameBindings = null;

            DataEvents<IUrlConfiguration>.OnStoreChanged += (a, b) => LoadUrlSuffix();
        }

        public DefaultPageUrlProvider()
        {
            LoadUrlSuffix();
        }

        private static void LoadUrlSuffix()
        {
            UrlSuffix = DataFacade.GetData<IUrlConfiguration>()
                                  .Select(c => c.PageUrlSuffix).FirstOrDefault() ?? string.Empty;
        }

        [Obsolete]
        public IPageUrlBuilder CreateUrlBuilder(PublicationScope publicationScope, CultureInfo localizationScope, UrlSpace urlSpace)
        {
            return new PageUrlBuilder(publicationScope, localizationScope, urlSpace);
        }

        private static IReadOnlyCollection<IHostnameBinding> _hostnameBindings;
        private static readonly object _hostnameBindingsSyncRoot = new object();

        private static IReadOnlyCollection<IHostnameBinding> GetHostnameBindings()
        {
            var result = _hostnameBindings;
            if (result == null)
            {
                lock (_hostnameBindingsSyncRoot)
                {
                    result = _hostnameBindings;

                    if (result == null)
                    {
                        _hostnameBindings = result = new ReadOnlyCollection<IHostnameBinding>(
                            DataFacade.GetData<IHostnameBinding>().ToList());
                    }
                }
            }

            return result;
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
            if (pathInfo.Length > 0 && pathInfo[0] != '/')
            {
                return null;
            }

            bool isUnpublished = pathInfo.Contains(UrlMarker_Unpublished);
            if (isUnpublished)
            {
                pathInfo = pathInfo.Replace(UrlMarker_Unpublished, string.Empty);
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
            if (IsInternalUrl(relativeUrl))
            {
                return ParseInternalUrl(relativeUrl, out urlKind);
            }

            var urlBuilder = new UrlBuilder(relativeUrl);

            // Structure of a public url:
            // http://<hostname>[/ApplicationVirtualPath]{/languageCode}[/Path to a page][/c1mode(unpublished)][/c1mode(relative)][UrlSuffix]{/PathInfo}
           

            string filePathAndPathInfo = HttpUtility.UrlDecode(urlBuilder.FullPath);
            filePathAndPathInfo = RemoveUrlMarkers(filePathAndPathInfo, urlSpace);

            string pathWithoutLanguageCode;

            IHostnameBinding hostnameBinding = urlSpace.ForceRelativeUrls ? null : GetHostnameBindings().FirstOrDefault(b => b.Hostname == urlSpace.Hostname);

            CultureInfo locale = GetCultureInfo(filePathAndPathInfo, hostnameBinding, out pathWithoutLanguageCode);
            if (locale == null)
            {
                urlKind = UrlKind.Undefined;
                return null;
            }

            var publicationScope = PublicationScope.Published;

            if (filePathAndPathInfo.Contains(UrlMarker_Unpublished))
            {
                publicationScope = PublicationScope.Unpublished;

                pathWithoutLanguageCode = pathWithoutLanguageCode.Replace(UrlMarker_Unpublished, string.Empty);
                if (pathWithoutLanguageCode == string.Empty)
                {
                    pathWithoutLanguageCode = "/";
                }
            }

            using (new DataScope(publicationScope, locale))
            {
                bool isObsolete = false;
                string pathToResolve = pathWithoutLanguageCode;

                // Supporting obsolete "*.aspx" urls
                if (!string.Equals(UrlSuffix, ".aspx", StringComparison.OrdinalIgnoreCase) 
                    && (pathToResolve.Contains(".aspx/") || pathToResolve.EndsWith(".aspx")))
                {
                    pathToResolve = pathToResolve.Replace(".aspx", UrlSuffix);
                    isObsolete = true;
                }

                PageUrlData data = ParsePagePath(pathToResolve, publicationScope, locale, hostnameBinding);
                if (data != null)
                {
                    urlKind = !isObsolete ? UrlKind.Public : UrlKind.Redirect;
                    data.QueryParameters = urlBuilder.GetQueryParameters();
                    return data;
                }

                Guid friendlyUrlPageId = ParseFriendlyUrlPath(pathWithoutLanguageCode);
                if (friendlyUrlPageId != Guid.Empty)
                {
                    urlKind = UrlKind.Friendly;
                    return new PageUrlData(friendlyUrlPageId, publicationScope, locale) {QueryParameters = urlBuilder.GetQueryParameters()};
                }
            }

            urlKind = UrlKind.Undefined;
            return null;
        }

        private Guid ParseFriendlyUrlPath(string pathWithoutLanguageCode)
        {
            if (pathWithoutLanguageCode.Length <= 1)
            {
                return Guid.Empty;
            }

            var map = GetFriendlyUrlsMap();

            string friendlyUrl1 = pathWithoutLanguageCode.ToLowerInvariant();
            string friendlyUrl2 = "~" + friendlyUrl1;
            string friendlyUrl3 = friendlyUrl1.Substring(1);

            Guid pageId;

            if (map.TryGetValue(friendlyUrl1, out pageId)
                || map.TryGetValue(friendlyUrl2, out pageId)
                || map.TryGetValue(friendlyUrl3, out pageId))
            {
                return pageId;
            }

            return Guid.Empty;
        }

        private static Hashtable<string, Guid> GetFriendlyUrlsMap()
        {
            var scopeKey = new Tuple<DataScopeIdentifier, string>(DataScopeManager.CurrentDataScope, LocalizationScopeManager.CurrentLocalizationScope.Name);

            return _friendlyUrls.GetOrAddSync(scopeKey, a =>
            {
                var result = new Hashtable<string, Guid>();
                foreach (var pair in DataFacade.GetData<IPage>().Where(p => !(p.FriendlyUrl == null || p.FriendlyUrl == string.Empty))
                    .Select(p => new {p.Id, p.FriendlyUrl}))
                {
                    result[pair.FriendlyUrl.ToLowerInvariant()] = pair.Id;
                }
                return result;
            });
        }

        private static void UpdateFriendlyUrl(IPage page)
        {
            if (string.IsNullOrEmpty(page.FriendlyUrl))
            {
                return;
            }

            var scopeKey = new Tuple<DataScopeIdentifier, string>(page.DataSourceId.DataScopeIdentifier, page.DataSourceId.LocaleScope.Name);

            Hashtable<string, Guid> friendlyUrlsMap;
            if(!_friendlyUrls.TryGetValue(scopeKey, out friendlyUrlsMap))
            {
                return;
            }

            lock (friendlyUrlsMap)
            {
                friendlyUrlsMap[page.FriendlyUrl.ToLowerInvariant()] = page.Id;
            }
        }

        private PageUrlData ParsePagePath(string pagePath, PublicationScope publicationScope, CultureInfo locale, IHostnameBinding hostnameBinding)
        {
            // Parshing what's left:
            // [/Path to a page][UrlSuffix]{/PathInfo}
            string pathInfo = null;

            bool canBePublicUrl = true;
            bool pathInfoExctracted = false;

            if (!string.IsNullOrEmpty(UrlSuffix))
            {
                string urlSuffixPlusSlash = UrlSuffix + "/";

                int suffixOffset = pagePath.IndexOf(urlSuffixPlusSlash, StringComparison.OrdinalIgnoreCase);
                if (suffixOffset > 0)
                {
                    pathInfo = pagePath.Substring(suffixOffset + UrlSuffix.Length);
                    pagePath = pagePath.Substring(0, suffixOffset);

                    pathInfoExctracted = true;
                }
                else if (pagePath.EndsWith(UrlSuffix, StringComparison.OrdinalIgnoreCase))
                {
                    pagePath = pagePath.Substring(0, pagePath.Length - UrlSuffix.Length);

                    pathInfoExctracted = true;
                }
                else
                {
                    canBePublicUrl = pagePath == "/"; // Only root page may not have a UrlSuffix
                }
            }

            if (canBePublicUrl)
            {
                Guid? pageId = TryGetPageByUrlTitlePath(pagePath, pathInfoExctracted, hostnameBinding, ref pathInfo);

                if (pageId != null && pageId != Guid.Empty)
                {
                    return new PageUrlData(pageId.Value, publicationScope, locale) { PathInfo = pathInfo};
                }
            }

            return null;
        }

        private static Guid? TryGetPageByUrlTitlePath(string pagePath, bool pathInfoExtracted, IHostnameBinding hostnameBinding, ref string pathInfo)
        {
            string[] pageUrlTitles = pagePath.Split(new[] {'/'}, StringSplitOptions.RemoveEmptyEntries);

            if (pageUrlTitles.Length == 0)
            {
                if (hostnameBinding != null)
                {
                    if (!hostnameBinding.IncludeHomePageInUrl) return hostnameBinding.HomePageId;

                    IPage rootPage = PageManager.GetPageById(hostnameBinding.HomePageId);
                    if (rootPage != null && string.IsNullOrEmpty(rootPage.UrlTitle))
                    {
                        return hostnameBinding.HomePageId;
                    }

                    return null;
                }
            }

            IEnumerable<IPage> rootPages = GetChildPages(Guid.Empty);
            if (pageUrlTitles.Length == 0)
            {
                return rootPages.Where(p => string.IsNullOrEmpty(p.UrlTitle)).Select(p => p.Id).FirstOrDefault();
            }

            string firstUrlTitle = pageUrlTitles[0];

            Guid? firstPageId = null;

            if (hostnameBinding != null)
            {
                IPage rootPage = PageManager.GetPageById(hostnameBinding.HomePageId);

                bool rootPageIsOmmited = rootPage != null && !hostnameBinding.IncludeHomePageInUrl || string.IsNullOrEmpty(rootPage.UrlTitle);
                if (rootPageIsOmmited)
                {
                    firstPageId = FindMatchingPage(rootPage.Id, firstUrlTitle);
                }
            }

            if (firstPageId == null)
            {
                IPage defaultRootPage = rootPages.FirstOrDefault(p => string.IsNullOrEmpty(p.UrlTitle));
                if (defaultRootPage != null)
                {
                    firstPageId = FindMatchingPage(defaultRootPage.Id, firstUrlTitle);
                }

                if (firstPageId == null)
                {
                    // Searching the first pageId among root pages
                    firstPageId = FindMatchingPage(Guid.Empty, firstUrlTitle);
                }
                
                if (firstPageId == null) return null;
            }

            Guid currentPageId = firstPageId.Value;

            if (pageUrlTitles.Length == 1) return currentPageId;

            for (int i = 1; i < pageUrlTitles.Length; i++)
            {
                Guid? nextPage = FindMatchingPage(currentPageId, pageUrlTitles[i]);
                if (nextPage == null)
                {
                    if (pathInfoExtracted) return null;

                    pathInfo = "/" + string.Join("/", pageUrlTitles.Skip(i));
                    return currentPageId;
                }

                currentPageId = nextPage.Value;
            }

            return currentPageId;
        }

        private static Guid? FindMatchingPage(Guid parentId, string urlTitle)
        {
            foreach (var page in GetChildPages(parentId))
            {
                if(string.Equals(page.UrlTitle, urlTitle, StringComparison.OrdinalIgnoreCase))
                {
                    return page.Id;
                }
            }

            return null;
        }

        private static IEnumerable<IPage> GetChildPages(Guid parentId)
        {
            var children = PageManager.GetChildrenIDs(parentId);

            for (int i=0; i<children.Count; i++)
            {
                var page = PageManager.GetPageById(children[i]);

                if (page != null)
                {
                    yield return page;
                }
            }
        }


        private static string RemoveUrlMarkers(string filePath, UrlSpace urlSpace)
        {
            if (urlSpace.ForceRelativeUrls && filePath.Contains(UrlMarker_RelativeUrl))
            {
                filePath = filePath.Replace(UrlMarker_RelativeUrl, string.Empty);
            }

            if (filePath == string.Empty)
            {
                filePath = "/";
            }

            return filePath;
        }

        CultureInfo GetCultureInfo(string requestPath, IHostnameBinding hostnameBinding, out string pathWithoutLanguageAndAppRoot)
        {
            int startIndex = requestPath.IndexOf('/', UrlUtils.PublicRootPath.Length) + 1;

            if (startIndex > 0 && requestPath.Length > startIndex)
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
                            pathWithoutLanguageAndAppRoot = requestPath.Substring(endIndex + 1);
                            return cultureInfo;
                        }

                        // Culture is inactive
                        pathWithoutLanguageAndAppRoot = null;
                        return null;
                    }
                }
            }

            pathWithoutLanguageAndAppRoot = requestPath.Substring(UrlUtils.PublicRootPath.Length);

            if (hostnameBinding != null && !hostnameBinding.IncludeCultureInUrl)
            {
                return new CultureInfo(hostnameBinding.Culture);
            }

            return DataLocalizationFacade.DefaultUrlMappingCulture;
        }

        public string BuildUrl(PageUrlData pageUrlData, UrlKind urlKind, UrlSpace urlSpace)
        {
            Verify.ArgumentCondition(urlKind != UrlKind.Undefined, "urlKind", "Url kind is undefined");

            /*var page = pageUrlData.Data;
            Verify.ArgumentCondition(page != null, "urlData", "Failed to get page from UrlData<IPage>");*/

            if (urlKind == UrlKind.Public)
            {
                return BuildPublicUrl(pageUrlData, urlSpace);
            }

            if (urlKind == UrlKind.Renderer)
            {
                return BuildRenderUrl(pageUrlData);
            }

            if (urlKind == UrlKind.Internal)
            {
                return BuildInternalUrl(pageUrlData);
            }

            throw new NotImplementedException("Only 'Public' and 'Internal' url types are supported.");
        }

        private string BuildPublicUrl(PageUrlData pageUrlData, UrlSpace urlSpace)
        {
            var cultureInfo = pageUrlData.LocalizationScope;
            var publicationScope = pageUrlData.PublicationScope;

            var pageUrlPath = new StringBuilder();

            using (new DataScope(publicationScope, cultureInfo))
            {
                if (!BuildPageUrlPath(pageUrlData.PageId, cultureInfo, urlSpace, pageUrlPath))
                {
                    return null;
                }
            }

            if (publicationScope == PublicationScope.Unpublished)
            {
                AppendUrlPart(pageUrlPath, UrlMarker_Unpublished);
            }

            if (urlSpace.ForceRelativeUrls)
            {
                AppendUrlPart(pageUrlPath, UrlMarker_RelativeUrl);
            }

            if (!string.IsNullOrEmpty(UrlSuffix) 
                && pageUrlPath[pageUrlPath.Length - 1] != '/')
            {
                pageUrlPath.Append(UrlSuffix);
            }

            if (!string.IsNullOrEmpty(pageUrlData.PathInfo))
            {
                AppendPathInfo(pageUrlPath, pageUrlData.PathInfo);
            }


            string url = pageUrlPath.ToString();

            if (pageUrlData.QueryParameters != null)
            {
                var urlWithQuery = new UrlBuilder(url);
                urlWithQuery.AddQueryParameters(pageUrlData.QueryParameters);

                return urlWithQuery;
            }

            return url;
        }

        private bool BuildPageUrlPath(Guid pageId, CultureInfo culture, UrlSpace urlSpace, StringBuilder result)
        {
            IPage page = PageManager.GetPageById(pageId);
            if (page == null)
            {
                return false;
            }

            Guid parentPageId = PageManager.GetParentId(pageId);
            if (parentPageId == Guid.Empty)
            {
                return BuildRootPageUrl(page, culture, urlSpace, result);
            }

            if (!BuildPageUrlPath(parentPageId, culture, urlSpace, result))
            {
                return false;
            }

            Verify.That(result.Length >= 1, "Parent page urls is empty");

            AppendSlash(result);
            result.Append(page.UrlTitle);

            return true;
        }

        private bool BuildRootPageUrl(IPage rootPage, CultureInfo cultureInfo, UrlSpace urlSpace, StringBuilder result)
        {
            var bindings = GetHostnameBindings();

            bool knownHostname = urlSpace.Hostname != null
                                 && bindings.Any(b => b.Hostname == urlSpace.Hostname);

            IHostnameBinding hostnameBinding = null;

            // Searching for a hostname binding matching either the root page, or current hostname/UrlSpace
            if (!urlSpace.ForceRelativeUrls && knownHostname)
            {
                Guid pageId = rootPage.Id;
                string host = urlSpace.Hostname;
                string cultureName = cultureInfo.Name;

                hostnameBinding =
                    bindings.FirstOrDefault(b => b.HomePageId == pageId && b.Hostname == host && b.Culture == cultureName)
                    ?? bindings.FirstOrDefault(b => b.HomePageId == pageId && b.Culture == cultureName)
                    ?? bindings.FirstOrDefault(b => b.HomePageId == pageId && b.Hostname == host)
                    ?? bindings.FirstOrDefault(b => b.HomePageId == pageId);

                if (hostnameBinding != null)
                {
                    if (hostnameBinding.Hostname != urlSpace.Hostname)
                    {
                        result.Append("http://").Append(hostnameBinding.Hostname);
                    }
                }
                else
                {
                    hostnameBinding = bindings.FirstOrDefault(b => b.Hostname == urlSpace.Hostname);
                }
            }

            result.Append(UrlUtils.PublicRootPath);

            string cultureUrlMapping = DataLocalizationFacade.GetUrlMappingName(cultureInfo);

            if (cultureUrlMapping != string.Empty
                && (hostnameBinding == null 
                    || hostnameBinding.IncludeCultureInUrl 
                    || hostnameBinding.Culture != cultureInfo.Name))
            {
                result.Append("/").Append(cultureUrlMapping);
            }


            AppendSlash(result);

            if (rootPage.UrlTitle != string.Empty 
                && (hostnameBinding == null || hostnameBinding.IncludeHomePageInUrl || hostnameBinding.HomePageId != rootPage.Id))
            {
                result.Append(rootPage.UrlTitle);
            }

            return true;
        }

        private static StringBuilder AppendSlash(StringBuilder sb)
        {
            if (sb.Length == 0
                || sb[sb.Length - 1] != '/')
            {
                sb.Append('/');
            }

            return sb;
        }

        private static StringBuilder AppendUrlPart(StringBuilder sb, string urlPart)
        {
            bool endsWithSlash = sb.Length != 0 && sb[sb.Length - 1] == '/';
            bool startsWithSlash = urlPart.StartsWith("/", StringComparison.Ordinal);

            if (endsWithSlash != startsWithSlash)
            {
                return sb.Append(urlPart);
            }

            if (endsWithSlash)
            {
                return sb.Append(urlPart, 1, urlPart.Length - 1);
            }

            return sb.Append('/').Append(urlPart);
        }

        private static StringBuilder AppendPathInfo(StringBuilder sb, string pathInfo)
        {
            if (string.IsNullOrEmpty(pathInfo))
            {
                return sb;
            }

            Verify.That(pathInfo[0] == '/', "pathInfo has to start with '/' character");

            bool endsWithSlash = sb.Length != 0 && sb[sb.Length - 1] == '/';
            if (!endsWithSlash)
            {
                sb.Append('/');
            }

            var parts = pathInfo.Split('/');

            bool isFirst = true;
            foreach (var pathInfoPart in parts.Skip(1))
            {
                if (!isFirst)
                {
                    sb.Append('/');
                }

                sb.Append(UrlBuilder.DefaultHttpEncoder.UrlEncode(pathInfoPart));

                isFirst = false;
            }

            return sb;
        }

        private static string BuildRenderUrl(PageUrlData pageUrlData)
        {
            var cultureInfo = pageUrlData.LocalizationScope;
            string legacyScopeName = GetLegacyPublicationScopeIdentifier(pageUrlData.PublicationScope);

            string basePath = UrlUtils.ResolvePublicUrl("Renderers/Page.aspx");
            var result = new UrlBuilder(basePath);

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

        private static string BuildInternalUrl(PageUrlData pageUrlData)
        {
            var cultureInfo = pageUrlData.LocalizationScope;
            var publicationScope = pageUrlData.PublicationScope;

            var result = new UrlBuilder("~/page(" + pageUrlData.PageId + ")");

            string pathInfo = string.Empty;

            if (publicationScope == PublicationScope.Unpublished)
            {
                pathInfo = UrlMarker_Unpublished;
            }

            if (!pageUrlData.PathInfo.IsNullOrEmpty())
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

        private static string GetLegacyPublicationScopeIdentifier(PublicationScope publicationScope)
        {
            return publicationScope == PublicationScope.Published ? "public" : "administrated";
        }
    }
}
