using System.Threading.Tasks;
using System.Web;
using Composite.C1Console.Events;

namespace Composite.Core.WebClient.Renderings
{
    /// <exclude />
    public static class FunctionPreview
    {
        private const string RenderingMode = "function";

        static FunctionPreview()
        {
            GlobalEventSystemFacade.OnDesignChange += () => BrowserRender.ClearCache(RenderingMode);
        }

        internal static async Task<string> GetPreviewFunctionPreviewImageFile(HttpContext context)
        {
            string previewUrl = context.Request.Url.ToString().Replace("/FunctionBox?", "/FunctionPreview.ashx?");

            var renderingResult = await BrowserRender.RenderUrl(context, previewUrl, RenderingMode);

            return renderingResult != null ? renderingResult.FilePath : null;
        }

        /// <exclude />
        public static int GetFunctionPreviewHash()
        {
            return BrowserRender.GetLastCacheUpdateTime(RenderingMode).GetHashCode();
        }
    }
}
