using System;
using System.IO;
using System.Runtime.Serialization;


namespace Composite.Core.IO.Plugins.IOProvider
{
    /// <summary>
    /// Implementations of this interface is used by C1 through <see cref="IIOProvider"/> 
    /// to provide the behavior of <see cref="Composite.Core.IO.C1DirectoryInfo"/>.
    /// See <see cref="Composite.Core.IO.C1DirectoryInfo"/> for more information.
    /// </summary>
    public interface IC1DirectoryInfo
    {
        /// <summary>
        /// The name of the directory.
        /// </summary>
        string Name { get; }



        /// <summary>
        /// Full path of the directory.
        /// </summary>
        string FullName { get; }



        /// <summary>
        /// The extension of the directory.
        /// </summary>
        string Extension { get; }



        /// <summary>
        /// Tells if the directory exists or not.
        /// </summary>
        bool Exists { get; }



        /// <summary>
        /// The root directory of the directory.
        /// </summary>
        C1DirectoryInfo Root { get; }



        /// <summary>
        /// The parent directory of the directory.
        /// </summary>
        C1DirectoryInfo Parent { get; }



        /// <summary>
        /// File attributes of the directory.
        /// </summary>
        FileAttributes Attributes { get; set; }



        /// <summary>
        /// Returns the subdirectories of the directory.
        /// </summary>
        /// <returns>Subdirectories of the directory.</returns>
        C1DirectoryInfo[] GetDirectories();



        /// <summary>
        /// Returns the subdirectores of the directory given the search pattern.
        /// </summary>
        /// <param name="searchPattern">Search pattern to use.</param>
        /// <returns>Subdirectories of the directory.</returns>
        C1DirectoryInfo[] GetDirectories(string searchPattern);



        /// <summary>
        /// Returns the subdirectores of the directory given the search pattern and options.
        /// </summary>
        /// <param name="searchPattern">The search pattern to use.</param>
        /// <param name="searchOption">The search options to use.</param>
        /// <returns>Subdirectories of the directory.</returns>
        C1DirectoryInfo[] GetDirectories(string searchPattern, SearchOption searchOption);



        /// <summary>
        /// Returns the files in the directory.
        /// </summary>
        /// <returns>Files in the directory.</returns>
        C1FileInfo[] GetFiles();



        /// <summary>
        /// Returns the files in the directory given the search pattern.
        /// </summary>
        /// <param name="searchPattern">The search pattern to use.</param>
        /// <returns>Files in the directory given the search pattern.</returns>
        C1FileInfo[] GetFiles(string searchPattern);


        /// <summary>
        /// Returns the files in the directory given the search pattern and options.
        /// </summary>
        /// <param name="searchPattern">The search pattern to use.</param>
        /// <param name="searchOption">The search options to use.</param>
        /// <returns>Files in the directory given the search pattern and options.</returns>
        C1FileInfo[] GetFiles(string searchPattern, SearchOption searchOption);



        /// <summary>
        /// Creates the directory.
        /// </summary>
        void Create();


        /// <summary>
        /// Creates a subdirectory.
        /// </summary>
        /// <param name="path">Path to directory to create.</param>
        /// <returns></returns>
        C1DirectoryInfo CreateSubdirectory(string path);



        /// <summary>
        /// Moves the directory to the given path.
        /// </summary>
        /// <param name="destDirName">Destination directory name.</param>
        void MoveTo(string destDirName);



        /// <summary>
        /// Deletes the directory if empty.
        /// </summary>
        void Delete();



        /// <summary>
        /// Deletes the directory, files and subdirectories if specified.
        /// </summary>
        /// <param name="recursive">If true, a recursive delete will be performced.</param>
        void Delete(bool recursive);        



        /// <summary>
        /// The creation time of the directory.
        /// </summary>
        DateTime CreationTime { get; set; }



        /// <summary>
        /// The creation utc time of the directory.
        /// </summary>
        DateTime CreationTimeUtc { get; set; }



        /// <summary>
        /// Last access time of the directory.
        /// </summary>
        DateTime LastAccessTime { get; set; }



        /// <summary>
        /// Last access utc time of the directory.
        /// </summary>
        DateTime LastAccessTimeUtc { get; set; }



        /// <summary>
        /// Last write time of the directory.
        /// </summary>
        DateTime LastWriteTime { get; set; }



        /// <summary>
        /// Last write utc time of the directory.
        /// </summary>
        DateTime LastWriteTimeUtc { get; set; }



        /// <summary>
        /// </summary>
        void GetObjectData(SerializationInfo info, StreamingContext context);



        /// <summary>
        /// </summary>
        void Refresh();
    }
}
