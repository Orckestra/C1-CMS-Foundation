using System;
using System.IO;


namespace Composite.Core.IO.Plugins.IOProvider
{
    /// <summary>
    /// IOLayer - documentation pending
    /// </summary>
    public interface IC1Directory
    {
        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        DirectoryInfo CreateDirectory(string path);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        void Delete(string path);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="recursive"></param>
        void Delete(string path, bool recursive);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="sourceDirName"></param>
        /// <param name="destDirName"></param>
        void Move(string sourceDirName, string destDirName);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        bool Exists(string path);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <returns></returns>
        string GetCurrentDirectory();


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        void SetCurrentDirectory(string path);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        DirectoryInfo GetParent(string path);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        string GetDirectoryRoot(string path);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        string[] GetDirectories(string path);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="searchPattern"></param>
        /// <returns></returns>
        string[] GetDirectories(string path, string searchPattern);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="searchPattern"></param>
        /// <param name="searchOption"></param>
        /// <returns></returns>
        string[] GetDirectories(string path, string searchPattern, SearchOption searchOption);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        string[] GetFiles(string path);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="searchPattern"></param>
        /// <returns></returns>
        string[] GetFiles(string path, string searchPattern);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="searchPattern"></param>
        /// <param name="searchOption"></param>
        /// <returns></returns>
        string[] GetFiles(string path, string searchPattern, SearchOption searchOption);


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
    }
}
