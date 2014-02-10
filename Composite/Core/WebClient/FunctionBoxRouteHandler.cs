using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Linq;
using System.Web;
using System.Web.Hosting;
using System.Web.Routing;
using System.Windows.Forms;
using Composite.C1Console.Drawing;
using Composite.C1Console.Security;
using Composite.Core.Extensions;


namespace Composite.Core.WebClient
{
    internal class FunctionBoxRoute : Route
    {
        // Adding "x" as a fictional paramter, so MVC wouldn't use this route for producing outbound links
        public FunctionBoxRoute() : base("Renderers/FunctionBo{x}", new FunctionBoxRouteHandler()) { }
    }

    
    internal class FunctionBoxRouteHandler : IRouteHandler
    {
        public System.Web.IHttpHandler GetHttpHandler(RequestContext requestContext)
        {
            return new FunctionBoxHttpHandler();
        }
    }


    /// <summary>
    /// Renders image that shows information about a function information in Visual Editor
    /// </summary>
    internal class FunctionBoxHttpHandler : IHttpHandler
    {
        private const int _minCharsPerDescriptionLine = 50;


        public void ProcessRequest(HttpContext context)
        {
            if (!UserValidationFacade.IsLoggedIn())
            {
                return;
            }

            try
            {
                string title = context.Request["title"];

                Verify.That(!title.IsNullOrEmpty(), "Missing query string argument 'title'");

                string boxtype = context.Request["type"];
                Verify.That(!boxtype.IsNullOrEmpty(), "Missing query string argument 'boxtype'");

                IEnumerable<string> existingTemplateImages = new[] { "html", "function", "warning" };
                Verify.That(existingTemplateImages.Contains(boxtype),
                    "Query string argument 'boxtype' expected to be one of the following values: " + string.Join(", ", existingTemplateImages));

                string description = context.Request["description"];
                string encodedMarkup = context.Request["markup"];

                List<string> textLines = null;
                if (description != null)
                {
                    textLines = GetDescriptionLines(description);
                }


                Bitmap previewImage = null;

                try
                {
                    if (encodedMarkup != null)
                    {
                        try
                        {
                            string fileName = GetPreviewFunctionPreviewImageFile(context);
                            previewImage = new Bitmap(fileName);

                            if (previewImage.Width <= 1 && previewImage.Height <= 1)
                            {
                                previewImage = null;
                            }
                        }
                        catch (BrowserRenderException ex)
                        {
                            Log.LogError("Function preview", ex.Message);
                        }
                    }

                    if (boxtype == "function" && previewImage != null)
                    {
                        GenerateFunctionPreview(context, title, previewImage);
                    }
                    else
                    {
                        GenerateBoxImage(context, boxtype, title, previewImage, textLines);
                    }
                    
                }
                finally
                {
                    if (previewImage != null)
                    {
                        previewImage.Dispose();
                    }
                }
            }
            catch (Exception ex)
            {
                Log.LogError(this.GetType().ToString(), ex.ToString());
                throw;
            }
        }

        private static void GenerateFunctionPreview(HttpContext context, string functionTitle, Bitmap previewImage)
        {
            const int headerHeight = 40;

            using (var font = new Font("Tahoma", 15.0f, FontStyle.Regular))
            {
                Size titleSize = TextRenderer.MeasureText(functionTitle, font);

                Point titlePosition = new Point(25, (headerHeight - titleSize.Height) / 2);

                int headerWidth = titlePosition.X + titleSize.Width + 20;

                Size totalSize = new Size(
                    Math.Max(headerWidth, previewImage.Width), 
                    headerHeight + previewImage.Height);

                using (var bitmap = new Bitmap(totalSize.Width, totalSize.Height))
                using (Graphics graphics = Graphics.FromImage(bitmap))
                {
                    using (var whiteBrush = new SolidBrush(Color.White))
                    {
                        graphics.FillRectangle(whiteBrush, 0, 0, totalSize.Width, headerHeight);
                    }
                    
                    // Function icon
                    string functionIconPath = HostingEnvironment.MapPath(UrlUtils.ResolveAdminUrl(string.Format("images/function.png")));
                    using (var functionIcon = Bitmap.FromFile(functionIconPath))
                    {
                        graphics.DrawImage(functionIcon, 10, (headerHeight - functionIcon.Height) / 2);
                    }

                    // Title
                    using (var solidBrush = new SolidBrush(Color.Black))
                    {
                        graphics.DrawString(functionTitle, font, solidBrush, titlePosition);
                    }

                    Point prevewImageOffset = new Point(0, headerHeight);

                    // Preview image
                    graphics.DrawImage(previewImage, prevewImageOffset);

                    // Image outline
                    using (var brush = new HatchBrush(HatchStyle.SmallCheckerBoard, Color.LightGray))
                    using (var pen = new Pen(brush))
                    {
                        graphics.DrawRectangle(pen, new Rectangle(prevewImageOffset, 
                            new Size(previewImage.Width - 1, previewImage.Height - 1)));
                    }

                    context.Response.ContentType = "image/png";
                    context.Response.Cache.SetExpires(DateTime.Now.AddDays(10));

                    bitmap.Save(context.Response.OutputStream, ImageFormat.Png);
                }
            }
        }

        private static void GenerateBoxImage(HttpContext context, string boxtype, string title, Bitmap previewImage,
            List<string> textLines)
        {
            string filePath = context.Server.MapPath(UrlUtils.ResolveAdminUrl(string.Format("images/{0}box.png", boxtype)));
            using (Bitmap bitmap = (Bitmap) Bitmap.FromFile(filePath))
            {
                var imageCreator = new ImageTemplatedBoxCreator(bitmap, new Point(55, 40), new Point(176, 78));

                imageCreator.MinHeight = 50;

                int textLeftPadding = (boxtype == "function" ? 30 : 36);

                imageCreator.SetTitle(title, new Size(textLeftPadding, 9), new Size(70, 15), Color.Black,
                    "Tahoma", 8.0f, FontStyle.Bold);

                if (previewImage != null)
                {
                    imageCreator.SetPreviewImage(previewImage, new Size(10, 32), new Size(10, 16));
                }
                else
                {
                    if (textLines != null)
                    {
                        imageCreator.SetTextLines(textLines, new Size(textLeftPadding, 0), new Size(100, 80),
                            Color.Black, "Tahoma", 8.0f, FontStyle.Regular);
                    }
                }

                context.Response.ContentType = "image/png";
                context.Response.Cache.SetExpires(DateTime.Now.AddDays(10));

                using (Bitmap boxBitmap = imageCreator.CreateBitmap())
                {
                    boxBitmap.Save(context.Response.OutputStream, ImageFormat.Png);
                }
            }
        }

        static string GetPreviewFunctionPreviewImageFile(HttpContext context)
        {
            string previewUrl = context.Request.Url.ToString().Replace("/FunctionBox?", "/FunctionPreview.ashx?");
            return BrowserRender.RenderUrl(context, previewUrl);
        }

        private static List<string> GetDescriptionLines(string description)
        {
            List<string> lines = new List<string>();

            if (!description.IsNullOrEmpty())
            {
                description = UrlUtils.UnZipContent(description);

                foreach (string naturalLine in description.Split('\n'))
                {
                    if (naturalLine.Length == 0) lines.Add("");

                    string rest = naturalLine.Trim();

                    while (rest.Length > _minCharsPerDescriptionLine && rest.IndexOf(' ') > -1)
                    {
                        int firstSpaceIndex = rest.LastIndexOf(' ', _minCharsPerDescriptionLine);

                        if (firstSpaceIndex == -1) firstSpaceIndex = rest.IndexOf(' ');

                        if (firstSpaceIndex > -1)
                        {
                            lines.Add(rest.Substring(0, firstSpaceIndex));
                            rest = rest.Substring(firstSpaceIndex + 1).Trim();
                        }
                    }

                    if (rest.Length > 0)
                    {
                        lines.Add(rest);
                    }
                }
            }
            return lines;
        }


        public bool IsReusable
        {
            get { return true; }
        }

    }
}
