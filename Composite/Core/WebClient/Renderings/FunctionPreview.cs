using System.Threading.Tasks;
using System.Web;
using Composite.C1Console.Events;
using Composite.Core.Configuration;

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

            var renderingResult = await BrowserRender.RenderUrlAsync(context, previewUrl, RenderingMode);

            if (renderingResult == null)
            {
                return null;
            }

            if (renderingResult.Status == BrowserRender.RenderingResultStatus.Success)
            {
                return renderingResult.FilePath;
            }

            if (renderingResult.Status >= BrowserRender.RenderingResultStatus.Error)
            {
                Log.LogWarning("FunctionPreview", "Failed to build preview for function. Reason: {0}; Output:\r\n{1}", 
                    renderingResult.Status, renderingResult.Output);
            }
            return null;
        }

        /// <exclude />
        public static int GetFunctionPreviewHash()
        {
            if (!GlobalSettingsFacade.FunctionPreviewEnabled)
            {
                return 0;
            }

            return BrowserRender.GetLastCacheUpdateTime(RenderingMode).GetHashCode();
        }
    }
}
