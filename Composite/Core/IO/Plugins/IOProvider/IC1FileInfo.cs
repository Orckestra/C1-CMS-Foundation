using System;
using System.IO;
using System.Runtime.Serialization;


namespace Composite.Core.IO.Plugins.IOProvider
{
    /// <summary>
    /// Implementations of this interface is used by C1 through <see cref="IIOProvider"/> 
    /// to provide the behavior of <see cref="Composite.Core.IO.C1FileInfo"/>.
    /// See <see cref="Composite.Core.IO.C1FileInfo"/> for more information.
    /// </summary>
    public interface IC1FileInfo
    {
        /// <summary>
        /// Returns the directory name of the file.
        /// </summary>
        string DirectoryName { get; }


        /// <summary>
        /// Returns a <see cref="C1DirectoryInfo"/> of the file.
        /// </summary>
        C1DirectoryInfo Directory { get; }


        /// <summary>
        /// Returns the name of the file.
        /// </summary>
        string Name { get; }


        /// <summary>
        /// Returns the full path and name of the file.
        /// </summary>
        string FullName { get; }


        /// <summary>
        /// Returns true if the file exists. Otherwise false.
        /// </summary>
        bool Exists { get; }


        /// <summary>
        /// Returns the extension of the file.
        /// </summary>
        string Extension { get; }


        /// <summary>
        /// Returns true if and only if the file is read only.
        /// </summary>
        bool IsReadOnly { get; set; }


        /// <summary>
        /// Returns the size of the file in bytes.
        /// </summary>
        long Length { get; }


        /// <summary>
        /// Gets or sets the file attributes on the file.
        /// </summary>
        FileAttributes Attributes { get; set; }


        /// <summary>
        /// Creates a file stream <see cref="C1FileStream"/>.
        /// </summary>
        /// <returns>Returns a newly created <see cref="C1FileStream"/>.</returns>
        C1FileStream Create();


        /// <summary>
        /// Creates a file stream <see cref="C1StreamWriter"/>.
        /// </summary>
        /// <returns>Returns a newly created <see cref="C1StreamWriter"/>.</returns>
        C1StreamWriter CreateText();


        /// <summary>
        /// Creates a file stream <see cref="C1StreamWriter"/> for appending.
        /// </summary>
        /// <returns>Returns a newly created <see cref="C1StreamWriter"/> for appending.</returns>
        C1StreamWriter AppendText();


        /// <summary>
        /// Creates a file stream <see cref="C1FileStream"/>.
        /// </summary>
        /// <param name="mode">File mode to use.</param>
        /// <returns>Returns a newly created <see cref="C1FileStream"/>.</returns>
        C1FileStream Open(FileMode mode);


        /// <summary>
        /// Creates a file stream <see cref="C1FileStream"/>.
        /// </summary>
        /// <param name="mode">File mode to use.</param>
        /// <param name="access">File access to use.</param>
        /// <returns>Returns a newly created <see cref="C1FileStream"/>.</returns>
        C1FileStream Open(FileMode mode, FileAccess access);


        /// <summary>
        /// Creates a file stream <see cref="C1FileStream"/>.
        /// </summary>
        /// <param name="mode">File mode to use.</param>
        /// <param name="access">File access to use.</param>
        /// <param name="share">File share to use.</param>
        /// <returns>Returns a newly created <see cref="C1FileStream"/>.</returns>
        C1FileStream Open(FileMode mode, FileAccess access, FileShare share);


        /// <summary>
        /// Creates a file stream <see cref="C1FileStream"/>.
        /// </summary>
        /// <returns>Returns a newly created <see cref="C1FileStream"/> for reading.</returns>
        C1FileStream OpenRead();


        /// <summary>
        /// Creates a file stream <see cref="C1StreamReader"/>.
        /// </summary>
        /// <returns>Returns a newly created <see cref="C1StreamReader"/>.</returns>
        C1StreamReader OpenText();


        /// <summary>
        /// Creates a file stream <see cref="C1FileStream"/>.
        /// </summary>
        /// <returns>Returns a newly created <see cref="C1FileStream"/> for writing.</returns>
        C1FileStream OpenWrite();


        /// <summary>
        /// Copies the file to the given path.
        /// </summary>
        /// <param name="destFileName">Destination path.</param>
        /// <returns>A new <see cref="C1FileInfo"/> for the destination file.</returns>
        C1FileInfo CopyTo(string destFileName);


        /// <summary>
        /// Copies the file to the given path and overwrites any existing file if specified.
        /// </summary>
        /// <param name="destFileName">Destination path.</param>
        /// <param name="overwrite">If true, any existing file will be overwritten.</param>
        /// <returns>A new <see cref="C1FileInfo"/> for the destination file.</returns>
        C1FileInfo CopyTo(string destFileName, bool overwrite);


        /// <summary>
        /// Moves the file to the given path.
        /// </summary>
        /// <param name="destFileName">Destination path.</param>
        void MoveTo(string destFileName);


        /// <summary>
        /// Replaces the given file with this one.
        /// </summary>
        /// <param name="destinationFileName">Destination path to file to replace.</param>
        /// <param name="destinationBackupFileName">Path to backup file.</param>
        /// <returns>A new <see cref="C1FileInfo"/> for the destination file.</returns>
        C1FileInfo Replace(string destinationFileName, string destinationBackupFileName);


        /// <summary>
        /// Replaces the given file with this one.
        /// </summary>
        /// <param name="destinationFileName">Destination path to file to replace.</param>
        /// <param name="destinationBackupFileName">Path to backup file.</param>
        /// <param name="ignoreMetadataErrors"></param>
        /// <returns>A new <see cref="C1FileInfo"/> for the destination file.</returns>
        C1FileInfo Replace(string destinationFileName, string destinationBackupFileName, bool ignoreMetadataErrors);


        /// <summary>
        /// Deletes the file.
        /// </summary>
        void Delete();


        /// <summary>
        /// Gets or sets the creation time of the file.
        /// </summary>
        DateTime CreationTime { get; set; }


        /// <summary>
        /// Gets or sets the creation utc time of the file.
        /// </summary>
        DateTime CreationTimeUtc { get; set; }


        /// <summary>
        /// Gets or sets the last access time of the file.
        /// </summary>
        DateTime LastAccessTime { get; set; }


        /// <summary>
        /// Gets or sets the last access utc time of the file.
        /// </summary>
        DateTime LastAccessTimeUtc { get; set; }


        /// <summary>
        /// Gets or sets the last write time of the file.
        /// </summary>
        DateTime LastWriteTime { get; set; }


        /// <summary>
        /// Gets or sets the last write utc time of the file.
        /// </summary>
        DateTime LastWriteTimeUtc { get; set; }


        /// <summary>
        /// </summary>
        void Refresh();


        /// <summary>
        /// </summary>
        /// <param name="info"></param>
        /// <param name="context"></param>
        void GetObjectData(SerializationInfo info, StreamingContext context);
    }
}
