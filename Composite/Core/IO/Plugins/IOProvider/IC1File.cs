using System;
using System.Collections.Generic;
using System.IO;
using System.Text;


namespace Composite.Core.IO.Plugins.IOProvider
{
    /// <summary>
    /// Implementations of this interface is used by C1 through <see cref="IIOProvider"/> 
    /// to provide the behavior of <see cref="Composite.Core.IO.C1File"/>.
    /// See <see cref="Composite.Core.IO.C1File"/> for more information.
    /// </summary>
    public interface IC1File
    {
        /// <summary>
        /// Determins if the given file exists or not.
        /// </summary>
        /// <param name="path">Path to the file.</param>
        /// <returns>Returns true if the file exists, false if not.</returns>
        bool Exists(string path);


        /// <summary>
        /// This is not a port of the System.IO.File. This method can be used to 'touch' an
        /// existing file. This is a way of telling the C1 IO system that the file has been 
        /// touched and C1 uses this to handle other than standard Windows deployments, like
        /// Windows Azure.
        /// </summary>
        /// <param name="path">Path to file to touch.</param>
        void Touch(string path);


        /// <summary>
        /// Copies a file.
        /// </summary>
        /// <param name="sourceFileName">Source path of file to copy.</param>
        /// <param name="destFileName">Target path of the file to be copied to.</param>
        void Copy(string sourceFileName, string destFileName);


        /// <summary>
        /// Copies a file.
        /// </summary>
        /// <param name="sourceFileName">Source path of file to copy.</param>
        /// <param name="destFileName">Target path of the file to be copied to.</param>
        /// <param name="overwrite">If this is true and the target path exists, it will be overwritten without any exceptions.</param>
        void Copy(string sourceFileName, string destFileName, bool overwrite);


        /// <summary>
        /// Moves a file.
        /// </summary>
        /// <param name="sourceFileName">Path of file to move.</param>
        /// <param name="destFileName">Destination path to move the file to.</param>
        void Move(string sourceFileName, string destFileName);


        /// <summary>
        /// Replace a file with another file.
        /// </summary>
        /// <param name="sourceFileName">Path to source file.</param>
        /// <param name="destinationFileName">Path to file to replace.</param>
        /// <param name="destinationBackupFileName"></param>
        void Replace(string sourceFileName, string destinationFileName, string destinationBackupFileName);


        /// <summary>
        /// Replace a file with another file.
        /// </summary>
        /// <param name="sourceFileName">Path to source file.</param>
        /// <param name="destinationFileName">Path to file to replace.</param>
        /// <param name="destinationBackupFileName"></param>
        /// <param name="ignoreMetadataErrors"></param>
        void Replace(string sourceFileName, string destinationFileName, string destinationBackupFileName, bool ignoreMetadataErrors);


        /// <summary>
        /// Deletes the given file.
        /// </summary>
        /// <param name="path">Path to file to delete.</param>
        void Delete(string path);


        /// <summary>
        /// Creates a new file and returns a file stream to it <see cref="C1FileStream"/>.
        /// </summary>
        /// <param name="path">Path to file to create.</param>
        /// <returns>Returns the newly created <see cref="C1FileStream"/> stream.</returns>
        C1FileStream Create(string path);


        /// <summary>
        /// Creates a new file and returns a file stream to it <see cref="C1FileStream"/>.
        /// </summary>
        /// <param name="path">Path to file to create.</param>
        /// <param name="bufferSize">Buffer size of returned stream.</param>
        /// <returns>Returns the newly created <see cref="C1FileStream"/> stream.</returns>
        C1FileStream Create(string path, int bufferSize);


        /// <summary>
        /// Creates a new file and returns a file stream to it <see cref="C1FileStream"/>.
        /// </summary>
        /// <param name="path">Path to file to create.</param>
        /// <param name="bufferSize">Buffer size of returned stream.</param>
        /// <param name="options">File options of returned stream.</param>
        /// <returns>Returns the newly created <see cref="C1FileStream"/> stream.</returns>
        C1FileStream Create(string path, int bufferSize, FileOptions options);


        /// <summary>
        /// Creates a new file and returns a stream writer to it <see cref="C1StreamWriter"/>.
        /// </summary>
        /// <param name="path">Path to file to create.</param>
        /// <returns>Returns the newly created <see cref="C1StreamWriter"/>.</returns>
        C1StreamWriter CreateText(string path);


        /// <summary>
        /// Opens a <see cref="C1StreamWriter"/> for appending.
        /// </summary>
        /// <param name="path">Path to file to append to.</param>
        /// <returns>Returns the newly opned <see cref="C1StreamWriter"/>.</returns>
        C1StreamWriter AppendText(string path);


        /// <summary>
        /// Appends content to a file.
        /// </summary>
        /// <param name="path">Path to file to append to.</param>
        /// <param name="contents">Content to append to file.</param>        
        void AppendAllText(string path, string contents);


        /// <summary>
        /// Appends content to a file.
        /// </summary>
        /// <param name="path">Path to file to append to.</param>
        /// <param name="contents">Content to append to file.</param>        
        /// <param name="encoding">Encoding to use when appending.</param>
        void AppendAllText(string path, string contents, Encoding encoding);


        /// <summary>
        /// Appends content to a file.
        /// </summary>
        /// <param name="path">Path to file to append to.</param>
        /// <param name="contents">Content to append to file.</param>
        void AppendAllLines(string path, IEnumerable<string> contents);


        /// <summary>
        /// Appends content to a file.
        /// </summary>
        /// <param name="path">Path to file to append to.</param>
        /// <param name="contents">Content to append to file.</param>        
        /// <param name="encoding">Encoding to use when appending.</param>
        void AppendAllLines(string path, IEnumerable<string> contents, Encoding encoding);


        /// <summary>
        /// Opens a file.
        /// </summary>
        /// <param name="path">Path to file to open.</param>
        /// <param name="mode">File mode to use.</param>
        /// <returns>Returns the newly opened <see cref="C1FileStream"/>.</returns>
        C1FileStream Open(string path, FileMode mode);


        /// <summary>
        /// Opens a file.
        /// </summary>
        /// <param name="path">Path to file to open.</param>
        /// <param name="mode">File mode to use.</param>
        /// <param name="access">File access to use.</param>
        /// <returns>Returns the newly opened <see cref="C1FileStream"/>.</returns>
        C1FileStream Open(string path, FileMode mode, FileAccess access);


        /// <summary>
        /// Opens a file.
        /// </summary>
        /// <param name="path">Path to file to open.</param>
        /// <param name="mode">File mode to use.</param>
        /// <param name="access">File access to use.</param>
        /// <param name="share">File share to use.</param>
        /// <returns>Returns the newly opened <see cref="C1FileStream"/>.</returns>
        C1FileStream Open(string path, FileMode mode, FileAccess access, FileShare share);


        /// <summary>
        /// Opens a file for reading.
        /// </summary>
        /// <param name="path">Path to file to open.</param>
        /// <returns>Returns the newly opened <see cref="C1FileStream"/>.</returns>
        C1FileStream OpenRead(string path);


        /// <summary>
        /// Opens a file.
        /// </summary>
        /// <param name="path">Path to file to open.</param>
        /// <returns>Returns the newly opened <see cref="C1StreamReader"/>.</returns>
        C1StreamReader OpenText(string path);


        /// <summary>
        /// Opens a file for writing.
        /// </summary>
        /// <param name="path">Path to file to open.</param>
        /// <returns>Returns the newly opened <see cref="C1FileStream"/>.</returns>
        C1FileStream OpenWrite(string path);


        /// <summary>
        /// Read all bytes from a file.
        /// </summary>
        /// <param name="path">Path to file to read from.</param>
        /// <returns>Returns read bytes.</returns>
        byte[] ReadAllBytes(string path);


        /// <summary>
        /// Read all lines from a file.
        /// </summary>
        /// <param name="path">Path to file to read from.</param>
        /// <returns>Returns read lines.</returns>
        string[] ReadAllLines(string path);


        /// <summary>
        /// Read all lines from a file.
        /// </summary>
        /// <param name="path">Path to file to read from.</param>
        /// <param name="encoding">Encoding to use when reading.</param>
        /// <returns>Returns read lines.</returns>
        string[] ReadAllLines(string path, Encoding encoding);


        /// <summary>
        /// Read all text from a file.
        /// </summary>
        /// <param name="path">Path to file to read from.</param>
        /// <returns>The content of the file.</returns>
        string ReadAllText(string path);


        /// <summary>
        /// Read all text from a file.
        /// </summary>
        /// <param name="path">Path to file to read from.</param>
        /// <param name="encoding">Encoding to use when reading.</param>
        /// <returns>The content of the file.</returns>
        string ReadAllText(string path, Encoding encoding);


        /// <summary>
        /// Read all lines from a file.
        /// </summary>
        /// <param name="path">Path to file to read from.</param>
        /// <returns>Returns all read lines.</returns>
        IEnumerable<string> ReadLines(string path);


        /// <summary>
        /// Read all lines from a file.
        /// </summary>
        /// <param name="path">Path to file to read from.</param>
        /// <param name="encoding">Encoding to use when reading.</param>
        /// <returns>Returns all read lines.</returns>
        IEnumerable<string> ReadLines(string path, Encoding encoding);


        /// <summary>
        /// Writes bytes to a file.
        /// </summary>
        /// <param name="path">Path to file to write to.</param>
        /// <param name="bytes">Bytes to write.</param>
        void WriteAllBytes(string path, byte[] bytes);


        /// <summary>
        /// Writes lines to a file.
        /// </summary>
        /// <param name="path">Path to file to write to.</param>
        /// <param name="contents">Lines to write.</param>
        void WriteAllLines(string path, IEnumerable<string> contents);


        /// <summary>
        /// Writes lines to a file.
        /// </summary>
        /// <param name="path">Path to file to write to.</param>
        /// <param name="contents">Lines to write.</param>
        /// <param name="encoding">Encoding to use when writing.</param>
        void WriteAllLines(string path, IEnumerable<string> contents, Encoding encoding);


        /// <summary>
        /// Writes lines to a file.
        /// </summary>
        /// <param name="path">Path to file to write to.</param>
        /// <param name="contents">Lines to write.</param>
        void WriteAllLines(string path, string[] contents);


        /// <summary>
        /// Writes lines to a file.
        /// </summary>
        /// <param name="path">Path to file to write to.</param>
        /// <param name="contents">Lines to write.</param>
        /// <param name="encoding">Encoding to use when writing.</param>
        void WriteAllLines(string path, string[] contents, Encoding encoding);


        /// <summary>
        /// Writes text to a file.
        /// </summary>
        /// <param name="path">Path to file to write to.</param>
        /// <param name="contents">Text to write.</param>
        void WriteAllText(string path, string contents);


        /// <summary>
        /// Writes text to a file.
        /// </summary>
        /// <param name="path">Path to file to write to.</param>
        /// <param name="contents">Text to write.</param>
        /// <param name="encoding">Encoding to use when writing.</param>
        void WriteAllText(string path, string contents, Encoding encoding);


        /// <summary>
        /// Gets the file attributes.
        /// </summary>
        /// <param name="path">Path to file to get attributes from.</param>
        /// <returns>Returns the file attributes. See System.IO.FileAttributes</returns>
        FileAttributes GetAttributes(string path);


        /// <summary>
        /// Sets the file attributes.
        /// </summary>
        /// <param name="path">Path to file to set attributes on.</param>
        /// <param name="fileAttributes">File attributes to set.</param>
        void SetAttributes(string path, FileAttributes fileAttributes);


        /// <summary>
        /// Gets the creation time of the file.
        /// </summary>
        /// <param name="path">Path to file.</param>
        /// <returns>Returns the creation time of the given file.</returns>
        DateTime GetCreationTime(string path);


        /// <summary>
        /// Gets the creation utc time of the file.
        /// </summary>
        /// <param name="path">Path to file.</param>
        /// <returns>Returns the creation utc time of the given file.</returns>
        DateTime GetCreationTimeUtc(string path);


        /// <summary>
        /// Sets the creation time of the file.
        /// </summary>
        /// <param name="path">Path to file.</param>
        /// <param name="creationTime">New creation time.</param>
        void SetCreationTime(string path, DateTime creationTime);


        /// <summary>
        /// Sets the creation utc time of the file.
        /// </summary>
        /// <param name="path">Path to file.</param>
        /// <param name="creationTimeUtc">New creation utc time.</param>
        void SetCreationTimeUtc(string path, DateTime creationTimeUtc);


        /// <summary>
        /// Gets the last access time.
        /// </summary>
        /// <param name="path">Path to file.</param>
        /// <returns>Returns the last access time of the file.</returns>
        DateTime GetLastAccessTime(string path);


        /// <summary>
        /// Gets the last access utc time.
        /// </summary>
        /// <param name="path">Path to file.</param>
        /// <returns>Returns the last access utc time of the file.</returns>
        DateTime GetLastAccessTimeUtc(string path);


        /// <summary>
        /// Sets the last access time of the file.
        /// </summary>
        /// <param name="path">Path to file.</param>
        /// <param name="lastAccessTime">New last access time.</param>
        void SetLastAccessTime(string path, DateTime lastAccessTime);


        /// <summary>
        /// Sets the last access utc time of the file.
        /// </summary>
        /// <param name="path">Path to file.</param>
        /// <param name="lastAccessTimeUtc">New last access utc time.</param>
        void SetLastAccessTimeUtc(string path, DateTime lastAccessTimeUtc);


        /// <summary>
        /// Get last write time of the file.
        /// </summary>
        /// <param name="path">Path to file.</param>
        /// <returns>Returns the last write time of the file.</returns>
        DateTime GetLastWriteTime(string path);


        /// <summary>
        /// Get last write utc time of the file.
        /// </summary>
        /// <param name="path">Path to file.</param>
        /// <returns>Returns the last write utc time of the file.</returns>
        DateTime GetLastWriteTimeUtc(string path);


        /// <summary>
        /// Sets the last write time of the file.
        /// </summary>
        /// <param name="path">Path to file.</param>
        /// <param name="lastWriteTime">New last write time.</param>
        void SetLastWriteTime(string path, DateTime lastWriteTime);


        /// <summary>
        /// Sets the last write utc time of the file.
        /// </summary>
        /// <param name="path">Path to file.</param>
        /// <param name="lastWriteTimeUtc">New last write utc time.</param>
        void SetLastWriteTimeUtc(string path, DateTime lastWriteTimeUtc);

        /// <summary>
        /// Gets a FileSecurity object that encapsulates the access control list (ACL) entries for the file described by the current FileInfo object.
        /// </summary>
        /// <param name="path">Path to file.</param>
        System.Security.AccessControl.FileSecurity GetAccessControl(string path);
    }
}
