<%@ WebHandler Language="C#" Class="ShowMedia" %>

using System;
using System.IO;
using System.Collections.Specialized;
using System.Drawing;
using System.Drawing.Imaging;
using System.Linq;
using System.Web;
using System.Web.Caching;
using System.Web.SessionState;
using System.Xml.Linq;
using Composite;
using Composite.Core.IO;
using Composite.Core.Xml;
using Composite.Core.Extensions;
using Composite.Core.Logging;
using Composite.Core.WebClient.Renderings;
using Composite.Core.WebClient;
using Composite.Data;
using Composite.Data.Types;
using Composite.Data.Plugins.DataProvider.Streams;


public class ShowMedia : IHttpHandler, IReadOnlySessionState
{
    private const string ResizedImagesCacheDirectory = "~/App_Data/Composite/Cache/Resized images";
    private const string ResizedImageKeys = "~/App_Data/Composite/Media/ResizingOptions.xml";

    private static string _resizedImagesDirectoryPath;
    private static string _resizedImageKeysFilePath;

    private static readonly TimeSpan CacheExpirationTimeSpan = new TimeSpan(1, 0, 0, 0);
    

    public void ProcessRequest(HttpContext context)
    {
        using (GlobalInitializerFacade.CoreIsInitializedScope)
        {
            IMediaFile file = null;

            try
            {
                file = MediaUrlHelper.GetFileFromQueryString(context.Request.QueryString);
            }
            catch (ArgumentNullException)
            {
                context.Response.StatusCode = 500;
                context.Response.Write("Invalid arguments");
            }
            catch (FileNotFoundException)
            {
                context.Response.StatusCode = 404;
                context.Response.Write("File not found");
            }

            if (file != null)
            {
                ValidateAndSend(context, file);
            }
        }
    }

    private void ValidateAndSend(HttpContext context, IMediaFile file)
    {
        RenderingResponseHandlerResult responseHandling = RenderingResponseHandlerFacade.GetDataResponseHandling(file.GetDataEntityToken());

        if (responseHandling != null)
        {
            bool redirecting = responseHandling.RedirectRequesterTo != null;

            if (redirecting)
            {
                context.Response.Redirect(responseHandling.RedirectRequesterTo.AbsoluteUri, false);
            }

            if (redirecting || responseHandling.EndRequest)
            {
                context.ApplicationInstance.CompleteRequest();
                return;
            }
        }

        context.Response.ContentType = GetMimeType(file);

        string encodedFileName = file.FileName.Replace("\"", "_");
        if (context.Request.Browser != null && context.Request.Browser.IsBrowser("ie"))
        {
            // Unicode characters have to be url-encoded for IE
            encodedFileName = HttpUtility.UrlEncode(encodedFileName).Replace("+", "%20");
        }

        bool download = (string.IsNullOrEmpty(context.Request["download"]) ? 
            IsWebFormatImage(file) == false : 
            context.Request["download"] != "false");

        context.Response.AddHeader("Content-Disposition", "{0};filename=\"{1}\"".FormatWith((download ? "attachment" : "inline"), encodedFileName));

        if (Composite.C1Console.Security.UserValidationFacade.IsLoggedIn() == false)
        {
            context.Response.Cache.SetExpires(DateTime.Now.AddMinutes(60));
            context.Response.Cache.SetCacheability(HttpCacheability.Private);
        }

        Stream inputStream = null;
        try
        {

            if (file.MimeType == "image/jpeg" || file.MimeType == "image/gif" || file.MimeType == "image/png"
                || file.MimeType == "image/bmp" || file.MimeType == "image/tiff")
            {
                inputStream = ProcessImageResizing(context, file);
            }
            else
            {
                inputStream = file.GetReadStream();
            }

            long? length = null;

            if (inputStream.CanSeek && inputStream.Length != 0)
            {
                length = inputStream.Length;
            }
            else if (file.Length.HasValue && file.Length > 0)
            {
                length = file.Length;
            }

            if (length != null)
            {
                context.Response.AddHeader("Content-Length", length.ToString());
            }

            inputStream.CopyTo(context.Response.OutputStream);
        }
        finally
        {
            if (inputStream != null)
            {
                inputStream.Close();
                inputStream.Dispose();
            }
        }

        try
        {
            context.Response.Flush();
        }
        catch (HttpException)
        {
            // Ignore - user canceled download.
        }
    }

    private static string GetMimeType(IMediaFile file)
    {
        string mimeType = file.MimeType;

        if (mimeType == MimeTypeInfo.Default)
        {
            mimeType = MimeTypeInfo.GetCanonicalFromExtension(Path.GetExtension(file.FileName.ToLower()));
        }

        return mimeType;
    }


    private static bool IsWebFormatImage(IMediaFile file)
    {
        switch (file.MimeType)
        {
            case "image/png":
            case "image/gif":
            case "image/jpeg":
                return true;
            default:
                return false;
        }        
    }

    public class ResizingOptions
    {
        public int? Height;
        public int? Width;
        public int? MaxHeight;
        public int? MaxWidth;

        public bool IsEmpty
        {
            get
            {
                return Height == null && Width == null && MaxHeight == null && MaxWidth == null;
            }
        }

        public static ResizingOptions FromQueryString(NameValueCollection queryString)
        {
            var result = new ResizingOptions();

            string str = queryString["w"];
            if (!string.IsNullOrEmpty(str))
            {
                result.Width = int.Parse(str);
            }

            str = queryString["h"];
            if (!string.IsNullOrEmpty(str))
            {
                result.Height = int.Parse(str);
            }

            str = queryString["mw"];
            if (!string.IsNullOrEmpty(str))
            {
                result.MaxWidth = int.Parse(str);
            }

            str = queryString["mh"];
            if (!string.IsNullOrEmpty(str))
            {
                result.MaxHeight = int.Parse(str);
            }

            return result;
        }

        //public string Serialize()
        //{
        //    var sb = new StringBuilder();
        //    var parameters = new int?[] { Width, Height, MaxWidth, MaxHeight };
        //    var parameterNames = new[] { "w", "h", "mw", "mh" };

        //    for (int i = 0; i < parameters.Length; i++)
        //    {
        //        if (parameters[i] != null)
        //        {
        //            sb.Append(parameterNames[i]).Append((int)parameters[i]);
        //        }
        //    }
        //    return sb.ToString();
        //}
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

    private Stream ProcessImageResizing(HttpContext context, IMediaFile file)
    {
        ResizingOptions resizingOptions;

        string resizingKey = context.Request.QueryString["k"];
        if (!string.IsNullOrEmpty(resizingKey))
        {
            resizingOptions = GetResizingOptionsByKey(context, resizingKey);
        }
        else
        {
            resizingOptions = ResizingOptions.FromQueryString(context.Request.QueryString);
        }

        if (resizingOptions == null || resizingOptions.IsEmpty)
        {
            return file.GetReadStream();
        }

        //Determine the content type, and save
        //what image type we have for later use
        ImageType imgType = default(ImageType);
        if (file.MimeType == "image/jpeg")
        {
            imgType = ImageType.JPG;
        }
        else if (file.MimeType == "image/gif")
        {
            // Returning image in PNG format because build-in GIF encoder produces images of a bad quality
            imgType = ImageType.PNG;
        }
        else if (file.MimeType == "image/png")
        {
            imgType = ImageType.PNG;
        }
        else if (file.MimeType == "image/tiff")
        {
            imgType = ImageType.TIFF;
        }
        else if (file.MimeType == "image/bmp")
        {
            imgType = ImageType.BMP;
        }

        string resizedImageFilePath = GetResizedImage(context, file, resizingOptions, imgType);

        try
        {
            return new C1FileStream(resizedImageFilePath, FileMode.OpenOrCreate, FileAccess.Read);
        }
        catch (Exception ex)
        {
            LoggingService.LogVerbose("Composite.Media.ImageResize", ex.Message);
        }
        return file.GetReadStream();
    }


    private string GetResizedImage(HttpContext context, IMediaFile file, ResizingOptions resizingOptions, ImageType imgType)
    {
        if (_resizedImagesDirectoryPath == null)
        {
            _resizedImagesDirectoryPath = context.Server.MapPath(ResizedImagesCacheDirectory);

            if (!C1Directory.Exists(_resizedImagesDirectoryPath))
            {
                C1Directory.CreateDirectory(_resizedImagesDirectoryPath);
            }
        }

        string imageKey = file.CompositePath;

        string imageSizeCacheKey = "ShowMedia.ashx image size " + imageKey;
        Size? imageSize = context.Cache.Get(imageSizeCacheKey) as Size?;

        Bitmap bitmap = null;
        try
        {
            if (imageSize == null)
            {
                bitmap = new Bitmap(file.GetReadStream());

                imageSize = new Size { Width = bitmap.Width, Height = bitmap.Height };

                var cacheDependency = new CacheDependency((file as FileSystemFileBase).SystemPath);

                context.Cache.Add(imageSizeCacheKey, imageSize, cacheDependency, DateTime.MaxValue, CacheExpirationTimeSpan, CacheItemPriority.Normal, null);
            }

            int newWidth, newHeight;
            bool needToResize = CalculateSize(imageSize.Value.Width, imageSize.Value.Height, resizingOptions, out newWidth, out newHeight);

            if (!needToResize)
            {
                return (file as FileSystemFileBase).SystemPath;
            }

            int filePathHash = imageKey.GetHashCode();
            string resizedImageFileName = string.Format("{0}x{1}_{2}.{3}", newWidth, newHeight, filePathHash, imgType.ToString().ToLower());

            string imageFullPath = Path.Combine(_resizedImagesDirectoryPath, resizedImageFileName);

            if (!C1File.Exists(imageFullPath) || C1File.GetLastWriteTime(imageFullPath) != file.LastWriteTime)
            {
                if (bitmap == null)
                {
                    bitmap = new Bitmap(file.GetReadStream());
                }

                ResizeImage(bitmap, imageFullPath, newWidth, newHeight, imgType);

                if (file.LastWriteTime.HasValue)
                {
                    C1File.SetLastWriteTime(imageFullPath, file.LastWriteTime.Value);
                }
            }

            return imageFullPath;
        }
        finally
        {
            if (bitmap != null)
            {
                bitmap.Dispose();
            }
        }
    }

    public enum ImageType
    {
        JPG,
        PNG,
        GIF,
        BMP,
        TIFF
    }

    private static void ResizeImage(Bitmap image, string outputFilePath, int newWidth, int newHeight, ImageType imgType)
    {
        Verify.ArgumentNotNull(image, "image");

        using (Bitmap resizedImage = new Bitmap(image, newWidth, newHeight))
        {
            resizedImage.SetResolution(72, 72);

            Graphics newGraphic = Graphics.FromImage(resizedImage);
            newGraphic.Clear(Color.White);
            newGraphic.SmoothingMode = System.Drawing.Drawing2D.SmoothingMode.AntiAlias;
            newGraphic.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic;
            newGraphic.DrawImage(image, 0, 0, newWidth, newHeight);

            //Save the image as the appropriate type
            ImageFormat imageFormat;
            switch (imgType)
            {
                case ImageType.GIF:
                    imageFormat = ImageFormat.Gif;
                    break;
                case ImageType.PNG:
                    imageFormat = ImageFormat.Png;
                    break;
                case ImageType.BMP:
                    imageFormat = ImageFormat.Bmp;
                    break;
                case ImageType.TIFF:
                    imageFormat = ImageFormat.Tiff;
                    break;
                default:
                    imageFormat = ImageFormat.Jpeg;
                    break;
            }

            resizedImage.Save(outputFilePath, imageFormat);
        }
    }

    private static bool CalculateSize(int width, int height, ResizingOptions resizingOptions, out int newWidth, out int newHeight)
    {
        // If both height and width are defined - we have "scalling"
        if (resizingOptions.Height != null && resizingOptions.Width != null)
        {
            newHeight = (int)resizingOptions.Height;
            newWidth = (int)resizingOptions.Width;

            // we do not allow scalling to a size, bigger than original one
            if (newHeight > height)
            {
                newHeight = height;
            }

            if (newWidth > width)
            {
                newWidth = width;
            }
            return newWidth != width || newHeight != height;
        }

        newWidth = width;
        newHeight = height;

        // If image doesn't fit to bondaries "maxWidth X maxHeight", downsizing it
        int? maxWidth = resizingOptions.Width;
        if (resizingOptions.MaxWidth != null && (maxWidth == null || resizingOptions.MaxWidth < maxWidth))
        {
            maxWidth = resizingOptions.MaxWidth;
        }

        int? maxHeight = resizingOptions.Height;
        if (resizingOptions.MaxHeight != null && (maxHeight == null || resizingOptions.MaxHeight < maxHeight))
        {
            maxHeight = resizingOptions.MaxHeight;
        }

        // Applying MaxHeight and MaxWidth limitations
        if (maxHeight != null && (int)maxHeight < newHeight)
        {
            newHeight = (int)maxHeight;
            newWidth = (int)(width * (double)(int)maxHeight / height);
        }

        if (maxWidth != null && (int)maxWidth < newWidth)
        {
            newWidth = (int)maxWidth;
            newHeight = (int)(height * (double)(int)maxWidth / width);
        }

        return newWidth != width || newHeight != height;
    }

    public ResizingOptions GetResizingOptionsByKey(HttpContext context, string key)
    {
        //Load the xml file
        XElement xml = GetPredefinedResizingOptions(context);

        //Get all nodes where the name equals the key
        //To make this code work in .Net 2.0, use an xpath query to get the height
        //and width values instead of a LINQ query
        var query = from r in xml.Elements("image")
                    where r.Attribute("name") != null && r.Attribute("name").Value == key
                    select r;


        var result = new ResizingOptions();

        foreach (XElement r in query)
        {
            var attr = r.Attribute("height");
            if (attr != null)
            {
                result.Height = int.Parse(attr.Value);
            }

            attr = r.Attribute("width");
            if (attr != null)
            {
                result.Width = int.Parse(attr.Value);
            }

            attr = r.Attribute("maxheight");
            if (attr != null)
            {
                result.MaxHeight = int.Parse(attr.Value);
            }

            attr = r.Attribute("maxwidth");
            if (attr != null)
            {
                result.MaxWidth = int.Parse(attr.Value);
            }
        }

        return result;
    }

    private static XElement GetPredefinedResizingOptions(HttpContext context)
    {
        if (_resizedImageKeysFilePath == null)
        {
            _resizedImageKeysFilePath = context.Server.MapPath(ResizedImageKeys);
        }

        XElement xel = context.Cache.Get("ResizedImageKeys") as XElement;

        //If it's not there, load the xml document and then add it to the cache
        if (xel == null)
        {
            if (!C1File.Exists(_resizedImageKeysFilePath))
            {
                string directoryPath = Path.GetDirectoryName(_resizedImageKeysFilePath);
                if (!C1Directory.Exists(directoryPath)) C1Directory.CreateDirectory(directoryPath);

                var config = new XElement("ResizedImages");
                config.Add(new XElement("image",
                    new XAttribute("name", "thumbnail"),
                    new XAttribute("maxwidth", "100"),
                    new XAttribute("maxheight", "100")));

                config.Add(new XElement("image",
                    new XAttribute("normal", "thumbnail"),
                    new XAttribute("maxwidth", "200")));

                config.Add(new XElement("image",
                    new XAttribute("name", "large"),
                    new XAttribute("maxheight", "300")));

                config.Save(_resizedImageKeysFilePath);
            }

            xel = XElementUtils.Load(_resizedImageKeysFilePath);
            CacheDependency cd = new CacheDependency(_resizedImageKeysFilePath);
            TimeSpan ts = new TimeSpan(24, 0, 0);
            context.Cache.Add("ResizedImageKeys", xel, cd, Cache.NoAbsoluteExpiration, ts, CacheItemPriority.Default, null);
        }

        return xel;
    }
}