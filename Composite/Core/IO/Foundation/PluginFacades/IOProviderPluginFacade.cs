using System;
using System.Configuration;
using System.IO;
using System.Text;
using Composite.C1Console.Events;
using Composite.Core.IO.Plugins.IOProvider;
using Composite.Core.IO.Plugins.IOProvider.Runtime;
using Composite.Plugins.IO.IOProviders.LocalIOProvider;


namespace Composite.Core.IO.Foundation.PluginFacades
{
    internal static class IOProviderPluginFacade
    {
        private static IOProviderFactory _factory;
        private static IIOProvider _ioProvider;
        private static readonly object _lock = new object();


        static IOProviderPluginFacade()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }



        public static IC1Directory C1Directory
        {
            get
            {
                IIOProvider ioProvider = GetIOProvider();

                return ioProvider.C1Directory;
            }
        }



        public static IC1File C1File
        {
            get
            {
                IIOProvider ioProvider = GetIOProvider();

                return ioProvider.C1File;
            }
        }



        public static IC1FileInfo CreateFileInfo(string path)
        {
            IIOProvider ioProvider = GetIOProvider();

            return ioProvider.CreateFileInfo(path);
        }



        public static IC1DirectoryInfo CreateDirectoryInfo(string path)
        {
            IIOProvider ioProvider = GetIOProvider();

            return ioProvider.CreateDirectoryInfo(path);
        }



        public static IC1FileStream CreateFileStream(string path, FileMode mode, FileAccess access, FileShare share, int bufferSize, FileOptions options)
        {
            IIOProvider ioProvider = GetIOProvider();

            return ioProvider.CreateFileStream(path, mode, access, share, bufferSize, options);
        }



        public static IC1FileSystemWatcher CreateFileSystemWatcher(string path, string filter)
        {
            IIOProvider ioProvider = GetIOProvider();

            return ioProvider.CreateFileSystemWatcher(path, filter);
        }



        public static IC1StreamReader CreateStreamReader(string path, Encoding encoding, bool detectEncodingFromByteOrderMarks, int bufferSize)
        {
            IIOProvider ioProvider = GetIOProvider();

            return ioProvider.CreateStreamReader(path, encoding, detectEncodingFromByteOrderMarks, bufferSize);
        }



        public static IC1StreamReader CreateStreamReader(Stream stream, Encoding encoding, bool detectEncodingFromByteOrderMarks, int bufferSize)
        {
            IIOProvider ioProvider = GetIOProvider();

            return ioProvider.CreateStreamReader(stream, encoding, detectEncodingFromByteOrderMarks, bufferSize);
        }



        public static IC1StreamWriter CreateStreamWriter(string path, bool append, Encoding encoding, int bufferSize)
        {
            IIOProvider ioProvider = GetIOProvider();

            return ioProvider.CreateStreamWriter(path, append, encoding, bufferSize);
        }



        public static IC1StreamWriter CreateStreamWriter(Stream stream, Encoding encoding, int bufferSize)
        {
            IIOProvider ioProvider = GetIOProvider();

            return ioProvider.CreateStreamWriter(stream, encoding, bufferSize);
        }



        public static IC1Configuration CreateConfiguration(string path)
        {
            IIOProvider ioProvider = GetIOProvider();

            return ioProvider.CreateConfiguration(path);
        }



        private static IIOProvider GetIOProvider()
        {
            if (_ioProvider == null)
            {
                lock (_lock)
                {
                    if (RuntimeInformation.IsUnittest)
                    {
                        return _ioProvider = new LocalIOProvider();
                    }

                    if (_ioProvider == null)
                    {
                        try
                        {
                            _factory = new IOProviderFactory();
                            _ioProvider = _factory.CreateDefault();
                        }
                        catch (ArgumentException ex)
                        {
                            HandleConfigurationError(ex);
                        }
                        catch (ConfigurationErrorsException ex)
                        {
                            HandleConfigurationError(ex);
                        }

                    }
                }
            }

            return _ioProvider;
        }



        private static void Flush()
        {
            _factory = null;
            _ioProvider = null;
        }



        private static void OnFlushEvent(FlushEventArgs args)
        {
            Flush();
        }



        private static void HandleConfigurationError(Exception ex)
        {
            Flush();

            throw new ConfigurationErrorsException(string.Format("Failed to load the configuration section '{0}' from the configuration.", IOProviderSettings.SectionName), ex);
        }
    }
}
