using System;
using System.IO;


namespace Composite.Core.IO.Plugins.IOProvider
{
    /// <summary>
    /// Implementations of this interface is used by C1 through <see cref="IIOProvider"/> 
    /// to provide the behavior of <see cref="Composite.Core.IO.C1Directory"/>.
    /// See <see cref="Composite.Core.IO.C1Directory"/> for more information.
    /// </summary>
    public interface IC1Directory
    {
        /// <summary>
        /// Creates a directory.
        /// </summary>
        /// <param name="path">Path to directory to create.</param>
        /// <returns>Returns a C1DirectoryInfo to the specified path.</returns>
        C1DirectoryInfo CreateDirectory(string path);


        /// <summary>
        /// Deletes an empty directory on the given path.
        /// </summary>
        /// <param name="path">Path of empty directory to delete.</param>
        void Delete(string path);


        /// <summary>
        /// Deletes the directory and if specified subdirectories and file on the given path.
        /// </summary>
        /// <param name="path">Path of directory to delete.</param>
        /// <param name="recursive">Include subdirectories and files.</param>
        void Delete(string path, bool recursive);


        /// <summary>
        /// Moves a file or directory from the given source path to the given destination path.
        /// </summary>
        /// <param name="sourceDirName">Path of file or directory to move.</param>
        /// <param name="destDirName">Target path of file or directory to be moved to.</param>
        void Move(string sourceDirName, string destDirName);


        /// <summary>
        /// Determines if the directory in the given path exists or not.
        /// </summary>
        /// <param name="path">Path to directory to test.</param>
        /// <returns></returns>
        bool Exists(string path);


        /// <summary>
        /// Returns the current directory.
        /// </summary>
        /// <returns>The current directory.</returns>
        string GetCurrentDirectory();


        /// <summary>
        /// Sets the current directory
        /// </summary>
        /// <param name="path">Path to new current directory.</param>
        void SetCurrentDirectory(string path);


        /// <summary>
        /// Gets the parent of the given directory.
        /// </summary>
        /// <param name="path">Path of directory to get parent of.</param>
        /// <returns>The parent of the given directory.</returns>
        C1DirectoryInfo GetParent(string path);


        /// <summary>
        /// Returns volume and/or root information of the given directory.
        /// </summary>
        /// <param name="path">Path of directory to get root information of.</param>
        /// <returns>Volume and/or root information.</returns>
        string GetDirectoryRoot(string path);


        /// <summary>
        /// Gets the subdirectories of the given directory.
        /// </summary>
        /// <param name="path">Path to directory to get subdirectories.</param>
        /// <returns>Subdirectories of the given directory.</returns>
        string[] GetDirectories(string path);


        /// <summary>
        /// Gets the subdirectories of the given directory with the given search pattern.
        /// </summary>
        /// <param name="path">Path to directory to get subdirectories.</param>
        /// <param name="searchPattern">Search pattern to use.</param>
        /// <returns>Subdirectories of the given directory with the given search parrern.</returns>
        string[] GetDirectories(string path, string searchPattern);


        /// <summary>
        /// Gets the subdirectories of the given directory with the given search pattern and options.
        /// </summary>
        /// <param name="path">Path to directory to get subdirectories.</param>
        /// <param name="searchPattern">Search pattern to use.</param>
        /// <param name="searchOption">Search options to use.</param>
        /// <returns>Subdirectories of the given directory with the given search parrern and options.</returns>
        string[] GetDirectories(string path, string searchPattern, SearchOption searchOption);


        /// <summary>
        /// Gets the files in the given directory.
        /// </summary>
        /// <param name="path">Path to directory go get files from.</param>
        /// <returns>Files in the given directory.</returns>
        string[] GetFiles(string path);


        /// <summary>
        /// Gets the files in the given directory with the given search pattern.
        /// </summary>
        /// <param name="path">Path to directory go get files from.</param>
        /// <param name="searchPattern">Search pattern to use.</param>
        /// <returns>Files in the given directory with the given search pattern.</returns>
        string[] GetFiles(string path, string searchPattern);


        /// <summary>
        /// Gets the files in the given directory with the given search pattern and options.
        /// </summary>
        /// <param name="path">Path to directory go get files from.</param>
        /// <param name="searchPattern">Search pattern to use.</param>
        /// <param name="searchOption">Search options to use.</param>
        /// <returns>Files in the given directory with the given search pattern and options.</returns>
        string[] GetFiles(string path, string searchPattern, SearchOption searchOption);


        /// <summary>
        /// Returns the creation date and time of the given directory.
        /// </summary>
        /// <param name="path">Path of directory.</param>
        /// <returns>Creation date and time of the given directory.</returns>
        DateTime GetCreationTime(string path);


        /// <summary>
        /// Returns the creation date and utc time of the given directory.
        /// </summary>
        /// <param name="path">Path of directory.</param>
        /// <returns>Creation date and time of the given directory.</returns>
        DateTime GetCreationTimeUtc(string path);

        /// <summary>
        /// Sets the creation date and time for the specified file or directory.
        /// </summary>
        /// <param name="path">The file or directory for which to set the creation date and time information. </param>
        /// <param name="creationTime">An object that contains the value to set for the creation date and time of path. This value is expressed in local time. </param>
        void SetCreationTime(string path, DateTime creationTime);

        /// <summary>
        /// Sets the creation date and time, in Coordinated Universal Time (UTC) format, for the specified file or directory.
        /// </summary>
        /// <param name="path">The file or directory for which to set the creation date and time information.</param>
        /// <param name="creationTimeUtc">An object that contains the value to set for the creation date and time of path. This value is expressed in UTC time.</param>
        void SetCreationTimeUtc(string path, DateTime creationTimeUtc);
    }
}