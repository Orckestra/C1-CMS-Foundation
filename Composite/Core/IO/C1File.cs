using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using Composite.Core.Implementation;


namespace Composite.Core.IO
{
    /// <summary>
    /// IOLayer - documentation pending
    /// </summary>
    public static class C1File
    {
        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public static bool Exists(string path)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.Exists(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// This is not a port of the System.IO.File
        /// </summary>
        /// <param name="path"></param>
        public static void Touch(string path)
        {
            ImplementationFactory.CurrentFactory.StatelessC1File.Touch(path);
        }


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="sourceFileName"></param>
        /// <param name="destFileName"></param>
        public static void Copy(string sourceFileName, string destFileName)
        {
            ImplementationFactory.CurrentFactory.StatelessC1File.Copy(sourceFileName, destFileName);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="sourceFileName"></param>
        /// <param name="destFileName"></param>
        /// <param name="overwrite"></param>
        public static void Copy(string sourceFileName, string destFileName, bool overwrite)
        {
            ImplementationFactory.CurrentFactory.StatelessC1File.Copy(sourceFileName, destFileName, overwrite);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="sourceFileName"></param>
        /// <param name="destFileName"></param>
        public static void Move(string sourceFileName, string destFileName)
        {
            ImplementationFactory.CurrentFactory.StatelessC1File.Move(sourceFileName, destFileName);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="sourceFileName"></param>
        /// <param name="destinationFileName"></param>
        /// <param name="destinationBackupFileName"></param>
        public static void Replace(string sourceFileName, string destinationFileName, string destinationBackupFileName)
        {
            ImplementationFactory.CurrentFactory.StatelessC1File.Replace(sourceFileName, destinationFileName, destinationBackupFileName);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="sourceFileName"></param>
        /// <param name="destinationFileName"></param>
        /// <param name="destinationBackupFileName"></param>
        /// <param name="ignoreMetadataErrors"></param>
        public static void Replace(string sourceFileName, string destinationFileName, string destinationBackupFileName, bool ignoreMetadataErrors)
        {
            ImplementationFactory.CurrentFactory.StatelessC1File.Replace(sourceFileName, destinationFileName, destinationBackupFileName, ignoreMetadataErrors);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        public static void Delete(string path)
        {
            ImplementationFactory.CurrentFactory.StatelessC1File.Delete(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public static C1FileStream Create(string path)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.Create(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="bufferSize"></param>
        /// <returns></returns>
        public static C1FileStream Create(string path, int bufferSize)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.Create(path, bufferSize);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="bufferSize"></param>
        /// <param name="options"></param>
        /// <returns></returns>
        public static C1FileStream Create(string path, int bufferSize, FileOptions options)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.Create(path, bufferSize, options);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public static C1StreamWriter CreateText(string path)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.CreateText(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public static C1StreamWriter AppendText(string path)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.AppendText(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="contents"></param>
        public static void AppendAllText(string path, string contents)
        {
            ImplementationFactory.CurrentFactory.StatelessC1File.AppendAllText(path, contents);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="contents"></param>
        /// <param name="encoding"></param>
        public static void AppendAllText(string path, string contents, Encoding encoding)
        {
            ImplementationFactory.CurrentFactory.StatelessC1File.AppendAllText(path, contents, encoding);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="contents"></param>
        public static void AppendAllLines(string path, IEnumerable<string> contents)
        {
            ImplementationFactory.CurrentFactory.StatelessC1File.AppendAllLines(path, contents);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="contents"></param>
        /// <param name="encoding"></param>
        public static void AppendAllLines(string path, IEnumerable<string> contents, Encoding encoding)
        {
            ImplementationFactory.CurrentFactory.StatelessC1File.AppendAllLines(path, contents, encoding);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="mode"></param>
        /// <returns></returns>
        public static C1FileStream Open(string path, FileMode mode)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.Open(path, mode);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="mode"></param>
        /// <param name="access"></param>
        /// <returns></returns>
        public static C1FileStream Open(string path, FileMode mode, FileAccess access)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.Open(path, mode, access);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="mode"></param>
        /// <param name="access"></param>
        /// <param name="share"></param>
        /// <returns></returns>
        public static C1FileStream Open(string path, FileMode mode, FileAccess access, FileShare share)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.Open(path, mode, access, share);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public static C1FileStream OpenRead(string path)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.OpenRead(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public static C1StreamReader OpenText(string path)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.OpenText(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public static C1FileStream OpenWrite(string path)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.OpenWrite(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public static byte[] ReadAllBytes(string path)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.ReadAllBytes(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public static string[] ReadAllLines(string path)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.ReadAllLines(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="encoding"></param>
        /// <returns></returns>
        public static string[] ReadAllLines(string path, Encoding encoding)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.ReadAllLines(path, encoding);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public static string ReadAllText(string path)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.ReadAllText(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="encoding"></param>
        /// <returns></returns>
        public static string ReadAllText(string path, Encoding encoding)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.ReadAllText(path, encoding);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public static IEnumerable<string> ReadLines(string path)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.ReadLines(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="encoding"></param>
        /// <returns></returns>
        public static IEnumerable<string> ReadLines(string path, Encoding encoding)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.ReadLines(path, encoding);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="bytes"></param>
        public static void WriteAllBytes(string path, byte[] bytes)
        {
            ImplementationFactory.CurrentFactory.StatelessC1File.WriteAllBytes(path, bytes);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="contents"></param>
        public static void WriteAllLines(string path, IEnumerable<string> contents)
        {
            ImplementationFactory.CurrentFactory.StatelessC1File.WriteAllLines(path, contents);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="contents"></param>
        public static void WriteAllLines(string path, string[] contents)
        {
            ImplementationFactory.CurrentFactory.StatelessC1File.WriteAllLines(path, contents);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="contents"></param>
        /// <param name="encoding"></param>
        public static void WriteAllLines(string path, IEnumerable<string> contents, Encoding encoding)
        {
            ImplementationFactory.CurrentFactory.StatelessC1File.WriteAllLines(path, contents, encoding);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="contents"></param>
        /// <param name="encoding"></param>
        public static void WriteAllLines(string path, string[] contents, Encoding encoding)
        {
            ImplementationFactory.CurrentFactory.StatelessC1File.WriteAllLines(path, contents, encoding);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="contents"></param>
        public static void WriteAllText(string path, string contents)
        {
            ImplementationFactory.CurrentFactory.StatelessC1File.WriteAllText(path, contents);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="contents"></param>
        /// <param name="encoding"></param>
        public static void WriteAllText(string path, string contents, Encoding encoding)
        {
            ImplementationFactory.CurrentFactory.StatelessC1File.WriteAllText(path, contents, encoding);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public static FileAttributes GetAttributes(string path)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.GetAttributes(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="fileAttributes"></param>
        public static void SetAttributes(string path, FileAttributes fileAttributes)
        {
            ImplementationFactory.CurrentFactory.StatelessC1File.SetAttributes(path, fileAttributes);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public static DateTime GetCreationTime(string path)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.GetCreationTime(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public static DateTime GetCreationTimeUtc(string path)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.GetCreationTimeUtc(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="creationTime"></param>
        public static void SetCreationTime(string path, DateTime creationTime)
        {
            ImplementationFactory.CurrentFactory.StatelessC1File.SetCreationTime(path, creationTime);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="creationTimeUtc"></param>
        public static void SetCreationTimeUtc(string path, DateTime creationTimeUtc)
        {
            ImplementationFactory.CurrentFactory.StatelessC1File.SetCreationTimeUtc(path, creationTimeUtc);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public static DateTime GetLastAccessTime(string path)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.GetLastAccessTime(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public static DateTime GetLastAccessTimeUtc(string path)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.GetLastAccessTimeUtc(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="lastAccessTime"></param>
        public static void SetLastAccessTime(string path, DateTime lastAccessTime)
        {
            ImplementationFactory.CurrentFactory.StatelessC1File.SetLastAccessTime(path, lastAccessTime);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="lastAccessTimeUtc"></param>
        public static void SetLastAccessTimeUtc(string path, DateTime lastAccessTimeUtc)
        {
            ImplementationFactory.CurrentFactory.StatelessC1File.SetLastAccessTimeUtc(path, lastAccessTimeUtc);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public static DateTime GetLastWriteTime(string path)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.GetLastWriteTime(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public static DateTime GetLastWriteTimeUtc(string path)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.GetLastWriteTimeUtc(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="lastWriteTime"></param>
        public static void SetLastWriteTime(string path, DateTime lastWriteTime)
        {
            ImplementationFactory.CurrentFactory.StatelessC1File.SetLastWriteTime(path, lastWriteTime);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="lastWriteTimeUtc"></param>
        public static void SetLastWriteTimeUtc(string path, DateTime lastWriteTimeUtc)
        {
            ImplementationFactory.CurrentFactory.StatelessC1File.SetLastWriteTimeUtc(path, lastWriteTimeUtc);
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



        //public static System.Security.AccessControl.FileSecurity GetAccessControl(string path)
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
