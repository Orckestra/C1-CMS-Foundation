using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using Composite.Core.Extensions;
using Composite.Core.Routing;
using Composite.Core.Types;
using Composite.Data;
using Composite.Data.Caching;
using Composite.Data.Types;
using Composite.Plugins.Routing.InternalUrlConverters;


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

        private static readonly int MediaFileCacheSize = 2000;
        private static readonly Cache<string, ExtendedNullable<IMediaFile>> _mediaFileCache = new Cache<string, ExtendedNullable<IMediaFile>>("Media files", MediaFileCacheSize);

        static MediaUrlHelper()
        {
            void OnMediaFileChanged(object sender, DataEventArgs args)
            {
                if (args.Data is IMediaFile mediaFile)
                {
                    _mediaFileCache.Remove(GetCacheKey(mediaFile.StoreId, mediaFile.Id));
                }
            }

            DataEvents<IMediaFile>.OnAfterAdd += OnMediaFileChanged;
            DataEvents<IMediaFile>.OnAfterUpdate += OnMediaFileChanged;
            DataEvents<IMediaFile>.OnDeleted += OnMediaFileChanged;
            DataEvents<IMediaFile>.OnStoreChanged += (s, a) =>
            {
                if (!a.DataEventsFired)
                {
                    _mediaFileCache.Clear();
                }
            };
        }

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

            return urlBuilder.ToString();
        }



        /// <exclude />
        public static IMediaFile GetFileFromQueryString(NameValueCollection queryParameters)
        {
            Verify.ArgumentNotNull(queryParameters, "queryParameters");

            string idStr = queryParameters["id"];

            // In order to support old-style queries, checking composite path in "i" and "src" query parameters
            string compositePath = queryParameters["i"];
            if (compositePath.IsNullOrEmpty())
            {
                compositePath = queryParameters["src"];
                if (compositePath.IsNullOrEmpty()
                    && idStr != null && idStr.Contains(":"))
                {
                    compositePath = idStr;
                }
            }

            string storeId;
            IMediaFile result;

            if (!compositePath.IsNullOrEmpty())
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

        internal static string GetCacheKey(string storeId, Guid fileId) => storeId + fileId;

        internal static IMediaFile GetFileById(string storeId, Guid fileId)
        {
            string cacheKey = GetCacheKey(storeId, fileId);
            var cachedValue = _mediaFileCache.Get(cacheKey);
            if (cachedValue != null)
            {
                return cachedValue.Value;
            }

            using (new DataScope(DataScopeIdentifier.Public))
            {
                var query = DataFacade.GetData<IMediaFile>();

                var result = query.IsEnumerableQuery()
                    ? (query as IEnumerable<IMediaFile>).FirstOrDefault(f => f.Id == fileId && f.StoreId == storeId)
                    : query.FirstOrDefault(f => f.StoreId == storeId && f.Id == fileId);

                _mediaFileCache.Add(cacheKey, new ExtendedNullable<IMediaFile> { Value = result });

                return result;
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
            return InternalUrls.ConvertInternalUrlsToPublic(content, new[] { new MediaInternalUrlConverter() });
        }
    }
}
