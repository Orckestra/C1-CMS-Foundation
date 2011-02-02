using System;
using System.IO;
using System.Runtime.Serialization;


namespace Composite.Core.IO.Plugins.IOProvider
{
    /// <summary>
    /// IOLayer - documentation pending
    /// </summary>
    public interface IC1FileInfo
    {
        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        string DirectoryName { get; }


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        C1DirectoryInfo Directory { get; }

        string Name { get; }


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        string FullName { get; }


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        bool Exists { get; }


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        string Extension { get; }


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        bool IsReadOnly { get; set; }


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        long Length { get; }


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        FileAttributes Attributes { get; set; }


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <returns></returns>
        C1FileStream Create();


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <returns></returns>
        C1StreamWriter CreateText();


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <returns></returns>
        C1StreamWriter AppendText();


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="mode"></param>
        /// <returns></returns>
        C1FileStream Open(FileMode mode);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="mode"></param>
        /// <param name="access"></param>
        /// <returns></returns>
        C1FileStream Open(FileMode mode, FileAccess access);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="mode"></param>
        /// <param name="access"></param>
        /// <param name="share"></param>
        /// <returns></returns>
        C1FileStream Open(FileMode mode, FileAccess access, FileShare share);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <returns></returns>
        C1FileStream OpenRead();


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <returns></returns>
        C1StreamReader OpenText();


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <returns></returns>
        C1FileStream OpenWrite();


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="destFileName"></param>
        /// <returns></returns>
        C1FileInfo CopyTo(string destFileName);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="destFileName"></param>
        /// <param name="overwrite"></param>
        /// <returns></returns>
        C1FileInfo CopyTo(string destFileName, bool overwrite);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="destFileName"></param>
        void MoveTo(string destFileName);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="destinationFileName"></param>
        /// <param name="destinationBackupFileName"></param>
        /// <returns></returns>
        C1FileInfo Replace(string destinationFileName, string destinationBackupFileName);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="destinationFileName"></param>
        /// <param name="destinationBackupFileName"></param>
        /// <param name="ignoreMetadataErrors"></param>
        /// <returns></returns>
        C1FileInfo Replace(string destinationFileName, string destinationBackupFileName, bool ignoreMetadataErrors);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        void Delete();


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        void Refresh();


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="info"></param>
        /// <param name="context"></param>
        void GetObjectData(SerializationInfo info, StreamingContext context);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        DateTime CreationTime { get; set; }


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        DateTime CreationTimeUtc { get; set; }


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        DateTime LastAccessTime { get; set; }


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        DateTime LastAccessTimeUtc { get; set; }


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        DateTime LastWriteTime { get; set; }


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        DateTime LastWriteTimeUtc { get; set; }
    }
}
