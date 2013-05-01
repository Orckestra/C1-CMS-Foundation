using System;
using System.IO;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Data.Streams;
using Composite.Data.Types;


namespace Composite.Data.Plugins.DataProvider.Streams
{
    internal sealed class FileSystemFileStreamManager : IFileStreamManager
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
            Verify.ArgumentCondition(file is FileSystemFileBase, "file", "The type '{0}' does not inherit the class '{1}'".FormatWith(file.GetType(), typeof(FileSystemFileBase)));

            var baseFile = file as FileSystemFileBase;

            DeleteFile(baseFile.SystemPath);
        }



        internal static void WriteFileToDisk(IFile file)
        {
            Verify.ArgumentNotNull(file, "file");
            Verify.ArgumentCondition(file is FileSystemFileBase, "file", "The type '{0}' does not inherit the class '{1}'".FormatWith(file.GetType(), typeof(FileSystemFileBase)));

            var baseFile = file as FileSystemFileBase;

            baseFile.CommitChanges();
        }

        public void SubscribeOnFileChanged(IFile file, OnFileChangedDelegate handler)
        {
            FileChangeNotificator.Subscribe(file as FileSystemFileBase, handler);
        }
    }
}
