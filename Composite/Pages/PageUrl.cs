using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Xml.Linq;
using Composite.Data;
using Composite.Data.Types;
using Composite.Renderings.Page;
using Composite.WebClient;
using Composite.Extensions;


namespace Composite.Pages
{
    public enum PageUrlType
    {
        Undefined = 0,
        Public = 1,
        Internal = 2,
        Friendly = 3
    }

    public sealed class PageUrl
    {
        public PageUrl(PublicationScope publicationScope, CultureInfo locale, Guid pageId) :
            this(publicationScope, locale, pageId, PageUrlType.Undefined)
        {
        }

        public PageUrl(PublicationScope publicationScope, CultureInfo locale, Guid pageId, PageUrlType urlType)
        {
            Verify.ArgumentNotNull(locale, "locale");
            Verify.ArgumentCondition(pageId != Guid.Empty, "pageId", "PageId should not be an empty guid.");

            this.PublicationScope = publicationScope;
            Locale = locale;
            PageId = pageId;
            UrlType = urlType;
        }

        public PageUrlType UrlType { get; private set; }
        public PublicationScope PublicationScope { get; private set; }
        public CultureInfo Locale { get; private set; }
        public Guid PageId { get; private set; }

        public IPage GetPage()
        {
            using(Storage.Open(PublicationScope, Locale))
            {
                return Data.Types.PageManager.GetPageById(PageId);
            }
        }

        public UrlBuilder Build()
        {
            Verify.That(UrlType != PageUrlType.Undefined, "Url type is undefined");

            return Build(UrlType);
        }

        public UrlBuilder Build(PageUrlType urlType)
        {
            Verify.ArgumentCondition(urlType != PageUrlType.Undefined, "urlType", "Url type is undefined");

            string legasyScopeName = GetLegasyPublicationScopeIdentifier(PublicationScope);

            if (urlType == PageUrlType.Public)
            {
                var lookupTable = PageStructureInfo.GetIdToUrlLookup(legasyScopeName, Locale);

                if (!lookupTable.ContainsKey(PageId))
                {
                    return null;
                }

                var publicUrl = new UrlBuilder(lookupTable[PageId]);
                if (PublicationScope != PublicationScope.Public)
                {
                    publicUrl["dataScope"] = GetLegasyPublicationScopeIdentifier(PublicationScope);
                }

                return publicUrl;
            }

            if (urlType == PageUrlType.Internal)
            {
                string basePath = UrlUtils.ResolvePublicUrl("Renderers/Page.aspx");
                UrlBuilder result = new UrlBuilder(basePath);

                result["pageId"] = PageId.ToString();
                result["cultureInfo"] = Locale.ToString();
                result["dataScope"] = GetLegasyPublicationScopeIdentifier(PublicationScope);

                return result;
            }

            throw new NotImplementedException("Only 'Public' and 'Internal' url types are supported.");
        }

        public static PageUrl Parse(string url)
        {
            NameValueCollection queryParameters;

            return Parse(url, out queryParameters);
        }

        public static PageUrl Parse(string url, out NameValueCollection queryParameters)
        {
            Verify.ArgumentNotNull(url, "url");

            var urlBuilder = new UrlBuilder(url);
            return IsInternalUrl(urlBuilder)
                       ? ParseInternalUrl(urlBuilder, out queryParameters)
                       : ParsePublicUrl(urlBuilder, out queryParameters);
        }

        internal static PageUrl ParsePublicUrl(UrlBuilder urlBuilder, out NameValueCollection notUsedQueryParameters)
        {
            notUsedQueryParameters = null;

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
            CultureInfo locale = GetCultureInfo(requestPath, out requestPathWithoutUrlMappingName);

            if (locale == null)
            {
                return null;
            }

            PublicationScope publicationScope = PublicationScope.Public;

            string dataScopeName = urlBuilder["dataScope"];
            if (!dataScopeName.IsNullOrEmpty() && string.Compare(dataScopeName, DataScopeIdentifier.AdministratedName, true) == 0)
            {
                publicationScope = PublicationScope.Internal;
            }

            Guid pageId = Guid.Empty;
            using (new DataScope(DataScopeIdentifier.FromPublicationScope(publicationScope), locale))
            {
                if (PageStructureInfo.GetLowerCaseUrlToIdLookup().TryGetValue(requestPath.ToLower(), out pageId) == false)
                {
                    return null;
                }
            }

            notUsedQueryParameters = new NameValueCollection(urlBuilder.GetQueryParameters());
            notUsedQueryParameters.Remove("dataScope");

            return new PageUrl(publicationScope, locale, pageId, PageUrlType.Public);
        }

        internal static CultureInfo GetCultureInfo(string requestPath, out string requestPathWithoutUrlMappingName)
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

        internal static PageUrl ParseInternalUrl(UrlBuilder urlBuilder, out NameValueCollection notUsedQueryStringParameters)
        {
            return ParseQueryString(urlBuilder.GetQueryParameters(), out notUsedQueryStringParameters);
        }

        /// <summary>
        /// To be used for handling 'internal' links.
        /// </summary>
        /// <param name="queryString">Query string.</param>
        /// <param name="notUsedQueryParameters">Query string parameters that were not used.</param>
        /// <returns></returns>
        internal static PageUrl ParseQueryString(NameValueCollection queryString, out NameValueCollection notUsedQueryParameters)
        {
            if (string.IsNullOrEmpty(queryString["pageId"])) throw new InvalidOperationException("Illigal query string. Expected param 'pageId' with guid.");

            string dataScopeName = queryString["dataScope"];

            PublicationScope publicationScope = PublicationScope.Public;

            if(dataScopeName != null 
                && string.Compare(dataScopeName, DataScopeIdentifier.AdministratedName, true) == 0)
            {
                publicationScope = PublicationScope.Internal;
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

            notUsedQueryParameters = new NameValueCollection();

            var queryKeys = new[] { "pageId", "dataScope", "cultureInfo", "CultureInfo" };
            var notUsedKeys = queryString.AllKeys.Where(key => !queryKeys.Contains(key, StringComparer.InvariantCultureIgnoreCase));

            foreach (string key in notUsedKeys)
            {
                notUsedQueryParameters.Add(key, queryString[key]);
            }

            return new PageUrl(publicationScope, cultureInfo, pageId, PageUrlType.Internal);
        }

        internal static bool TryParseFriendlyUrl(string relativeUrl, out PageUrl pageUrl)
        {
            string path;
            CultureInfo cultureInfo = GetCultureInfo(relativeUrl, out path);
            if (cultureInfo == null)
            {
                pageUrl = null;
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

            if (matchingAttributeNode == null)
            {
                pageUrl = null;
                return false;
            }

            XElement pageNode = matchingAttributeNode.Parent;

            XAttribute pageIdAttr = pageNode.Attributes("Id").FirstOrDefault();
            Verify.IsNotNull(pageIdAttr, "Failed to get 'Id' attribute from the site map");
            Guid pageId = new Guid(pageIdAttr.Value);

            pageUrl = new PageUrl(dataScope.ToPublicationScope(), cultureInfo, pageId, PageUrlType.Friendly);
            return true;
        }

        internal static bool IsInternalUrl(string url)
        {
            return IsInternalUrl(new UrlBuilder(url));
        }

        internal static bool IsInternalUrl(UrlBuilder url)
        {
            return url.FilePath.EndsWith("Renderers/Page.aspx", true);
        }

        private static string GetLegasyPublicationScopeIdentifier(PublicationScope publicationScope)
        {
            return publicationScope == PublicationScope.Public ? "public" : "administrated";
        }
    }
}
