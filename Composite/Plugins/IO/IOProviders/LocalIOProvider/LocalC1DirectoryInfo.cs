using System;
using System.IO;
using System.Linq;
using System.Runtime.Serialization;
using Composite.Core.IO;
using Composite.Core.IO.Plugins.IOProvider;


namespace Composite.Plugins.IO.IOProviders.LocalIOProvider
{
    internal class LocalC1DirectoryInfo : IC1DirectoryInfo
    {
        private DirectoryInfo _directoryInfo;



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileInfoClass:DotNotUseFileInfoClass")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseDirectoryInfoClass:DotNotUseDirectoryInfoClass")]
        public LocalC1DirectoryInfo(string path)
        {
            _directoryInfo = new DirectoryInfo(path);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileSystemInfoClass:DotNotUseFileSystemInfoClass")]
        public string Name
        {
            get
            {
                return _directoryInfo.Name;
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileSystemInfoClass:DotNotUseFileSystemInfoClass")]
        public string FullName
        {
            get
            {
                return _directoryInfo.FullName;
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileSystemInfoClass:DotNotUseFileSystemInfoClass")]
        public string Extension
        {
            get
            {
                return _directoryInfo.Extension;
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileSystemInfoClass:DotNotUseFileSystemInfoClass")]
        public bool Exists
        {
            get
            {
                return _directoryInfo.Exists;
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileInfoClass:DotNotUseFileInfoClass")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseDirectoryInfoClass:DotNotUseDirectoryInfoClass")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileSystemInfoClass:DotNotUseFileSystemInfoClass")]
        public C1DirectoryInfo Root
        {
            get
            {
                return new C1DirectoryInfo(_directoryInfo.Root.FullName);
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileInfoClass:DotNotUseFileInfoClass")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseDirectoryInfoClass:DotNotUseDirectoryInfoClass")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileSystemInfoClass:DotNotUseFileSystemInfoClass")]
        public C1DirectoryInfo Parent
        {
            get
            {
                return new C1DirectoryInfo(_directoryInfo.Parent.FullName);
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileSystemInfoClass:DotNotUseFileSystemInfoClass")]
        public FileAttributes Attributes
        {
            get
            {
                return _directoryInfo.Attributes;
            }
            set
            {
                _directoryInfo.Attributes = value;
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileInfoClass:DotNotUseFileInfoClass")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseDirectoryInfoClass:DotNotUseDirectoryInfoClass")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileSystemInfoClass:DotNotUseFileSystemInfoClass")]
        public C1DirectoryInfo[] GetDirectories()
        {
            return _directoryInfo.GetDirectories().Select(f => new C1DirectoryInfo(f.FullName)).ToArray();
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileInfoClass:DotNotUseFileInfoClass")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseDirectoryInfoClass:DotNotUseDirectoryInfoClass")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileSystemInfoClass:DotNotUseFileSystemInfoClass")]
        public C1DirectoryInfo[] GetDirectories(string searchPattern)
        {
            return _directoryInfo.GetDirectories(searchPattern).Select(f => new C1DirectoryInfo(f.FullName)).ToArray();
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileInfoClass:DotNotUseFileInfoClass")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseDirectoryInfoClass:DotNotUseDirectoryInfoClass")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileSystemInfoClass:DotNotUseFileSystemInfoClass")]
        public C1DirectoryInfo[] GetDirectories(string searchPattern, SearchOption searchOption)
        {
            return _directoryInfo.GetDirectories(searchPattern, searchOption).Select(f => new C1DirectoryInfo(f.FullName)).ToArray();
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileInfoClass:DotNotUseFileInfoClass")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseDirectoryInfoClass:DotNotUseDirectoryInfoClass")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileSystemInfoClass:DotNotUseFileSystemInfoClass")]
        public C1FileInfo[] GetFiles()
        {
            return _directoryInfo.GetFiles().Select(f => new C1FileInfo(f.FullName)).ToArray();
        }




        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileInfoClass:DotNotUseFileInfoClass")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseDirectoryInfoClass:DotNotUseDirectoryInfoClass")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileSystemInfoClass:DotNotUseFileSystemInfoClass")]
        public C1FileInfo[] GetFiles(string searchPattern)
        {
            return _directoryInfo.GetFiles(searchPattern).Select(f => new C1FileInfo(f.FullName)).ToArray();
        }


        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileInfoClass:DotNotUseFileInfoClass")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseDirectoryInfoClass:DotNotUseDirectoryInfoClass")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileSystemInfoClass:DotNotUseFileSystemInfoClass")]
        public C1FileInfo[] GetFiles(string searchPattern, SearchOption searchOption)
        {
            return _directoryInfo.GetFiles(searchPattern, searchOption).Select(f => new C1FileInfo(f.FullName)).ToArray();
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileInfoClass:DotNotUseFileInfoClass")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseDirectoryInfoClass:DotNotUseDirectoryInfoClass")]
        public void Create()
        {
            _directoryInfo.Create();
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileInfoClass:DotNotUseFileInfoClass")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseDirectoryInfoClass:DotNotUseDirectoryInfoClass")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileSystemInfoClass:DotNotUseFileSystemInfoClass")]
        public C1DirectoryInfo CreateSubdirectory(string path)
        {
            return new C1DirectoryInfo(_directoryInfo.CreateSubdirectory(path).FullName);
        }




        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileInfoClass:DotNotUseFileInfoClass")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseDirectoryInfoClass:DotNotUseDirectoryInfoClass")]
        public void MoveTo(string destDirName)
        {
            _directoryInfo.MoveTo(destDirName);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileSystemInfoClass:DotNotUseFileSystemInfoClass")]
        public void Delete()
        {
            _directoryInfo.Delete();
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileInfoClass:DotNotUseFileInfoClass")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseDirectoryInfoClass:DotNotUseDirectoryInfoClass")]
        public void Delete(bool recursive)
        {
            _directoryInfo.Delete(recursive);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileSystemInfoClass:DotNotUseFileSystemInfoClass")]
        public DateTime CreationTime
        {
            get
            {
                return _directoryInfo.CreationTime;
            }
            set
            {
                _directoryInfo.CreationTime = value;
            }
        }




        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileSystemInfoClass:DotNotUseFileSystemInfoClass")]
        public DateTime CreationTimeUtc
        {
            get
            {
                return _directoryInfo.CreationTimeUtc;
            }
            set
            {
                _directoryInfo.CreationTimeUtc = value;
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileSystemInfoClass:DotNotUseFileSystemInfoClass")]
        public DateTime LastAccessTime 
            {
            get
            {
                return _directoryInfo.LastAccessTime;
            }
            set
            {
                _directoryInfo.LastAccessTime = value;
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileSystemInfoClass:DotNotUseFileSystemInfoClass")]
        public DateTime LastAccessTimeUtc 
            {
            get
            {
                return _directoryInfo.LastAccessTimeUtc;
            }
            set
            {
                _directoryInfo.LastAccessTimeUtc = value;
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileSystemInfoClass:DotNotUseFileSystemInfoClass")]
        public DateTime LastWriteTime 
            {
            get
            {
                return _directoryInfo.LastWriteTime;
            }
            set
            {
                _directoryInfo.LastWriteTime = value;
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileSystemInfoClass:DotNotUseFileSystemInfoClass")]
        public DateTime LastWriteTimeUtc 
            {
            get
            {
                return _directoryInfo.LastWriteTimeUtc;
            }
            set
            {
                _directoryInfo.LastWriteTimeUtc = value;
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileSystemInfoClass:DotNotUseFileSystemInfoClass")]
        public void GetObjectData(SerializationInfo info, StreamingContext context)
        {
            _directoryInfo.GetObjectData(info, context);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileSystemInfoClass:DotNotUseFileSystemInfoClass")]
        public void Refresh()
        {
            _directoryInfo.Refresh();
        }
    }
}
