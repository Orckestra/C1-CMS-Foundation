<%@ WebHandler Language="C#" Class="ShowMedia" %>

using System;
using System.Globalization;
using System.IO;
using System.Drawing.Imaging;
using System.Web;
using System.Web.SessionState;
using Composite;
using Composite.Data;
using Composite.Data.Types;
using Composite.Core.IO;
using Composite.Core.Extensions;
using Composite.Core.Logging;
using Composite.Core.WebClient;
using Composite.Core.WebClient.Media;
using Composite.Core.WebClient.Renderings;


public class ShowMedia : IHttpHandler, IReadOnlySessionState
{
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

    private static void ValidateAndSend(HttpContext context, IMediaFile file)
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


        bool clientCaching = false;
        
        if (Composite.C1Console.Security.UserValidationFacade.IsLoggedIn() == false)
        {
            context.Response.Cache.SetExpires(DateTime.Now.AddMinutes(60));
            context.Response.Cache.SetCacheability(HttpCacheability.Private);

            clientCaching = true;
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

            if (clientCaching && file.LastWriteTime != null)
            {
                var lastModified = file.LastWriteTime.Value;

                // Checking if @lastModified is not a future date. Note that the time isn't a UTC time
                if (lastModified < DateTime.Now)
                {
                    context.Response.Cache.SetLastModified(lastModified);
                }

                DateTime? ifModifiedSince = ExtractIfModifiedSinceHeader(context);
                if (ifModifiedSince != null && ifModifiedSince.Value.AddSeconds(2.0) >= lastModified)
                {
                    context.Response.StatusCode = 304; // Not modified
                    return;
                }
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
    
    private static DateTime? ExtractIfModifiedSinceHeader(HttpContext context)
    {
        string header = context.Request.Headers["If-Modified-Since"];

        if (header != null)
        {
            DateTime ifModifiedSince;
            if (DateTime.TryParse(header, CultureInfo.InvariantCulture, DateTimeStyles.None, out ifModifiedSince))
            {
                return ifModifiedSince;
            }
        }

        return null;
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



    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

    private static Stream ProcessImageResizing(HttpContext context, IMediaFile file)
    {
        var resizingOptions = ResizingOptions.Parse(context.Server, context.Request.QueryString);

        if (resizingOptions == null || resizingOptions.IsEmpty)
        {
            return file.GetReadStream();
        }

        //Determine the content type, and save
        //what image type we have for later use

        ImageFormat imgType;
        if (file.MimeType == "image/jpeg")
        {
            imgType = ImageResizer.SupportedImageFormats.JPG;
        }
        else if (file.MimeType == "image/gif")
        {
            // Returning image in PNG format because build-in GIF encoder produces images of a bad quality
            imgType = ImageResizer.SupportedImageFormats.PNG;
        }
        else if (file.MimeType == "image/png")
        {
            imgType = ImageResizer.SupportedImageFormats.PNG;
        }
        else if (file.MimeType == "image/tiff")
        {
            imgType = ImageResizer.SupportedImageFormats.TIFF;
        }
        else if (file.MimeType == "image/bmp")
        {
            imgType = ImageResizer.SupportedImageFormats.BMP;
        }
        else
        {
            // Converting resized images to jpeg by default
            imgType = ImageFormat.Jpeg;
        }

        string resizedImageFilePath = ImageResizer.GetResizedImage(context.Server, file, resizingOptions, imgType);

        try
        {
            return resizedImageFilePath != null 
                ? new C1FileStream(resizedImageFilePath, FileMode.OpenOrCreate, FileAccess.Read)
                : file.GetReadStream();
        }
        catch (Exception ex)
        {
            LoggingService.LogVerbose("Composite.Media.ImageResize", ex.Message);
        }
        return file.GetReadStream();
    }
}