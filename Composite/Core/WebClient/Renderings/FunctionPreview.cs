using System.Web;

namespace Composite.Core.WebClient.Renderings
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class FunctionPreview
    {
        private const string RenderingMode = "functionPreview";

        internal static string GetPreviewFunctionPreviewImageFile(HttpContext context)
        {
            string previewUrl = context.Request.Url.ToString().Replace("/FunctionBox?", "/FunctionPreview.ashx?");
            string output;

            return BrowserRender.RenderUrl(context, previewUrl, RenderingMode, out output);
        }

        /// <exclude />
        public static void ClearCache()
        {
            BrowserRender.ClearCache(RenderingMode);
        }
    }
}
