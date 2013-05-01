using System;
using System.IO;
using System.Transactions;
using Composite.Core;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Data.Streams;
using Composite.Data.Types;


namespace Composite.Data.Plugins.DataProvider.Streams
{
    internal sealed class TransactionFileSystemFileStreamManager : IFileStreamManager
    {
        public Stream GetReadStream(IFile file)
        {
            Verify.ArgumentNotNull(file, "file");
            Verify.ArgumentCondition(file is FileSystemFileBase, "file", "The type '{0}' does not inherit the class '{1}'".FormatWith(file.GetType(), typeof(FileSystemFileBase)));

            var baseFile = file as FileSystemFileBase;

            return baseFile.GetReadStream();
        }



        public Stream GetNewWriteStream(IFile file)
        {
            Verify.ArgumentNotNull(file, "file");
            Verify.ArgumentCondition(file is FileSystemFileBase, "file", "The type '{0}' does not inherit the class '{1}'".FormatWith(file.GetType(), typeof(FileSystemFileBase)));

            var baseFile = file as FileSystemFileBase;

            return baseFile.GetNewWriteStream();
        }



        internal static void DeleteFile(string filename)
        {
            Verify.ArgumentNotNullOrEmpty(filename, "filename");

            DirectoryUtils.DeleteFile(filename, true);
        }




        internal static void DeleteFile(IFile file)
        {
            Verify.ArgumentNotNull(file, "file");

            FileSystemFileBase baseFile = file as FileSystemFileBase;

            Verify.ArgumentCondition(baseFile != null, "file", "The type '{0}' does not inherit the class '{1}'"
                                                       .FormatWith(file.GetType(), typeof(FileSystemFileBase)));

            if (Transaction.Current == null)
            {
                LogNoTransaction();

                DeleteFile(baseFile.SystemPath);
            }
            else
            {
                Transaction.Current.EnlistVolatile(new DeleteEnlistment(baseFile), EnlistmentOptions.None);
            }
        }


        internal static void WriteFileToDisk(IFile file)
        {
            Verify.ArgumentNotNull(file, "file");

            FileSystemFileBase baseFile = file as FileSystemFileBase;

            Verify.ArgumentCondition(baseFile != null, "file", "The type '{0}' does not inherit the class '{1}'"
                                                       .FormatWith(file.GetType(), typeof(FileSystemFileBase)));

            if (Transaction.Current == null)
            {
                LogNoTransaction();

                baseFile.CommitChanges();
            }
            else
            {
                Transaction.Current.EnlistVolatile(new WriteToDiskEnlistment(file, baseFile), EnlistmentOptions.None);
            }
        }


        private static void LogNoTransaction()
        {
            if (RuntimeInformation.IsDebugBuild)
            {
                Log.LogWarning("Transaction not active", "There is no current transaction that the File System File Stream manager can attach to.");
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
                baseFile.CommitChanges();

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
