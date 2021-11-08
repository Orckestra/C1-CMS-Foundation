<%@ WebHandler Language="C#" Class="ShowMedia" %>

using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.SessionState;
using Composite;
using Composite.C1Console.Security;
using Composite.Data;
using Composite.Data.Types;
using Composite.Core;
using Composite.Core.Configuration;
using Composite.Core.IO;
using Composite.Core.Extensions;
using Composite.Core.WebClient;
using Composite.Core.WebClient.Media;
using Composite.Core.WebClient.Renderings;
using Composite.Data.Plugins.DataProvider.Streams;


public class ShowMedia : IHttpHandler, IReadOnlySessionState
{
    private const int CopyBufferSize = 8192;
    private static readonly string MediaUrl_PublicPrefix = UrlUtils.PublicRootPath + "/media/";

    private static readonly string[] MediaTypesBrowserCanView = new[]
    {
        MimeTypeInfo.Flash,
        MimeTypeInfo.Jpeg,
        MimeTypeInfo.Png,
        MimeTypeInfo.Gif,
        MimeTypeInfo.Bmp
    };

    private class Range
    {
        public Range(long offset, long length)
        {
            Offset = offset;
            Length = length;
        }

        public readonly long Offset;
        public readonly long Length;
    }

    private class FileOrStream
    {
        readonly string _fileName;
        readonly IMediaFile _mediaFile;

        public FileOrStream(string fileName)
        {
            _fileName = fileName;
        }

        public FileOrStream(IMediaFile mediaFile)
        {
            _mediaFile = mediaFile;

            if (mediaFile is FileSystemFileBase)
            {
                _fileName = ((FileSystemFileBase) _mediaFile).SystemPath;
            }
        }

        public bool IsFile
        {
            get { return _fileName != null; }
        }

        public string GetFilePath()
        {
            return _fileName;
        }

        public Stream OpenReadStream()
        {
            return _mediaFile.GetReadStream();
        }
    }


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
            catch (Exception)
            {
                if (UserValidationFacade.IsLoggedIn())
                {
                    throw;
                }

                context.Response.StatusCode = 500;
            }

            if (file == null)
            {
                return;
            }

            try
            {
                ValidateAndSend(context, file);
            }
            catch (Exception)
            {
                context.Response.ClearHeaders();
                if (UserValidationFacade.IsLoggedIn())
                {
                    throw;
                }

                context.Response.StatusCode = 500;
            }
        }
    }

    private static bool ExecuteResponseHandlers(HttpContext context, IMediaFile mediaFile)
    {
        RenderingResponseHandlerResult responseHandling = RenderingResponseHandlerFacade.GetDataResponseHandling(mediaFile.GetDataEntityToken());

        if (responseHandling != null)
        {
            if (responseHandling.PreventPublicCaching)
            {
                var hostname = context.Request.Url.Host;
                var mappers = ServiceLocator.GetServices<INonCachebleRequestHostnameMapper>();
                var newHostname = mappers
                        .Select(m => m.GetRedirectToHostname(hostname))
                        .FirstOrDefault(h => !string.IsNullOrWhiteSpace(h) && h != hostname);

                if (newHostname != null)
                {
                    var url = new Uri(context.Request.Url, context.Request.RawUrl).ToString();
                    int offset = url.IndexOf(hostname, StringComparison.OrdinalIgnoreCase);
                    if (offset > 0)
                    {
                        var newUrl = url.Substring(0, offset) + newHostname + url.Substring(offset + hostname.Length);
                        context.Response.RedirectPermanent(newUrl, false);
                        return true;
                    }
                }

                context.Response.Cache.SetCacheability(HttpCacheability.Private);
            }

            bool redirecting = responseHandling.RedirectRequesterTo != null;

            if (redirecting)
            {
                context.Response.Redirect(responseHandling.RedirectRequesterTo.ToString(), false);
            }

            if (redirecting || responseHandling.EndRequest)
            {
                context.ApplicationInstance.CompleteRequest();
                return true;
            }
        }

        return false;
    }

    private static void AddContentDispositionHeader(HttpContext context, IMediaFile file, string sourceMediaType, string resultMediaType)
    {
        string encodedFileName = file.FileName.Replace("\"", "_");
        if (context.Request.Browser != null && context.Request.Browser.IsBrowser("ie"))
        {
            // Unicode characters have to be url-encoded for IE
            encodedFileName = HttpUtility.UrlEncode(encodedFileName).Replace("+", "%20");
        }

        if (sourceMediaType != resultMediaType)
        {
            string originalExtension = "";

            try
            {
                originalExtension = Path.GetExtension(encodedFileName);
                if (originalExtension.StartsWith(".")) originalExtension = originalExtension.Substring(1);
            }
            catch {}

            var resultExtension = MimeTypeInfo.GetExtensionFromMimeType(resultMediaType);

            if(!string.IsNullOrEmpty(originalExtension) && !string.IsNullOrEmpty(resultExtension) && originalExtension != resultExtension
                && encodedFileName.EndsWith("." + originalExtension))
            {
                encodedFileName = encodedFileName.Substring(0, encodedFileName.Length - originalExtension.Length)
                                  + resultExtension;
            }
        }

        bool download = (string.IsNullOrEmpty(context.Request["download"]) ?
            !CanBePreviewedInBrowser(context, file.MimeType) :
            context.Request["download"] != "false");

        context.Response.AddHeader("Content-Disposition", "{0};filename=\"{1}\"".FormatWith((download ? "attachment" : "inline"), encodedFileName));
    }

    private static void ValidateAndSend(HttpContext context, IMediaFile file)
    {
        if (ExecuteResponseHandlers(context, file))
        {
            return;
        }

        bool checkIfModifiedSince = false;


        if (UrlContainsTimestamp(context, file))
        {
            context.Response.Cache.SetExpires(DateTime.Now.AddDays(30));
            context.Response.Cache.SetCacheability(HttpCacheability.Public);

            checkIfModifiedSince = true;
        }
        else if (!UserValidationFacade.IsLoggedIn())
        {
            context.Response.Cache.SetExpires(DateTime.Now.AddMinutes(60));
            context.Response.Cache.SetCacheability(HttpCacheability.Private);

            checkIfModifiedSince = true;
        }

        Stream inputStream = null;
        try
        {
            FileOrStream source;

            string mediaType = GetMediaType(file);
            string outputMediaType;

            if (ImageResizer.SourceMediaTypeSupported(mediaType))
            {
                source = ProcessImageResizing(context, file, mediaType, out outputMediaType);
            }
            else
            {
                source = new FileOrStream(file);
                outputMediaType = mediaType;
            }

            context.Response.ContentType = outputMediaType;

            AddContentDispositionHeader(context, file, mediaType, outputMediaType);

            long? length = null;
            bool canSeek;

            if (source.IsFile)
            {
                var fileInfo = new FileInfo(source.GetFilePath());
                if (!fileInfo.Exists)
                {
                    context.Response.StatusCode = 404;
                    return;
                }

                length = fileInfo.Length;
                canSeek = true;
            }
            else
            {
                inputStream = source.OpenReadStream();

                canSeek = inputStream.CanSeek;

                if (canSeek && inputStream.Length != 0)
                {
                    length = inputStream.Length;
                }
                else if (file.Length.HasValue && file.Length > 0)
                {
                    length = file.Length;
                }
            }

            bool canAcceptRanges = canSeek && length != null && length > 0;
            if (canAcceptRanges)
            {
                context.Response.AddHeader("Accept-Ranges", "bytes");
            }

            if (checkIfModifiedSince && file.LastWriteTime != null)
            {
                var lastModified = file.LastWriteTime.Value;

                // Checking if @lastModified is not a future date. Note that the time isn't a UTC time
                if (lastModified < DateTime.Now)
                {
                    context.Response.Cache.SetLastModified(lastModified);
                }

                DateTime? ifModifiedSince = ParseDateTimeHeader(context, "If-Modified-Since");
                if (ifModifiedSince != null && ifModifiedSince.Value.AddSeconds(2.0) >= lastModified)
                {
                    context.Response.StatusCode = 304; // Not modified
                    return;
                }

                DateTime? ifUnmodifiedSince = ParseDateTimeHeader(context, "If-Unmodified-Since");
                if (ifUnmodifiedSince != null && ifUnmodifiedSince.Value.AddSeconds(2.0) < lastModified)
                {
                    context.Response.StatusCode = 412; // Precondition failed
                    return;
                }
            }


            string rangeStr = context.Request.Headers["Range"];

            if (canAcceptRanges && !rangeStr.IsNullOrEmpty())
            {
                List<Range> rangeSegments = ParseRanges(rangeStr, length.Value);

                context.Response.AddHeader("Content-Range", BuildContentRangeResponseHeader(rangeSegments, length.Value));
                context.Response.StatusCode = 206; // Partial content

                int totalLength = (int)rangeSegments.Select(rs => rs.Length).Sum();
                Verify.That(totalLength <= length.Value, "Combined download range is bigger then stream length");

                context.Response.AddHeader("Content-Length", totalLength.ToString(CultureInfo.InvariantCulture));

                foreach (var rangeSegment in rangeSegments)
                {
                    if (source.IsFile)
                    {
                        context.Response.WriteFile(source.GetFilePath(), rangeSegment.Offset, rangeSegment.Length);
                    }
                    else
                    {
                        inputStream.Seek(rangeSegment.Offset, SeekOrigin.Begin);

                        OutputToResponse(context, new LimitedStream(inputStream, rangeSegment.Length));
                    }
                }
            }
            else
            {
                if (length != null)
                {
                    context.Response.AddHeader("Content-Length", ((int)length).ToString(CultureInfo.InvariantCulture));
                }

                if (source.IsFile)
                {
                    context.Response.WriteFile(source.GetFilePath());
                }
                else
                {
                    OutputToResponse(context, inputStream);
                }
            }
        }
        catch (HttpException)
        {
            // Ignore - client disconnected
        }
        finally
        {
            if (inputStream != null)
            {
                inputStream.Close();
                inputStream.Dispose();
            }
        }
    }

    private static bool UrlContainsTimestamp(HttpContext context, IMediaFile file)
    {
        string url = context.Request.RawUrl;

        if (!url.StartsWith(MediaUrl_PublicPrefix, StringComparison.OrdinalIgnoreCase)) return false;

        string[] urlParts = url.Substring(MediaUrl_PublicPrefix.Length).Split('/');

        Guid tempGuid;

        return urlParts.Length >= 2
            && Guid.TryParse(urlParts[0], out tempGuid)
            && urlParts[1].Length == 6
            && urlParts[1] == GetTimeStampHash(file);
    }


    private static string GetTimeStampHash(IMediaFile file)
    {
        int hash = file.LastWriteTime.Value.ToUniversalTime().GetHashCode();
        return Convert.ToBase64String(BitConverter.GetBytes(hash)).Substring(0, 6).Replace('+', '-').Replace('/', '_');
    }


    private static void OutputToResponse(HttpContext context, Stream inputStream)
    {
        var response = context.Response;

        byte[] buffer = new byte[CopyBufferSize];

        int chunk = 0;

        int read;
        while ((read = inputStream.Read(buffer, 0, buffer.Length)) != 0)
        {
            chunk++;

            response.OutputStream.Write(buffer, 0, read);

            if (chunk % 20 == 0)
            {
                if (!response.IsClientConnected)
                {
                    return;
                }

                // Flushing to prevent unnecessary memory usage
                response.Flush();
            }
        }
    }


    private static List<Range> ParseRanges(string rangesStr, long streamLength)
    {
        const string requiredPrefix = "bytes=";
        Verify.That(rangesStr.StartsWith(requiredPrefix), "Incorrect 'Range' header. Prefix '{0}' is missing. '{1}'", requiredPrefix, rangesStr);

        rangesStr = rangesStr.Substring(requiredPrefix.Length);
        var result = new List<Range>();

        foreach (string rangeStr in rangesStr.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
        {
            try
            {
                string[] rangeParts = rangeStr.Split('-');
                Verify.That(rangeParts.Length == 2, "Range segment should contain one and only one '-' character");

                long? beginOffset = (rangeParts[0] != string.Empty) ? (long?)long.Parse(rangeParts[0]) : null;
                long? endOffset = (rangeParts[1] != string.Empty) ? (long?)long.Parse(rangeParts[1]) : null;

                Verify.That(beginOffset != null || endOffset != null, "Parameters missing");


                if (beginOffset == null)
                {
                    Verify.That(endOffset <= streamLength, "The segment is bigger than the length of the file");

                    result.Add(new Range(streamLength - endOffset.Value, endOffset.Value));
                    continue;
                }

                Verify.That(beginOffset < streamLength, "Begin offset is out of range");

                if (endOffset == null)
                {
                    result.Add(new Range(beginOffset.Value, streamLength - beginOffset.Value));
                    continue;
                }

                Verify.That(beginOffset <= endOffset, "End offset should be greater than begin offset");

                result.Add(new Range(beginOffset.Value, endOffset.Value - beginOffset.Value + 1));
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException("Incorrect range segment '{0}'. Range: '{1}'".FormatWith(rangeStr, rangesStr), ex);
            }
        }

        return result;
    }

    private static string BuildContentRangeResponseHeader(List<Range> rangeSegments, long length)
    {
        var contentRangeHeader = new StringBuilder();
        contentRangeHeader.Append("bytes ");

        foreach (var rangeSegment in rangeSegments)
        {
            contentRangeHeader.Append(rangeSegment.Offset);
            contentRangeHeader.Append("-");
            contentRangeHeader.Append(rangeSegment.Offset + rangeSegment.Length - 1);
        }

        Verify.That(rangeSegments.Count <= 10, "Too many range segments");

        contentRangeHeader.Append("/").Append(length);

        return contentRangeHeader.ToString();
    }

    private static DateTime? ParseDateTimeHeader(HttpContext context, string headerName)
    {
        string header = context.Request.Headers[headerName];

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

    private static string GetMediaType(IMediaFile file)
    {
        string mediaType = file.MimeType;

        if (mediaType == MimeTypeInfo.Default)
        {
            mediaType = MimeTypeInfo.GetCanonicalFromExtension(Path.GetExtension(file.FileName.ToLowerInvariant()));
        }

        return mediaType;
    }


    private static bool CanBePreviewedInBrowser(HttpContext context, string mediaType)
    {
        return MediaTypesBrowserCanView.Contains(mediaType) || context.Request.AcceptTypes.Contains(mediaType);
    }


    public bool IsReusable { get { return true; } }

    private static string GetResizedImageMediaType(string mediaType)
    {
        if (mediaType == MimeTypeInfo.Gif)
        {
            // Returning image in PNG format because build-in GIF encoder produces images of a bad quality
            return MimeTypeInfo.Png;
        }

        if (mediaType == MimeTypeInfo.Bmp)
        {
            return MimeTypeInfo.Jpeg;
        }

        if (ImageResizer.TargetMediaTypeSupported(mediaType))
        {
            return mediaType;
        }

        // Converting resized images to jpeg by default
        return MimeTypeInfo.Jpeg;
    }

    private static FileOrStream ProcessImageResizing(HttpContext context, IMediaFile file, string mediaType, out string resizedImageMediaType)
    {
        var resizingOptions = ResizingOptions.Parse(context.Request.QueryString);

        var preferredMediaType = resizingOptions.MediaType;

        if (resizingOptions.IsEmpty
            || (preferredMediaType != null && !ImageResizer.TargetMediaTypeSupported(preferredMediaType)))
        {
            resizedImageMediaType = mediaType;
            return new FileOrStream(file);
        }

        if (GlobalSettingsFacade.ProtectResizedImagesWithHash && !UserValidationFacade.IsLoggedIn())
        {
            var expectedHash = resizingOptions.GetSecureHash(file.Id);
            if (context.Request.QueryString["sh"] != expectedHash)
            {
                // Returning the media file without resizing
                resizedImageMediaType = mediaType;
                return new FileOrStream(file);
            }
        }

        var targetImageMediaType = GetResizedImageMediaType(preferredMediaType ?? mediaType);

        try
        {
            string resizedImageFilePath = ImageResizer.GetResizedImage(file, resizingOptions, mediaType, targetImageMediaType);

            resizedImageMediaType = resizedImageFilePath != null ? targetImageMediaType : mediaType;

            return resizedImageFilePath != null
                ? new FileOrStream(resizedImageFilePath)
                : new FileOrStream(file);
        }
        catch (Exception ex)
        {
            Log.LogVerbose("Composite.Media.ImageResize", ex.Message);
        }

        resizedImageMediaType = mediaType;
        return new FileOrStream(file);
    }

    /// <summary>
    /// Allows reading only limited amount bytes from inner stream
    /// </summary>
    private class LimitedStream : Stream
    {
        private readonly Stream _innerStream;
        private readonly long _size;
        private long _position;

        public LimitedStream(Stream innerStream, long size)
        {
            _innerStream = innerStream;
            _size = size;
            _position = 0;
        }

        public override void Flush()
        {
        }

        public override long Seek(long offset, SeekOrigin origin)
        {
            throw new NotSupportedException();
        }

        public override void SetLength(long value)
        {
            throw new NotSupportedException();
        }

        public override int Read(byte[] buffer, int offset, int count)
        {
            if (_position >= _size)
            {
                return 0;
            }

            int bytesRead = _innerStream.Read(buffer, offset, (int)Math.Min(count, _size - _position));

            _position += bytesRead;

            return bytesRead;
        }

        public override void Write(byte[] buffer, int offset, int count)
        {
            throw new NotSupportedException();
        }

        public override bool CanRead
        {
            get { return true; }
        }

        public override bool CanSeek
        {
            get { return false; }
        }

        public override bool CanWrite
        {
            get { return false; }
        }

        public override long Length
        {
            get { return _size; }
        }

        public override long Position
        {
            get { return _position; }
            set { throw new NotSupportedException(); }
        }
    }
}