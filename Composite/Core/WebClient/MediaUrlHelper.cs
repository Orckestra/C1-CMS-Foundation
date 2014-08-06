using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using Composite.Core.Extensions;
using Composite.Core.Routing;
using Composite.Data;
using Composite.Data.Types;


namespace Composite.Core.WebClient
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public static class MediaUrlHelper
	{
	    private static readonly string DefaultMediaStore = "MediaArchive";
        private static readonly Regex GuidRegex = new Regex(@"^(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}$");
        private static readonly string LogTitle = typeof(MediaUrlHelper).Name;
        private static readonly string InternalMediaUrlPrefix = UrlUtils.PublicRootPath + "/media";
        private static readonly string DecodedFullInternalMediaUrlPrefix = InternalMediaUrlPrefix + "(";
        private static readonly string RawMediaUrlPrefix = "~/media";

        /// <exclude />
        public static string GetUrl(IMediaFile file)
        {
            return GetUrl(file, true, false);
        }


        /// <exclude />
        public static string GetUrl(IMediaFile file, bool isInternal)
        {
            return GetUrl(file, isInternal, false);
        }



        /// <exclude />
        public static string GetUrl(IMediaFile file, bool isInternal, bool downloadableMedia)
        {
            string url = MediaUrls.BuildUrl(file, isInternal ? UrlKind.Internal : UrlKind.Public);

            if (!downloadableMedia) return url;

            var urlBuilder = new UrlBuilder(url);
            urlBuilder["download"] = "true";

            return  urlBuilder.ToString();
        }



        /// <exclude />
        public static IMediaFile GetFileFromQueryString(NameValueCollection queryParameters)
        {
            Verify.ArgumentNotNull(queryParameters, "queryParameters");

            string idStr = queryParameters["id"];

            // In order to suppurt old-style queries, checking composite path in "i" and "src" query parameters
            string compositePath = queryParameters["i"];
            if(compositePath.IsNullOrEmpty())
            {
                compositePath = queryParameters["src"];
                if(compositePath.IsNullOrEmpty() 
                    && idStr != null && idStr.Contains(":"))
                {
                    compositePath = idStr;
                }
            }

            string storeId;
            IMediaFile result;
            
            if(!compositePath.IsNullOrEmpty())
            {
                // Parsing a friendly media url
                int separatorIndex = compositePath.IndexOf(":", System.StringComparison.Ordinal);
                if (separatorIndex < 0 || separatorIndex == compositePath.Length - 1) throw new InvalidOperationException();

                storeId = compositePath.Substring(0, separatorIndex);
                string secondPart = compositePath.Substring(separatorIndex + 1);

                try
                {
                    Guid fileId; 

                    if (Guid.TryParse(secondPart, out fileId))
                    {
                        result = GetFileById(storeId, fileId);
                    }
                    else
                    {
                        compositePath = compositePath.Replace("://", ":/");

                        result = GetFileByCompositePath(storeId, compositePath);
                    }
                }
                catch (Exception ex)
                {
                    throw new FileNotFoundException("File '{0}' was not found.".FormatWith(compositePath), ex);
                }
            }
            else
            {
                // Parsing an internal media url
                storeId = queryParameters["store"] ?? DefaultMediaStore;

                if (storeId.IsNullOrEmpty() || idStr.IsNullOrEmpty())
                {
                    throw new InvalidOperationException("Missing id from query");
                }

                Guid id = new Guid(idStr);

                try
                {
                    result = GetFileById(storeId, id);
                }
                catch (Exception ex)
                {
                    throw new FileNotFoundException("File not found. Storage: '{0}', Id: {1}".FormatWith(storeId, id), ex);
                }
            }

            if (result == null) throw new FileNotFoundException("File not found.");

            return result;
        }

        private static IMediaFile GetFileById(string storeId, Guid fileId)
        {
            using (new DataScope(DataScopeIdentifier.Public))
            {
                var query = DataFacade.GetData<IMediaFile>();

                if (query.IsEnumerableQuery())
                {
                    return (query as IEnumerable<IMediaFile>)
                        .FirstOrDefault(f => f.Id == fileId && f.StoreId == storeId);
                }

                return query
                    .FirstOrDefault(f => f.StoreId == storeId && f.Id == fileId);
            }
        }

        private static IMediaFile GetFileByCompositePath(string storeId, string compositePath)
        {
            using (new DataScope(DataScopeIdentifier.Public))
            {
                var query = DataFacade.GetData<IMediaFile>();

                if (query.IsEnumerableQuery())
                {
                    return (query as IEnumerable<IMediaFile>)
                        .FirstOrDefault(f => f.CompositePath == compositePath && f.StoreId == storeId);
                }

                return query
                    .FirstOrDefault(f => f.StoreId == storeId && f.CompositePath == compositePath);
            }
        }



        /// <exclude />
        [Obsolete("Use Guid.TryParse()")]
        public static bool IsValidGuid(string value)
        {
            Verify.ArgumentNotNull(value, "value");

            return GuidRegex.IsMatch(value);
        }

        /// <exclude />
        public static string ChangeInternalMediaUrlsToPublic(string content)
        {
            StringBuilder result = null;

            // Urls, generated in UserControl-s may still have "~/" as a prefix
            content = UrlUtils.ReplaceUrlPrefix(content, RawMediaUrlPrefix, InternalMediaUrlPrefix);

            // We assume that url starts with "{Site root}/media({MediaId})[?{Query}]" 
            List<UrlUtils.UrlMatch> internalUrls = UrlUtils.FindUrlsInHtml(content, InternalMediaUrlPrefix);

            // Sorting the offsets by descending, so we can replace urls in that order by not affecting offsets of not yet processed urls
            internalUrls.Reverse();


            var convertionCache = new Dictionary<string, string>();
            foreach (UrlUtils.UrlMatch mediaUrlMatch in internalUrls)
            {
                string internalMediaUrl = mediaUrlMatch.Value;
                string publicMediaUrl;

                if (!convertionCache.TryGetValue(internalMediaUrl, out publicMediaUrl))
                {
                    string decodedMediaUrl = internalMediaUrl.Replace("%28", "(").Replace("%29", ")").Replace("&amp;", "&");
                    if(!decodedMediaUrl.StartsWith(DecodedFullInternalMediaUrlPrefix))
                    {
                        continue;
                    }

                    int closingBracketOffset = decodedMediaUrl.IndexOf(")", StringComparison.InvariantCulture);

                    if(closingBracketOffset < 0)
                    {
                        continue;
                    }

                    Guid mediaId;
                    int prefixLength = DecodedFullInternalMediaUrlPrefix.Length;

                    string mediaStore;

                    string mediaIdStr = decodedMediaUrl.Substring(prefixLength, closingBracketOffset - prefixLength);

                    int semicolonOffset = mediaIdStr.IndexOf(":", StringComparison.Ordinal);
                    if (semicolonOffset > 0)
                    {
                        mediaStore = mediaIdStr.Substring(0, semicolonOffset);
                        mediaIdStr = mediaIdStr.Substring(semicolonOffset + 1);
                    }
                    else
                    {
                        mediaStore = DefaultMediaStore;
                    }

                    if (!Guid.TryParse(mediaIdStr, out mediaId))
                    {
                        continue;
                    }

                    UrlBuilder parsedOldUrl;

                    try
                    {
                        parsedOldUrl = new UrlBuilder(decodedMediaUrl);
                    }
                    catch
                    {
                        Log.LogWarning(LogTitle, "Failed to parse url '{0}'".FormatWith(internalMediaUrl));
                        convertionCache.Add(internalMediaUrl, null);
                        continue;
                    }

                    NameValueCollection queryParams = parsedOldUrl.GetQueryParameters();

                    publicMediaUrl = MediaUrls.BuildUrl(
                        new MediaUrlData
                        {
                            MediaId = mediaId,
                            MediaStore = mediaStore,
                            QueryParameters = queryParams
                        },
                        UrlKind.Public);

                    if (publicMediaUrl == null)
                    {
                        convertionCache.Add(internalMediaUrl, null);
                        continue;
                    }

                    // Encoding xml attribute value
                    publicMediaUrl = publicMediaUrl.Replace("&", "&amp;");

                    convertionCache.Add(internalMediaUrl, publicMediaUrl);
                }
                else
                {
                    if (internalMediaUrl == null) continue;
                }

                if (result == null)
                {
                    result = new StringBuilder(content);
                }

                result.Remove(mediaUrlMatch.Index, mediaUrlMatch.Value.Length);
                result.Insert(mediaUrlMatch.Index, publicMediaUrl);
            }

            return result != null ? result.ToString() : content;
        }
	}
}
