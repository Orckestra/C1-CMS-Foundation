using System;
using System.Collections.Specialized;
using System.Diagnostics.CodeAnalysis;
using System.Globalization;
using System.Linq;
using Composite.Core.Routing;
using Composite.Data.Types;
using Composite.Core.WebClient;
using Composite.Core.Extensions;
using Composite.Core;


namespace Composite.Data
{
    /// <summary>
    /// Page url type
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    [Obsolete("Use Composite.Core.Routing namespace for working with page urls")]
    public enum PageUrlType
    {
        /// <exclude />
        Undefined = 0,

        /// <summary>
        /// A main url by with a C1 page is accessed. F.e. "/Home/About.aspx"
        /// </summary>
        Public = 1,
        /// <summary>
        /// A main url by with a C1 page is accessed. F.e. "/Home/About.aspx"
        /// </summary>
        [Obsolete("Use 'Public' instead")]
        Published = 1,

        /// <summary>
        /// Unpublihed reference to a page. F.e. "/Renderers/Page.aspx?id=7446ceda-df90-49f0-a183-4e02ed6f6eec"
        /// </summary>
        Internal = 2,
        /// <summary>
        /// Unpublihed reference to a page. F.e. "/Renderers/Page.aspx?id=7446ceda-df90-49f0-a183-4e02ed6f6eec"
        /// </summary>
        [Obsolete("Use 'Internal' instead")]
        Unpublished = 2,

        /// <summary>
        /// Friendly url. A short url, by accessing which C1 will make a redirect to related "public" url
        /// </summary>
        Friendly = 3
    }



    /// <summary>
    /// Represents a page url
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [Obsolete("Use Composite.Core.Routing.PageUrls")]
    public sealed class PageUrl
    {
        /// <exclude />
        public PageUrl(PublicationScope publicationScope, CultureInfo locale, Guid pageId) :
            this(publicationScope, locale, pageId, PageUrlType.Undefined)
        {
        }


        /// <exclude />
        public PageUrl(PublicationScope publicationScope, CultureInfo locale, Guid pageId, PageUrlType urlType)
        {
            Verify.ArgumentNotNull(locale, "locale");
            Verify.ArgumentCondition(pageId != Guid.Empty, "pageId", "PageId should not be an empty guid.");

            this.PublicationScope = publicationScope;
            Locale = locale;
            PageId = pageId;
            UrlType = urlType;
        }

        /// <summary>
        /// Gets the type of the URL.
        /// </summary>
        /// <value>The type of the URL.</value>
        public PageUrlType UrlType { get; private set; }

        /// <summary>
        /// Gets the publication scope.
        /// </summary>
        /// <value>The publication scope.</value>
        public PublicationScope PublicationScope { get; private set; }

        /// <summary>
        /// Gets the locale.
        /// </summary>
        /// <value>The locale.</value>
        public CultureInfo Locale { get; private set; }

        /// <summary>
        /// Gets the page id.
        /// </summary>
        /// <value>The page id.</value>
        public Guid PageId { get; private set; }

        /// <summary>
        /// Gets the page.
        /// </summary>
        /// <returns></returns>
        public IPage GetPage()
        {
            using(new DataConnection(PublicationScope, Locale))
            {
                return Data.PageManager.GetPageById(PageId);
            }
        }

        /// <summary>
        /// Builds a url.
        /// </summary>
        /// <returns></returns>
        public UrlBuilder Build()
        {
            Verify.That(UrlType != PageUrlType.Undefined, "Url type is undefined");

            return Build(UrlType);
        }

        /// <summary>
        /// Builds a url of the the specified URL type.
        /// </summary>
        /// <param name="urlType">Type of the URL.</param>
        /// <returns></returns>
        public UrlBuilder Build(PageUrlType urlType)
        {
            IPage page = GetPage();
            if(page == null)
            {
                return null;
            }

            UrlData<IPage> urlData = new UrlData<IPage>(page);

            string url = PageUrls.BuildUrl(urlData, ToUrlKind(urlType), new UrlSpace());
            return url != null ? new UrlBuilder(url) : null;
        }

        private static UrlKind ToUrlKind(PageUrlType pageUrlType)
        {
            switch (pageUrlType)
            {
                case PageUrlType.Public:
                    return UrlKind.Public;
                case PageUrlType.Internal:
                    return UrlKind.Internal;
                case PageUrlType.Friendly:
                    return UrlKind.Friendly;
            }
            return UrlKind.Undefined;
        }

        /// <summary>
        /// Parses the specified URL.
        /// </summary>
        /// <param name="url">The URL.</param>
        public static PageUrl Parse(string url)
        {
            NameValueCollection queryParameters;

            return Parse(url, out queryParameters);
        }

        /// <summary>
        /// Parses the specified URL.
        /// </summary>
        /// <param name="url">The URL.</param>
        /// <param name="queryParameters">The query parameters that weren't used to define which page was accessed.</param>
        /// <returns></returns>
        [SuppressMessage("Microsoft.Globalization", "CA1304:SpecifyCultureInfo", MessageId = "System.String.Compare(System.String,System.String,System.Boolean)")]
        [SuppressMessage("Microsoft.Design", "CA1021:AvoidOutParameters", MessageId = "1#")]
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
            UrlData<IPage> urlData = PageUrls.ParseUrl(urlBuilder.ToString());

            if (urlData == null || urlData.UrlKind != UrlKind.Public)
            {
                notUsedQueryParameters = null;
                return null;
            }

            notUsedQueryParameters = urlData.QueryParameters;

            IPage page = urlData.Data;

            return new PageUrl(page.DataSourceId.PublicationScope, page.DataSourceId.LocaleScope, page.Id, PageUrlType.Public);
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

            PublicationScope publicationScope = PublicationScope.Published;

            if(dataScopeName != null 
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

            notUsedQueryParameters = new NameValueCollection();

            var queryKeys = new[] { "pageId", "dataScope", "cultureInfo", "CultureInfo" };

            var notUsedKeys = queryString.AllKeys.Where(key => !queryKeys.Contains(key, StringComparer.OrdinalIgnoreCase));

            foreach (string key in notUsedKeys)
            {
                notUsedQueryParameters.Add(key, queryString[key]);
            }

            return new PageUrl(publicationScope, cultureInfo, pageId, PageUrlType.Internal);
        }



        /// <summary>
        /// Looks for a friendly URL and set pageUrl if found.
        /// </summary>
        /// <param name="relativeUrl">The string to match to a friendly URL</param>
        /// <param name="pageUrl">The matching page, if a match was found. Otherwise null.</param>
        /// <returns>True if a friendly URL match was found</returns>
        public static bool TryParseFriendlyUrl(string relativeUrl, out PageUrl pageUrl)
        {
            UrlData<IPage> urlData = PageUrls.ParseUrl(relativeUrl, new UrlSpace());

            if (urlData == null || urlData.UrlKind != UrlKind.Friendly)
            {
                pageUrl = null;
                return false;
            }

            IPage page = urlData.Data;

            pageUrl = new PageUrl(page.DataSourceId.PublicationScope, page.DataSourceId.LocaleScope, page.Id, PageUrlType.Friendly);
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
    }
}
