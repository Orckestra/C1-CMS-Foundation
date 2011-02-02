using System;
using System.IO;
using System.Runtime.Serialization;
using Composite.Core.IO;
using Composite.Core.IO.Plugins.IOProvider;


namespace Composite.Core.Implementation
{
    /// <summary>
    /// IOLayer - documentation pending
    /// </summary>
    public class C1DirectoryInfoImplementation
    {
        private IC1DirectoryInfo _directoryInfo;


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        public C1DirectoryInfoImplementation(string path)
        {
            _directoryInfo = IOFacade.CreateC1DirectoryInfo(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public string Name
        {
            get
            {
                return _directoryInfo.Name;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public string FullName
        {
            get
            {
                return _directoryInfo.FullName;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public string Extension
        {
            get
            {
                return _directoryInfo.Extension;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public bool Exists
        {
            get
            {
                return _directoryInfo.Exists;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public C1DirectoryInfo Root
        {
            get
            {
                return _directoryInfo.Root;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public C1DirectoryInfo Parent
        {
            get
            {
                return _directoryInfo.Parent;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
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
        /// IOLayer - documentation pending
        /// </summary>
        /// <returns></returns>
        public C1DirectoryInfo[] GetDirectories()
        {
            return _directoryInfo.GetDirectories();
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="searchPattern"></param>
        /// <returns></returns>
        public C1DirectoryInfo[] GetDirectories(string searchPattern)
        {
            return _directoryInfo.GetDirectories(searchPattern);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="searchPattern"></param>
        /// <param name="searchOption"></param>
        /// <returns></returns>
        public C1DirectoryInfo[] GetDirectories(string searchPattern, SearchOption searchOption)
        {
            return _directoryInfo.GetDirectories(searchPattern, searchOption);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <returns></returns>
        public C1FileInfo[] GetFiles()
        {
            return _directoryInfo.GetFiles();
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="searchPattern"></param>
        /// <returns></returns>
        public C1FileInfo[] GetFiles(string searchPattern)
        {
            return _directoryInfo.GetFiles(searchPattern);
        }


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="searchPattern"></param>
        /// <param name="searchOption"></param>
        /// <returns></returns>
        public C1FileInfo[] GetFiles(string searchPattern, SearchOption searchOption)
        {
            return _directoryInfo.GetFiles(searchPattern, searchOption);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public void Create()
        {
            _directoryInfo.Create();
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public C1DirectoryInfo CreateSubdirectory(string path)
        {
            return _directoryInfo.CreateSubdirectory(path);
        }      



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="destinationDirName"></param>
        public void MoveTo(string destinationDirName)
        {
            _directoryInfo.MoveTo(destinationDirName);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public void Delete()
        {
            _directoryInfo.Delete();
        }


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="recursive"></param>
        public void Delete(bool recursive)
        {
            _directoryInfo.Delete(recursive);
        }



        /// <summary>
        /// IOLayer - documentation pending
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
        /// IOLayer - documentation pending
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
        /// IOLayer - documentation pending
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
        /// IOLayer - documentation pending
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
        /// IOLayer - documentation pending
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
        /// IOLayer - documentation pending
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
        /// IOLayer - documentation pending
        /// </summary>
        public void GetObjectData(SerializationInfo info, StreamingContext context)
        {
            _directoryInfo.GetObjectData(info, context);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public void Refresh()
        {
            _directoryInfo.Refresh();
        }
    }
}
