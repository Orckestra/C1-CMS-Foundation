using System.Web;
using Composite.C1Console.Events;

namespace Composite.Core.WebClient.Renderings
{
    internal static class FunctionPreview
    {
        private const string RenderingMode = "functionPreview";

        static FunctionPreview()
        {
            GlobalEventSystemFacade.OnDesignChange += () => BrowserRender.ClearCache(RenderingMode);
        }

        internal static string GetPreviewFunctionPreviewImageFile(HttpContext context)
        {
            string previewUrl = context.Request.Url.ToString().Replace("/FunctionBox?", "/FunctionPreview.ashx?");
            string output;

            return BrowserRender.RenderUrl(context, previewUrl, RenderingMode, out output);
        }
    }
}
