using System.IO;
using System.Text;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Composite.Core.IO.Plugins.IOProvider.Runtime;



namespace Composite.Core.IO.Plugins.IOProvider
{
    /// <summary>
    /// Implement this interface to overwrite the default behavior of IO in C1.
    /// This provides implementations of the following classes:
    /// <see cref="Composite.Core.IO.C1Directory"/>
    /// <see cref="Composite.Core.IO.C1DirectoryInfo"/>
    /// <see cref="Composite.Core.IO.C1File"/>
    /// <see cref="Composite.Core.IO.C1FileInfo"/>
    /// <see cref="Composite.Core.IO.C1FileStream"/>
    /// <see cref="Composite.Core.IO.C1FileSystemWatcher"/>
    /// <see cref="Composite.Core.IO.C1StreamReader"/>
    /// <see cref="Composite.Core.IO.C1StreamWriter"/>
    /// <see cref="Composite.Core.Configuration.C1Configuration"/>
    /// <example>
    /// Here is an minimal implementaion example:
    /// <code>
    /// [ConfigurationElementType(typeof(NonConfigurableIOProvider))]
    /// internal class LocalIOProvider : IIOProvider
    /// {
    ///     /* Implementation goes here */
    /// }
    /// </code>
    /// </example>
    /// </summary>
    [CustomFactory(typeof(IOProviderCustomFactory))]
    [ConfigurationNameMapper(typeof(IOProviderDefaultNameRetriever))]
    public interface IIOProvider
    {
        /// <summary>
        /// Returns a custom implementation of <see cref="Composite.Core.IO.Plugins.IOProvider.IC1Directory"/>.
        /// </summary>
        IC1Directory C1Directory { get; }


        /// <summary>
        /// Returns a custom implementation of <see cref="Composite.Core.IO.Plugins.IOProvider.IC1File"/>.
        /// </summary>
        IC1File C1File { get; }


        /// <summary>
        /// Returns a custom implementation of <see cref="Composite.Core.IO.Plugins.IOProvider.IC1FileInfo"/>.
        /// </summary>
        /// <param name="fileName">Path to file to use.</param>
        /// <returns>Returns a custom implementation of <see cref="Composite.Core.IO.Plugins.IOProvider.IC1FileInfo"/>.</returns>
        IC1FileInfo CreateFileInfo(string fileName);


        /// <summary>
        /// Returns a custom implementation of <see cref="Composite.Core.IO.Plugins.IOProvider.IC1DirectoryInfo"/>.
        /// </summary>
        /// <param name="path">Path to directory to use.</param>
        /// <returns>Returns a custom implementation of <see cref="Composite.Core.IO.Plugins.IOProvider.IC1DirectoryInfo"/>.</returns>
        IC1DirectoryInfo CreateDirectoryInfo(string path);


        /// <summary>
        /// Returns a custom implementation of <see cref="Composite.Core.IO.Plugins.IOProvider.IC1FileStream"/>.
        /// </summary>
        /// <param name="path">Path to file.</param>
        /// <param name="mode">File mode to use.</param>
        /// <param name="access">File access to use.</param>
        /// <param name="share">File share to use.</param>
        /// <param name="bufferSize">Buffer size to use.</param>
        /// <param name="options">File options to use.</param>
        /// <returns>Returns a custom implementation of <see cref="Composite.Core.IO.Plugins.IOProvider.IC1FileStream"/>.</returns>
        IC1FileStream CreateFileStream(string path, FileMode mode, FileAccess access, FileShare share, int bufferSize, FileOptions options);


        /// <summary>
        /// Returns a custom implementation of <see cref="Composite.Core.IO.Plugins.IOProvider.IC1FileSystemWatcher"/>.
        /// </summary>
        /// <param name="path">Path to file or directory to watch.</param>
        /// <param name="filter">Filter to use.</param>
        /// <returns>Returns a custom implementation of <see cref="Composite.Core.IO.Plugins.IOProvider.IC1FileSystemWatcher"/>.</returns>
        IC1FileSystemWatcher CreateFileSystemWatcher(string path, string filter);


        /// <summary>
        /// Returns a custom implementation of <see cref="Composite.Core.IO.Plugins.IOProvider.IC1StreamReader"/>.
        /// </summary>
        /// <param name="path">Path to file to read from.</param>
        /// <param name="encoding">Encoding to use when reading.</param>
        /// <param name="detectEncodingFromByteOrderMarks">If true, encoding will be detected from the file stream.</param>
        /// <param name="bufferSize">Buffer size to use when reading.</param>
        /// <returns>Returns a custom implementation of <see cref="Composite.Core.IO.Plugins.IOProvider.IC1StreamReader"/>.</returns>
        IC1StreamReader CreateStreamReader(string path, Encoding encoding, bool detectEncodingFromByteOrderMarks, int bufferSize);


        /// <summary>
        /// Returns a custom implementation of <see cref="Composite.Core.IO.Plugins.IOProvider.IC1StreamReader"/>.
        /// </summary>
        /// <param name="stream">Stream to read from.</param>
        /// <param name="encoding">Encoding to use when reading.</param>
        /// <param name="detectEncodingFromByteOrderMarks">If true, encoding will be detected from the file stream.</param>
        /// <param name="bufferSize">Buffer size to use when reading.</param>
        /// <returns>Returns a custom implementation of <see cref="Composite.Core.IO.Plugins.IOProvider.IC1StreamReader"/>.</returns>
        IC1StreamReader CreateStreamReader(Stream stream, Encoding encoding, bool detectEncodingFromByteOrderMarks, int bufferSize);


        /// <summary>
        /// Returns a custom implementation of <see cref="Composite.Core.IO.Plugins.IOProvider.IC1StreamWriter"/>.
        /// </summary>
        /// <param name="path">Path of file to write to.</param>
        /// <param name="append">If true, writte data will be appended to the end of the file.</param>
        /// <param name="encoding">Encoding to use when writing.</param>
        /// <param name="bufferSize">Buffer size to use when writing.</param>
        /// <returns>Returns a custom implementation of <see cref="Composite.Core.IO.Plugins.IOProvider.IC1StreamWriter"/>.</returns>
        IC1StreamWriter CreateStreamWriter(string path, bool append, Encoding encoding, int bufferSize);


        /// <summary>
        /// Returns a custom implementation of <see cref="Composite.Core.IO.Plugins.IOProvider.IC1StreamWriter"/>.
        /// </summary>
        /// <param name="stream">Stream to write to.</param>
        /// <param name="encoding">Encoding to use when writing.</param>
        /// <param name="bufferSize">Buffer size to use when writing.</param>
        /// <returns>Returns a custom implementation of <see cref="Composite.Core.IO.Plugins.IOProvider.IC1StreamWriter"/>.</returns>
        IC1StreamWriter CreateStreamWriter(Stream stream, Encoding encoding, int bufferSize);


        /// <summary>
        /// Returns a custom implementation of <see cref="Composite.Core.IO.Plugins.IOProvider.IC1Configuration"/>.
        /// </summary>
        /// <param name="path">Path of configuration file.</param>
        /// <returns>Returns a custom implementation of <see cref="Composite.Core.IO.Plugins.IOProvider.IC1Configuration"/>.</returns>
        IC1Configuration CreateConfiguration(string path);
    }
}
