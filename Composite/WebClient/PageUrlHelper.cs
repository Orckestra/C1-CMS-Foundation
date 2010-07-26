using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Xml.Linq;
using Composite.Collections.Generic;
using Composite.Data;
using Composite.Data.Types;
using Composite.Logging;
using Composite.Renderings.Page;
using Composite.StringExtensions;
using System.Web;
using System.Collections.Specialized;


namespace Composite.WebClient
{
    public sealed class PageUrlOptions
    {
        public PageUrlOptions(string dataScopeIdentifierName, CultureInfo locale, Guid pageId) :
            this(dataScopeIdentifierName, locale, pageId, UrlType.Undefined)
        {
        }

        public PageUrlOptions(string dataScopeIdentifierName, CultureInfo locale, Guid pageId, UrlType urlType)
        {
            Verify.ArgumentNotNullOrEmpty(dataScopeIdentifierName, "dataScopeIdentifierName");
            Verify.ArgumentNotNull(locale, "locale");
            Verify.ArgumentCondition(pageId != Guid.Empty, "pageId", "PageId should not be an empty guid.");

            DataScopeIdentifierName = dataScopeIdentifierName;
            Locale = locale;
            PageId = pageId;
            UrlType = urlType;
        }

        public UrlType UrlType { get; private set; }
        public string DataScopeIdentifierName { get; private set; }
        public CultureInfo Locale { get; private set; }
        public Guid PageId { get; private set; }

        public DataScopeIdentifier DataScopeIdentifier
        {
            get { return DataScopeIdentifier.Deserialize(DataScopeIdentifierName); }
        }

        public IPage GetPage()
        {
            var dataScope = DataScopeIdentifier.Deserialize(DataScopeIdentifierName);
            using (new DataScope(dataScope, Locale))
            {
                return PageManager.GetPageById(PageId);
            }
        }
    }

    public enum UrlType
    {
        Undefined = 0,
        Public,
        Internal,
        Friendly
    }

    public static class PageUrlHelper
    {
        private static readonly string LogTitle = "PageUrlHelper";
        // private static readonly string QuidCapturingRegEx = @"{?(?<PageId>([a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}))}?";
        // private static readonly string RenredingLinkRegExPattern = string.Format(@"({0}/Renderers/)?Page.aspx\?(?<UrlParamsBefore>([^""']*))?pageId={1}(&amp;)?(?<UrlParamsAfter>([^""']*))", UrlUtils.PublicRootPath, QuidCapturingRegEx);

        private static readonly string RenredingLinkRegExPattern = string.Format(@"{0}/Renderers/Page.aspx([^\""']*)", UrlUtils.PublicRootPath);
        private static readonly Regex RenredingLinkRegex = new Regex(RenredingLinkRegExPattern);

        internal class UrlBuildingCache
        {
            public Hashtable<Guid, string> FolderPaths = new Hashtable<Guid, string>();
        }

        public static PageUrlOptions ParseUrl(string url)
        {
            var urlString = new UrlString(url);
            return IsPublicUrl(urlString) ? ParsePublicUrl(url) : ParseInternalUrl(url);
        }

        public static PageUrlOptions ParseUrl(string url, out NameValueCollection notUsedQueryStringParameters)
        {
            return IsPublicUrl(url) 
                ? ParsePublicUrl(url, out notUsedQueryStringParameters)
                : ParseInternalUrl(url, out notUsedQueryStringParameters);
        }

        public static PageUrlOptions ParseInternalUrl(string url)
        {
            NameValueCollection notUsedQueryStringParameters;
            return ParseInternalUrl(url, out notUsedQueryStringParameters);
        }


        public static PageUrlOptions ParseInternalUrl(string url, out NameValueCollection notUsedQueryStringParameters)
        {
            var urlString = new UrlString(url);

            return ParseQueryString(urlString.GetQueryParameters(), out notUsedQueryStringParameters);
        }



        public static PageUrlOptions ParsePublicUrl(string url)
        {
            NameValueCollection notUsedQueryParameters;
            return ParsePublicUrl(url, out notUsedQueryParameters);
        }



        public static PageUrlOptions ParsePublicUrl(string url, out NameValueCollection notUsedQueryParameters)
        {
            var urlString = new UrlString(url);

            notUsedQueryParameters = null;
            if (!IsPublicUrl(urlString.FilePath))
            {
                return null;
            }

            string requestPath;
            Uri uri;

            if (Uri.TryCreate(urlString.FilePath, UriKind.Absolute, out uri))
            {
                requestPath = HttpUtility.UrlDecode(uri.AbsolutePath).ToLower();
            }
            else
            {
                requestPath = urlString.FilePath.ToLower();
            }

            string requestPathWithoutUrlMappingName;
            CultureInfo locale = GetCultureInfo(requestPath, out requestPathWithoutUrlMappingName);

            if (locale == null)
            {
                return null;
            }

            string dataScopeName = urlString["dataScope"];

            if(dataScopeName.IsNullOrEmpty())
            {
                dataScopeName = DataScopeIdentifier.GetDefault().Name;
            }

            Guid pageId = Guid.Empty;
            using (new DataScope(DataScopeIdentifier.Deserialize(dataScopeName), locale))
            {
                if (PageStructureInfo.GetLowerCaseUrlToIdLookup().TryGetValue(requestPath.ToLower(), out pageId) == false)
                {
                    return null;
                }
            }

            urlString["dataScope"] = null;

            notUsedQueryParameters = urlString.GetQueryParameters();

            return new PageUrlOptions(dataScopeName, locale, pageId, UrlType.Public);
        }



        public static CultureInfo GetCultureInfo(string requestPath)
        {
            string newRequestPath;

            return GetCultureInfo(requestPath, out newRequestPath);
        }



        public static CultureInfo GetCultureInfo(string requestPath, out string requestPathWithoutUrlMappingName)
        {
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

                        if (exists == true)
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



        public static bool IsPublicUrl(string relativePath)
        {
            relativePath = relativePath.ToLower();

            return relativePath.Contains(".aspx")
                   && !relativePath.Contains("/renderers/page.aspx")
                   && !IsAdminPath(relativePath);
        }

        public static bool IsPublicUrl(UrlString url)
        {
            return IsPublicUrl(url.FilePath);
        }

        public static bool IsInternalUrl(string url)
        {
            return IsInternalUrl(new UrlString(url));
        }

        public static bool IsInternalUrl(UrlString url)
        {
            return url.FilePath.EndsWith("Renderers/Page.aspx", true);
        }


        public static UrlString BuildUrl(PageUrlOptions options)
        {
            Verify.ArgumentNotNull(options, "options");
            Verify.ArgumentCondition(options.UrlType != UrlType.Undefined, "options", "Url type is undefined");

            return BuildUrl(options.UrlType, options);
        }

        public static bool IsAdminPath(string relativeUrl)
        {
            return string.Compare(relativeUrl, UrlUtils.AdminRootPath, true) == 0
                   || relativeUrl.StartsWith(UrlUtils.AdminRootPath + "/", true);
        }

        public static UrlString BuildUrl(UrlType urlType, PageUrlOptions options)
        {
            Verify.ArgumentNotNull(options, "options");

            Verify.ArgumentCondition(urlType != UrlType.Undefined, "urlType", "Url type is undefined"); 

            if (urlType == UrlType.Public)
            {
                var lookupTable = PageStructureInfo.GetIdToUrlLookup(options.DataScopeIdentifierName, options.Locale);

                if (!lookupTable.ContainsKey(options.PageId))
                {
                    return null;
                }

                var publicUrl = new UrlString(lookupTable[options.PageId]);
                if(options.DataScopeIdentifierName != DataScopeIdentifier.GetDefault().Name)
                {
                    publicUrl["dataScope"] = options.DataScopeIdentifierName;
                }

                return publicUrl;
            }

            if(urlType == UrlType.Internal)
            {
                string basePath = UrlUtils.ResolvePublicUrl("Renderers/Page.aspx");
                UrlString result = new UrlString(basePath);

                result["pageId"] = options.PageId.ToString();
                result["cultureInfo"] = options.Locale.ToString();
                result["dataScope"] = options.DataScopeIdentifierName;

                return result;
            }

            throw new NotImplementedException("BuildUrl function suppors only 'Public' and 'Unternal' urls.");
        }

        public static bool TryParseFriendlyUrl(string relativeUrl, out PageUrlOptions urlOptions)
        {
            if (IsAdminPath(relativeUrl))
            {
                urlOptions = null;
                return false;
            }

            string path;
            CultureInfo cultureInfo = GetCultureInfo(relativeUrl, out path);
            if (cultureInfo == null)
            {
                urlOptions = null;
                return false;
            }

            string loweredFriendlyPath = path.ToLower();

            // Getting the site map
            IEnumerable<XElement> siteMap;
            DataScopeIdentifier dataScope = DataScopeIdentifier.GetDefault();
            using (new DataScope(dataScope, cultureInfo))
            {
                siteMap = PageStructureInfo.GetSiteMap();
            }

            // TODO: Optimize
            XAttribute matchingAttributeNode = siteMap.DescendantsAndSelf()
                        .Attributes("FriendlyUrl")
                        .Where(f => f.Value.ToLower() == loweredFriendlyPath).FirstOrDefault();
            
            if(matchingAttributeNode == null)
            {
                urlOptions = null;
                return false;
            }
            
            XElement pageNode = matchingAttributeNode.Parent;

            XAttribute pageIdAttr = pageNode.Attributes("Id").FirstOrDefault();
            Verify.IsNotNull(pageIdAttr, "Failed to get 'Id' attribute from the site map"); 
            Guid pageId = new Guid(pageIdAttr.Value);

            urlOptions = new PageUrlOptions(dataScope.Name, cultureInfo, pageId, UrlType.Friendly);
            return true;
        }

        /// <summary>
        /// To be used for recursive building of page url-s.
        /// </summary>
        /// <param name="page"></param>
        /// <param name="pageStructureBuilderCache"></param>
        /// <returns></returns>
        internal static void BuildUrlInternal(IPage page, DataScopeIdentifier dataScopeIdentifier, CultureInfo cultureInfo, Guid parentPageId, out string url, out string lookupUrl, UrlBuildingCache urlBuildingCache)
        {
            Verify.ArgumentNotNull(page, "page");
            Verify.ArgumentNotNull(dataScopeIdentifier, "dataScopeIdentifier");
            Verify.ArgumentNotNull(cultureInfo, "cultureInfo");
            Verify.ArgumentNotNull(urlBuildingCache, "urlBuildingCache");

            string argsAppend = string.Empty;

            string parentPath;
            if (parentPageId == Guid.Empty)
            {
                parentPath = string.Empty;
            } 
            else
            {
                Verify.That(urlBuildingCache.FolderPaths.ContainsKey(parentPageId), "Method BuildUrlInternal() should be called for parent page before running for childildren, so 'urlBuildingCache' parameter will contains parent pages data.");
                parentPath = urlBuildingCache.FolderPaths[parentPageId];
            }


            string folderPath = string.Format("{0}/{1}", parentPath, page.UrlTitle);

            urlBuildingCache.FolderPaths.Add(page.Id, folderPath);

            string baseUrl;
            string urlMappingName = DataLocalizationFacade.GetUrlMappingName(LocalizationScopeManager.CurrentLocalizationScope);
            if (urlMappingName != "")
            {
                baseUrl = string.Format("{0}/{1}{2}", UrlUtils.PublicRootPath, urlMappingName, folderPath);
            }
            else
            {
                baseUrl = UrlUtils.PublicRootPath + folderPath;
            }

            lookupUrl = string.Format("{0}.aspx{1}", baseUrl, argsAppend);


            url = lookupUrl;
            if (dataScopeIdentifier.Name != DataScopeIdentifier.GetDefault().Name)
            {
                url += "?dataScope=" + dataScopeIdentifier.Name;
            }
        }

        /// <summary>
        /// To be used for handling 'internal' links.
        /// </summary>
        /// <param name="queryString">Query string.</param>
        /// <param name="notUsedQueryParameters">Query string parameters that were not used.</param>
        /// <returns></returns>
        public static PageUrlOptions ParseQueryString(NameValueCollection queryString, out NameValueCollection notUsedQueryParameters)
        {
            if (string.IsNullOrEmpty(queryString["pageId"])) throw new InvalidOperationException("Illigal query string. Expected param 'pageId' with guid.");

            string dataScopeName = queryString["dataScope"] ?? DataScopeIdentifier.PublicName;

            string cultureInfoStr = queryString["cultureInfo"];
            if(cultureInfoStr.IsNullOrEmpty())
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
                if(cultureInfo == CultureInfo.InvariantCulture)
                {
                    cultureInfo = DataLocalizationFacade.DefaultLocalizationCulture;
                }
            }

            Guid pageId = new Guid(queryString["pageId"]);

            notUsedQueryParameters = new NameValueCollection();

            var queryKeys = new[] { "pageId", "dataScope", "cultureInfo", "CultureInfo" };
            var notUsedKeys = queryString.AllKeys.Where(key => !queryKeys.Contains(key, StringComparer.InvariantCultureIgnoreCase));

            foreach (string key in notUsedKeys)
            {
                notUsedQueryParameters.Add(key, queryString[key]);
            }

            return new PageUrlOptions(dataScopeName, cultureInfo, pageId, UrlType.Internal);
        }


        public static string ChangeRenderingPageUrlsToPublic(string html)
        {
            StringBuilder result = null;

            IEnumerable<Match> pageUrlMatchCollection = RenredingLinkRegex.Matches(html).OfType<Match>().Reverse();

            var resolvedURLs = new Dictionary<string, string>();
            foreach (Match pageUrlMatch in pageUrlMatchCollection)
            {
                string internalPageUrl = pageUrlMatch.Value;
                string publicPageUrl;

                if (!resolvedURLs.TryGetValue(internalPageUrl, out publicPageUrl))
                {
                    PageUrlOptions pageUrlOptions = null;

                    NameValueCollection notUsedQueryStringParameters = null;

                    try
                    {
                        pageUrlOptions = ParseUrl(internalPageUrl, out notUsedQueryStringParameters);
                    }
                    catch
                    {
                        LoggingService.LogWarning(LogTitle, "Failed to parse url '{0}'".FormatWith(internalPageUrl));
                        resolvedURLs.Add(internalPageUrl, null); 
                        continue;
                    }

                    if (pageUrlOptions == null)
                    {
                        resolvedURLs.Add(internalPageUrl, null); 
                        continue;
                    }

                    UrlString newUrl = BuildUrl(UrlType.Public, pageUrlOptions);
                    if (newUrl == null)
                    {
                        // We have this situation if page does not exist
                        resolvedURLs.Add(internalPageUrl, null); 
                        continue;
                    }

                    if (notUsedQueryStringParameters != null)
                    {
                        newUrl.AddQueryParameters(notUsedQueryStringParameters);
                    }

                    newUrl.PathInfo = GetPathInfoFromInternalUrl(internalPageUrl);

                    publicPageUrl = newUrl.ToString();

                    // Encoding xml attribute value
                    publicPageUrl = publicPageUrl.Replace("&", "&amp;");

                    resolvedURLs.Add(internalPageUrl, publicPageUrl); 
                }
                else
                {
                    if(publicPageUrl == null) continue;
                }

                if (result == null)
                {
                    result = new StringBuilder(html);
                }

                result.Remove(pageUrlMatch.Index, pageUrlMatch.Length);
                result.Insert(pageUrlMatch.Index, publicPageUrl);
            }

            return result != null ? result.ToString() : html;
        }

        /// <summary>
        /// "PathInfo" it is a part between aspx page path
        /// </summary>
        /// <param name="url"></param>
        /// <returns></returns>
        internal static string GetPathInfoFromInternalUrl(string url)
        {
            // From string ".../Renderers/Page.aspx/AAAA/VVV/CCC?pageId=..." will extract "/AAAA/VVV/CCC"
            int aspxOffset = url.IndexOf(".aspx");

            if(url[aspxOffset + 5] == '?') return null;

            return url.Substring(aspxOffset + 5, url.IndexOf('?', aspxOffset + 6) - aspxOffset - 5);
        }
    }
}
