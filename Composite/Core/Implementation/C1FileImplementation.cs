using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using Composite.Core.IO;


namespace Composite.Core.Implementation
{
    /// <summary>
    /// IOLayer - documentation pending
    /// </summary>
    public class C1FileImplementation
    {
        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public virtual bool Exists(string path)
        {
            return IOFacade.C1File.Exists(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        public virtual void Touch(string path)
        {
            IOFacade.C1File.Touch(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="sourceFileName"></param>
        /// <param name="destFileName"></param>
        public virtual void Copy(string sourceFileName, string destFileName)
        {
            IOFacade.C1File.Copy(sourceFileName, destFileName);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="sourceFileName"></param>
        /// <param name="destFileName"></param>
        /// <param name="overwrite"></param>
        public virtual void Copy(string sourceFileName, string destFileName, bool overwrite)
        {
            IOFacade.C1File.Copy(sourceFileName, destFileName, overwrite);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="sourceFileName"></param>
        /// <param name="destFileName"></param>
        public virtual void Move(string sourceFileName, string destFileName)
        {
            IOFacade.C1File.Move(sourceFileName, destFileName);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="sourceFileName"></param>
        /// <param name="destinationFileName"></param>
        /// <param name="destinationBackupFileName"></param>
        public virtual void Replace(string sourceFileName, string destinationFileName, string destinationBackupFileName)
        {
            IOFacade.C1File.Replace(sourceFileName, destinationFileName, destinationBackupFileName);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="sourceFileName"></param>
        /// <param name="destinationFileName"></param>
        /// <param name="destinationBackupFileName"></param>
        /// <param name="ignoreMetadataErrors"></param>
        public virtual void Replace(string sourceFileName, string destinationFileName, string destinationBackupFileName, bool ignoreMetadataErrors)
        {
            IOFacade.C1File.Replace(sourceFileName, destinationBackupFileName, destinationBackupFileName, ignoreMetadataErrors);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        public virtual void Delete(string path)
        {
            IOFacade.C1File.Delete(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public virtual C1FileStream Create(string path)
        {
            return IOFacade.C1File.Create(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="bufferSize"></param>
        /// <returns></returns>
        public virtual C1FileStream Create(string path, int bufferSize)
        {
            return IOFacade.C1File.Create(path, bufferSize);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="bufferSize"></param>
        /// <param name="options"></param>
        /// <returns></returns>
        public virtual C1FileStream Create(string path, int bufferSize, FileOptions options)
        {
            return IOFacade.C1File.Create(path, bufferSize, options);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public virtual C1StreamWriter CreateText(string path)
        {
            return IOFacade.C1File.CreateText(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public virtual C1StreamWriter AppendText(string path)
        {
            return IOFacade.C1File.AppendText(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="contents"></param>
        public virtual void AppendAllText(string path, string contents)
        {
            IOFacade.C1File.AppendAllText(path, contents);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="contents"></param>
        /// <param name="encoding"></param>
        public virtual void AppendAllText(string path, string contents, Encoding encoding)
        {
            IOFacade.C1File.AppendAllText(path, contents, encoding);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="contents"></param>
        public virtual void AppendAllLines(string path, IEnumerable<string> contents)
        {
            IOFacade.C1File.AppendAllLines(path, contents);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="contents"></param>
        /// <param name="encoding"></param>
        public virtual void AppendAllLines(string path, IEnumerable<string> contents, Encoding encoding)
        {
            IOFacade.C1File.AppendAllLines(path, contents, encoding);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="mode"></param>
        /// <returns></returns>
        public virtual C1FileStream Open(string path, FileMode mode)
        {
            return IOFacade.C1File.Open(path, mode);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="mode"></param>
        /// <param name="access"></param>
        /// <returns></returns>
        public virtual C1FileStream Open(string path, FileMode mode, FileAccess access)
        {
            return IOFacade.C1File.Open(path, mode, access);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="mode"></param>
        /// <param name="access"></param>
        /// <param name="share"></param>
        /// <returns></returns>
        public virtual C1FileStream Open(string path, FileMode mode, FileAccess access, FileShare share)
        {
            return IOFacade.C1File.Open(path, mode, access, share);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public virtual C1FileStream OpenRead(string path)
        {
            return IOFacade.C1File.OpenRead(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public virtual C1StreamReader OpenText(string path)
        {
            return IOFacade.C1File.OpenText(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public virtual C1FileStream OpenWrite(string path)
        {
            return IOFacade.C1File.OpenWrite(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public virtual byte[] ReadAllBytes(string path)
        {
            return IOFacade.C1File.ReadAllBytes(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public virtual string[] ReadAllLines(string path)
        {
            return IOFacade.C1File.ReadAllLines(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="encoding"></param>
        /// <returns></returns>
        public virtual string[] ReadAllLines(string path, Encoding encoding)
        {
            return IOFacade.C1File.ReadAllLines(path, encoding);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public virtual string ReadAllText(string path)
        {
            return IOFacade.C1File.ReadAllText(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="encoding"></param>
        /// <returns></returns>
        public virtual string ReadAllText(string path, Encoding encoding)
        {
            return IOFacade.C1File.ReadAllText(path, encoding);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public virtual IEnumerable<string> ReadLines(string path)
        {
            return IOFacade.C1File.ReadLines(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="encoding"></param>
        /// <returns></returns>
        public virtual IEnumerable<string> ReadLines(string path, Encoding encoding)
        {
            return IOFacade.C1File.ReadLines(path, encoding);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="bytes"></param>
        public virtual void WriteAllBytes(string path, byte[] bytes)
        {
            IOFacade.C1File.WriteAllBytes(path, bytes);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="contents"></param>
        public virtual void WriteAllLines(string path, IEnumerable<string> contents)
        {
            IOFacade.C1File.WriteAllLines(path, contents);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="contents"></param>
        public virtual void WriteAllLines(string path, string[] contents)
        {
            IOFacade.C1File.WriteAllLines(path, contents);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="contents"></param>
        /// <param name="encoding"></param>
        public virtual void WriteAllLines(string path, IEnumerable<string> contents, Encoding encoding)
        {
            IOFacade.C1File.WriteAllLines(path, contents, encoding);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="contents"></param>
        /// <param name="encoding"></param>
        public virtual void WriteAllLines(string path, string[] contents, Encoding encoding)
        {
            IOFacade.C1File.WriteAllLines(path, contents, encoding);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="contents"></param>
        public virtual void WriteAllText(string path, string contents)
        {
            IOFacade.C1File.WriteAllText(path, contents);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="contents"></param>
        /// <param name="encoding"></param>
        public virtual void WriteAllText(string path, string contents, Encoding encoding)
        {
            IOFacade.C1File.WriteAllText(path, contents, encoding);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public virtual FileAttributes GetAttributes(string path)
        {
            return IOFacade.C1File.GetAttributes(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="fileAttributes"></param>
        public virtual void SetAttributes(string path, FileAttributes fileAttributes)
        {
            IOFacade.C1File.SetAttributes(path, fileAttributes);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public virtual DateTime GetCreationTime(string path)
        {
            return IOFacade.C1File.GetCreationTime(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public virtual DateTime GetCreationTimeUtc(string path)
        {
            return IOFacade.C1File.GetCreationTimeUtc(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="creationTime"></param>
        public virtual void SetCreationTime(string path, DateTime creationTime)
        {
            IOFacade.C1File.SetCreationTime(path, creationTime);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="creationTimeUtc"></param>
        public virtual void SetCreationTimeUtc(string path, DateTime creationTimeUtc)
        {
            IOFacade.C1File.SetCreationTimeUtc(path, creationTimeUtc);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public virtual DateTime GetLastAccessTime(string path)
        {
            return IOFacade.C1File.GetLastAccessTime(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public virtual DateTime GetLastAccessTimeUtc(string path)
        {
            return IOFacade.C1File.GetLastAccessTimeUtc(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="lastAccessTime"></param>
        public virtual void SetLastAccessTime(string path, DateTime lastAccessTime)
        {
            IOFacade.C1File.SetLastAccessTime(path, lastAccessTime);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="lastAccessTimeUtc"></param>
        public virtual void SetLastAccessTimeUtc(string path, DateTime lastAccessTimeUtc)
        {
            IOFacade.C1File.SetLastAccessTimeUtc(path, lastAccessTimeUtc);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public virtual DateTime GetLastWriteTime(string path)
        {
            return IOFacade.C1File.GetLastWriteTime(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public virtual DateTime GetLastWriteTimeUtc(string path)
        {
            return IOFacade.C1File.GetLastWriteTimeUtc(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="lastWriteTime"></param>
        public virtual void SetLastWriteTime(string path, DateTime lastWriteTime)
        {
            IOFacade.C1File.SetLastWriteTime(path, lastWriteTime);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="lastWriteTimeUtc"></param>
        public virtual void SetLastWriteTimeUtc(string path, DateTime lastWriteTimeUtc)
        {
            IOFacade.C1File.SetLastWriteTimeUtc(path, lastWriteTimeUtc);
        }



        //public virtual FileStream Create(string path, int bufferSize, System.IO.FileOptions options, System.Security.AccessControl.FileSecurity fileSecurity)
        //{ 
        //    throw new NotImplementedException(); 
        //}




        //public virtual void Encrypt(string path)
        //{ 
        //    throw new NotImplementedException(); 
        //}



        //public virtual void Decrypt(string path)
        //{ 
        //    throw new NotImplementedException(); 
        //}



        //public virtual System.Security.AccessControl.FileSecurity GetAccessControl(string path)
        //{ 
        //    throw new NotImplementedException(); 
        //}



        //public virtual System.Security.AccessControl.FileSecurity GetAccessControl(string path, System.Security.AccessControl.AccessControlSections includeSections)
        //{ 
        //    throw new NotImplementedException(); 
        //}



        //public virtual void SetAccessControl(string path, System.Security.AccessControl.FileSecurity fileSecurity)
        //{ 
        //    throw new NotImplementedException(); 
        //}
    }
}
