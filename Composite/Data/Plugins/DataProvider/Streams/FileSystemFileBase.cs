using System;
using System.Diagnostics.CodeAnalysis;
using System.IO;
using Composite.Core.Configuration;
using Composite.Core.Extensions;
using Composite.Core.IO;

namespace Composite.Data.Plugins.DataProvider.Streams
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public class FileSystemFileBase
    {
        /// <exclude />
        [SuppressMessage("Composite.IO", "Composite.DoNotUseFileStreamClass:DoNotUseFileStreamClass")]
        protected FileStream TemporaryFileStream { get; set; }

        /// <exclude />
        protected string TemporaryFilePath { get; set; }

        /// <exclude />
        public virtual string SystemPath { get; set; }

        /// <exclude />
        [SuppressMessage("Composite.IO", "Composite.DoNotUseFileStreamClass:DoNotUseFileStreamClass")]
        [SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass")]
        public FileStream GetNewWriteStream()
        {
            if (TemporaryFileStream != null)
            {
                Verify.That(!TemporaryFileStream.CanWrite, "Stream for writing has not been closed.");

                TemporaryFileStream = null;
                File.Delete(TemporaryFilePath);
            }

            string tempFile = Path.Combine(PathUtil.Resolve(GlobalSettingsFacade.TempDirectory),  "upload" + Path.GetRandomFileName());

            this.TemporaryFilePath = tempFile;
            this.TemporaryFileStream = File.Open(tempFile, FileMode.Create, FileAccess.ReadWrite, FileShare.None);

            return TemporaryFileStream;
        }

        /// <exclude />
        [SuppressMessage("Composite.IO", "Composite.DoNotUseFileStreamClass:DoNotUseFileStreamClass")]
        public Stream GetReadStream()
        {
            string filePath;

            if (this.TemporaryFileStream != null)
            {
                Verify.That(!TemporaryFileStream.CanWrite, "Stream for writing has not been closed.");

                filePath = this.TemporaryFilePath;
            }
            else
            {
                filePath = this.SystemPath;
            }

            return new FileStream(filePath, FileMode.Open, FileAccess.Read);
        }

        /// <exclude />
        [SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass")]
        public void CommitChanges()
        {
            if (this.TemporaryFileStream == null) return;

            Verify.That(!TemporaryFileStream.CanWrite, "Stream for writing has not been closed.");

            DirectoryUtils.EnsurePath(this.SystemPath);

            if (!this.SystemPath.IsNullOrEmpty())
            {
                File.Delete(this.SystemPath);
            }

            File.Move(this.TemporaryFilePath, this.SystemPath);

            this.TemporaryFileStream = null;
            this.TemporaryFilePath = null;
        }
    }
}
