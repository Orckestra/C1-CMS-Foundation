using System.IO;
using System.Text;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Composite.Core.IO.Plugins.IOProvider.Runtime;



namespace Composite.Core.IO.Plugins.IOProvider
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [CustomFactory(typeof(IOProviderCustomFactory))]
    [ConfigurationNameMapper(typeof(IOProviderDefaultNameRetriever))]
    public interface IIOProvider
    {
        /// <exclude />
        IC1Directory C1Directory { get; }

        /// <exclude />
        IC1File C1File { get; }

        /// <exclude />
        IC1FileInfo CreateFileInfo(string fileName);

        /// <exclude />
        IC1DirectoryInfo CreateDirectoryInfo(string path);

        /// <exclude />
        IC1FileStream CreateFileStream(string path, FileMode mode, FileAccess access, FileShare share, int bufferSize, FileOptions options);

        /// <exclude />
        IC1FileSystemWatcher CreateFileSystemWatcher(string path, string filter);

        /// <exclude />
        IC1StreamReader CreateStreamReader(string path, Encoding encoding, bool detectEncodingFromByteOrderMarks, int bufferSize);

        /// <exclude />
        IC1StreamReader CreateStreamReader(Stream stream, Encoding encoding, bool detectEncodingFromByteOrderMarks, int bufferSize);

        /// <exclude />
        IC1StreamWriter CreateStreamWriter(string path, bool append, Encoding encoding, int bufferSize);

        /// <exclude />
        IC1StreamWriter CreateStreamWriter(Stream stream, Encoding encoding, int bufferSize);

        /// <exclude />
        IC1Configuration CreateConfiguration(string path);
    }
}
