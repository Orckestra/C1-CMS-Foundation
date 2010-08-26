using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using Composite.Data;
using Composite.Data.Types;
using Composite.Core.Extensions;


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

        public static string GetUrl(IMediaFile file)
        {
            return GetUrl(file, true, false);
        }


        public static string GetUrl(IMediaFile file, bool isInternal)
        {
            return GetUrl(file, true, false);
        }

        public static string GetUrl(IMediaFile file, bool isInternal, bool downloadableMedia)
        {
            var urlBuilder = new UrlBuilder(UrlUtils.ResolvePublicUrl("Renderers/ShowMedia.ashx"));

            if(!isInternal)
            {
                urlBuilder["i"] = file.CompositePath;
            }
            else
            {
                if(file.StoreId != DefaultMediaStore)
                {
                    urlBuilder["store"] = file.StoreId;
                }
                urlBuilder["id"] = file.Id.ToString();
            }

            if (downloadableMedia == true)
            {
                urlBuilder["download"] = "true";
            }

            return urlBuilder.ToString();
        }



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

        public static bool IsValidGuid(string value)
        {
            Verify.ArgumentNotNull(value, "value");

            return GuidRegex.IsMatch(value);
        }
	}
}
