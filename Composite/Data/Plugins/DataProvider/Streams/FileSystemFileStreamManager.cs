using System;
using System.IO;
using Composite.Core.IO;
using Composite.Data.Streams;
using Composite.Data.Types;


namespace Composite.Data.Plugins.DataProvider.Streams
{
    internal sealed class FileSystemFileStreamManager : IFileStreamManager
    {
        public Stream GetReadStream(IFile file)
        {
            if (file == null) throw new ArgumentNullException("file");

            FileSystemFileBase baseFile = file as FileSystemFileBase;

            if (baseFile == null) throw new ArgumentException(string.Format("The type '{0}' does not inherit the class '{1}'", file.GetType(), typeof(FileSystemFileBase)));

            if (baseFile.CurrentWriteStream == null)
            {
                return new C1FileStream(baseFile.SystemPath, FileMode.Open, FileAccess.Read);
            }
            
            if (baseFile.CurrentWriteStream.Data == null)
            {
                throw new InvalidOperationException("Trying to read from a writable stream that is not closed");
            }

            return new MemoryStream(baseFile.CurrentWriteStream.Data);
        }



        public Stream GetNewWriteStream(IFile file)
        {
            if (file == null) throw new ArgumentNullException("file");

            FileSystemFileBase baseFile = file as FileSystemFileBase;

            if (baseFile == null) throw new ArgumentException(string.Format("The type '{0}' does not inherit the class '{1}'", file.GetType(), typeof(FileSystemFileBase)));

            baseFile.CurrentWriteStream = new CachedMemoryStream();

            return baseFile.CurrentWriteStream;
        }



        internal static void DeleteFile(string filename)
        {
            if (string.IsNullOrEmpty(filename) == true) throw new ArgumentNullException("filename");

            DirectoryUtil.DeleteFile(filename, true);
        }



        internal static void DeleteFile(IFile file)
        {
            if (file == null) throw new ArgumentNullException("file");

            FileSystemFileBase baseFile = file as FileSystemFileBase;

            if (baseFile == null) throw new ArgumentException(string.Format("The type '{0}' does not inherit the class '{1}'", file.GetType(), typeof(FileSystemFileBase)));

            DeleteFile(baseFile.SystemPath);
        }



        internal static void WriteFileToDisk(IFile file)
        {
            if (file == null) throw new ArgumentNullException("file");

            FileSystemFileBase baseFile = file as FileSystemFileBase;

            if (baseFile == null) throw new ArgumentException(string.Format("The type '{0}' does not inherit the class '{1}'", file.GetType(), typeof(FileSystemFileBase)));            

            if (baseFile.CurrentWriteStream != null)
            {
                DirectoryUtil.EnsurePath(baseFile.SystemPath);

                using (Stream stream = file.GetReadStream())
                {
                    using (Stream writeStream = new C1FileStream(baseFile.SystemPath, FileMode.Create, FileAccess.Write))
                    {
                        stream.CopyTo(writeStream);
                    }
                }
            }
        }

        public void SubscribeOnFileChanged(IFile file, OnFileChangedDelegate handler)
        {
            FileChangeNotificator.Subscribe(file as FileSystemFileBase, handler);
        }
    }
}
