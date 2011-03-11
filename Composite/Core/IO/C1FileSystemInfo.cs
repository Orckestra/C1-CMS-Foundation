using System;
using System.IO;
using System.Runtime.Serialization;


namespace Composite.Core.IO
{
    /// <summary>
    /// This class is a almost one to one version of System.IO.FileSystemInfo. Using this implementation instead 
    /// of System.IO.FileSystemInfo, will ensure that your code will work both on Standard Windows deployment 
    /// and Windows Azure deployment.
    /// See System.IO.FileSystemInfo for more documentation on the methods of this class.
    /// </summary>
    public abstract class C1FileSystemInfo
    {
        /// <summary>
        /// Full path name.
        /// </summary>
        public abstract string FullName { get; }



        /// <summary>
        /// Extension.
        /// </summary>
        public abstract string Extension { get; }



        /// <summary>
        /// Returns true if the file system item exitst.
        /// </summary>
        public abstract bool Exists { get; }



        /// <summary>
        /// File attributes of the file system item.
        /// </summary>
        public abstract FileAttributes Attributes { get; set; }



        /// <summary>
        /// Deletes the file system item.
        /// </summary>
        public abstract void Delete();



        /// <summary>
        /// Gets or sets the creation time of the file system item.
        /// </summary>
        public abstract DateTime CreationTime { get; set; }



        /// <summary>
        /// Gets or sets the creation utc time of the file system item.
        /// </summary>
        public abstract DateTime CreationTimeUtc { get; set; }



        /// <summary>
        /// Gets or sets the last access time of the file system item.
        /// </summary>
        public abstract DateTime LastAccessTime { get; set; }



        /// <summary>
        /// Gets or sets the last access utc time of the file system item.
        /// </summary>
        public abstract DateTime LastAccessTimeUtc { get; set; }



        /// <summary>
        /// Gets or sets the last write time of the file system item.
        /// </summary>
        public abstract DateTime LastWriteTime { get; set; }



        /// <summary>
        /// Gets or sets the last write utc time of the file system item.
        /// </summary>
        public abstract DateTime LastWriteTimeUtc { get; set; }



        /// <summary>
        /// </summary>
        public abstract void GetObjectData(SerializationInfo info, StreamingContext context);



        /// <summary>
        /// </summary>
        public abstract void Refresh();
    }
}
