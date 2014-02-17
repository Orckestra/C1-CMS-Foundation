using System;
using System.Web;
using Composite.Core.IO;

namespace Composite.Core.WebClient.Renderings
{
    internal static class FunctionPreview
    {
        private const string RenderingMode = "functionPreview";

        public static string GetPreviewFunctionPreviewImageFile(HttpContext context)
        {
            string previewUrl = context.Request.Url.ToString().Replace("/FunctionBox?", "/FunctionPreview.ashx?");
            string output;

            return BrowserRender.RenderUrl(context, previewUrl, RenderingMode, out output);
        }

        public static void ClearCache()
        {
            var folder = BrowserRender.GetCacheFolder(RenderingMode);

            if (C1Directory.Exists(folder))
            {
                foreach (var file in C1Directory.GetFiles(folder, "*.*"))
                {
                    try
                    {
                        C1File.Delete(file);
                    }
                    catch
                    {
                    }
                }
            }
        }
    }
}
