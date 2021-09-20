using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Caching;
using System.Web.Hosting;
using Composite.Core.IO;
using Composite.Data.Plugins.DataProvider.Streams;
using Composite.Data.Types;

namespace Composite.Core.WebClient.Media
{
    ///<summary>
    /// Class that performs image resizing
    ///</summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public static class ImageResizer
    {
        private static readonly MD5 _hashAlgorithm = MD5.Create();

        private const string ResizedImagesCacheDirectory = "~/App_Data/Composite/Cache/Resized images";

        private static Dictionary<string, IImageFileFormatProvider> _imageFormatProviders;

        private static Dictionary<string, IImageFileFormatProvider> ImageFormatProviders
        {
            get
            {
                if (_imageFormatProviders != null) return _imageFormatProviders;

                var customProviders = ServiceLocator.GetServices<IImageFileFormatProvider>().ToList();

                var result = new Dictionary<string, IImageFileFormatProvider>();
                customProviders.ForEach(provider => result[provider.MediaType] = provider);

                return _imageFormatProviders = result;
            }
        }

        private static readonly TimeSpan CacheExpirationTimeSpan = new TimeSpan(1, 0, 0, 0);

        private static string _resizedImagesDirectoryPath;

        private static string ResizedImagesDirectoryPath
        {
            get
            {
                if (_resizedImagesDirectoryPath == null)
                {
                    _resizedImagesDirectoryPath = HostingEnvironment.MapPath(ResizedImagesCacheDirectory);

                    if (!C1Directory.Exists(_resizedImagesDirectoryPath))
                    {
                        C1Directory.CreateDirectory(_resizedImagesDirectoryPath);
                    }
                }

                return _resizedImagesDirectoryPath;
            }
        }

        /// <summary>
        /// Gets the resized image.
        /// </summary>
        /// <param name="file">The media file.</param>
        /// <param name="resizingOptions">The resizing options.</param>
        /// <param name="sourceMediaType">The media type of the image.</param>
        /// <param name="targetMediaType">The media type for the resized image.</param>
        /// <returns>A full file path to a resized image; null if there's no need to resize the image</returns>
        public static string GetResizedImage(IMediaFile file, ResizingOptions resizingOptions,
                                             string sourceMediaType, string targetMediaType)
        {
            Verify.ArgumentNotNull(file, nameof(file));
            Verify.ArgumentNotNullOrEmpty(sourceMediaType, nameof(sourceMediaType));
            Verify.ArgumentNotNullOrEmpty(targetMediaType, nameof(targetMediaType));

            if (!ImageFormatProviders.TryGetValue(sourceMediaType, out var sourceImageFormatProvider))
                throw new ArgumentException($"Unsupported media type '{sourceMediaType}'", nameof(sourceMediaType));

            if (!ImageFormatProviders.TryGetValue(targetMediaType, out var imageFileFormatProvider))
                throw new ArgumentException($"Unsupported media type '{targetMediaType}'", nameof(targetMediaType));


            string imageKey = file.CompositePath;

            string imageSizeCacheKey = nameof(ImageResizer) + imageKey;
            Size? imageSize = HttpRuntime.Cache.Get(imageSizeCacheKey) as Size?;

            Func<Stream, Bitmap> loadImageFunc = sourceImageFormatProvider.LoadImageFromStream;

            Bitmap bitmap = null;
            Stream fileStream = null;
            try
            {
                if (imageSize == null)
                {
                    if (sourceImageFormatProvider.CanReadImageSize)
                    {
                        fileStream = file.GetReadStream();
                        if (sourceImageFormatProvider.TryGetSize(fileStream, out var imageSizeFromProvider))
                        {
                            imageSize = imageSizeFromProvider;
                        }

                        fileStream.Close();
                        fileStream.Dispose();
                        fileStream = null;
                    }

                    if (imageSize == null)
                    {
                        fileStream = file.GetReadStream();
                        bitmap = loadImageFunc(fileStream);

                        imageSize = new Size { Width = bitmap.Width, Height = bitmap.Height };
                    }

                    // We can provider cache dependency only for the native media provider
                    CacheDependency cacheDependency = null;
                    if (file is FileSystemFileBase fileSystemFile)
                    {
                        cacheDependency = new CacheDependency(fileSystemFile.SystemPath);
                    }

                    HttpRuntime.Cache.Add(imageSizeCacheKey, imageSize, cacheDependency, DateTime.MaxValue, CacheExpirationTimeSpan, CacheItemPriority.Normal, null);
                }

                bool needToResize = CalculateSize(imageSize.Value.Width, imageSize.Value.Height, resizingOptions,
                                                  out int newWidth, out int newHeight, out bool centerCrop);

                needToResize = needToResize || resizingOptions.CustomQuality;

                if (!needToResize)
                {
                    return null;
                }

                string mediaFileHash = GetMediaHash(imageKey);

                string centerCroppedString = centerCrop ? "c" : string.Empty;

                string fileExtension = imageFileFormatProvider.FileExtension;
                string qualityCacheKeyPart = imageFileFormatProvider.CanSetImageQuality
                    ? $"_{resizingOptions.Quality}"
                    : "";

                string resizedImageFileName = $"{newWidth}x{newHeight}{centerCroppedString}_{mediaFileHash}{qualityCacheKeyPart}.{fileExtension}";

                string resizedImageFullPath = Path.Combine(ResizedImagesDirectoryPath, resizedImageFileName);

                if (!C1File.Exists(resizedImageFullPath) || C1File.GetLastWriteTime(resizedImageFullPath) != file.LastWriteTime)
                {
                    if (bitmap == null)
                    {
                        fileStream = file.GetReadStream();
                        bitmap = loadImageFunc(fileStream);
                    }

                    using (Bitmap resizedImage = ResizeImage(bitmap, newWidth, newHeight, centerCrop))
                    {
                        int? imageQuality = imageFileFormatProvider.CanSetImageQuality ? (int?)resizingOptions.Quality : null;

                        imageFileFormatProvider.SaveImageToFile(resizedImage, resizedImageFullPath, imageQuality);
                    }

                    if (file.LastWriteTime.HasValue)
                    {
                        C1File.SetLastWriteTime(resizedImageFullPath, file.LastWriteTime.Value);
                    }
                }

                return resizedImageFullPath;
            }
            finally
            {
                bitmap?.Dispose();
                fileStream?.Dispose();
            }
        }

        private static string GetMediaHash(string mediaKeyPath)
        {
            var bytes = Encoding.UTF8.GetBytes(mediaKeyPath);
            var hash = _hashAlgorithm.ComputeHash(bytes);
            var guid = new Guid(hash);
            return UrlUtils.CompressGuid(guid).Substring(10);
        }

        private static bool CalculateSize(int width, int height, ResizingOptions resizingOptions, out int newWidth, out int newHeight, out bool centerCrop)
        {
            // Can be refactored to use System.Drawing.Size class instead of (width & height).

            if (width == 0 || height == 0)
            {
                newHeight = newWidth = 0;
                centerCrop = false;
                return false;
            }

            Verify.ArgumentCondition(width > 0, "width", "Negative values aren't allowed");
            Verify.ArgumentCondition(height > 0, "height", "Negative values aren't allowed");

            centerCrop = false;

            // If both height and width are defined - we have "scaling"
            if (resizingOptions.Height != null && resizingOptions.Width != null)
            {
                newHeight = (int)resizingOptions.Height;
                newWidth = (int)resizingOptions.Width;

                // we do not allow scaling to a size, bigger than original one
                if (newHeight > height)
                {
                    newHeight = height;
                }

                if (newWidth > width)
                {
                    newWidth = width;
                }

                // If the target dimensions are bigger or the same size as of the image - no resizing is done
                if (newWidth == width && newHeight == height)
                {
                    return false;
                }

                switch (resizingOptions.ResizingAction)
                {
                    case ResizingAction.Stretch:
                        // no additional logic
                        break;

                    case ResizingAction.Crop:
                        centerCrop = true;
                        break;

                    case ResizingAction.Fit:
                    case ResizingAction.Fill:
                        // No float point division for better precision
                        Int64 heightProportionArea = (Int64)newHeight * width;
                        Int64 widthProportionArea = (Int64)newWidth * height;

                        if (heightProportionArea == widthProportionArea)
                        {
                            break;
                        }

                        if ((heightProportionArea > widthProportionArea)
                            //  (newHeight / height) > (newWidth / width) 
                              ^ (resizingOptions.ResizingAction == ResizingAction.Fit))
                        {
                            newWidth = (int)(heightProportionArea / height);
                            // newWidth = width * (newHeight / height)
                        }
                        else
                        {
                            newHeight = (int)(widthProportionArea / width);
                            // newHeight = height * (newWidth / width)
                        }

                        break;
                }

                return true;
            }

            newWidth = width;
            newHeight = height;

            // If image doesn't fit to boundaries "maxWidth X maxHeight", downsizing it
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


        /// <summary>
        /// Resizes an image
        /// </summary>
        /// <param name="image">source</param>
        /// <param name="newWidth">width</param>
        /// <param name="newHeight">height</param>
        /// <param name="centerCrop">when true, cropping will happen</param>
        /// <returns>the resized image</returns>
        public static Bitmap ResizeImage(Bitmap image, int newWidth, int newHeight, bool centerCrop)
        {
            Verify.ArgumentNotNull(image, "image");

            Bitmap resizedImage = new Bitmap(newWidth, newHeight);

            resizedImage.SetResolution(72, 72);

            using (Graphics newGraphic = Graphics.FromImage(resizedImage))
            {
                newGraphic.SmoothingMode = System.Drawing.Drawing2D.SmoothingMode.HighQuality;
                newGraphic.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic;
                // newGraphic.PixelOffsetMode = PixelOffsetMode.HighQuality;

                if (centerCrop)
                {
                    float xRatio = image.Width / (float)newWidth;
                    float yRatio = image.Height / (float)newHeight;

                    if (xRatio > yRatio)
                    {
                        float dx = (image.Width / yRatio) - newWidth;

                        DrawWithoutBlending(newGraphic, image, -dx / 2.0f, 0.0f, newWidth + dx, newHeight);
                    }
                    else if (yRatio > xRatio)
                    {
                        float dy = (image.Height / xRatio) - newHeight;
                        DrawWithoutBlending(newGraphic, image, 0.0f, -dy / 2.0f, newWidth, newHeight + dy);
                    }
                    else
                    {
                        DrawWithoutBlending(newGraphic, image, 0, 0, newWidth, newHeight);
                    }
                }
                else
                {
                    DrawWithoutBlending(newGraphic, image, 0, 0, newWidth, newHeight);
                }
            }

            return resizedImage;
        }




        /// <summary>
        /// Draws a bitmap without background blending on first row and first column
        /// </summary>
        private static void DrawWithoutBlending(Graphics graphic, Bitmap bitmap, int x, int y, int width, int height)
        {
            using (var wrapMode = new ImageAttributes())
            {
                wrapMode.SetWrapMode(WrapMode.TileFlipXY);

                graphic.DrawImage(bitmap,
                                  new Rectangle(x, y, width, height),
                                  0, 0, bitmap.Width, bitmap.Height,
                                  GraphicsUnit.Pixel,
                                  wrapMode);
            }
        }

        private static void DrawWithoutBlending(Graphics graphic, Bitmap bitmap, float x, float y, float width, float height)
        {
            const double delta = 0.001;

            DrawWithoutBlending(graphic, bitmap,
                (int)Math.Floor(x + delta),
                (int)Math.Floor(y + delta),
                (int)Math.Ceiling(width - delta),
                (int)Math.Ceiling(height - delta));
        }

        /// <summary>
        /// Returns a value indicating whether an image of a given media type can be resized.
        /// </summary>
        /// <param name="mediaType">A media type.</param>
        public static bool SourceMediaTypeSupported(string mediaType)
        {
            if (mediaType == null) throw new ArgumentNullException(nameof(mediaType));

            return ImageFormatProviders.ContainsKey(mediaType);
        }

        /// <summary>
        /// Returns a value indicating whether resized imaged can be saved in the specified media type.
        /// </summary>
        /// <param name="mediaType">A media type.</param>
        public static bool TargetMediaTypeSupported(string mediaType)
        {
            if (mediaType == null) throw new ArgumentNullException(nameof(mediaType));

            return ImageFormatProviders.ContainsKey(mediaType);
        }
    }
}
