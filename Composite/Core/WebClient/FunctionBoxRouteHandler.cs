using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.Globalization;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Routing;
using Composite.C1Console.Drawing;
using Composite.C1Console.Security;
using Composite.Core.Configuration;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Core.WebClient.Renderings;


namespace Composite.Core.WebClient
{
    internal class FunctionBoxRoute : Route
    {
        // Adding "x" as a fictional paramter, so MVC wouldn't use this route for producing outbound links
        public FunctionBoxRoute() : base("Renderers/FunctionBo{x}", new FunctionBoxRouteHandler()) { }
    }

    
    internal class FunctionBoxRouteHandler : IRouteHandler
    {
        public IHttpHandler GetHttpHandler(RequestContext requestContext)
        {
            return new FunctionBoxHttpHandler();
        }
    }


    /// <summary>
    /// Renders image that shows information about a function information in Visual Editor
    /// </summary>
    internal class FunctionBoxHttpHandler : HttpTaskAsyncHandler
    {
        private const int MinCharsPerDescriptionLine = 55;
        private static readonly string LogTitle = nameof(FunctionBoxHttpHandler);

        public override async Task ProcessRequestAsync(HttpContext context)
        {
            if (!UserValidationFacade.IsLoggedIn())
            {
                context.Response.ContentType = MimeTypeInfo.Text;
                context.Response.Write("No user logged in");
                context.Response.StatusCode = 401;
                return;
            }

            try
            {
                string title = context.Request["title"];
                bool editable = context.Request["editable"] == "true";

                Verify.That(!title.IsNullOrEmpty(), "Missing query string argument 'title'");

                string boxtype = context.Request["type"];
                Verify.That(!boxtype.IsNullOrEmpty(), "Missing query string argument 'boxtype'");

                IEnumerable<string> existingTemplateImages = new[] { "html", "function", "warning" };
                Verify.That(existingTemplateImages.Contains(boxtype),
                    "Query string argument 'boxtype' expected to be one of the following values: " + string.Join(", ", existingTemplateImages));

                string description = context.Request["description"];
                string encodedMarkup = context.Request["markup"];

                string language = context.Request["lang"];

                if (!string.IsNullOrEmpty(language))
                {
                    Thread.CurrentThread.CurrentUICulture = CultureInfo.GetCultureInfo(language);
                }

                List<string> textLines = null;
                if (description != null)
                {
                    textLines = GetDescriptionLines(description);
                }


                Bitmap previewImage = null;

                try
                {
                    if (GlobalSettingsFacade.FunctionPreviewEnabled && encodedMarkup != null)
                    {
                        try
                        {
                            string fileName = await FunctionPreview.GetPreviewFunctionPreviewImageFile(context);

                            if (!context.Response.IsClientConnected)
                            {
                                return;
                            }

                            if (fileName != null)
                            {
                                previewImage = new Bitmap(fileName);

                                if (previewImage.Width <= 1 && previewImage.Height <= 1)
                                {
                                    previewImage = null;
                                }
                            }
                        }
                        catch (Exception ex)
                        {
                            Log.LogError("Function preview", ex);
                        }
                    }

                    if (boxtype == "function")
                    {
                        if (previewImage != null)
                        {
                            FunctionPresentation.GenerateFunctionBoxWithPreview(context, title, previewImage, editable, context.Response.OutputStream);
                        }
                        else
                        {
                            FunctionPresentation.GenerateFunctionBoxWithText(context, title, false, editable, textLines, context.Response.OutputStream);
                        }
                    }
                    else if (boxtype == "warning")
                    {
                        FunctionPresentation.GenerateFunctionBoxWithText(context, title, true, editable, textLines, context.Response.OutputStream);
                    }
                    else 
                    {
                        GenerateBoxImage(context, boxtype, title, previewImage, textLines);
                    }
                    
                }
                finally
                {
                    previewImage?.Dispose();
                }
            }
            catch (Exception ex)
            {
                if (ex is HttpException && !context.Response.IsClientConnected)
                {
                    return;
                }

                Log.LogError(LogTitle, ex);

                if (context.Response.IsClientConnected)
                {
                    try
                    {
                        context.Response.Redirect(UrlUtils.AdminRootPath + "/images/function.png", false);
                    }
                    catch (Exception redirectError)
                    {
                        Log.LogError(LogTitle, redirectError);
                    }
                }
            }
        }

 

        private static void GenerateBoxImage(HttpContext context, string boxtype, string title, Bitmap previewImage,
            List<string> textLines)
        {
            string filePath = context.Server.MapPath(UrlUtils.ResolveAdminUrl($"images/{boxtype}box.png"));
            using (var bitmap = (Bitmap) Bitmap.FromFile(filePath))
            {
                var imageCreator = new ImageTemplatedBoxCreator(bitmap, new Point(55, 40), new Point(176, 78))
                {
                    MinHeight = 50
                };


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


        private static List<string> GetDescriptionLines(string description)
        {
            var lines = new List<string>();

            if (!description.IsNullOrEmpty())
            {
                description = UrlUtils.UnZipContent(description);

                foreach (string naturalLine in description.Split('\n'))
                {
                    if (naturalLine.Length == 0) lines.Add("");

                    string rest = naturalLine.Trim();

                    while (rest.Length > MinCharsPerDescriptionLine && rest.IndexOf(' ') > -1)
                    {
                        int firstSpaceIndex = rest.LastIndexOf(' ', MinCharsPerDescriptionLine);

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


        /// <exclude />
        public override bool IsReusable => true;
    }
}
