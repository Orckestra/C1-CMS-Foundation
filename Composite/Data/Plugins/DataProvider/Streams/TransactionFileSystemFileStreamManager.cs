using System;
using System.IO;
using Composite.Core.IO;
using Composite.Data.Types;
using Composite.Data.Streams;
using Composite.Core.Extensions;
using System.Transactions;


namespace Composite.Data.Plugins.DataProvider.Streams
{
    internal sealed class TransactionFileSystemFileStreamManager : IFileStreamManager
    {
        public Stream GetReadStream(IFile file)
        {
            if (file == null) throw new ArgumentNullException("file");

            FileSystemFileBase baseFile = file as FileSystemFileBase;

            if (baseFile == null) throw new ArgumentException(string.Format("The type '{0}' does not inherit the class '{1}'", file.GetType(), typeof(FileSystemFileBase)));

            if (baseFile.CurrentWriteStream == null)
            {
                return new FileStream(baseFile.SystemPath, FileMode.OpenOrCreate, FileAccess.Read);
            }
            else
            {
                if (baseFile.CurrentWriteStream.Data == null)
                {
                    throw new InvalidOperationException("Trying to read from a writable stream that is not closed");
                }

                return new MemoryStream(baseFile.CurrentWriteStream.Data);
            }
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

            if (Transaction.Current == null)
            {
                Core.Logging.LoggingService.LogWarning("Transaction not active", "There is no current transaction that the File System File Stream manager can attach to - going ahead with delete without transactional support.");
                DeleteFile(baseFile.SystemPath);
            }
            else
            {
                Transaction.Current.EnlistVolatile(new DeleteEnlistment(baseFile), EnlistmentOptions.None);
            }
        }



        internal static void WriteFileToDisk(IFile file)
        {
            if (file == null) throw new ArgumentNullException("file");

            FileSystemFileBase baseFile = file as FileSystemFileBase;

            if (baseFile == null) throw new ArgumentException(string.Format("The type '{0}' does not inherit the class '{1}'", file.GetType(), typeof(FileSystemFileBase)));

            if (Transaction.Current == null)
            {
                Core.Logging.LoggingService.LogWarning("Transaction not active", "There is no current transaction that the File System File Stream manager can attach to - going ahead with write to disk without transactional support.");

                if (baseFile.CurrentWriteStream != null)
                {
                    DirectoryUtil.EnsurePath(baseFile.SystemPath);

                    using (Stream stream = file.GetReadStream())
                    {
                        using (Stream writeStream = new FileStream(baseFile.SystemPath, FileMode.Create, FileAccess.Write))
                        {
                            stream.CopyTo(writeStream);
                        }
                    }
                }
            }
            else
            {
                Transaction.Current.EnlistVolatile(new WriteToDiskEnlistment(file, baseFile), EnlistmentOptions.None);
            }
        }

        public void SubscribeOnFileChanged(IFile file, OnFileChangedDelegate handler)
        {
            FileChangeNotificator.Subscribe(file as FileSystemFileBase, handler);
        }


        private class WriteToDiskEnlistment : IEnlistmentNotification
        {
            private IFile file;
            private FileSystemFileBase baseFile;

            public WriteToDiskEnlistment(IFile file, FileSystemFileBase baseFile)
            {
                this.file = file;
                this.baseFile = baseFile;
            }



            public void Commit(Enlistment enlistment)
            {
                if (baseFile.CurrentWriteStream != null)
                {
                    DirectoryUtil.EnsurePath(baseFile.SystemPath);

                    using (Stream stream = file.GetReadStream())
                    {
                        using (Stream writeStream = new FileStream(baseFile.SystemPath, FileMode.Create, FileAccess.Write))
                        {
                            stream.CopyTo(writeStream);
                        }
                    }
                }
                enlistment.Done();
            }



            public void InDoubt(Enlistment enlistment)
            {
                enlistment.Done();
            }



            public void Prepare(PreparingEnlistment preparingEnlistment)
            {
                preparingEnlistment.Prepared();
            }



            public void Rollback(Enlistment enlistment)
            {
                enlistment.Done();
            }
        }




        private class DeleteEnlistment : IEnlistmentNotification
        {
            private FileSystemFileBase baseFile;

            public DeleteEnlistment(FileSystemFileBase baseFile)
            {
                this.baseFile = baseFile;
            }



            public void Commit(Enlistment enlistment)
            {
                DeleteFile(baseFile.SystemPath);
                enlistment.Done();
            }



            public void InDoubt(Enlistment enlistment)
            {
                enlistment.Done();
            }



            public void Prepare(PreparingEnlistment preparingEnlistment)
            {
                preparingEnlistment.Prepared();
            }



            public void Rollback(Enlistment enlistment)
            {
                enlistment.Done();
            }
        }
    }
}
