using System;
using System.IO;
using System.Runtime.Serialization;


namespace Composite.Core.IO.Plugins.IOProvider
{
    /// <summary>
    /// IOLayer - documentation pending
    /// </summary>
    public interface IC1DirectoryInfo
    {
        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        string Name { get; }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        string FullName { get; }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        string Extension { get; }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        bool Exists { get; }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        C1DirectoryInfo Root { get; }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        C1DirectoryInfo Parent { get; }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        FileAttributes Attributes { get; set; }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <returns></returns>
        C1DirectoryInfo[] GetDirectories();



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="searchPattern"></param>
        /// <returns></returns>
        C1DirectoryInfo[] GetDirectories(string searchPattern);



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="searchPattern"></param>
        /// <param name="searchOption"></param>
        /// <returns></returns>
        C1DirectoryInfo[] GetDirectories(string searchPattern, SearchOption searchOption);



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <returns></returns>
        C1FileInfo[] GetFiles();



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="searchPattern"></param>
        /// <returns></returns>
        C1FileInfo[] GetFiles(string searchPattern);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="searchPattern"></param>
        /// <param name="searchOption"></param>
        /// <returns></returns>
        C1FileInfo[] GetFiles(string searchPattern, SearchOption searchOption);



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        void Create();


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        C1DirectoryInfo CreateSubdirectory(string path);     



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="destDirName"></param>
        void MoveTo(string destDirName);



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        void Delete();


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="recursive"></param>
        void Delete(bool recursive);



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        void GetObjectData(SerializationInfo info, StreamingContext context);



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        void Refresh();




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
