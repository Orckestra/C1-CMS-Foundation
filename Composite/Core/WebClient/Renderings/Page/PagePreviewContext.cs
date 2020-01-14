using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Web;
using System.Web.Caching;
using Composite.Data.Types;

namespace Composite.Core.WebClient.Renderings.Page
{
    internal static class PagePreviewContext
    {
        public static readonly string PreviewKeyUrlParameter = "previewKey";

        private static readonly TimeSpan PreviewExpirationTimeSpan = new TimeSpan(0, 20, 0);

        private static string CacheKey_Page(Guid key) => key + "_SelectedPage";
        private static string CacheKey_Contents(Guid key) => key + "_SelectedContents";
        private static string CacheKey_RenderingReason(Guid key) => key + "_RenderingReason";

        public static void Save(Guid previewKey, IPage selectedPage, IList<IPagePlaceholderContent> contents, RenderingReason renderingReason)
        {
            var cache = HttpRuntime.Cache;

            cache.Add(CacheKey_Page(previewKey), selectedPage, null, Cache.NoAbsoluteExpiration, PreviewExpirationTimeSpan, CacheItemPriority.NotRemovable, null);
            cache.Add(CacheKey_Contents(previewKey), contents, null, Cache.NoAbsoluteExpiration, PreviewExpirationTimeSpan, CacheItemPriority.NotRemovable, null);
            cache.Add(CacheKey_RenderingReason(previewKey), renderingReason, null, Cache.NoAbsoluteExpiration, PreviewExpirationTimeSpan, CacheItemPriority.NotRemovable, null);
        }

        public static bool TryGetPreviewKey(HttpRequest request, out Guid previewKey)
        {
            return TryGetPreviewKey(request.QueryString, out previewKey);
        }

        public static bool TryGetPreviewKey(HttpRequestBase request, out Guid previewKey)
        {
            return TryGetPreviewKey(request.QueryString, out previewKey);
        }

        private static bool TryGetPreviewKey(NameValueCollection queryString, out Guid previewKey)
        {
            var value = queryString[PreviewKeyUrlParameter];
            if (!string.IsNullOrWhiteSpace(value) && Guid.TryParse(value, out previewKey))
            {
                return true;
            }

            previewKey = Guid.Empty;
            return false;
        }

        public static IPage GetPage(Guid previewKey)
            => (IPage) HttpRuntime.Cache.Get(CacheKey_Page(previewKey));

        public static IList<IPagePlaceholderContent> GetPageContents(Guid previewKey)
            => (IList<IPagePlaceholderContent>)HttpRuntime.Cache.Get(CacheKey_Contents(previewKey));

        public static RenderingReason GetRenderingReason(Guid previewKey)
            => (RenderingReason)HttpRuntime.Cache.Get(CacheKey_RenderingReason(previewKey));

        public static void Remove(Guid previewKey)
        {
            var cache = HttpRuntime.Cache;

            cache.Remove(CacheKey_Page(previewKey));
            cache.Remove(CacheKey_Contents(previewKey));
            cache.Remove(CacheKey_RenderingReason(previewKey));
        }
    }
}
