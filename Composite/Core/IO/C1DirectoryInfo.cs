using System;
using System.IO;
using System.Runtime.Serialization;
using Composite.Core.Implementation;


namespace Composite.Core.IO
{


    /// <summary>
    /// IOLayer - documentation pending
    /// </summary>
    public class C1DirectoryInfo : C1FileSystemInfo
    {
        private ImplementationContainer<C1DirectoryInfoImplementation> _implementation;


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        public C1DirectoryInfo(string path)
        {
            _implementation = new ImplementationContainer<C1DirectoryInfoImplementation>(() => ImplementationFactory.CurrentFactory.CreateC1DirectoryInfo(path));
            _implementation.CreateImplementation();
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public string Name
        {
            get
            {
                return _implementation.Implementation.Name;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public override string FullName
        {
            get
            {
                return _implementation.Implementation.FullName;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public override string Extension
        {
            get
            {
                return _implementation.Implementation.Extension;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public override bool Exists
        {
            get
            {
                return _implementation.Implementation.Exists;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public C1DirectoryInfo Root
        {
            get
            {
                return _implementation.Implementation.Root;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public C1DirectoryInfo Parent
        {
            get
            {
                return _implementation.Implementation.Parent;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public override FileAttributes Attributes
        {
            get
            {
                return _implementation.Implementation.Attributes;
            }
            set
            {
                _implementation.Implementation.Attributes = value;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <returns></returns>
        public C1DirectoryInfo[] GetDirectories()
        {
            return _implementation.Implementation.GetDirectories();
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="searchPattern"></param>
        /// <returns></returns>
        public C1DirectoryInfo[] GetDirectories(string searchPattern)
        {
            return _implementation.Implementation.GetDirectories(searchPattern);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="searchPattern"></param>
        /// <param name="searchOption"></param>
        /// <returns></returns>
        public C1DirectoryInfo[] GetDirectories(string searchPattern, SearchOption searchOption)
        {
            return _implementation.Implementation.GetDirectories(searchPattern, searchOption);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <returns></returns>
        public C1FileInfo[] GetFiles()
        {
            return _implementation.Implementation.GetFiles();
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="searchPattern"></param>
        /// <returns></returns>
        public C1FileInfo[] GetFiles(string searchPattern)
        {
            return _implementation.Implementation.GetFiles(searchPattern);
        }


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="searchPattern"></param>
        /// <param name="searchOption"></param>
        /// <returns></returns>
        public C1FileInfo[] GetFiles(string searchPattern, SearchOption searchOption)
        {
            return _implementation.Implementation.GetFiles(searchPattern, searchOption);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public void Create()
        {
            _implementation.Implementation.Create();
        }


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public C1DirectoryInfo CreateSubdirectory(string path)
        {
            return _implementation.Implementation.CreateSubdirectory(path);
        }


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="directorySecurity"></param>
        /// <returns></returns>
        //public C1DirectoryInfo CreateSubdirectory(string path, DirectorySecurity directorySecurity);



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="destDirName"></param>
        public void MoveTo(string destDirName)
        {
            _implementation.Implementation.MoveTo(destDirName);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public override void Delete()
        {
            _implementation.Implementation.Delete();
        }


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="recursive"></param>
        public void Delete(bool recursive)
        {
            _implementation.Implementation.Delete(recursive);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public override DateTime CreationTime
        {
            get
            {
                return _implementation.Implementation.CreationTime;
            }
            set
            {
                _implementation.Implementation.CreationTime = value;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public override DateTime CreationTimeUtc
        {
            get
            {
                return _implementation.Implementation.CreationTimeUtc;
            }
            set
            {
                _implementation.Implementation.CreationTimeUtc = value;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public override DateTime LastAccessTime
        {
            get
            {
                return _implementation.Implementation.LastAccessTime;
            }
            set
            {
                _implementation.Implementation.LastAccessTime = value;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public override DateTime LastAccessTimeUtc
        {
            get
            {
                return _implementation.Implementation.LastAccessTimeUtc;
            }
            set
            {
                _implementation.Implementation.LastAccessTimeUtc = value;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public override DateTime LastWriteTime
        {
            get
            {
                return _implementation.Implementation.LastWriteTime;
            }
            set
            {
                _implementation.Implementation.LastWriteTime = value;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public override DateTime LastWriteTimeUtc
        {
            get
            {
                return _implementation.Implementation.LastWriteTimeUtc;
            }
            set
            {
                _implementation.Implementation.LastWriteTimeUtc = value;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public override void GetObjectData(SerializationInfo info, StreamingContext context)
        {
            _implementation.Implementation.GetObjectData(info, context);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public override void Refresh()
        {
            _implementation.Implementation.Refresh();
        }







        // public C1DirectoryInfo CreateSubdirectory(string path, DirectorySecurity directorySecurity);
        // public FileSystemInfo[] GetFileSystemInfos();
        // public FileSystemInfo[] GetFileSystemInfos(string searchPattern);
        // public void Create(DirectorySecurity directorySecurity);
        // public DirectorySecurity GetAccessControl(AccessControlSections includeSections);
        // public void SetAccessControl(DirectorySecurity directorySecurity);
        // public DirectorySecurity GetAccessControl();
    }
}
