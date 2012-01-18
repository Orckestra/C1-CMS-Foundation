using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using Composite.Core.Extensions;
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
        private static readonly string DefaultMediaStorePrefix = DefaultMediaStore + ":";
        private static readonly Regex GuidRegex = new Regex(@"^(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}$");
        private static readonly string LogTitle = typeof(MediaUrlHelper).Name;
        private static readonly string InternalMediaUrlPrefix = UrlUtils.PublicRootPath + "/media";
        private static readonly string DecodedFullInternalMediaUrlPrefix = InternalMediaUrlPrefix + "(";
        private static readonly string RawMediaUrlPrefix = "~/media";

        private static readonly string ForbiddenUrlCharacters = @"<>*%&\?";
        

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
            UrlBuilder urlBuilder;

            if(!isInternal)
            {
                urlBuilder = new UrlBuilder(UrlUtils.ResolvePublicUrl("Renderers/ShowMedia.ashx"));

                urlBuilder["i"] = file.CompositePath;
            }
            else
            {
                urlBuilder = new UrlBuilder("~/media(" + file.Id + ")");

                if(file.StoreId != DefaultMediaStore)
                {
                    urlBuilder["store"] = file.StoreId;
                }
            }

            if (downloadableMedia == true)
            {
                urlBuilder["download"] = "true";
            }

            return urlBuilder.ToString();
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
                int separatorIndex = compositePath.IndexOf(":");
                if (separatorIndex < 0 || separatorIndex == compositePath.Length - 1) throw new InvalidOperationException();

                storeId = compositePath.Substring(0, separatorIndex);
                string secondPart = compositePath.Substring(separatorIndex + 1);

                try
                {
                    if (IsValidGuid(secondPart))
                    {
                        result = GetFileById(storeId, new Guid(secondPart));
                    }
                    else
                    {
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
                    throw new ArgumentNullException("Missing id from query");
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
                        .Where(f => f.StoreId == storeId && f.Id == fileId)
                        .FirstOrDefault();
                }
                
                return query
                    .Where(f => f.StoreId == storeId && f.Id == fileId)
                    .FirstOrDefault();
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
                        .Where(f => f.StoreId == storeId && f.CompositePath == compositePath)
                        .FirstOrDefault();
                }

                return query
                    .Where(f => f.StoreId == storeId && f.CompositePath == compositePath)
                    .FirstOrDefault();
            }
        }



        /// <exclude />
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

                    string mediaIdStr = decodedMediaUrl.Substring(prefixLength, closingBracketOffset - prefixLength);
                    if (mediaIdStr.StartsWith(DefaultMediaStorePrefix, StringComparison.InvariantCultureIgnoreCase))
                    {
                        mediaIdStr = mediaIdStr.Substring(DefaultMediaStorePrefix.Length);
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

                    string storeId = "MediaArchive";
                    if(queryParams.AllKeys.Contains("store"))
                    {
                        storeId = queryParams["store"];
                    }

                    IMediaFile file = GetFileById(storeId, mediaId);
                    if(file == null)
                    {
                        convertionCache.Add(internalMediaUrl, null);
                        continue;
                    }

                    string pathToFile = UrlUtils.Combine(file.FolderPath, file.FileName);

                    // Hotfix for characters not accepted by ASP.NET by default
                    foreach (var ch in ForbiddenUrlCharacters)
                    {
                        pathToFile = pathToFile.Replace(ch, 'x');
                    }

                    // IIS6 doesn't have wildcard mapping by default, so removing image extension if running in "classic" app pool
                    if(!HttpRuntime.UsingIntegratedPipeline)
                    {
                        int dotOffset = pathToFile.IndexOf(".");
                        if(dotOffset >= 0)
                        {
                            pathToFile = pathToFile.Substring(0, dotOffset);
                        }
                    }

                    var newUrl = new UrlBuilder(UrlUtils.PublicRootPath + "/media/" + mediaId);

                    newUrl.PathInfo = pathToFile;
                    newUrl.AddQueryParameters(queryParams);

                    publicMediaUrl = newUrl.ToString();

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
