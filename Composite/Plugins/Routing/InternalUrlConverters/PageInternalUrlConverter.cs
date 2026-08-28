using System.Collections.Generic;
using Composite.Core;
using Composite.Core.Extensions;
using Composite.Core.Routing;
using Composite.Data;

namespace Composite.Plugins.Routing.InternalUrlConverters
{
    /// <summary>
    /// Url provider for "internal" page links, f.e. "~/page({Guid})"
    /// </summary>
    public class PageInternalUrlConverter: IInternalUrlConverter
    {
        private static readonly string LogTitle = nameof(PageInternalUrlConverter);

        private readonly string[] _acceptedUrlPrefixes = { "page(", "Renderers/Page.aspx" };

        /// <inheritdoc />
        public IEnumerable<string> AcceptedUrlPrefixes => _acceptedUrlPrefixes;

        /// <inheritdoc />
        public string ToPublicUrl(string internalPageUrl, UrlSpace urlSpace)
        {
            PageUrlData pageUrlData;
            string anchor;

            try
            {
                anchor = GetAnchor(internalPageUrl);
                pageUrlData = PageUrls.UrlProvider.ParseInternalUrl(internalPageUrl);
            }
            catch
            {
                Log.LogWarning(LogTitle, "Failed to parse url '{0}'", internalPageUrl);
                return null;
            }

            if (pageUrlData == null)
            {
                return null;
            }

            // While viewing pages in "unpublished" scope, all the links should also be in the same scope
            if (DataScopeManager.CurrentDataScope == DataScopeIdentifier.Administrated)
            {
                pageUrlData.PublicationScope = PublicationScope.Unpublished;
            }

            string publicPageUrl = PageUrls.BuildUrl(pageUrlData, UrlKind.Public, urlSpace);
            if (publicPageUrl == null)
            {
                // We have this situation if page does not exist
                return null;
            }

            if (!anchor.IsNullOrEmpty())
            {
                publicPageUrl += "#" + anchor;
            }

            return publicPageUrl;
        }

        private static string GetAnchor(string url)
        {
            int anchorIndex = url.IndexOf('#');
            if (anchorIndex <= -1) return null;

            return anchorIndex == url.Length - 1 ? string.Empty : url.Substring(anchorIndex + 1);
        }

        /// <inheritdoc />
        public IDataReference ToDataReference(string internalUrl)
        {
            return null;
        }
    }
}