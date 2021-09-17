using System.Drawing;
using System.IO;

namespace Composite.Core.WebClient.Media
{
    /// <summary>
    /// A provider that enables reading/saving images for a specific image format.
    /// </summary>
    public interface IImageFileFormatProvider
    {
        /// <summary>
        /// A media type (aka MIME type) that describes the image format (f.e. "image/jpeg").
        /// </summary>
        string MediaType { get; }

        /// <summary>
        /// A file extension that is associated with the image format.
        /// </summary>
        string FileExtension { get; }

        /// <summary>
        /// Indicates whether the provider allows specifying quality percentage when saving an image.
        /// </summary>
        bool CanSetCompressionQuality { get; }

        /// <summary>
        /// Loads a <see cref="Bitmap"/> out of stream .
        /// </summary>
        /// <param name="stream">The input stream.</param>
        /// <returns></returns>
        Bitmap LoadImageFromStream(Stream stream);

        /// <summary>
        /// Saves an image to a file with a given quality.
        /// </summary>
        /// <param name="image">The image to be saved.</param>
        /// <param name="outputFilePath">The full path to a file.</param>
        /// <param name="qualityPercentage">The desired quality of the image - from 1 to 100.</param>
        void SaveImageToFile(Bitmap image, string outputFilePath, int? qualityPercentage = null);
    }
}
