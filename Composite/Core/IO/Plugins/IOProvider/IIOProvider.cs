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
        IC1Directory C1Directory { get; }
        
        IC1File C1File { get; }

        IC1FileInfo CreateFileInfo(string fileName);
        IC1DirectoryInfo CreateDirectoryInfo(string path);

        IC1FileStream CreateFileStream(string path, FileMode mode, FileAccess access, FileShare share, int bufferSize, FileOptions options);
        
        IC1FileSystemWatcher CreateFileSystemWatcher(string path, string filter);
        
        IC1StreamReader CreateStreamReader(string path, Encoding encoding, bool detectEncodingFromByteOrderMarks, int bufferSize);
        IC1StreamReader CreateStreamReader(Stream stream, Encoding encoding, bool detectEncodingFromByteOrderMarks, int bufferSize);
        
        IC1StreamWriter CreateStreamWriter(string path, bool append, Encoding encoding, int bufferSize);
        IC1StreamWriter CreateStreamWriter(Stream stream, Encoding encoding, int bufferSize);

        IC1Configuration CreateConfiguration(string path);
    }
}
