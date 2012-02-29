using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using Composite.Core.Implementation;


namespace Composite.Core.IO
{
    /// <summary>
    /// This class is a almost one to one version of System.IO.File. Using this implementation instead 
    /// of System.IO.File, will ensure that your code will work both on Standard Windows deployment 
    /// and Windows Azure deployment.
    /// See System.IO.File for more documentation on the methods of this class.
    /// See <see cref="Composite.Core.IO.Plugins.IOProvider.IC1File"/>. 
    /// </summary>
    public static class C1File
    {
        /// <summary>
        /// Determins if the given file exists or not.
        /// </summary>
        /// <param name="path">Path to the file.</param>
        /// <returns>Returns true if the file exists, false if not.</returns>
        public static bool Exists(string path)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.Exists(path);
        }



        /// <summary>
        /// This is not a port of the System.IO.File. This method can be used to 'touch' an
        /// existing file. This is a way of telling the C1 IO system that the file has been 
        /// touched and C1 uses this to handle other than standard Windows deployments, like
        /// Windows Azure.
        /// </summary>
        /// <param name="path">Path to file to touch.</param>
        public static void Touch(string path)
        {
            ImplementationFactory.CurrentFactory.StatelessC1File.Touch(path);
        }


        /// <summary>
        /// Copies a file.
        /// </summary>
        /// <param name="sourceFileName">Source path of file to copy.</param>
        /// <param name="destFileName">Target path of the file to be copied to.</param>
        public static void Copy(string sourceFileName, string destFileName)
        {
            ImplementationFactory.CurrentFactory.StatelessC1File.Copy(sourceFileName, destFileName);
        }



        /// <summary>
        /// Copies a file.
        /// </summary>
        /// <param name="sourceFileName">Source path of file to copy.</param>
        /// <param name="destFileName">Target path of the file to be copied to.</param>
        /// <param name="overwrite">If this is true and the target path exists, it will be overwritten without any exceptions.</param>
        public static void Copy(string sourceFileName, string destFileName, bool overwrite)
        {
            ImplementationFactory.CurrentFactory.StatelessC1File.Copy(sourceFileName, destFileName, overwrite);
        }



        /// <summary>
        /// Moves a file.
        /// </summary>
        /// <param name="sourceFileName">Path of file to move.</param>
        /// <param name="destFileName">Destination path to move the file to.</param>
        public static void Move(string sourceFileName, string destFileName)
        {
            ImplementationFactory.CurrentFactory.StatelessC1File.Move(sourceFileName, destFileName);
        }



        /// <summary>
        /// Replace a file with another file.
        /// </summary>
        /// <param name="sourceFileName">Path to source file.</param>
        /// <param name="destinationFileName">Path to file to replace.</param>
        /// <param name="destinationBackupFileName"></param>
        public static void Replace(string sourceFileName, string destinationFileName, string destinationBackupFileName)
        {
            ImplementationFactory.CurrentFactory.StatelessC1File.Replace(sourceFileName, destinationFileName, destinationBackupFileName);
        }



        /// <summary>
        /// Replace a file with another file.
        /// </summary>
        /// <param name="sourceFileName">Path to source file.</param>
        /// <param name="destinationFileName">Path to file to replace.</param>
        /// <param name="destinationBackupFileName"></param>
        /// <param name="ignoreMetadataErrors"></param>
        public static void Replace(string sourceFileName, string destinationFileName, string destinationBackupFileName, bool ignoreMetadataErrors)
        {
            ImplementationFactory.CurrentFactory.StatelessC1File.Replace(sourceFileName, destinationFileName, destinationBackupFileName, ignoreMetadataErrors);
        }



        /// <summary>
        /// Deletes the given file.
        /// </summary>
        /// <param name="path">Path to file to delete.</param>
        public static void Delete(string path)
        {
            ImplementationFactory.CurrentFactory.StatelessC1File.Delete(path);
        }



        /// <summary>
        /// Creates a new file and returns a file stream to it <see cref="C1FileStream"/>.
        /// </summary>
        /// <param name="path">Path to file to create.</param>
        /// <returns>Returns the newly created <see cref="C1FileStream"/> stream.</returns>
        public static C1FileStream Create(string path)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.Create(path);
        }



        /// <summary>
        /// Creates a new file and returns a file stream to it <see cref="C1FileStream"/>.
        /// </summary>
        /// <param name="path">Path to file to create.</param>
        /// <param name="bufferSize">Buffer size of returned stream.</param>
        /// <returns>Returns the newly created <see cref="C1FileStream"/> stream.</returns>
        public static C1FileStream Create(string path, int bufferSize)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.Create(path, bufferSize);
        }



        /// <summary>
        /// Creates a new file and returns a file stream to it <see cref="C1FileStream"/>.
        /// </summary>
        /// <param name="path">Path to file to create.</param>
        /// <param name="bufferSize">Buffer size of returned stream.</param>
        /// <param name="options">File options of returned stream.</param>
        /// <returns>Returns the newly created <see cref="C1FileStream"/> stream.</returns>
        public static C1FileStream Create(string path, int bufferSize, FileOptions options)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.Create(path, bufferSize, options);
        }



        /// <summary>
        /// Creates a new file and returns a stream writer to it <see cref="C1StreamWriter"/>.
        /// </summary>
        /// <param name="path">Path to file to create.</param>
        /// <returns>Returns the newly created <see cref="C1StreamWriter"/>.</returns>
        public static C1StreamWriter CreateText(string path)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.CreateText(path);
        }



        /// <summary>
        /// Opens a <see cref="C1StreamWriter"/> for appending.
        /// </summary>
        /// <param name="path">Path to file to append to.</param>
        /// <returns>Returns the newly opned <see cref="C1StreamWriter"/>.</returns>
        public static C1StreamWriter AppendText(string path)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.AppendText(path);
        }



        /// <summary>
        /// Appends content to a file.
        /// </summary>
        /// <param name="path">Path to file to append to.</param>
        /// <param name="contents">Content to append to file.</param>        
        public static void AppendAllText(string path, string contents)
        {
            ImplementationFactory.CurrentFactory.StatelessC1File.AppendAllText(path, contents);
        }



        /// <summary>
        /// Appends content to a file.
        /// </summary>
        /// <param name="path">Path to file to append to.</param>
        /// <param name="contents">Content to append to file.</param>        
        /// <param name="encoding">Encoding to use when appending.</param>
        public static void AppendAllText(string path, string contents, Encoding encoding)
        {
            ImplementationFactory.CurrentFactory.StatelessC1File.AppendAllText(path, contents, encoding);
        }



        /// <summary>
        /// Appends content to a file.
        /// </summary>
        /// <param name="path">Path to file to append to.</param>
        /// <param name="contents">Content to append to file.</param>
        public static void AppendAllLines(string path, IEnumerable<string> contents)
        {
            ImplementationFactory.CurrentFactory.StatelessC1File.AppendAllLines(path, contents);
        }



        /// <summary>
        /// Appends content to a file.
        /// </summary>
        /// <param name="path">Path to file to append to.</param>
        /// <param name="contents">Content to append to file.</param>        
        /// <param name="encoding">Encoding to use when appending.</param>
        public static void AppendAllLines(string path, IEnumerable<string> contents, Encoding encoding)
        {
            ImplementationFactory.CurrentFactory.StatelessC1File.AppendAllLines(path, contents, encoding);
        }



        /// <summary>
        /// Opens a file.
        /// </summary>
        /// <param name="path">Path to file to open.</param>
        /// <param name="mode">File mode to use.</param>
        /// <returns>Returns the newly opened <see cref="C1FileStream"/>.</returns>
        public static C1FileStream Open(string path, FileMode mode)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.Open(path, mode);
        }



        /// <summary>
        /// Opens a file.
        /// </summary>
        /// <param name="path">Path to file to open.</param>
        /// <param name="mode">File mode to use.</param>
        /// <param name="access">File access to use.</param>
        /// <returns>Returns the newly opened <see cref="C1FileStream"/>.</returns>
        public static C1FileStream Open(string path, FileMode mode, FileAccess access)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.Open(path, mode, access);
        }



        /// <summary>
        /// Opens a file.
        /// </summary>
        /// <param name="path">Path to file to open.</param>
        /// <param name="mode">File mode to use.</param>
        /// <param name="access">File access to use.</param>
        /// <param name="share">File share to use.</param>
        /// <returns>Returns the newly opened <see cref="C1FileStream"/>.</returns>
        public static C1FileStream Open(string path, FileMode mode, FileAccess access, FileShare share)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.Open(path, mode, access, share);
        }



        /// <summary>
        /// Opens a file for reading.
        /// </summary>
        /// <param name="path">Path to file to open.</param>
        /// <returns>Returns the newly opened <see cref="C1FileStream"/>.</returns>
        public static C1FileStream OpenRead(string path)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.OpenRead(path);
        }



        /// <summary>
        /// Opens a file.
        /// </summary>
        /// <param name="path">Path to file to open.</param>
        /// <returns>Returns the newly opened <see cref="C1StreamReader"/>.</returns>
        public static C1StreamReader OpenText(string path)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.OpenText(path);
        }



        /// <summary>
        /// Opens a file for writing.
        /// </summary>
        /// <param name="path">Path to file to open.</param>
        /// <returns>Returns the newly opened <see cref="C1FileStream"/>.</returns>
        public static C1FileStream OpenWrite(string path)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.OpenWrite(path);
        }



        /// <summary>
        /// Read all bytes from a file.
        /// </summary>
        /// <param name="path">Path to file to read from.</param>
        /// <returns>Returns read bytes.</returns>
        public static byte[] ReadAllBytes(string path)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.ReadAllBytes(path);
        }



        /// <summary>
        /// Read all lines from a file.
        /// </summary>
        /// <param name="path">Path to file to read from.</param>
        /// <returns>Returns read lines.</returns>
        public static string[] ReadAllLines(string path)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.ReadAllLines(path);
        }



        /// <summary>
        /// Read all lines from a file.
        /// </summary>
        /// <param name="path">Path to file to read from.</param>
        /// <param name="encoding">Encoding to use when reading.</param>
        /// <returns>Returns read lines.</returns>
        public static string[] ReadAllLines(string path, Encoding encoding)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.ReadAllLines(path, encoding);
        }



        /// <summary>
        /// Read all text from a file.
        /// </summary>
        /// <param name="path">Path to file to read from.</param>
        /// <returns>The content of the file.</returns>
        public static string ReadAllText(string path)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.ReadAllText(path);
        }



        /// <summary>
        /// Read all text from a file.
        /// </summary>
        /// <param name="path">Path to file to read from.</param>
        /// <param name="encoding">Encoding to use when reading.</param>
        /// <returns>The content of the file.</returns>
        public static string ReadAllText(string path, Encoding encoding)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.ReadAllText(path, encoding);
        }



        /// <summary>
        /// Read all lines from a file.
        /// </summary>
        /// <param name="path">Path to file to read from.</param>
        /// <returns>Returns all read lines.</returns>
        public static IEnumerable<string> ReadLines(string path)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.ReadLines(path);
        }



        /// <summary>
        /// Read all lines from a file.
        /// </summary>
        /// <param name="path">Path to file to read from.</param>
        /// <param name="encoding">Encoding to use when reading.</param>
        /// <returns>Returns all read lines.</returns>
        public static IEnumerable<string> ReadLines(string path, Encoding encoding)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.ReadLines(path, encoding);
        }



        /// <summary>
        /// Writes bytes to a file.
        /// </summary>
        /// <param name="path">Path to file to write to.</param>
        /// <param name="bytes">Bytes to write.</param>
        public static void WriteAllBytes(string path, byte[] bytes)
        {
            ImplementationFactory.CurrentFactory.StatelessC1File.WriteAllBytes(path, bytes);
        }



        /// <summary>
        /// Writes lines to a file.
        /// </summary>
        /// <param name="path">Path to file to write to.</param>
        /// <param name="contents">Lines to write.</param>
        public static void WriteAllLines(string path, IEnumerable<string> contents)
        {
            ImplementationFactory.CurrentFactory.StatelessC1File.WriteAllLines(path, contents);
        }



        /// <summary>
        /// Writes lines to a file.
        /// </summary>
        /// <param name="path">Path to file to write to.</param>
        /// <param name="contents">Lines to write.</param>
        public static void WriteAllLines(string path, string[] contents)
        {
            ImplementationFactory.CurrentFactory.StatelessC1File.WriteAllLines(path, contents);
        }



        /// <summary>
        /// Writes lines to a file.
        /// </summary>
        /// <param name="path">Path to file to write to.</param>
        /// <param name="contents">Lines to write.</param>
        /// <param name="encoding">Encoding to use when writing.</param>
        public static void WriteAllLines(string path, IEnumerable<string> contents, Encoding encoding)
        {
            ImplementationFactory.CurrentFactory.StatelessC1File.WriteAllLines(path, contents, encoding);
        }



        /// <summary>
        /// Writes lines to a file.
        /// </summary>
        /// <param name="path">Path to file to write to.</param>
        /// <param name="contents">Lines to write.</param>
        /// <param name="encoding">Encoding to use when writing.</param>
        public static void WriteAllLines(string path, string[] contents, Encoding encoding)
        {
            ImplementationFactory.CurrentFactory.StatelessC1File.WriteAllLines(path, contents, encoding);
        }



        /// <summary>
        /// Writes text to a file.
        /// </summary>
        /// <param name="path">Path to file to write to.</param>
        /// <param name="contents">Text to write.</param>
        public static void WriteAllText(string path, string contents)
        {
            ImplementationFactory.CurrentFactory.StatelessC1File.WriteAllText(path, contents);
        }



        /// <summary>
        /// Writes text to a file.
        /// </summary>
        /// <param name="path">Path to file to write to.</param>
        /// <param name="contents">Text to write.</param>
        /// <param name="encoding">Encoding to use when writing.</param>
        public static void WriteAllText(string path, string contents, Encoding encoding)
        {
            ImplementationFactory.CurrentFactory.StatelessC1File.WriteAllText(path, contents, encoding);
        }



        /// <summary>
        /// Gets the file attributes.
        /// </summary>
        /// <param name="path">Path to file to get attributes from.</param>
        /// <returns>Returns the file attributes. See System.IO.FileAttributes</returns>
        public static FileAttributes GetAttributes(string path)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.GetAttributes(path);
        }



        /// <summary>
        /// Sets the file attributes.
        /// </summary>
        /// <param name="path">Path to file to set attributes on.</param>
        /// <param name="fileAttributes">File attributes to set.</param>
        public static void SetAttributes(string path, FileAttributes fileAttributes)
        {
            ImplementationFactory.CurrentFactory.StatelessC1File.SetAttributes(path, fileAttributes);
        }



        /// <summary>
        /// Gets the creation time of the file.
        /// </summary>
        /// <param name="path">Path to file.</param>
        /// <returns>Returns the creation time of the given file.</returns>
        public static DateTime GetCreationTime(string path)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.GetCreationTime(path);
        }



        /// <summary>
        /// Gets the creation utc time of the file.
        /// </summary>
        /// <param name="path">Path to file.</param>
        /// <returns>Returns the creation utc time of the given file.</returns>
        public static DateTime GetCreationTimeUtc(string path)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.GetCreationTimeUtc(path);
        }



        /// <summary>
        /// Sets the creation time of the file.
        /// </summary>
        /// <param name="path">Path to file.</param>
        /// <param name="creationTime">New creation time.</param>
        public static void SetCreationTime(string path, DateTime creationTime)
        {
            ImplementationFactory.CurrentFactory.StatelessC1File.SetCreationTime(path, creationTime);
        }



        /// <summary>
        /// Sets the creation utc time of the file.
        /// </summary>
        /// <param name="path">Path to file.</param>
        /// <param name="creationTimeUtc">New creation utc time.</param>
        public static void SetCreationTimeUtc(string path, DateTime creationTimeUtc)
        {
            ImplementationFactory.CurrentFactory.StatelessC1File.SetCreationTimeUtc(path, creationTimeUtc);
        }



        /// <summary>
        /// Gets the last access time.
        /// </summary>
        /// <param name="path">Path to file.</param>
        /// <returns>Returns the last access time of the file.</returns>
        public static DateTime GetLastAccessTime(string path)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.GetLastAccessTime(path);
        }



        /// <summary>
        /// Gets the last access utc time.
        /// </summary>
        /// <param name="path">Path to file.</param>
        /// <returns>Returns the last access utc time of the file.</returns>
        public static DateTime GetLastAccessTimeUtc(string path)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.GetLastAccessTimeUtc(path);
        }



        /// <summary>
        /// Sets the last access time of the file.
        /// </summary>
        /// <param name="path">Path to file.</param>
        /// <param name="lastAccessTime">New last access time.</param>
        public static void SetLastAccessTime(string path, DateTime lastAccessTime)
        {
            ImplementationFactory.CurrentFactory.StatelessC1File.SetLastAccessTime(path, lastAccessTime);
        }



        /// <summary>
        /// Sets the last access utc time of the file.
        /// </summary>
        /// <param name="path">Path to file.</param>
        /// <param name="lastAccessTimeUtc">New last access utc time.</param>
        public static void SetLastAccessTimeUtc(string path, DateTime lastAccessTimeUtc)
        {
            ImplementationFactory.CurrentFactory.StatelessC1File.SetLastAccessTimeUtc(path, lastAccessTimeUtc);
        }



        /// <summary>
        /// Get last write time of the file.
        /// </summary>
        /// <param name="path">Path to file.</param>
        /// <returns>Returns the last write time of the file.</returns>
        public static DateTime GetLastWriteTime(string path)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.GetLastWriteTime(path);
        }



        /// <summary>
        /// Get last write utc time of the file.
        /// </summary>
        /// <param name="path">Path to file.</param>
        /// <returns>Returns the last write utc time of the file.</returns>
        public static DateTime GetLastWriteTimeUtc(string path)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.GetLastWriteTimeUtc(path);
        }



        /// <summary>
        /// Sets the last write time of the file.
        /// </summary>
        /// <param name="path">Path to file.</param>
        /// <param name="lastWriteTime">New last write time.</param>
        public static void SetLastWriteTime(string path, DateTime lastWriteTime)
        {
            ImplementationFactory.CurrentFactory.StatelessC1File.SetLastWriteTime(path, lastWriteTime);
        }



        /// <summary>
        /// Sets the last write utc time of the file.
        /// </summary>
        /// <param name="path">Path to file.</param>
        /// <param name="lastWriteTimeUtc">New last write utc time.</param>
        public static void SetLastWriteTimeUtc(string path, DateTime lastWriteTimeUtc)
        {
            ImplementationFactory.CurrentFactory.StatelessC1File.SetLastWriteTimeUtc(path, lastWriteTimeUtc);
        }
        

        /// <summary>
        /// Gets a FileSecurity object that encapsulates the access control list (ACL) entries for the file described by the current FileInfo object.
        /// </summary>
        /// <param name="path">Path to file.</param>
        public static System.Security.AccessControl.FileSecurity GetAccessControl(string path)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.GetAccessControl(path);
        }


        //public static FileStream Create(string path, int bufferSize, System.IO.FileOptions options, System.Security.AccessControl.FileSecurity fileSecurity)
        //{ 
        //    throw new NotImplementedException(); 
        //}




        //public static void Encrypt(string path)
        //{ 
        //    throw new NotImplementedException(); 
        //}



        //public static void Decrypt(string path)
        //{ 
        //    throw new NotImplementedException(); 
        //}



        //public static System.Security.AccessControl.FileSecurity GetAccessControl(string path, System.Security.AccessControl.AccessControlSections includeSections)
        //{ 
        //    throw new NotImplementedException(); 
        //}



        //public static void SetAccessControl(string path, System.Security.AccessControl.FileSecurity fileSecurity)
        //{ 
        //    throw new NotImplementedException(); 
        //}
    }
}
