using System;
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
        protected C1FileStream TemporaryFileStream { get; set; }

        /// <exclude />
        protected string TemporaryFilePath { get; set; }

        /// <exclude />
        public virtual string SystemPath { get; set; }

        /// <exclude />
        public C1FileStream GetNewWriteStream()
        {
            if (TemporaryFileStream != null)
            {
                Verify.That(!TemporaryFileStream.CanWrite, "Stream for writing has not been closed.");

                TemporaryFileStream = null;
                C1File.Delete(TemporaryFilePath);
            }

            string tempFile = Path.Combine(PathUtil.Resolve(GlobalSettingsFacade.TempDirectory),  "upload" + Path.GetRandomFileName());

            this.TemporaryFilePath = tempFile;
            this.TemporaryFileStream = C1File.Open(tempFile, FileMode.Create, FileAccess.ReadWrite, FileShare.None);

            return TemporaryFileStream;
        }

        /// <exclude />
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

            return new C1FileStream(filePath, FileMode.Open, FileAccess.Read);
        }

        /// <exclude />
        public void CommitChanges()
        {
            if (this.TemporaryFileStream == null) return;

            Verify.That(!TemporaryFileStream.CanWrite, "Stream for writing has not been closed.");

            DirectoryUtils.EnsurePath(this.SystemPath);

            if (!this.SystemPath.IsNullOrEmpty())
            {
                C1File.Delete(this.SystemPath);
            }

            C1File.Move(this.TemporaryFilePath, this.SystemPath);

            this.TemporaryFileStream = null;
            this.TemporaryFilePath = null;
        }

        /// <exclude />
        ~FileSystemFileBase()
        {
            if (TemporaryFilePath != null)
            {
                try
                {
                    C1File.Delete(TemporaryFilePath);
                }
                catch
                {
                }
            }
        }
    }
}
