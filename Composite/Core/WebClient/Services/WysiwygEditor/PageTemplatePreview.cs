using System;
using System.Collections.Generic;
using System.Drawing;
using System.Web;
using Composite.C1Console.Events;
using System.Threading.Tasks;

namespace Composite.Core.WebClient.Services.WysiwygEditor
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class PageTemplatePreview
    {
        private static readonly string ServiceUrl = UrlUtils.ResolvePublicUrl("~/Renderers/TemplatePreview.ashx");
        private const string RenderingMode = "template";

        static PageTemplatePreview()
        {
            GlobalEventSystemFacade.OnDesignChange += ClearCache;
        }

        /// <exclude />
        public class PlaceholderInformation
        {
            /// <exclude />
            public string PlaceholderId { get; set; }

            /// <exclude />
            public Rectangle ClientRectangle { get; set; }

            /// <exclude />
            public Rectangle ClientRectangleWithZoom { get; set; }
        }

        /// <exclude />
        public static bool GetPreviewInformation(HttpContext context, Guid pageId, Guid templateId, out string imageFilePath, out PlaceholderInformation[] placeholders)
        {
            int updateHash = BrowserRender.GetLastCacheUpdateTime(RenderingMode).GetHashCode();
            string requestUrl = new UrlBuilder(context.Request.Url.ToString()).ServerUrl + ServiceUrl + "?p=" + pageId + "&t=" + templateId + "&hash=" + updateHash;

            BrowserRender.RenderingResult result = null;

            var renderTask = BrowserRender.RenderUrlAsync(context, requestUrl, RenderingMode);
            renderTask.Wait(10000);
            if (renderTask.Status == TaskStatus.RanToCompletion)
            {
                result = renderTask.Result;
            }

            if (result == null)
            {
                imageFilePath = null;
                placeholders = null;
                return false;
            }

            if (result.Status != BrowserRender.RenderingResultStatus.Success)
            {
                Log.LogWarning("PageTemplatePreview", "Failed to build preview for page template '{0}'. Reason: {1}; Output:\r\n{2}",
                    templateId, result.Status, result.Output);

                imageFilePath = null;
                placeholders = null;
                return false;
            }

            imageFilePath = result.FilePath;
            string output = result.Output;

            var pList = new List<PlaceholderInformation>();

            string templateInfoPrefix = "templateInfo:";

            if (output.StartsWith(templateInfoPrefix))
            {
                foreach (var infoPart in output.Substring(templateInfoPrefix.Length).Split('|'))
                {
                    string[] parts = infoPart.Split(',');
                    Verify.That(parts.Length == 5, "Incorrectly serialized template part info: " + infoPart);

                    int left = Int32.Parse(parts[1]);
                    int top = Int32.Parse(parts[2]);
                    int width = Int32.Parse(parts[3]);
                    int height = Int32.Parse(parts[4]);

                    var zoom = 1.0;

                    pList.Add(new PlaceholderInformation
                    {
                        PlaceholderId = parts[0], 
                        ClientRectangle = new Rectangle(left, top, width, height),
                        ClientRectangleWithZoom = new Rectangle(
                            (int)Math.Round(zoom * left), 
                            (int)Math.Round(zoom * top),
                            (int)Math.Round(zoom * width),
                            (int)Math.Round(zoom * height))
                    });
                }
            }

            placeholders = pList.ToArray();
            return true;
        }

        /// <exclude />
        public static void ClearCache()
        {
            BrowserRender.ClearCache(RenderingMode);
        }
    }
}
