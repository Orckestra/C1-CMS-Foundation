using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Web;
using System.Web.Caching;
using Composite.Core.IO;
using Composite.Data.Plugins.DataProvider.Streams;
using Composite.Data.Types;

namespace Composite.Core.WebClient.Media
{
    ///<summary>
    ///Class that performs image resizing
    ///</summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class ImageResizer
    {
        private const string ResizedImagesCacheDirectory = "~/App_Data/Composite/Cache/Resized images";
        private static Dictionary<ImageFormat, string> _ImageFormat2Extension = new Dictionary<ImageFormat, string>
        {  
            {ImageFormat.Png, "png"},
            {ImageFormat.Gif, "gif"}, 
            {ImageFormat.Jpeg, "jpg"}, 
            {ImageFormat.Bmp, "bmp"}, 
            {ImageFormat.Tiff, "tiff"}
        };
        private static readonly TimeSpan CacheExpirationTimeSpan = new TimeSpan(1, 0, 0, 0);

        private static string _resizedImagesDirectoryPath;


        /// <summary>
        /// Gets the resized image.
        /// </summary>
        /// <param name="httpServerUtility">An instance of <see cref="System.Web.HttpServerUtility" />.</param>
        /// <param name="file">The media file.</param>
        /// <param name="resizingOptions">The resizing options.</param>
        /// <param name="targetImageFormat">The target image format.</param>
        /// <returns>A full file path to a resized image</returns>
        public static string GetResizedImage(HttpServerUtility httpServerUtility, IMediaFile file, ResizingOptions resizingOptions, ImageFormat targetImageFormat)
        {
            Verify.That(ImageFormatIsSupported(targetImageFormat), "Unsupported image format '{0}'", targetImageFormat);

            if (_resizedImagesDirectoryPath == null)
            {
                _resizedImagesDirectoryPath = httpServerUtility.MapPath(ResizedImagesCacheDirectory);

                if (!C1Directory.Exists(_resizedImagesDirectoryPath))
                {
                    C1Directory.CreateDirectory(_resizedImagesDirectoryPath);
                }
            }

            string imageKey = file.CompositePath;

            string imageSizeCacheKey = "ShowMedia.ashx image size " + imageKey;
            Size? imageSize = HttpRuntime.Cache.Get(imageSizeCacheKey) as Size?;

            Bitmap bitmap = null;
            try
            {
                if (imageSize == null)
                {
                    bitmap = new Bitmap(file.GetReadStream());

                    imageSize = new Size { Width = bitmap.Width, Height = bitmap.Height };

                    var cacheDependency = new CacheDependency((file as FileSystemFileBase).SystemPath);

                    HttpRuntime.Cache.Add(imageSizeCacheKey, imageSize, cacheDependency, DateTime.MaxValue, CacheExpirationTimeSpan, CacheItemPriority.Normal, null);
                }

                int newWidth, newHeight;
                bool centerCrop;
                bool needToResize = CalculateSize(imageSize.Value.Width, imageSize.Value.Height, resizingOptions, out newWidth, out newHeight, out centerCrop);

                if (!needToResize)
                {
                    return (file as FileSystemFileBase).SystemPath;
                }

                int filePathHash = imageKey.GetHashCode();

                string centerCroppedString = centerCrop ? "c" : string.Empty;

                string fileExtension = _ImageFormat2Extension[targetImageFormat];
                string resizedImageFileName = string.Format("{0}x{1}_{2}{3}.{4}", newWidth, newHeight, filePathHash, centerCroppedString, fileExtension);

                string imageFullPath = Path.Combine(_resizedImagesDirectoryPath, resizedImageFileName);

                if (!C1File.Exists(imageFullPath) || C1File.GetLastWriteTime(imageFullPath) != file.LastWriteTime)
                {
                    if (bitmap == null)
                    {
                        bitmap = new Bitmap(file.GetReadStream());
                    }

                    ResizeImage(bitmap, imageFullPath, newWidth, newHeight, centerCrop, targetImageFormat);

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

        private static bool CalculateSize(int width, int height, ResizingOptions resizingOptions, out int newWidth, out int newHeight, out bool centerCrop)
        {
            if(width == 0 || height == 0)
            {
                newHeight = newWidth = 0;
                centerCrop = false;
                return false;
            }

            Verify.ArgumentCondition(width > 0, "width", "Negative values aren't allowed");
            Verify.ArgumentCondition(height > 0, "height", "Negative values aren't allowed");

            centerCrop = false;

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

                // If the target dimensions are bigger or the same size as of the image - no resizing is done
                if(newWidth == width || newHeight == height)
                {
                    return false;
                }

                switch(resizingOptions.ResizingAction)
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

                        if(heightProportionArea == widthProportionArea)
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


        private static void ResizeImage(Bitmap image, string outputFilePath, int newWidth, int newHeight, bool centerCrop, ImageFormat imageFormat)
        {
            Verify.ArgumentNotNull(image, "image");

            using (Bitmap resizedImage = new Bitmap(image, newWidth, newHeight))
            {
                resizedImage.SetResolution(72, 72);

                Graphics newGraphic = Graphics.FromImage(resizedImage);
                newGraphic.Clear(Color.White);
                newGraphic.SmoothingMode = System.Drawing.Drawing2D.SmoothingMode.AntiAlias;
                newGraphic.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic;

                if (centerCrop)
                {
                    float xRatio = image.Width / (float)newWidth;
                    float yRatio = image.Height / (float)newHeight;

                    if(xRatio > yRatio)
                    {
                        float dx = (image.Width / yRatio) - newWidth;
                        newGraphic.DrawImage(image, -dx / 2.0f, 0.0f, newWidth + dx, newHeight);    
                    } 
                    else if(yRatio > xRatio)
                    {
                        float dy = (image.Height / xRatio) - newHeight;
                        newGraphic.DrawImage(image, 0.0f, -dy / 2.0f, newWidth, newHeight + dy);    
                    }
                    else
                    {
                        newGraphic.DrawImage(image, 0, 0, newWidth, newHeight);
                    }
                }
                else
                {
                    newGraphic.DrawImage(image, 0, 0, newWidth, newHeight);
                }


                resizedImage.Save(outputFilePath, imageFormat);
            }
        }

        private static bool ImageFormatIsSupported(ImageFormat imageFormat)
        {
            return _ImageFormat2Extension.ContainsKey(imageFormat);
        }

        /// <exclude />
        public class SupportedImageFormats
        {
            /// <exclude />
            public static ImageFormat JPG { get { return ImageFormat.Jpeg; } }
            /// <exclude />
            public static ImageFormat PNG { get { return ImageFormat.Png; } }
            /// <exclude />
            public static ImageFormat TIFF { get { return ImageFormat.Tiff; } }
            /// <exclude />
            public static ImageFormat GIF { get { return ImageFormat.Gif; } }
            /// <exclude />
            public static ImageFormat BMP { get { return ImageFormat.Bmp; } }
            
        }
    }
}
