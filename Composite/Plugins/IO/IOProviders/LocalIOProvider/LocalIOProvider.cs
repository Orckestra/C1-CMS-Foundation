using System.IO;
using System.Text;
using Composite.Core.IO.Plugins.IOProvider;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.Plugins.IO.IOProviders.LocalIOProvider
{
    [ConfigurationElementType(typeof(NonConfigurableIOProvider))]
    internal class LocalIOProvider : IIOProvider
    {
        public IC1Directory C1Directory
        {
            get 
            {
                return new LocalC1Directory();
            }
        }



        public IC1File C1File
        {
            get 
            {
                return new LocalC1File();
            }
        }



        public IC1FileInfo CreateFileInfo(string fileName)
        {
            return new LocalC1FileInfo(fileName);
        }



        public IC1DirectoryInfo CreateDirectoryInfo(string path)
        {
            return new LocalC1DirectoryInfo(path);
        }



        public IC1FileStream CreateFileStream(string path, FileMode mode, FileAccess access, FileShare share, int bufferSize, FileOptions options)
        {
            return new LocalC1FileStream(path, mode, access, share, bufferSize, options);
        }



        public IC1FileSystemWatcher CreateFileSystemWatcher(string path, string filter)
        {
            return new LocalC1FileSystemWatcher(path, filter);
        }



        public IC1StreamReader CreateStreamReader(string path, Encoding encoding, bool detectEncodingFromByteOrderMarks, int bufferSize)
        {
            return new LocalC1StreamReader(path, encoding, detectEncodingFromByteOrderMarks, bufferSize);
        }



        public IC1StreamReader CreateStreamReader(Stream stream, Encoding encoding, bool detectEncodingFromByteOrderMarks, int bufferSize)
        {
            return new LocalC1StreamReader(stream, encoding, detectEncodingFromByteOrderMarks, bufferSize);
        }



        public IC1StreamWriter CreateStreamWriter(string path, bool append, Encoding encoding, int bufferSize)
        {
            return new LocalC1StreamWriter(path, append, encoding, bufferSize);
        }



        public IC1StreamWriter CreateStreamWriter(Stream stream, Encoding encoding, int bufferSize)
        {
            return new LocalC1StreamWriter(stream, encoding, bufferSize);
        }



        public IC1Configuration CreateConfiguration(string path)
        {
            return new LocalC1Configuration(path);
        }        
    }
}
