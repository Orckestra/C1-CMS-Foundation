using System;
using System.IO;
using System.Runtime.Serialization;
using Composite.Core.IO;
using Composite.Core.IO.Plugins.IOProvider;


namespace Composite.Core.Implementation
{
    /// <summary>
    /// Implementation of <see cref="Composite.Core.IO.C1DirectoryInfo"/>.
    /// </summary>
    public class C1DirectoryInfoImplementation
    {
        private IC1DirectoryInfo _directoryInfo;


        /// <summary>
        /// See <see cref="Composite.Core.IO.C1DirectoryInfo"/>.
        /// </summary>
        /// <param name="path"></param>
        public C1DirectoryInfoImplementation(string path)
        {
            _directoryInfo = IOFacade.CreateC1DirectoryInfo(path);
        }



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1DirectoryInfo"/>.
        /// </summary>
        public string Name
        {
            get
            {
                return _directoryInfo.Name;
            }
        }



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1DirectoryInfo"/>.
        /// </summary>
        public string FullName
        {
            get
            {
                return _directoryInfo.FullName;
            }
        }



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1DirectoryInfo"/>.
        /// </summary>
        public string Extension
        {
            get
            {
                return _directoryInfo.Extension;
            }
        }



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1DirectoryInfo"/>.
        /// </summary>
        public bool Exists
        {
            get
            {
                return _directoryInfo.Exists;
            }
        }



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1DirectoryInfo"/>.
        /// </summary>
        public C1DirectoryInfo Root
        {
            get
            {
                return _directoryInfo.Root;
            }
        }



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1DirectoryInfo"/>.
        /// </summary>
        public C1DirectoryInfo Parent
        {
            get
            {
                return _directoryInfo.Parent;
            }
        }



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1DirectoryInfo"/>.
        /// </summary>
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



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1DirectoryInfo"/>.
        /// </summary>
        /// <returns></returns>
        public C1DirectoryInfo[] GetDirectories()
        {
            return _directoryInfo.GetDirectories();
        }



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1DirectoryInfo"/>.
        /// </summary>
        /// <param name="searchPattern"></param>
        /// <returns></returns>
        public C1DirectoryInfo[] GetDirectories(string searchPattern)
        {
            return _directoryInfo.GetDirectories(searchPattern);
        }



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1DirectoryInfo"/>.
        /// </summary>
        /// <param name="searchPattern"></param>
        /// <param name="searchOption"></param>
        /// <returns></returns>
        public C1DirectoryInfo[] GetDirectories(string searchPattern, SearchOption searchOption)
        {
            return _directoryInfo.GetDirectories(searchPattern, searchOption);
        }



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1DirectoryInfo"/>.
        /// </summary>
        /// <returns></returns>
        public C1FileInfo[] GetFiles()
        {
            return _directoryInfo.GetFiles();
        }



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1DirectoryInfo"/>.
        /// </summary>
        /// <param name="searchPattern"></param>
        /// <returns></returns>
        public C1FileInfo[] GetFiles(string searchPattern)
        {
            return _directoryInfo.GetFiles(searchPattern);
        }


        /// <summary>
        /// See <see cref="Composite.Core.IO.C1DirectoryInfo"/>.
        /// </summary>
        /// <param name="searchPattern"></param>
        /// <param name="searchOption"></param>
        /// <returns></returns>
        public C1FileInfo[] GetFiles(string searchPattern, SearchOption searchOption)
        {
            return _directoryInfo.GetFiles(searchPattern, searchOption);
        }



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1DirectoryInfo"/>.
        /// </summary>
        public void Create()
        {
            _directoryInfo.Create();
        }



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1DirectoryInfo"/>.
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public C1DirectoryInfo CreateSubdirectory(string path)
        {
            return _directoryInfo.CreateSubdirectory(path);
        }      



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1DirectoryInfo"/>.
        /// </summary>
        /// <param name="destinationDirName"></param>
        public void MoveTo(string destinationDirName)
        {
            _directoryInfo.MoveTo(destinationDirName);
        }



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1DirectoryInfo"/>.
        /// </summary>
        public void Delete()
        {
            _directoryInfo.Delete();
        }


        /// <summary>
        /// See <see cref="Composite.Core.IO.C1DirectoryInfo"/>.
        /// </summary>
        /// <param name="recursive"></param>
        public void Delete(bool recursive)
        {
            _directoryInfo.Delete(recursive);
        }



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1DirectoryInfo"/>.
        /// </summary>
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



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1DirectoryInfo"/>.
        /// </summary>
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



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1DirectoryInfo"/>.
        /// </summary>
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



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1DirectoryInfo"/>.
        /// </summary>
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



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1DirectoryInfo"/>.
        /// </summary>
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



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1DirectoryInfo"/>.
        /// </summary>
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



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1DirectoryInfo"/>.
        /// </summary>
        public void GetObjectData(SerializationInfo info, StreamingContext context)
        {
            _directoryInfo.GetObjectData(info, context);
        }



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1DirectoryInfo"/>.
        /// </summary>
        public void Refresh()
        {
            _directoryInfo.Refresh();
        }
    }
}
