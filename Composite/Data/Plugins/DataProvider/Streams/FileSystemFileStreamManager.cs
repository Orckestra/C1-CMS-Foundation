using System;
using Composite.Core.NewIO;

using Composite.Core.IO;
using Composite.Data.Types;
using Composite.Data.Streams;
using System.Text;
using Composite.Core.Extensions;


namespace Composite.Data.Plugins.DataProvider.Streams
{
    internal sealed class FileSystemFileStreamManager : IFileStreamManager
    {
        public System.IO.Stream GetReadStream(IFile file)
        {
            if (file == null) throw new ArgumentNullException("file");

            FileSystemFileBase baseFile = file as FileSystemFileBase;

            if (baseFile == null) throw new ArgumentException(string.Format("The type '{0}' does not inherit the class '{1}'", file.GetType(), typeof(FileSystemFileBase)));

            if (baseFile.CurrentWriteStream == null)
            {
                return new FileStream(baseFile.SystemPath, System.IO.FileMode.Open, System.IO.FileAccess.Read);
            }
            
            if (baseFile.CurrentWriteStream.Data == null)
            {
                throw new InvalidOperationException("Trying to read from a writable stream that is not closed");
            }

            return new System.IO.MemoryStream(baseFile.CurrentWriteStream.Data);
        }



        public System.IO.Stream GetNewWriteStream(IFile file)
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

                using (System.IO.Stream stream = file.GetReadStream())
                {
                    using (System.IO.Stream writeStream = new FileStream(baseFile.SystemPath, System.IO.FileMode.Create, System.IO.FileAccess.Write))
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
