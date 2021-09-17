using Composite.Core.IO;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;

namespace Composite.Core.WebClient.Media
{
    internal class DefaultImageFileFormatProvider: IImageFileFormatProvider
    {
        private static readonly ImageCodecInfo JpegCodecInfo = ImageCodecInfo.GetImageEncoders().First(codec => codec.FormatID == ImageFormat.Jpeg.Guid);

        private readonly Action<Bitmap, string, int?> _saveAction;

        public DefaultImageFileFormatProvider(string mediaType, string extension, Action<Bitmap, string, int?> saveAction)
        {
            MediaType = mediaType;
            FileExtension = extension;
            _saveAction = saveAction;
        }

        public string MediaType { get; }

        public string FileExtension { get; }

        public bool CanSetCompressionQuality { get; private set; }

        public Bitmap LoadImageFromStream(Stream stream) => new Bitmap(stream);

        public void SaveImageToFile(Bitmap image, string outputFilePath, int? qualityPercentage = null)
        {
            _saveAction(image, outputFilePath, qualityPercentage);
        }

        private static Action<Bitmap, string, int?> GetSaveInFormatFunction(ImageFormat imageFormat) =>
            (resizedImage, outputFilePath, quality) => resizedImage.Save(outputFilePath, imageFormat);

        public static IEnumerable<IImageFileFormatProvider> GetDefaultProviders()
        {
            return new List<DefaultImageFileFormatProvider>
            {
                new DefaultImageFileFormatProvider(MimeTypeInfo.Jpeg, "jpeg", (resizedImage, outputFilePath, quality) =>
                {
                    var parameters = new EncoderParameters(1);
                    parameters.Param[0] = new EncoderParameter(Encoder.Quality, quality ?? 75);

                    resizedImage.Save(outputFilePath, JpegCodecInfo, parameters);
                })
                {
                    CanSetCompressionQuality = true
                },
                new DefaultImageFileFormatProvider(MimeTypeInfo.Png, "png", GetSaveInFormatFunction(ImageFormat.Png)),
                new DefaultImageFileFormatProvider(MimeTypeInfo.Gif, "gif", GetSaveInFormatFunction(ImageFormat.Gif)),
                new DefaultImageFileFormatProvider(MimeTypeInfo.Tiff, "tiff", GetSaveInFormatFunction(ImageFormat.Tiff)),
                new DefaultImageFileFormatProvider(MimeTypeInfo.Bmp, "bmp", GetSaveInFormatFunction(ImageFormat.Bmp))
            };
        }
    }
}
