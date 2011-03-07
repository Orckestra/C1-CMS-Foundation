using System;
using System.IO;
using System.Runtime.Serialization;
using Composite.Core.Implementation;


namespace Composite.Core.IO
{


    /// <summary>
    /// This class is a almost one to one version of System.IO.DirectoryInfo. Using this implementation instead 
    /// of System.IO.Directory, will ensure that your code will work both on Standard Windows deployment 
    /// and Windows Azure deployment.
    /// See System.IO.DirectoryInfo for more documentation on the methods of this class.
    /// </summary>
    public class C1DirectoryInfo : C1FileSystemInfo
    {
        private ImplementationContainer<C1DirectoryInfoImplementation> _implementation;


        /// <summary>
        /// Creates and initialize a new C1DirectoryInfo.
        /// </summary>
        /// <param name="path">Path to use.</param>
        public C1DirectoryInfo(string path)
        {
            _implementation = new ImplementationContainer<C1DirectoryInfoImplementation>(() => ImplementationFactory.CurrentFactory.CreateC1DirectoryInfo(path));
            _implementation.CreateImplementation();
        }



        /// <summary>
        /// The name of the directory.
        /// </summary>
        public string Name
        {
            get
            {
                return _implementation.Implementation.Name;
            }
        }



        /// <summary>
        /// Full path of the directory.
        /// </summary>
        public override string FullName
        {
            get
            {
                return _implementation.Implementation.FullName;
            }
        }



        /// <summary>
        /// The extension of the directory.
        /// </summary>
        public override string Extension
        {
            get
            {
                return _implementation.Implementation.Extension;
            }
        }



        /// <summary>
        /// Tells if the directory exists or not.
        /// </summary>
        public override bool Exists
        {
            get
            {
                return _implementation.Implementation.Exists;
            }
        }



        /// <summary>
        /// The root directory of the directory.
        /// </summary>
        public C1DirectoryInfo Root
        {
            get
            {
                return _implementation.Implementation.Root;
            }
        }



        /// <summary>
        /// The parent directory of the directory.
        /// </summary>
        public C1DirectoryInfo Parent
        {
            get
            {
                return _implementation.Implementation.Parent;
            }
        }



        /// <summary>
        /// File attributes of the directory.
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
        /// Returns the subdirectories of the directory.
        /// </summary>
        /// <returns>Subdirectories of the directory.</returns>
        public C1DirectoryInfo[] GetDirectories()
        {
            return _implementation.Implementation.GetDirectories();
        }



        /// <summary>
        /// Returns the subdirectores of the directory given the search pattern.
        /// </summary>
        /// <param name="searchPattern">Search pattern to use.</param>
        /// <returns>Subdirectories of the directory.</returns>
        public C1DirectoryInfo[] GetDirectories(string searchPattern)
        {
            return _implementation.Implementation.GetDirectories(searchPattern);
        }



        /// <summary>
        /// Returns the subdirectores of the directory given the search pattern and options.
        /// </summary>
        /// <param name="searchPattern">The search pattern to use.</param>
        /// <param name="searchOption">The search options to use.</param>
        /// <returns>Subdirectories of the directory.</returns>
        public C1DirectoryInfo[] GetDirectories(string searchPattern, SearchOption searchOption)
        {
            return _implementation.Implementation.GetDirectories(searchPattern, searchOption);
        }



        /// <summary>
        /// Returns the files in the directory.
        /// </summary>
        /// <returns>Files in the directory.</returns>
        public C1FileInfo[] GetFiles()
        {
            return _implementation.Implementation.GetFiles();
        }



        /// <summary>
        /// Returns the files in the directory given the search pattern.
        /// </summary>
        /// <param name="searchPattern">The search pattern to use.</param>
        /// <returns>Files in the directory given the search pattern.</returns>
        public C1FileInfo[] GetFiles(string searchPattern)
        {
            return _implementation.Implementation.GetFiles(searchPattern);
        }


        /// <summary>
        /// Returns the files in the directory given the search pattern and options.
        /// </summary>
        /// <param name="searchPattern">The search pattern to use.</param>
        /// <param name="searchOption">The search options to use.</param>
        /// <returns>Files in the directory given the search pattern and options.</returns>
        public C1FileInfo[] GetFiles(string searchPattern, SearchOption searchOption)
        {
            return _implementation.Implementation.GetFiles(searchPattern, searchOption);
        }



        /// <summary>
        /// Creates the directory.
        /// </summary>
        public void Create()
        {
            _implementation.Implementation.Create();
        }


        /// <summary>
        /// Creates a subdirectory.
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public C1DirectoryInfo CreateSubdirectory(string path)
        {
            return _implementation.Implementation.CreateSubdirectory(path);
        }
              



        /// <summary>
        /// Moves the directory to the given path.
        /// </summary>
        /// <param name="destDirName">Destination directory name.</param>
        public void MoveTo(string destDirName)
        {
            _implementation.Implementation.MoveTo(destDirName);
        }



        /// <summary>
        /// Deletes the directory if empty.
        /// </summary>
        public override void Delete()
        {
            _implementation.Implementation.Delete();
        }


        /// <summary>
        /// Deletes the directory, files and subdirectories if specified.
        /// </summary>
        /// <param name="recursive">If true, a recursive delete will be performced.</param>
        public void Delete(bool recursive)
        {
            _implementation.Implementation.Delete(recursive);
        }



        /// <summary>
        /// The creation time of the directory.
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
        /// The creation utc time of the directory.
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
        /// Last access time of the directory.
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
        /// Last access utc time of the directory.
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
        /// Last write time of the directory.
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
        /// Last write utc time of the directory.
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
        /// </summary>
        public override void GetObjectData(SerializationInfo info, StreamingContext context)
        {
            _implementation.Implementation.GetObjectData(info, context);
        }



        /// <summary>
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
