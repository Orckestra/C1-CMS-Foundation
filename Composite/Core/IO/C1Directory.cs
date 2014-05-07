using System;
using System.IO;
using Composite.Core.Implementation;


namespace Composite.Core.IO
{
    /// <summary>
    /// This class is a almost one to one version of System.IO.Directory. Using this implementation instead 
    /// of System.IO.Directory, will ensure that your code will work both on Standard Windows deployment 
    /// and Windows Azure deployment.
    /// See System.IO.Directory for more documentation on the methods of this class.
    /// See <see cref="Composite.Core.IO.Plugins.IOProvider.IC1Directory"/>.
    /// </summary>
    public static class C1Directory
    {
        /// <summary>
        /// Creates a directory.
        /// </summary>
        /// <param name="path">Path to directory to create.</param>
        /// <returns>Returns a C1DirectoryInfo to the specified path.</returns>
        public static C1DirectoryInfo CreateDirectory(string path)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1Directory.CreateDirectory(path);
        }



        /// <summary>
        /// Moves a file or directory from the given source path to the given destination path.
        /// </summary>
        /// <param name="sourceDirName">Path of file or directory to move.</param>
        /// <param name="destDirName">Target path of file or directory to be moved to.</param>
        public static void Move(string sourceDirName, string destDirName)
        {
            ImplementationFactory.CurrentFactory.StatelessC1Directory.Move(sourceDirName, destDirName);
        }



        /// <summary>
        /// Deletes an empty directory on the given path.
        /// </summary>
        /// <param name="path">Path of empty directory to delete.</param>
        public static void Delete(string path)
        {
            ImplementationFactory.CurrentFactory.StatelessC1Directory.Delete(path);
        }



        /// <summary>
        /// Deletes the directory and if specified subdirectories and file on the given path.
        /// </summary>
        /// <param name="path">Path of directory to delete.</param>
        /// <param name="recursive">Include subdirectories and files.</param>
        public static void Delete(string path, bool recursive)
        {
            ImplementationFactory.CurrentFactory.StatelessC1Directory.Delete(path, recursive);
        }



        /// <summary>
        /// Determines if the directory in the given path exists or not.
        /// </summary>
        /// <param name="path">Path to directory to test.</param>
        /// <returns></returns>
        public static bool Exists(string path)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1Directory.Exists(path);
        }



        /// <summary>
        /// Returns the current directory.
        /// </summary>
        /// <returns>The current directory.</returns>
        public static string GetCurrentDirectory()
        {
            return ImplementationFactory.CurrentFactory.StatelessC1Directory.GetCurrentDirectory();
        }



        /// <summary>
        /// Sets the current directory
        /// </summary>
        /// <param name="path">Path to new current directory.</param>
        public static void SetCurrentDirectory(string path)
        {
            ImplementationFactory.CurrentFactory.StatelessC1Directory.SetCurrentDirectory(path);
        }



        /// <summary>
        /// Gets the parent of the given directory.
        /// </summary>
        /// <param name="path">Path of directory to get parent of.</param>
        /// <returns>The parent of the given directory.</returns>
        public static C1DirectoryInfo GetParent(string path)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1Directory.GetParent(path);
        }



        /// <summary>
        /// Returns volume and/or root information of the given directory.
        /// </summary>
        /// <param name="path">Path of directory to get root information of.</param>
        /// <returns>Volume and/or root information.</returns>
        public static string GetDirectoryRoot(string path)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1Directory.GetDirectoryRoot(path);
        }



        /// <summary>
        /// Gets the subdirectories of the given directory.
        /// </summary>
        /// <param name="path">Path to directory to get subdirectories.</param>
        /// <returns>Subdirectories of the given directory.</returns>
        public static string[] GetDirectories(string path)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1Directory.GetDirectories(path);
        }



        /// <summary>
        /// Gets the subdirectories of the given directory with the given search pattern.
        /// </summary>
        /// <param name="path">Path to directory to get subdirectories.</param>
        /// <param name="searchPattern">Search pattern to use.</param>
        /// <returns>Subdirectories of the given directory with the given search parrern.</returns>
        public static string[] GetDirectories(string path, string searchPattern)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1Directory.GetDirectories(path, searchPattern);
        }



        /// <summary>
        /// Gets the subdirectories of the given directory with the given search pattern and options.
        /// </summary>
        /// <param name="path">Path to directory to get subdirectories.</param>
        /// <param name="searchPattern">Search pattern to use.</param>
        /// <param name="searchOption">Search options to use.</param>
        /// <returns>Subdirectories of the given directory with the given search parrern and options.</returns>
        public static string[] GetDirectories(string path, string searchPattern, SearchOption searchOption)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1Directory.GetDirectories(path, searchPattern, searchOption);
        }



        /// <summary>
        /// Gets the files in the given directory.
        /// </summary>
        /// <param name="path">Path to directory go get files from.</param>
        /// <returns>Files in the given directory.</returns>
        public static string[] GetFiles(string path)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1Directory.GetFiles(path);
        }



        /// <summary>
        /// Gets the files in the given directory with the given search pattern.
        /// </summary>
        /// <param name="path">Path to directory go get files from.</param>
        /// <param name="searchPattern">Search pattern to use.</param>
        /// <returns>Files in the given directory with the given search pattern.</returns>
        public static string[] GetFiles(string path, string searchPattern)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1Directory.GetFiles(path, searchPattern);
        }



        /// <summary>
        /// Gets the files in the given directory with the given search pattern and options.
        /// </summary>
        /// <param name="path">Path to directory go get files from.</param>
        /// <param name="searchPattern">Search pattern to use.</param>
        /// <param name="searchOption">Search options to use.</param>
        /// <returns>Files in the given directory with the given search pattern and options.</returns>
        public static string[] GetFiles(string path, string searchPattern, SearchOption searchOption)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1Directory.GetFiles(path, searchPattern, searchOption);
        }



        /// <summary>
        /// Returns the creation date and time of the given directory.
        /// </summary>
        /// <param name="path">Path of directory.</param>
        /// <returns>Creation date and time of the given directory.</returns>
        public static DateTime GetCreationTime(string path)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1Directory.GetCreationTime(path);
        }



        /// <summary>
        /// Returns the creation date and utc time of the given directory.
        /// </summary>
        /// <param name="path">Path of directory.</param>
        /// <returns>Creation date and time of the given directory.</returns>
        public static DateTime GetCreationTimeUtc(string path)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1Directory.GetCreationTimeUtc(path);
        }



        //public static IEnumerable<string> EnumerateDirectories(string path)
        //{
        //    throw new NotImplementedException();
        //}



        //public static IEnumerable<string> EnumerateDirectories(string path, string searchPattern)
        //{
        //    throw new NotImplementedException();
        //}



        //public static IEnumerable<string> EnumerateDirectories(string path, string searchPattern, SearchOption searchOption)
        //{
        //    throw new NotImplementedException();
        //}



        //public static IEnumerable<string> EnumerateFiles(string path)
        //{
        //    throw new NotImplementedException();
        //}



        //public static IEnumerable<string> EnumerateFiles(string path, string searchPattern)
        //{
        //    throw new NotImplementedException();
        //}



        //public static IEnumerable<string> EnumerateFiles(string path, string searchPattern, SearchOption searchOption)
        //{
        //    throw new NotImplementedException();
        //}



        //public static IEnumerable<string> EnumerateFileSystemEntries(string path)
        //{
        //    throw new NotImplementedException();
        //}



        //public static IEnumerable<string> EnumerateFileSystemEntries(string path, string searchPattern)
        //{
        //    throw new NotImplementedException();
        //}



        //public static IEnumerable<string> EnumerateFileSystemEntries(string path, string searchPattern, SearchOption searchOption)
        //{
        //    throw new NotImplementedException();
        //}



        //public static string[] GetFileSystemEntries(string path)
        //{
        //    throw new NotImplementedException();
        //}



        //public static string[] GetFileSystemEntries(string path, string searchPattern)
        //{
        //    throw new NotImplementedException();
        //}



        //public static string[] GetFileSystemEntries(string path, string searchPattern, SearchOption searchOption)
        //{
        //    throw new NotImplementedException();
        //}



        //public static DirectorySecurity GetAccessControl(string path)
        //{
        //    throw new NotImplementedException();
        //}



        //public static DirectorySecurity GetAccessControl(string path, AccessControlSections includeSections)
        //{
        //    throw new NotImplementedException();
        //}



        //public static void SetAccessControl(string path, DirectorySecurity directorySecurity)
        //{
        //    throw new NotImplementedException();
        //}


        /// <summary>
        /// Sets the creation date and time for the specified file or directory.
        /// </summary>
        /// <param name="path">The file or directory for which to set the creation date and time information. </param>
        /// <param name="creationTime">An object that contains the value to set for the creation date and time of path. This value is expressed in local time. </param>
        public static void SetCreationTime(string path, DateTime creationTime)
        {
            ImplementationFactory.CurrentFactory.StatelessC1Directory.SetCreationTime(path, creationTime);
        }


        /// <summary>
        /// Sets the creation date and time, in Coordinated Universal Time (UTC) format, for the specified file or directory.
        /// </summary>
        /// <param name="path">The file or directory for which to set the creation date and time information.</param>
        /// <param name="creationTimeUtc">An object that contains the value to set for the creation date and time of path. This value is expressed in UTC time.</param>
        public static void SetCreationTimeUtc(string path, DateTime creationTimeUtc)
        {
            ImplementationFactory.CurrentFactory.StatelessC1Directory.SetCreationTimeUtc(path, creationTimeUtc);
        }



        //public static string[] GetLogicalDrives()
        //{ 
        //    throw new NotImplementedException(); 
        //}



        //public static DateTime GetLastAccessTime(string path)
        //{ 
        //    throw new NotImplementedException(); 
        //}



        //public static void SetLastAccessTime(string path, DateTime lastAccessTime)
        //{ 
        //    throw new NotImplementedException(); 
        //}



        //public static DateTime GetLastAccessTimeUtc(string path)
        //{ 
        //    throw new NotImplementedException(); 
        //}



        //public static void SetLastAccessTimeUtc(string path, DateTime lastAccessTimeUtc)
        //{ 
        //    throw new NotImplementedException(); 
        //}



        //public static DateTime GetLastWriteTime(string path)
        //{ 
        //    throw new NotImplementedException(); 
        //}



        //public static void SetLastWriteTime(string path, DateTime lastWriteTime)
        //{ 
        //    throw new NotImplementedException(); 
        //}



        //public static DateTime GetLastWriteTimeUtc(string path)
        //{ 
        //    throw new NotImplementedException(); 
        //}



        //public static void SetLastWriteTimeUtc(string path, DateTime lastWriteTimeUtc)
        //{ 
        //    throw new NotImplementedException(); 
        //}
    }
}
