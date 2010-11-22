using System;
using System.Collections.Generic;
using System.IO;
using System.Text;


namespace Composite.Core.IO.Plugins.IOProvider
{
    /// <summary>
    /// IOLayer - documentation pending
    /// </summary>
    public interface IC1File
    {
        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        bool Exists(string path);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="sourceFileName"></param>
        /// <param name="destFileName"></param>
        void Copy(string sourceFileName, string destFileName);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="sourceFileName"></param>
        /// <param name="destFileName"></param>
        /// <param name="overwrite"></param>
        void Copy(string sourceFileName, string destFileName, bool overwrite);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="sourceFileName"></param>
        /// <param name="destFileName"></param>
        void Move(string sourceFileName, string destFileName);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="sourceFileName"></param>
        /// <param name="destinationFileName"></param>
        /// <param name="destinationBackupFileName"></param>
        void Replace(string sourceFileName, string destinationFileName, string destinationBackupFileName);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="sourceFileName"></param>
        /// <param name="destinationFileName"></param>
        /// <param name="destinationBackupFileName"></param>
        /// <param name="ignoreMetadataErrors"></param>
        void Replace(string sourceFileName, string destinationFileName, string destinationBackupFileName, bool ignoreMetadataErrors);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        void Delete(string path);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        C1FileStream Create(string path);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="bufferSize"></param>
        /// <returns></returns>
        C1FileStream Create(string path, int bufferSize);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="bufferSize"></param>
        /// <param name="options"></param>
        /// <returns></returns>
        C1FileStream Create(string path, int bufferSize, FileOptions options);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        C1StreamWriter CreateText(string path);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        C1StreamWriter AppendText(string path);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="contents"></param>
        void AppendAllText(string path, string contents);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="contents"></param>
        /// <param name="encoding"></param>
        void AppendAllText(string path, string contents, Encoding encoding);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="contents"></param>
        void AppendAllLines(string path, IEnumerable<string> contents);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="contents"></param>
        /// <param name="encoding"></param>
        void AppendAllLines(string path, IEnumerable<string> contents, Encoding encoding);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="mode"></param>
        /// <returns></returns>
        C1FileStream Open(string path, FileMode mode);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="mode"></param>
        /// <param name="access"></param>
        /// <returns></returns>
        C1FileStream Open(string path, FileMode mode, FileAccess access);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="mode"></param>
        /// <param name="access"></param>
        /// <param name="share"></param>
        /// <returns></returns>
        C1FileStream Open(string path, FileMode mode, FileAccess access, FileShare share);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        C1FileStream OpenRead(string path);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        C1StreamReader OpenText(string path);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        C1FileStream OpenWrite(string path);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        byte[] ReadAllBytes(string path);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        string[] ReadAllLines(string path);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="encoding"></param>
        /// <returns></returns>
        string[] ReadAllLines(string path, Encoding encoding);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        string ReadAllText(string path);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="encoding"></param>
        /// <returns></returns>
        string ReadAllText(string path, Encoding encoding);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        IEnumerable<string> ReadLines(string path);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="encoding"></param>
        /// <returns></returns>
        IEnumerable<string> ReadLines(string path, Encoding encoding);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="bytes"></param>
        void WriteAllBytes(string path, byte[] bytes);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="contents"></param>
        void WriteAllLines(string path, IEnumerable<string> contents);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="contents"></param>
        /// <param name="encoding"></param>
        void WriteAllLines(string path, IEnumerable<string> contents, Encoding encoding);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="contents"></param>
        void WriteAllLines(string path, string[] contents);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="contents"></param>
        /// <param name="encoding"></param>
        void WriteAllLines(string path, string[] contents, Encoding encoding);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="contents"></param>
        void WriteAllText(string path, string contents);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="contents"></param>
        /// <param name="encoding"></param>
        void WriteAllText(string path, string contents, Encoding encoding);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        FileAttributes GetAttributes(string path);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="fileAttributes"></param>
        void SetAttributes(string path, FileAttributes fileAttributes);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        DateTime GetCreationTime(string path);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        DateTime GetCreationTimeUtc(string path);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="creationTime"></param>
        void SetCreationTime(string path, DateTime creationTime);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="creationTimeUtc"></param>
        void SetCreationTimeUtc(string path, DateTime creationTimeUtc);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        DateTime GetLastAccessTime(string path);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        DateTime GetLastAccessTimeUtc(string path);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="lastAccessTime"></param>
        void SetLastAccessTime(string path, DateTime lastAccessTime);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="lastAccessTimeUtc"></param>
        void SetLastAccessTimeUtc(string path, DateTime lastAccessTimeUtc);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        DateTime GetLastWriteTime(string path);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        DateTime GetLastWriteTimeUtc(string path);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="lastWriteTime"></param>
        void SetLastWriteTime(string path, DateTime lastWriteTime);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="lastWriteTimeUtc"></param>
        void SetLastWriteTimeUtc(string path, DateTime lastWriteTimeUtc);
    }
}
