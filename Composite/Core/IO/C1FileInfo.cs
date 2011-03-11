using System;
using System.IO;
using System.Runtime.Serialization;
using Composite.Core.Implementation;


namespace Composite.Core.IO
{
    /// <summary>
    /// This class is a almost one to one version of System.IO.FileInfo. Using this implementation instead 
    /// of System.IO.FileInfo, will ensure that your code will work both on Standard Windows deployment 
    /// and Windows Azure deployment.
    /// See System.IO.FileInfo for more documentation on the methods of this class.
    /// See <see cref="Composite.Core.IO.Plugins.IOProvider.IC1FileInfo"/>. 
    /// </summary>
    public class C1FileInfo : C1FileSystemInfo
    {
        private ImplementationContainer<C1FileInfoImplementation> _implementation;

        /// <summary>
        /// Creates a C1FileInfo.
        /// </summary>
        /// <param name="fileName">Path to file.</param>
        public C1FileInfo(string fileName)
        {
            _implementation = new ImplementationContainer<C1FileInfoImplementation>(() => ImplementationFactory.CurrentFactory.CreateC1FileInfo(fileName));
            _implementation.CreateImplementation();
        }



        /// <summary>
        /// Returns the directory name of the file.
        /// </summary>
        public string DirectoryName
        {
            get
            {
                return _implementation.Implementation.DirectoryName;
            }
        }



        /// <summary>
        /// Returns a <see cref="C1DirectoryInfo"/> of the file.
        /// </summary>
        public C1DirectoryInfo Directory
        {
            get
            {
                return _implementation.Implementation.Directory;
            }
        }



        /// <summary>
        /// Returns the name of the file.
        /// </summary>
        public string Name
        {
            get
            {
                return _implementation.Implementation.Name;
            }
        }




        /// <summary>
        /// Returns the full path and name of the file.
        /// </summary>
        public override string FullName
        {
            get
            {
                return _implementation.Implementation.FullName;
            }
        }



        /// <summary>
        /// Returns true if the file exists. Otherwise false.
        /// </summary>
        public override bool Exists
        {
            get
            {
                return _implementation.Implementation.Exists;
            }
        }



        /// <summary>
        /// Returns the extension of the file.
        /// </summary>
        public override string Extension
        {
            get
            {
                return _implementation.Implementation.Extension;
            }
        }



        /// <summary>
        /// Returns true if and only if the file is read only.
        /// </summary>
        public bool IsReadOnly
        {
            get
            {
                return _implementation.Implementation.IsReadOnly;
            }
        }



        /// <summary>
        /// Returns the size of the file in bytes.
        /// </summary>
        public long Length
        {
            get
            {
                return _implementation.Implementation.Length;
            }
        }



        /// <summary>
        /// Gets or sets the file attributes on the file.
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
        /// Creates a file stream <see cref="C1FileStream"/>.
        /// </summary>
        /// <returns>Returns a newly created <see cref="C1FileStream"/>.</returns>
        public C1FileStream Create()
        {
            return _implementation.Implementation.Create();
        }



        /// <summary>
        /// Creates a file stream <see cref="C1StreamWriter"/>.
        /// </summary>
        /// <returns>Returns a newly created <see cref="C1StreamWriter"/>.</returns>
        public C1StreamWriter CreateText()
        {
            return _implementation.Implementation.CreateText();
        }



        /// <summary>
        /// Creates a file stream <see cref="C1StreamWriter"/> for appending.
        /// </summary>
        /// <returns>Returns a newly created <see cref="C1StreamWriter"/> for appending.</returns>
        public C1StreamWriter AppendText()
        {
            return _implementation.Implementation.AppendText();
        }



        /// <summary>
        /// Creates a file stream <see cref="C1FileStream"/>.
        /// </summary>
        /// <param name="mode">File mode to use.</param>
        /// <returns>Returns a newly created <see cref="C1FileStream"/>.</returns>
        public C1FileStream Open(FileMode mode)
        {
            return _implementation.Implementation.Open(mode);
        }



        /// <summary>
        /// Creates a file stream <see cref="C1FileStream"/>.
        /// </summary>
        /// <param name="mode">File mode to use.</param>
        /// <param name="access">File access to use.</param>
        /// <returns>Returns a newly created <see cref="C1FileStream"/>.</returns>
        public C1FileStream Open(FileMode mode, FileAccess access)
        {
            return _implementation.Implementation.Open(mode, access);
        }



        /// <summary>
        /// Creates a file stream <see cref="C1FileStream"/>.
        /// </summary>
        /// <param name="mode">File mode to use.</param>
        /// <param name="access">File access to use.</param>
        /// <param name="share">File share to use.</param>
        /// <returns>Returns a newly created <see cref="C1FileStream"/>.</returns>
        public C1FileStream Open(FileMode mode, FileAccess access, FileShare share)
        {
            return _implementation.Implementation.Open(mode, access, share);
        }



        /// <summary>
        /// Creates a file stream <see cref="C1FileStream"/>.
        /// </summary>
        /// <returns>Returns a newly created <see cref="C1FileStream"/> for reading.</returns>
        public C1FileStream OpenRead()
        {
            return _implementation.Implementation.OpenRead();
        }



        /// <summary>
        /// Creates a file stream <see cref="C1StreamReader"/>.
        /// </summary>
        /// <returns>Returns a newly created <see cref="C1StreamReader"/>.</returns>
        public C1StreamReader OpenText()
        {
            return _implementation.Implementation.OpenText();
        }



        /// <summary>
        /// Creates a file stream <see cref="C1FileStream"/>.
        /// </summary>
        /// <returns>Returns a newly created <see cref="C1FileStream"/> for writing.</returns>
        public C1FileStream OpenWrite()
        {
            return _implementation.Implementation.OpenWrite();
        }



        /// <summary>
        /// Copies the file to the given path.
        /// </summary>
        /// <param name="destFileName">Destination path.</param>
        /// <returns>A new <see cref="C1FileInfo"/> for the destination file.</returns>
        public C1FileInfo CopyTo(string destFileName)
        {
            return _implementation.Implementation.CopyTo(destFileName);
        }



        /// <summary>
        /// Copies the file to the given path and overwrites any existing file if specified.
        /// </summary>
        /// <param name="destFileName">Destination path.</param>
        /// <param name="overwrite">If true, any existing file will be overwritten.</param>
        /// <returns>A new <see cref="C1FileInfo"/> for the destination file.</returns>
        public C1FileInfo CopyTo(string destFileName, bool overwrite)
        {
            return _implementation.Implementation.CopyTo(destFileName, overwrite);
        }



        /// <summary>
        /// Moves the file to the given path.
        /// </summary>
        /// <param name="destFileName">Destination path.</param>
        public void MoveTo(string destFileName)
        {
            _implementation.Implementation.MoveTo(destFileName);
        }



        /// <summary>
        /// Replaces the given file with this one.
        /// </summary>
        /// <param name="destinationFileName">Destination path to file to replace.</param>
        /// <param name="destinationBackupFileName">Path to backup file.</param>
        /// <returns>A new <see cref="C1FileInfo"/> for the destination file.</returns>
        public C1FileInfo Replace(string destinationFileName, string destinationBackupFileName)
        {
            return _implementation.Implementation.Replace(destinationFileName, destinationBackupFileName);
        }



        /// <summary>
        /// Replaces the given file with this one.
        /// </summary>
        /// <param name="destinationFileName">Destination path to file to replace.</param>
        /// <param name="destinationBackupFileName">Path to backup file.</param>
        /// <param name="ignoreMetadataErrors"></param>
        /// <returns>A new <see cref="C1FileInfo"/> for the destination file.</returns>
        public C1FileInfo Replace(string destinationFileName, string destinationBackupFileName, bool ignoreMetadataErrors)
        {
            return _implementation.Implementation.Replace(destinationFileName, destinationBackupFileName, ignoreMetadataErrors);
        }



        /// <summary>
        /// Deletes the file.
        /// </summary>
        public override void Delete()
        {
            _implementation.Implementation.Delete();
        }        



        /// <summary>
        /// Gets or sets the creation time of the file.
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
        /// Gets or sets the creation utc time of the file.
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
        /// Gets or sets the last access time of the file.
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
        /// Gets or sets the last access utc time of the file.
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
        /// Gets or sets the last write time of the file.
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
        /// Gets or sets the last write utc time of the file.
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
        public override void Refresh()
        {
            _implementation.Implementation.Refresh();
        }



        /// <summary>
        /// </summary>
        /// <param name="info"></param>
        /// <param name="context"></param>
        public override void GetObjectData(SerializationInfo info, StreamingContext context)
        {
            _implementation.Implementation.GetObjectData(info, context);
        }


        //public FileSecurity GetAccessControl();
        //public FileSecurity GetAccessControl(AccessControlSections includeSections);
        //public void SetAccessControl(FileSecurity fileSecurity);

        //public void Decrypt();        
        //public void Encrypt();
    }
}
