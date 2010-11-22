using System.IO;
using System.Text;
using Composite.Core.IO.Plugins.IOProvider;
using Composite.Plugins.IO.IOProviders.LocalIOPorivder;


namespace Composite.Core.IO
{
    internal static class IOFacade
    {
        public static IC1Directory C1Directory
        {
            get
            {
                return new LocalC1Directory();
            }
        }



        public static IC1File C1File
        {
            get
            {
                return new LocalC1File();
            }
        }



        public static IC1FileStream CreateC1FileStream(string path, FileMode mode, FileAccess access, FileShare share, int bufferSize, FileOptions options)
        {
            return new LocalC1FileStream(path, mode, access, share, bufferSize, options);
        }



        public static IC1FileSystemWatcher CreateC1FileSystemWatcher(string path, string filter)
        {
            return new LocalC1FileSystemWatcher(path, filter);
        }



        public static IC1StreamReader CreateC1StreamReader(string path, Encoding encoding, bool detectEncodingFromByteOrderMarks, int bufferSize)
        {
            return new LocalC1StreamReader(path, encoding, detectEncodingFromByteOrderMarks, bufferSize);
        }



        public static IC1StreamReader CreateC1StreamReader(Stream stream, Encoding encoding, bool detectEncodingFromByteOrderMarks, int bufferSize)
        {
            return new LocalC1StreamReader(stream, encoding, detectEncodingFromByteOrderMarks, bufferSize);
        }



        public static IC1StreamWriter CreateC1StreamWriter(string path, bool append, Encoding encoding, int bufferSize)
        {
            return new LocalC1StreamWriter(path, append, encoding, bufferSize);
        }



        public static IC1StreamWriter CreateC1StreamWriter(Stream stream, Encoding encoding, int bufferSize)
        {
            return new LocalC1StreamWriter(stream, encoding, bufferSize);
        }



        public static IC1Configuration CreateC1Configuration(string path)
        {
            return new LocalC1Configuration(path);
        }
    }
}
