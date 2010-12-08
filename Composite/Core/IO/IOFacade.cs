using System.IO;
using System.Text;
using Composite.Core.IO.Plugins.IOProvider;
using Composite.Plugins.IO.IOProviders.LocalIOProvider;
using Composite.Core.IO.Foundation.PluginFacades;


namespace Composite.Core.IO
{
    internal static class IOFacade
    {
        public static IC1Directory C1Directory
        {
            get
            {
                return IOProviderPluginFacade.C1Directory;
            }
        }



        public static IC1File C1File
        {
            get
            {
                return IOProviderPluginFacade.C1File;
            }
        }



        public static IC1FileStream CreateC1FileStream(string path, FileMode mode, FileAccess access, FileShare share, int bufferSize, FileOptions options)
        {
            return IOProviderPluginFacade.CreateFileStream(path, mode, access, share, bufferSize, options);
        }



        public static IC1FileSystemWatcher CreateC1FileSystemWatcher(string path, string filter)
        {
            return IOProviderPluginFacade.CreateFileSystemWatcher(path, filter);
        }



        public static IC1StreamReader CreateC1StreamReader(string path, Encoding encoding, bool detectEncodingFromByteOrderMarks, int bufferSize)
        {
            return IOProviderPluginFacade.CreateStreamReader(path, encoding, detectEncodingFromByteOrderMarks, bufferSize);
        }



        public static IC1StreamReader CreateC1StreamReader(Stream stream, Encoding encoding, bool detectEncodingFromByteOrderMarks, int bufferSize)
        {
            return IOProviderPluginFacade.CreateStreamReader(stream, encoding, detectEncodingFromByteOrderMarks, bufferSize);
        }



        public static IC1StreamWriter CreateC1StreamWriter(string path, bool append, Encoding encoding, int bufferSize)
        {
            return IOProviderPluginFacade.CreateStreamWriter(path, append, encoding, bufferSize);
        }



        public static IC1StreamWriter CreateC1StreamWriter(Stream stream, Encoding encoding, int bufferSize)
        {
            return IOProviderPluginFacade.CreateStreamWriter(stream, encoding, bufferSize);
        }



        public static IC1Configuration CreateC1Configuration(string path)
        {
            return IOProviderPluginFacade.CreateConfiguration(path);
        }
    }
}
