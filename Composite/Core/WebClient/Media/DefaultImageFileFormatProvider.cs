using System;
using System.Drawing;
using System.IO;

namespace Composite.Core.WebClient.Media
{
    internal class DefaultImageFileFormatProvider: IImageFileFormatProvider
    {
        private readonly Action<Bitmap, string, int?> _saveAction;

        public DefaultImageFileFormatProvider(string mediaType, string extension, Action<Bitmap, string, int?> saveAction, bool canSetImageQuality = false)
        {
            MediaType = mediaType;
            FileExtension = extension;
            _saveAction = saveAction;
            CanSetImageQuality = canSetImageQuality;
        }

        public string MediaType { get; }

        public string FileExtension { get; }

        public bool CanSetImageQuality { get; }

        public bool CanReadImageSize => true;

        public bool TryGetSize(Stream imageStream, out Size size)
        {
            return ImageSizeReader.TryGetSize(imageStream, out size);
        }

        public Bitmap LoadImageFromStream(Stream stream) => new Bitmap(stream);

        public void SaveImageToFile(Bitmap image, string outputFilePath, int? qualityPercentage = null)
        {
            _saveAction(image, outputFilePath, qualityPercentage);
        }
    }
}
