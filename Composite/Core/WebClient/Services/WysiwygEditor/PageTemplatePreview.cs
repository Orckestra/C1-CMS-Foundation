using System;
using System.Collections.Generic;
using System.Drawing;
using System.Web;
using Composite.Core.IO;

namespace Composite.Core.WebClient.Services.WysiwygEditor
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class PageTemplatePreview
    {
        private const string RenderingMode = "templatePreview";

        /// <exclude />
        public class PlaceholderInformation
        {
            /// <exclude />
            public string PlaceholderId { get; set; }

            public Rectangle ClientRectangle { get; set; }

            /// <exclude />
            public Rectangle ClientRectangleWithZoom { get; set; }
        }

        /// <exclude />
        public static void GetPreviewInformation(HttpContext context, Guid pageId, Guid templateId, out string imageFilePath, out PlaceholderInformation[] placeholders)
        {
            string serviceUrl = UrlUtils.ResolvePublicUrl("~/Renderers/TemplatePreview.ashx");
            string requestUrl = new UrlBuilder(context.Request.Url.ToString()).ServerUrl + serviceUrl + "?p=" + pageId + "&t=" + templateId;

            string output;
            imageFilePath = BrowserRender.RenderUrl(context, requestUrl, RenderingMode, out output);

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

                    var zoom = 0.2;

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
        }

        /// <exclude />
        public static void ClearCache()
        {
            BrowserRender.ClearCache(RenderingMode);
        }
    }
}
