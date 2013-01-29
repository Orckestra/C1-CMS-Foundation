using System;
using System.IO;
using System.Runtime.Serialization;
using System.Text;
using Composite.Core.IO;
using Composite.Core.IO.Plugins.IOProvider;


namespace Composite.Plugins.IO.IOProviders.LocalIOProvider
{
    internal class LocalC1FileInfo : IC1FileInfo
    {
        private FileInfo _fileInfo;


        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileInfoClass:DotNotUseFileInfoClass")]
        public LocalC1FileInfo(string fileName)
        {
            _fileInfo = new FileInfo(fileName);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileInfoClass:DotNotUseFileInfoClass")]
        public string DirectoryName
        {
            get
            {
                return _fileInfo.DirectoryName;
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileInfoClass:DotNotUseFileInfoClass")]
        public C1DirectoryInfo Directory
        {
            get
            {
                return new C1DirectoryInfo(_fileInfo.DirectoryName);
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileSystemInfoClass:DotNotUseFileSystemInfoClass")]
        public string Name
        {
            get
            {
                return _fileInfo.Name;
            }
        }




        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileSystemInfoClass:DotNotUseFileSystemInfoClass")]
        public string FullName
        {
            get
            {
                return _fileInfo.FullName;
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileSystemInfoClass:DotNotUseFileSystemInfoClass")]
        public bool Exists
        {
            get
            {
                return _fileInfo.Exists;
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileSystemInfoClass:DotNotUseFileSystemInfoClass")]
        public string Extension
        {
            get
            {
                return _fileInfo.Extension;
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileInfoClass:DotNotUseFileInfoClass")]
        public bool IsReadOnly
        {
            get
            {
                return _fileInfo.IsReadOnly;
            }
            set
            {
                _fileInfo.IsReadOnly = value;
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileInfoClass:DotNotUseFileInfoClass")]
        public long Length
        {
            get
            {
                return _fileInfo.Length;
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileSystemInfoClass:DotNotUseFileSystemInfoClass")]
        public FileAttributes Attributes
        {
            get
            {
                return _fileInfo.Attributes;
            }
            set
            {
                _fileInfo.Attributes = value;
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileSystemInfoClass:DotNotUseFileSystemInfoClass")]
        public C1FileStream Create()
        {
            return new C1FileStream(_fileInfo.FullName, FileMode.Create, FileAccess.ReadWrite, FileShare.Read, 0x1000, FileOptions.None);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileSystemInfoClass:DotNotUseFileSystemInfoClass")]
        public C1StreamWriter CreateText()
        {
            return new C1StreamWriter(_fileInfo.FullName, false);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileSystemInfoClass:DotNotUseFileSystemInfoClass")]
        public C1StreamWriter AppendText()
        {
            return new C1StreamWriter(_fileInfo.FullName, true);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileSystemInfoClass:DotNotUseFileSystemInfoClass")]
        public C1FileStream Open(FileMode mode)
        {
            return Open(mode, FileAccess.ReadWrite, FileShare.Read);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileSystemInfoClass:DotNotUseFileSystemInfoClass")]
        public C1FileStream Open(FileMode mode, FileAccess access)
        {
            return Open(mode, access, FileShare.Read);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileSystemInfoClass:DotNotUseFileSystemInfoClass")]
        public C1FileStream Open(FileMode mode, FileAccess access, FileShare share)
        {
            return new C1FileStream(_fileInfo.FullName, mode, access, share);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileSystemInfoClass:DotNotUseFileSystemInfoClass")]
        public C1FileStream OpenRead()
        {
            return new C1FileStream(_fileInfo.FullName, FileMode.Open, FileAccess.Read, FileShare.Read);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileSystemInfoClass:DotNotUseFileSystemInfoClass")]
        public C1StreamReader OpenText()
        {
            return new C1StreamReader(_fileInfo.FullName, Encoding.UTF8, true, 0x400);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileSystemInfoClass:DotNotUseFileSystemInfoClass")]
        public C1FileStream OpenWrite()
        {
            return new C1FileStream(_fileInfo.FullName, FileMode.OpenOrCreate, FileAccess.Write, FileShare.Read);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileInfoClass:DotNotUseFileInfoClass")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileSystemInfoClass:DotNotUseFileSystemInfoClass")]
        public C1FileInfo CopyTo(string destFileName)
        {
            return new C1FileInfo(_fileInfo.CopyTo(destFileName).FullName);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileInfoClass:DotNotUseFileInfoClass")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileSystemInfoClass:DotNotUseFileSystemInfoClass")]
        public C1FileInfo CopyTo(string destFileName, bool overwrite)
        {
            return new C1FileInfo(_fileInfo.CopyTo(destFileName, overwrite).FullName);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileInfoClass:DotNotUseFileInfoClass")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileSystemInfoClass:DotNotUseFileSystemInfoClass")]
        public void MoveTo(string destFileName)
        {
            _fileInfo.MoveTo(destFileName);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileInfoClass:DotNotUseFileInfoClass")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileSystemInfoClass:DotNotUseFileSystemInfoClass")]
        public C1FileInfo Replace(string destinationFileName, string destinationBackupFileName)
        {
            return new C1FileInfo(_fileInfo.Replace(destinationFileName, destinationBackupFileName).FullName);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileInfoClass:DotNotUseFileInfoClass")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileSystemInfoClass:DotNotUseFileSystemInfoClass")]
        public C1FileInfo Replace(string destinationFileName, string destinationBackupFileName, bool ignoreMetadataErrors)
        {
            return new C1FileInfo(_fileInfo.Replace(destinationFileName, destinationBackupFileName, ignoreMetadataErrors).FullName);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileSystemInfoClass:DotNotUseFileSystemInfoClass")]
        public void Delete()
        {
            _fileInfo.Delete();
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileSystemInfoClass:DotNotUseFileSystemInfoClass")]
        public void Refresh()
        {
            _fileInfo.Refresh();
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileSystemInfoClass:DotNotUseFileSystemInfoClass")]
        public void GetObjectData(SerializationInfo info, StreamingContext context)
        {
            _fileInfo.GetObjectData(info, context);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileSystemInfoClass:DotNotUseFileSystemInfoClass")]
        public DateTime CreationTime
        {
            get
            {
                return _fileInfo.CreationTime;
            }
            set
            {
                _fileInfo.CreationTime = value;
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileSystemInfoClass:DotNotUseFileSystemInfoClass")]
        public DateTime CreationTimeUtc
        {
            get
            {
                return _fileInfo.CreationTimeUtc;
            }
            set
            {
                _fileInfo.CreationTimeUtc = value;
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileSystemInfoClass:DotNotUseFileSystemInfoClass")]
        public DateTime LastAccessTime
        {
            get
            {
                return _fileInfo.LastAccessTime;
            }
            set
            {
                _fileInfo.LastAccessTime = value;
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileSystemInfoClass:DotNotUseFileSystemInfoClass")]
        public DateTime LastAccessTimeUtc
        {
            get
            {
                return _fileInfo.LastAccessTimeUtc;
            }
            set
            {
                _fileInfo.LastAccessTimeUtc = value;
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileSystemInfoClass:DotNotUseFileSystemInfoClass")]
        public DateTime LastWriteTime
        {
            get
            {
                return _fileInfo.LastWriteTime;
            }
            set
            {
                _fileInfo.LastWriteTime = value;
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileSystemInfoClass:DotNotUseFileSystemInfoClass")]
        public DateTime LastWriteTimeUtc
        {
            get
            {
                return _fileInfo.LastWriteTimeUtc;
            }
            set
            {
                _fileInfo.LastWriteTimeUtc = value;
            }
        }
    }
}
