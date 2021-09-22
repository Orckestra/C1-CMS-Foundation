using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.Linq;
using Composite.Core.IO;
using Microsoft.Extensions.DependencyInjection;


namespace Composite.Core.WebClient.Media
{
    internal static class ImageFormatProviders
    {
        private static readonly ImageCodecInfo JpegCodecInfo = ImageCodecInfo.GetImageEncoders().First(codec => codec.FormatID == ImageFormat.Jpeg.Guid);

        private static Action<Bitmap, string, int?> GetSaveInFormatFunction(ImageFormat imageFormat) =>
            (resizedImage, outputFilePath, quality) => resizedImage.Save(outputFilePath, imageFormat);

        internal static void AddDefaultImageFileFormatProviders(this IServiceCollection services)
        {
            var providers = new List<DefaultImageFileFormatProvider>
            {
                new DefaultImageFileFormatProvider(MimeTypeInfo.Jpeg, "jpeg", (resizedImage, outputFilePath, quality) =>
                {
                    var parameters = new EncoderParameters(1);
                    parameters.Param[0] = new EncoderParameter(Encoder.Quality, quality ?? 75);

                    resizedImage.Save(outputFilePath, JpegCodecInfo, parameters);
                }, canSetImageQuality: true),
                new DefaultImageFileFormatProvider(MimeTypeInfo.Png, "png", GetSaveInFormatFunction(ImageFormat.Png)),
                new DefaultImageFileFormatProvider(MimeTypeInfo.Gif, "gif", GetSaveInFormatFunction(ImageFormat.Gif)),
                new DefaultImageFileFormatProvider(MimeTypeInfo.Tiff, "tiff", GetSaveInFormatFunction(ImageFormat.Tiff)),
                new DefaultImageFileFormatProvider(MimeTypeInfo.Bmp, "bmp", GetSaveInFormatFunction(ImageFormat.Bmp))
            };

            providers.ForEach(p => services.AddSingleton<IImageFileFormatProvider>(p));
        }
    }
}
