using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Caching;
using Composite.Data.Types;

namespace Composite.Core.WebClient.Renderings.Page
{
    /// <summary>
    /// Allow previewing a page 'in mem' in a simulated GET request. Requires IIS to run in "Integrated" pipeline mode.
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public class PagePreviewBuilder
    {
        private static readonly TimeSpan PreviewExpirationTimeSpan = new TimeSpan(0, 20, 0);

        /// <summary>
        /// Execute an 'im mem' preview request of the provided page and content. Requires IIS to run in "Integrated" pipeline mode.
        /// </summary>
        /// <param name="selectedPage">Page to render. Functionality reading the rendered page ID will get the ID from this object.</param>
        /// <param name="contents">Content to render on the page</param>
        /// <returns>
        /// In Pipeline mode the content is written directly to the HttpContext and an empty string is returned.
        /// The IIS classic mode is no longer supported and will throw an exception. 
        /// </returns>
        public static string RenderPreview(IPage selectedPage, IList<IPagePlaceholderContent> contents)
        {
            return RenderPreview(selectedPage, contents, RenderingReason.PreviewUnsavedChanges);
        }

        /// <summary>
        /// Execute an 'im mem' preview request of the provided page and content. Requires IIS to run in "Integrated" pipeline mode.
        /// </summary>
        /// <param name="selectedPage">Page to render. Functionality reading the rendered page ID will get the ID from this object.</param>
        /// <param name="contents">Content to render on the page</param>
        /// <param name="renderingReason">The rendering reason</param>
        /// <returns>
        /// In Pipeline mode the content is written directly to the HttpContext and an empty string is returned.
        /// The IIS classic mode is no longer supported and will throw an exception. 
        /// </returns>
        public static string RenderPreview(IPage selectedPage, IList<IPagePlaceholderContent> contents, RenderingReason renderingReason)
        {
            HttpContext ctx = HttpContext.Current;
            string key = Guid.NewGuid().ToString();
            string query = "previewKey=" + key;

            ctx.Cache.Add(key + "_SelectedPage", selectedPage, null, Cache.NoAbsoluteExpiration, PreviewExpirationTimeSpan, CacheItemPriority.NotRemovable, null);
            ctx.Cache.Add(key + "_SelectedContents", contents, null, Cache.NoAbsoluteExpiration, PreviewExpirationTimeSpan, CacheItemPriority.NotRemovable, null);
            ctx.Cache.Add(key + "_RenderingReason", renderingReason, null, Cache.NoAbsoluteExpiration, PreviewExpirationTimeSpan, CacheItemPriority.NotRemovable, null);

            if (!HttpRuntime.UsingIntegratedPipeline)
            {
                throw new InvalidOperationException("IIS classic mode not supported");
            }

            // The header trick here is to work around (what seems to be) a bug in .net 4.5, where preserveForm=false is ignored
            // asp.net 4.5 request validation will see the 'page edit http post' data and start bitching. It really should not.
            var headers = new System.Collections.Specialized.NameValueCollection
            {
                {"Content-Length", "0"}
            };

            string cookieHeader = ctx.Request.Headers["Cookie"];
            if (!string.IsNullOrEmpty(cookieHeader))
            {
                headers.Add("Cookie", cookieHeader);
            }

            ctx.Server.TransferRequest("~/Renderers/Page.aspx?" + query, false, "GET", headers);

            return String.Empty;
        }
    }
}
