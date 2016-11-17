using System;
using System.Threading.Tasks;
using System.Web;
using Composite.C1Console.Events;
using Composite.Core.Configuration;
using Composite.Core.WebClient.PhantomJs;

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

            if (renderingResult.Status == RenderingResultStatus.Success)
            {
                return renderingResult.FilePath;
            }

            if (renderingResult.Status >= RenderingResultStatus.Error)
            {
                string functionTitle = context.Request.QueryString["title"] ?? "null";

                Log.LogWarning("FunctionPreview", "Failed to build preview for function '{0}'. Reason: {1}; Output:\r\n{2}",
                    functionTitle, renderingResult.Status, string.Join(Environment.NewLine, renderingResult.Output));
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
