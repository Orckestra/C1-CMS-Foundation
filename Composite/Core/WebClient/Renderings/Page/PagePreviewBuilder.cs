using System;
using System.Collections.Generic;
using System.Web;
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
            if (!HttpRuntime.UsingIntegratedPipeline)
            {
                throw new InvalidOperationException("IIS classic mode not supported");
            }

            var previewKey = Guid.NewGuid();
            PagePreviewContext.Save(previewKey, selectedPage, contents, renderingReason);

            // The header trick here is to work around (what seems to be) a bug in .net 4.5, where preserveForm=false is ignored
            // asp.net 4.5 request validation will see the 'page edit http post' data and start bitching. It really should not.
            var headers = new System.Collections.Specialized.NameValueCollection
            {
                {"Content-Length", "0"}
            };

            var ctx = HttpContext.Current;
            string cookieHeader = ctx.Request.Headers["Cookie"];
            if (!string.IsNullOrEmpty(cookieHeader))
            {
                headers.Add("Cookie", cookieHeader);
            }

            string previewPath = $"~/Renderers/PagePreview?{PagePreviewContext.PreviewKeyUrlParameter}={previewKey}";
            ctx.Server.TransferRequest(previewPath, false, "GET", headers);

            return String.Empty;
        }
    }
}
