using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Web;
using System.Xml.Linq;
using Composite.Core.Logging;
using Composite.Core.Routing;
using Composite.Data;
using Composite.Data.Types;
using Composite.Core.WebClient.Renderings.Page;
using Composite.Core.Extensions;
//using PageManager = Composite.Data.PageManager;


namespace Composite.Core.WebClient
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [Obsolete("Use 'Composite.Data' namespace instead")]
    public sealed class PageUrlOptions
    {
        /// <exclude />
        public PageUrlOptions(string dataScopeIdentifierName, CultureInfo locale, Guid pageId) :
            this(dataScopeIdentifierName, locale, pageId, UrlType.Undefined)
        {
        }



        /// <exclude />
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


        /// <exclude />
        public UrlType UrlType { get; private set; }

        /// <exclude />
        public string DataScopeIdentifierName { get; private set; }

        /// <exclude />
        public CultureInfo Locale { get; private set; }

        /// <exclude />
        public Guid PageId { get; private set; }


        /// <exclude />
        public DataScopeIdentifier DataScopeIdentifier
        {
            get { return DataScopeIdentifier.Deserialize(DataScopeIdentifierName); }
        }


        /// <exclude />
        public IPage GetPage()
        {
            var dataScope = DataScopeIdentifier.Deserialize(DataScopeIdentifierName);
            using (new DataScope(dataScope, Locale))
            {
                return PageManager.GetPageById(PageId);
            }
        }
    }




    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [Obsolete("Use 'Composite.Data' namespace instead")]
    public enum UrlType
    {
        /// <exclude />
        Undefined = 0,

        /// <exclude />
        Public = 1,

        /// <exclude />
        Internal = 2,

        /// <exclude />
        Friendly = 3
    }




    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class PageUrlHelper
    {
        private static readonly string LogTitle = "PageUrlHelper";
        // private static readonly string RenredingLinkRegExPattern = string.Format(@"{0}/Renderers/Page.aspx([^\""']*)", UrlUtils.PublicRootPath);
        // private static readonly Regex RenredingLinkRegex = new Regex(RenredingLinkRegExPattern + "");

        private class Match
        {
            public int Index;
            public string Value;
        }

        private static readonly string RendererUrlPrefix = UrlUtils.PublicRootPath + "/Renderers/Page.aspx";
        private static readonly string InternalUrlPrefix = UrlUtils.PublicRootPath + "/page";


        /// <exclude />
        [Obsolete("Use Composite.Data.PageUrl instead")]
        public static PageUrlOptions ParseUrl(string url)
        {
            var urlString = new UrlString(url);
            return IsPublicUrl(urlString) ? ParsePublicUrl(url) : ParseInternalUrl(url);
        }


        /// <exclude />
        [Obsolete("Use Composite.Data.PageUrl instead")]
        public static PageUrlOptions ParseUrl(string url, out NameValueCollection notUsedQueryStringParameters)
        {
            return IsPublicUrl(url) 
                ? ParsePublicUrl(url, out notUsedQueryStringParameters)
                : ParseInternalUrl(url, out notUsedQueryStringParameters);
        }


        /// <exclude />
        [Obsolete("Use Composite.Data.PageUrl instead")]
        public static PageUrlOptions ParseInternalUrl(string url)
        {
            NameValueCollection notUsedQueryStringParameters;
            return ParseInternalUrl(url, out notUsedQueryStringParameters);
        }


        /// <exclude />
        [Obsolete("Use Composite.Data.PageUrl instead")]
        public static PageUrlOptions ParseInternalUrl(string url, out NameValueCollection notUsedQueryStringParameters)
        {
            var urlString = new UrlString(url);

            return ParseQueryString(urlString.GetQueryParameters(), out notUsedQueryStringParameters);
        }


        /// <exclude />
        [Obsolete("Use Composite.Data.PageUrl instead")]
        public static PageUrlOptions ParsePublicUrl(string url)
        {
            NameValueCollection notUsedQueryParameters;
            return ParsePublicUrl(url, out notUsedQueryParameters);
        }



        /// <exclude />
        [Obsolete("Use Composite.Data.PageUrl instead")]
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
            CultureInfo locale = PageUrl.GetCultureInfo(requestPath, out requestPathWithoutUrlMappingName);

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


        /// <exclude />
        [Obsolete("To be removed")]
        public static CultureInfo GetCultureInfo(string requestPath)
        {
            string newRequestPath;

            return PageUrl.GetCultureInfo(requestPath, out newRequestPath);
        }


        /// <exclude />
        [Obsolete("To be removed")]
        public static CultureInfo GetCultureInfo(string requestPath, out string requestPathWithoutUrlMappingName)
        {
            return PageUrl.GetCultureInfo(requestPath, out requestPathWithoutUrlMappingName);
        }


        /// <exclude />
        [Obsolete("To be removed")]
        public static bool IsPublicUrl(string relativePath)
        {
            relativePath = relativePath.ToLower();

            return relativePath.Contains(".aspx")
                   && !relativePath.Contains("/renderers/page.aspx")
                   && !IsAdminPath(relativePath);
        }


        /// <exclude />
        [Obsolete("To be removed")]
        public static bool IsPublicUrl(UrlString url)
        {
            return IsPublicUrl(url.FilePath);
        }


        /// <exclude />
        public static bool IsInternalUrl(string url)
        {
            return IsInternalUrl(new UrlBuilder(url));
        }


        /// <exclude />
        [Obsolete("To be removed")]
        public static bool IsInternalUrl(UrlString url)
        {
            return url.FilePath.EndsWith("Renderers/Page.aspx", true);
        }

        private static bool IsInternalUrl(UrlBuilder url)
        {
            return url.FilePath.EndsWith("Renderers/Page.aspx", true);
        }


        /// <exclude />
        [Obsolete("Use Composite.Data.PageUrl.Build() instead")]
        public static UrlString BuildUrl(PageUrlOptions options)
        {
            Verify.ArgumentNotNull(options, "options");
            Verify.ArgumentCondition(options.UrlType != UrlType.Undefined, "options", "Url type is undefined");

            return BuildUrl(options.UrlType, options);
        }


        /// <exclude />
        [Obsolete("To be removed")]
        public static bool IsAdminPath(string relativeUrl)
        {
            return string.Compare(relativeUrl, UrlUtils.AdminRootPath, true) == 0
                   || relativeUrl.StartsWith(UrlUtils.AdminRootPath + "/", true);
        }


        /// <exclude />
        [Obsolete("Use Composite.Data.PageUrl.Build() instead")]
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


        /// <exclude />
        [Obsolete("To be removed, use Composite.Data.PageUrl.TryParseFriendlyUrl(...) instead")]
        public static bool TryParseFriendlyUrl(string relativeUrl, out PageUrlOptions urlOptions)
        {
            if (IsAdminPath(relativeUrl))
            {
                urlOptions = null;
                return false;
            }

            string path;
            CultureInfo cultureInfo = PageUrl.GetCultureInfo(relativeUrl, out path);
            if (cultureInfo == null)
            {
                urlOptions = null;
                return false;
            }

            string loweredRelativeUrl = relativeUrl.ToLower(CultureInfo.InvariantCulture);

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
                        .Where(f => f.Value.ToLower() == loweredRelativeUrl).FirstOrDefault();
            
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
        /// To be used for handling 'internal' links.
        /// </summary>
        /// <param name="queryString">Query string.</param>
        /// <param name="notUsedQueryParameters">Query string parameters that were not used.</param>
        /// <returns></returns>
        [Obsolete("To be removed. Use Composite.Core.Routings.PageUrls instead.")]
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


        /// <exclude />
        public static string ChangeRenderingPageUrlsToPublic(string html)
        {
            StringBuilder result = null;

            var internalUrls = new List<Match>();

            

            // We assume that url starts with either 
            // "{virtual folder path}/Renderers/Page.aspx"  or "~/page("
            // and ends with one of the following characters: 
            // double quote, single quote, or "&#39;" which is single quote mark (') encoded in xml attribute 

            foreach (string prefix in new [] { RendererUrlPrefix, InternalUrlPrefix })
            {
                int startIndex = 0;

                while (true)
                {
                    int urlOffset = html.IndexOf(prefix, startIndex, StringComparison.OrdinalIgnoreCase);
                    if (urlOffset < 0) break;

                    int prefixEndOffset = urlOffset + prefix.Length;

                    int endOffset = html.IndexOf('\"', prefixEndOffset);
                    if (endOffset < 0) break;

                    int singleQuoteIndex = html.IndexOf('\'', prefixEndOffset, endOffset - prefixEndOffset);
                    if (singleQuoteIndex > 0)
                    {
                        endOffset = singleQuoteIndex;
                    }

                    int encodedSingleQuoteIndex = html.IndexOf("&#39;", prefixEndOffset, endOffset - prefixEndOffset);
                    if (encodedSingleQuoteIndex > 0) endOffset = encodedSingleQuoteIndex;

                    internalUrls.Add(new Match
                                         {
                                             Index = urlOffset,
                                             Value = html.Substring(urlOffset, endOffset - urlOffset)
                                         });

                    startIndex = endOffset;
                }
            }

            // Sorting the offsets by descending, so we can replace urls in that order by not affecting offsets of not yet processed urls
            internalUrls.Sort((a, b) => -a.Index.CompareTo(b.Index));

            UrlSpace urlSpace = HttpContext.Current != null ? new UrlSpace(HttpContext.Current) : new UrlSpace();

            var resolvedUrls = new Dictionary<string, string>();
            foreach (Match pageUrlMatch in internalUrls)
            {
                string internalPageUrl = pageUrlMatch.Value;
                string publicPageUrl;

                if (!resolvedUrls.TryGetValue(internalPageUrl, out publicPageUrl))
                {
                    PageUrlData pageUrlData;
                    string decodedInternalUrl = internalPageUrl.Replace("%28", "(").Replace("%29", ")");
                    string anchor;

                    try
                    {
                        anchor = new UrlBuilder(internalPageUrl).Anchor;
                        pageUrlData = PageUrls.UrlProvider.ParseInternalUrl(decodedInternalUrl);
                    }
                    catch
                    {
                        LoggingService.LogWarning(LogTitle, "Failed to parse url '{0}'".FormatWith(internalPageUrl));
                        resolvedUrls.Add(internalPageUrl, null); 
                        continue;
                    }

                    if (pageUrlData == null)
                    {
                        resolvedUrls.Add(internalPageUrl, null); 
                        continue;
                    }

                    publicPageUrl = PageUrls.BuildUrl(pageUrlData, UrlKind.Public, urlSpace);
                    if (publicPageUrl == null)
                    {
                        // We have this situation if page does not exist
                        resolvedUrls.Add(internalPageUrl, null); 
                        continue;
                    }

                    if (!anchor.IsNullOrEmpty())
                    {
                        publicPageUrl += "#" + anchor;
                    }

                    // Encoding xml attribute value
                    publicPageUrl = publicPageUrl.Replace("&", "&amp;");

                    resolvedUrls.Add(internalPageUrl, publicPageUrl); 
                }
                else
                {
                    if(publicPageUrl == null) continue;
                }

                if (result == null)
                {
                    result = new StringBuilder(html);
                }

                result.Remove(pageUrlMatch.Index, pageUrlMatch.Value.Length);
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
