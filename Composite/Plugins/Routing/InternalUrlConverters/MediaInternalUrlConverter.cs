using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using Composite.Core;
using Composite.Core.Extensions;
using Composite.Core.Routing;
using Composite.Data;

namespace Composite.Plugins.Routing.InternalUrlConverters
{
    internal class MediaInternalUrlConverter: IInternalUrlConverter
    {
        internal static readonly string DefaultMediaStore = "MediaArchive";
        private static readonly string LogTitle = typeof (MediaInternalUrlConverter).Name;

        private readonly string[] _acceptedUrlPrefixes = {"media("}; 

        public IEnumerable<string> AcceptedUrlPrefixes
        {
            get { return _acceptedUrlPrefixes; }
        }

        public string ToPublicUrl(string internalMediaUrl, UrlSpace urlSpace)
        {
            int openBracketIndex = internalMediaUrl.IndexOf("(", StringComparison.Ordinal);
            if (openBracketIndex < 0)
            {
                return null;
            }

            int closingBracketOffset = internalMediaUrl.IndexOf(")", openBracketIndex + 1, StringComparison.Ordinal);
            if (closingBracketOffset < 0)
            {
                return null;
            }

            Guid mediaId;
            

            string mediaStore;
            string mediaIdStr = internalMediaUrl.Substring(openBracketIndex + 1, closingBracketOffset - openBracketIndex - 1);

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
                return null;
            }

            UrlBuilder parsedOldUrl;

            try
            {
                parsedOldUrl = new UrlBuilder(internalMediaUrl);
            }
            catch
            {
                Log.LogWarning(LogTitle, "Failed to parse url '{0}'".FormatWith(internalMediaUrl));
                return null;
            }

            NameValueCollection queryParams = parsedOldUrl.GetQueryParameters();

            return MediaUrls.BuildUrl(
                new MediaUrlData
                {
                    MediaId = mediaId,
                    MediaStore = mediaStore,
                    QueryParameters = queryParams
                },
                UrlKind.Public);
        }

        public IDataReference ToDataReference(string internalUrl)
        {
            return null;
        }
    }
}
