using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml.Linq;
using Composite.Core.Xml;
using System.Xml;
using System.Xml.Schema;
using Composite.Core.Implementation;
using System.IO;
using System.Runtime.InteropServices;
using System.Runtime;
using System.Security;
using System.Security.AccessControl;
using Composite.Core.IO.Plugins.IOProvider;
using Composite.Plugins.IO.IOProviders.LocalIOPorivder;
using Composite.Core.IO;
//using Composite.Core.IO;


namespace Composite.Core.Implementation
{
    /// <summary>
    /// IOLayer - documentation pending
    /// </summary>
    public class C1DirectoryImplementation
    {
        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public virtual DirectoryInfo CreateDirectory(string path)
        {
            return IOFacade.C1Directory.CreateDirectory(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="sourceDirName"></param>
        /// <param name="destDirName"></param>
        //[SecuritySafeCritical]
        public virtual void Move(string sourceDirName, string destDirName)
        {
            IOFacade.C1Directory.Move(sourceDirName, destDirName);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        public virtual void Delete(string path)
        {
            IOFacade.C1Directory.Delete(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="recursive"></param>
        //[SecuritySafeCritical]
        public virtual void Delete(string path, bool recursive)
        {
            IOFacade.C1Directory.Delete(path, recursive);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        //[SecuritySafeCritical]
        public virtual bool Exists(string path)
        {
            return IOFacade.C1Directory.Exists(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <returns></returns>
        //[SecuritySafeCritical]
        public virtual string GetCurrentDirectory()
        {
            return IOFacade.C1Directory.GetCurrentDirectory();
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        //[SecuritySafeCritical]
        public virtual void SetCurrentDirectory(string path)
        {
            IOFacade.C1Directory.SetCurrentDirectory(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        //[SecuritySafeCritical]
        public virtual DirectoryInfo GetParent(string path)
        {
            return IOFacade.C1Directory.GetParent(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        //[SecuritySafeCritical]
        public virtual string GetDirectoryRoot(string path)
        {
            return IOFacade.C1Directory.GetDirectoryRoot(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public virtual string[] GetDirectories(string path)
        {
            return IOFacade.C1Directory.GetDirectories(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="searchPattern"></param>
        /// <returns></returns>
        public virtual string[] GetDirectories(string path, string searchPattern)
        {
            return IOFacade.C1Directory.GetDirectories(path, searchPattern);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="searchPattern"></param>
        /// <param name="searchOption"></param>
        /// <returns></returns>
        public virtual string[] GetDirectories(string path, string searchPattern, SearchOption searchOption)
        {
            return IOFacade.C1Directory.GetDirectories(path, searchPattern, searchOption);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public virtual string[] GetFiles(string path)
        {
            return IOFacade.C1Directory.GetFiles(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="searchPattern"></param>
        /// <returns></returns>
        public virtual string[] GetFiles(string path, string searchPattern)
        {
            return IOFacade.C1Directory.GetFiles(path, searchPattern);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="searchPattern"></param>
        /// <param name="searchOption"></param>
        /// <returns></returns>
        public virtual string[] GetFiles(string path, string searchPattern, SearchOption searchOption)
        {
            return IOFacade.C1Directory.GetFiles(path, searchPattern, searchOption);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        //[SecuritySafeCritical]
        public virtual DateTime GetCreationTime(string path)
        {
            return IOFacade.C1Directory.GetCreationTime(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        //[SecuritySafeCritical]
        public virtual DateTime GetCreationTimeUtc(string path)
        {
            return IOFacade.C1Directory.GetCreationTimeUtc(path);
        }



        //public virtual IEnumerable<string> EnumerateDirectories(string path)
        //{
        //    throw new NotImplementedException();
        //}



        //public virtual IEnumerable<string> EnumerateDirectories(string path, string searchPattern)
        //{
        //    throw new NotImplementedException();
        //}



        //public virtual IEnumerable<string> EnumerateDirectories(string path, string searchPattern, SearchOption searchOption)
        //{
        //    throw new NotImplementedException();
        //}



        //public virtual IEnumerable<string> EnumerateFiles(string path)
        //{
        //    throw new NotImplementedException();
        //}



        //public virtual IEnumerable<string> EnumerateFiles(string path, string searchPattern)
        //{
        //    throw new NotImplementedException();
        //}



        //public virtual IEnumerable<string> EnumerateFiles(string path, string searchPattern, SearchOption searchOption)
        //{
        //    throw new NotImplementedException();
        //}



        //public virtual IEnumerable<string> EnumerateFileSystemEntries(string path)
        //{
        //    throw new NotImplementedException();
        //}



        //public virtual IEnumerable<string> EnumerateFileSystemEntries(string path, string searchPattern)
        //{
        //    throw new NotImplementedException();
        //}



        //public virtual IEnumerable<string> EnumerateFileSystemEntries(string path, string searchPattern, SearchOption searchOption)
        //{
        //    throw new NotImplementedException();
        //}



        //public virtual string[] GetFileSystemEntries(string path)
        //{
        //    throw new NotImplementedException();
        //}



        //public virtual string[] GetFileSystemEntries(string path, string searchPattern)
        //{
        //    throw new NotImplementedException();
        //}



        //public virtual string[] GetFileSystemEntries(string path, string searchPattern, SearchOption searchOption)
        //{
        //    throw new NotImplementedException();
        //}



        //public virtual DirectorySecurity GetAccessControl(string path)
        //{
        //    throw new NotImplementedException();
        //}



        //public virtual DirectorySecurity GetAccessControl(string path, AccessControlSections includeSections)
        //{
        //    throw new NotImplementedException();
        //}



        ////[SecuritySafeCritical]
        //public virtual void SetAccessControl(string path, DirectorySecurity directorySecurity)
        //{
        //    throw new NotImplementedException();
        //}



        //public virtual void SetCreationTime(string path, DateTime creationTime)
        //{
        //    throw new NotImplementedException();
        //}



        ////[SecuritySafeCritical]
        //public virtual void SetCreationTimeUtc(string path, DateTime creationTimeUtc)
        //{ 
        //    throw new NotImplementedException(); 
        //}



        ////[SecuritySafeCritical]
        //public virtual string[] GetLogicalDrives()
        //{ 
        //    throw new NotImplementedException(); 
        //}



        ////[SecuritySafeCritical]
        //public virtual DateTime GetLastAccessTime(string path)
        //{ 
        //    throw new NotImplementedException(); 
        //}



        //public virtual void SetLastAccessTime(string path, DateTime lastAccessTime)
        //{ 
        //    throw new NotImplementedException(); 
        //}



        ////[SecuritySafeCritical]
        //public virtual DateTime GetLastAccessTimeUtc(string path)
        //{ 
        //    throw new NotImplementedException(); 
        //}



        ////[SecuritySafeCritical]
        //public virtual void SetLastAccessTimeUtc(string path, DateTime lastAccessTimeUtc)
        //{ 
        //    throw new NotImplementedException(); 
        //}



        ////[SecuritySafeCritical]
        //public virtual DateTime GetLastWriteTime(string path)
        //{ 
        //    throw new NotImplementedException(); 
        //}



        //public virtual void SetLastWriteTime(string path, DateTime lastWriteTime)
        //{ 
        //    throw new NotImplementedException(); 
        //}



        ////[SecuritySafeCritical]
        //public virtual DateTime GetLastWriteTimeUtc(string path)
        //{ 
        //    throw new NotImplementedException(); 
        //}



        //[SecuritySafeCritical]
        //public virtual void SetLastWriteTimeUtc(string path, DateTime lastWriteTimeUtc)
        //{ 
        //    throw new NotImplementedException(); 
        //}
    }



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
        //[SecuritySafeCritical]
        public virtual bool Exists(string path)
        {
            return IOFacade.C1File.Exists(path);
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
        //[SecuritySafeCritical]
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
        //[SecuritySafeCritical]
        public virtual void Replace(string sourceFileName, string destinationFileName, string destinationBackupFileName, bool ignoreMetadataErrors)
        {
            IOFacade.C1File.Replace(sourceFileName, destinationBackupFileName, destinationBackupFileName, ignoreMetadataErrors);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        //[SecuritySafeCritical]
        public virtual void Delete(string path)
        {
            IOFacade.C1File.Delete(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        //[SecuritySafeCritical, TargetedPatchingOptOut("Performance critical to inline this type of method across NGen image boundaries")]
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
        //[SecuritySafeCritical, TargetedPatchingOptOut("Performance critical to inline this type of method across NGen image boundaries")]
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
        //[SecuritySafeCritical]
        public virtual C1FileStream Create(string path, int bufferSize, FileOptions options)
        {
            return IOFacade.C1File.Create(path, bufferSize, options);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        //[SecuritySafeCritical]
        public virtual Composite.Core.IO.StreamWriter CreateText(string path)
        {
            return IOFacade.C1File.CreateText(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        //[SecuritySafeCritical]
        public virtual Composite.Core.IO.StreamWriter AppendText(string path)
        {
            return IOFacade.C1File.AppendText(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="contents"></param>
        //[SecuritySafeCritical]
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
        //[SecuritySafeCritical]
        public virtual void AppendAllText(string path, string contents, Encoding encoding)
        {
            IOFacade.C1File.AppendAllText(path, contents, encoding);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="contents"></param>
        //[SecuritySafeCritical]
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
        //[SecuritySafeCritical]
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
        //[SecuritySafeCritical]
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
        //[SecuritySafeCritical, TargetedPatchingOptOut("Performance critical to inline this type of method across NGen image boundaries")]
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
        //[SecuritySafeCritical]
        public virtual C1FileStream Open(string path, FileMode mode, FileAccess access, FileShare share)
        {
            return IOFacade.C1File.Open(path, mode, access, share);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        //[SecuritySafeCritical]
        public virtual C1FileStream OpenRead(string path)
        {
            return IOFacade.C1File.OpenRead(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        //[SecuritySafeCritical]
        public virtual Composite.Core.IO.StreamReader OpenText(string path)
        {
            return IOFacade.C1File.OpenText(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        //[SecuritySafeCritical]
        public virtual C1FileStream OpenWrite(string path)
        {
            return IOFacade.C1File.OpenWrite(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        //[SecuritySafeCritical]
        public virtual byte[] ReadAllBytes(string path)
        {
            return IOFacade.C1File.ReadAllBytes(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        //[SecuritySafeCritical]
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
        //[SecuritySafeCritical]           
        public virtual string[] ReadAllLines(string path, Encoding encoding)
        {
            return IOFacade.C1File.ReadAllLines(path, encoding);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        //[SecuritySafeCritical]
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
        //[SecuritySafeCritical]
        public virtual string ReadAllText(string path, Encoding encoding)
        {
            return IOFacade.C1File.ReadAllText(path, encoding);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        //[SecuritySafeCritical]
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
        //[SecuritySafeCritical]
        public virtual IEnumerable<string> ReadLines(string path, Encoding encoding)
        {
            return IOFacade.C1File.ReadLines(path, encoding);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="bytes"></param>
        //[SecuritySafeCritical]
        public virtual void WriteAllBytes(string path, byte[] bytes)
        {
            IOFacade.C1File.WriteAllBytes(path, bytes);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="contents"></param>
        //[SecuritySafeCritical]
        public virtual void WriteAllLines(string path, IEnumerable<string> contents)
        {
            IOFacade.C1File.WriteAllLines(path, contents);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="contents"></param>
        //[SecuritySafeCritical]
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
        //[SecuritySafeCritical]
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
        //[SecuritySafeCritical]
        public virtual void WriteAllLines(string path, string[] contents, Encoding encoding)
        {
            IOFacade.C1File.WriteAllLines(path, contents, encoding);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="contents"></param>
        //[SecuritySafeCritical]
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
        //[SecuritySafeCritical]
        public virtual void WriteAllText(string path, string contents, Encoding encoding)
        {
            IOFacade.C1File.WriteAllText(path, contents, encoding);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        //[SecuritySafeCritical]
        public virtual FileAttributes GetAttributes(string path)
        {
            return IOFacade.C1File.GetAttributes(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="fileAttributes"></param>
        //[SecuritySafeCritical]
        public virtual void SetAttributes(string path, FileAttributes fileAttributes)
        {
            IOFacade.C1File.SetAttributes(path, fileAttributes);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        //[SecuritySafeCritical]
        public virtual DateTime GetCreationTime(string path)
        {
            return IOFacade.C1File.GetCreationTime(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        //[SecuritySafeCritical]
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
        //[SecuritySafeCritical]
        public virtual void SetCreationTimeUtc(string path, DateTime creationTimeUtc)
        {
            IOFacade.C1File.SetCreationTimeUtc(path, creationTimeUtc);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        //[SecuritySafeCritical]
        public virtual DateTime GetLastAccessTime(string path)
        {
            return IOFacade.C1File.GetLastAccessTime(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        //[SecuritySafeCritical]
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
        //[SecuritySafeCritical]
        public virtual void SetLastAccessTimeUtc(string path, DateTime lastAccessTimeUtc)
        {
            IOFacade.C1File.SetLastAccessTimeUtc(path, lastAccessTimeUtc);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        //[SecuritySafeCritical]
        public virtual DateTime GetLastWriteTime(string path)
        {
            return IOFacade.C1File.GetLastWriteTime(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        //[SecuritySafeCritical]
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
        //[SecuritySafeCritical]
        public virtual void SetLastWriteTimeUtc(string path, DateTime lastWriteTimeUtc)
        {
            IOFacade.C1File.SetLastWriteTimeUtc(path, lastWriteTimeUtc);
        }



        //public virtual FileStream Create(string path, int bufferSize, System.IO.FileOptions options, System.Security.AccessControl.FileSecurity fileSecurity)
        //{ 
        //    throw new NotImplementedException(); 
        //}




        //[SecuritySafeCritical]
        //public virtual void Encrypt(string path)
        //{ 
        //    throw new NotImplementedException(); 
        //}



        //[SecuritySafeCritical]
        //public virtual void Decrypt(string path)
        //{ 
        //    throw new NotImplementedException(); 
        //}



        //[TargetedPatchingOptOut("Performance critical to inline this type of method across NGen image boundaries")]
        //public virtual System.Security.AccessControl.FileSecurity GetAccessControl(string path)
        //{ 
        //    throw new NotImplementedException(); 
        //}



        //public virtual System.Security.AccessControl.FileSecurity GetAccessControl(string path, System.Security.AccessControl.AccessControlSections includeSections)
        //{ 
        //    throw new NotImplementedException(); 
        //}



        //[SecuritySafeCritical]
        //public virtual void SetAccessControl(string path, System.Security.AccessControl.FileSecurity fileSecurity)
        //{ 
        //    throw new NotImplementedException(); 
        //}
    }




    /// <summary>
    /// IOLayer - documentation pending
    /// </summary>
    public class C1FileStreamImplementation : IDisposable
    {
        private IC1FileStream _fileStream;


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="mode"></param>
        /// <param name="access"></param>
        /// <param name="share"></param>
        public C1FileStreamImplementation(string path, FileMode mode, FileAccess access, FileShare share)
        {
            _fileStream = IOFacade.CreateFileStream(path, mode, access, share);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public virtual string Name
        {
            [SecuritySafeCritical]
            get
            {
                return _fileStream.Name;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public virtual long Length
        {
            [SecuritySafeCritical]
            get
            {
                return _fileStream.Length;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        public virtual void SetLength(long value)
        {
            _fileStream.SetLength(value);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public virtual long Position
        {
            [SecuritySafeCritical]
            get
            {
                return _fileStream.Position;
            }
            [SecuritySafeCritical]
            set
            {
                _fileStream.Position = value;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="array"></param>
        /// <param name="offset"></param>
        /// <param name="count"></param>
        /// <returns></returns>
        public virtual int Read([In, Out] byte[] array, int offset, int count)
        {
            return _fileStream.Read(array, offset, count);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <returns></returns>
        public virtual int ReadByte()
        {
            return _fileStream.ReadByte();
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="array"></param>
        /// <param name="offset"></param>
        /// <param name="count"></param>
        public virtual void Write(byte[] array, int offset, int count)
        {
            _fileStream.Write(array, offset, count);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        public virtual void WriteByte(byte value)
        {
            _fileStream.WriteByte(value);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="offset"></param>
        /// <param name="origin"></param>
        /// <returns></returns>
        public virtual long Seek(long offset, SeekOrigin origin)
        {
            return _fileStream.Seek(offset, origin);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public virtual bool CanRead
        {
            get
            {
                return _fileStream.CanRead;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public virtual bool CanSeek
        {
            get
            {
                return _fileStream.CanSeek;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public virtual bool CanWrite
        {
            get
            {
                return _fileStream.CanWrite;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public virtual void Flush()
        {
            _fileStream.Flush();
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="flushToDisk"></param>
        public virtual void Flush(bool flushToDisk)
        {
            _fileStream.Flush(flushToDisk);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public virtual void Close()
        {
            _fileStream.Close();
        }



        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }



        ~C1FileStreamImplementation()
        {
            Dispose(false);
        }



        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                _fileStream.Dispose();
            }
        }

        //public virtual bool IsAsync 
        //{ 
        //    get 
        //    { 
        //        throw new NotImplementedException(); 
        //    } 
        //}



        ////[Obsolete("This property has been deprecated.  Please use FileStream's SafeFileHandle property instead.  http://go.microsoft.com/fwlink/?linkid=14202")]
        //public virtual IntPtr Handle 
        //{ 
        //    get 
        //    { 
        //        throw new NotImplementedException(); 
        //    } 
        //}



        //public virtual FileSecurity GetAccessControl() 
        //{ 
        //    throw new NotImplementedException(); 
        //}



        //public virtual void SetAccessControl(FileSecurity fileSecurity) 
        //{ 
        //    throw new NotImplementedException(); 
        //}



        //public virtual void Lock(long position, long length) 
        //{ 
        //    throw new NotImplementedException(); 
        //}



        //public virtual void Unlock(long position, long length) 
        //{ 
        //    throw new NotImplementedException(); 
        //}
    }





    /// <summary>
    /// IOLayer - documentation pending
    /// </summary>
    public class C1FileSystemWatcherImplementation 
    {
        private IC1FileSystemWatcher _fileSystemWatcher;


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="filter"></param>
        public C1FileSystemWatcherImplementation(string path, string filter)
        {
            _fileSystemWatcher = IOFacade.CreateFileSystemWatcher(path, filter);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public virtual bool EnableRaisingEvents
        {
            get
            {
                return _fileSystemWatcher.EnableRaisingEvents;
            }
            set
            {
                _fileSystemWatcher.EnableRaisingEvents = value;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public virtual string Path
        {
            get
            {
                return _fileSystemWatcher.Path;
            }
            set
            {
                _fileSystemWatcher.Path = value;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public virtual string Filter
        {
            get
            {
                return _fileSystemWatcher.Filter;
            }
            set
            {
                _fileSystemWatcher.Filter = value;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public virtual bool IncludeSubdirectories
        {
            get
            {
                return _fileSystemWatcher.IncludeSubdirectories;
            }
            set
            {
                _fileSystemWatcher.IncludeSubdirectories = value;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public virtual event FileSystemEventHandler Created
        {
            add
            {
                _fileSystemWatcher.Created += value;
            }
            remove
            {
                _fileSystemWatcher.Created -= value;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public virtual event FileSystemEventHandler Changed
        {
            add
            {
                _fileSystemWatcher.Changed += value;
            }
            remove
            {
                _fileSystemWatcher.Changed -= value;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public virtual event RenamedEventHandler Renamed
        {
            add
            {
                _fileSystemWatcher.Renamed += value;
            }
            remove
            {
                _fileSystemWatcher.Renamed -= value;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public virtual event FileSystemEventHandler Deleted
        {
            add
            {
                _fileSystemWatcher.Deleted += value;
            }
            remove
            {
                _fileSystemWatcher.Deleted -= value;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public virtual event ErrorEventHandler Error
        {
            add
            {
                _fileSystemWatcher.Error += value;
            }
            remove
            {
                _fileSystemWatcher.Error -= value;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public virtual NotifyFilters NotifyFilter
        {
            get
            {
                return _fileSystemWatcher.NotifyFilter;
            }
            set
            {
                _fileSystemWatcher.NotifyFilter = value;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public virtual void BeginInit()
        {
            _fileSystemWatcher.BeginInit();
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public virtual void EndInit()
        {
            _fileSystemWatcher.EndInit();
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="changeType"></param>
        /// <returns></returns>
        public virtual C1WaitForChangedResult WaitForChanged(WatcherChangeTypes changeType)
        {
            return _fileSystemWatcher.WaitForChanged(changeType);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="changeType"></param>
        /// <param name="timeout"></param>
        /// <returns></returns>
        public virtual C1WaitForChangedResult WaitForChanged(WatcherChangeTypes changeType, int timeout)
        {
            return _fileSystemWatcher.WaitForChanged(changeType, timeout);
        }
    }
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


namespace Composite.Core.IO
{


    /// <summary>
    /// IOLayer - documentation pending
    /// </summary>
    public static class C1Directory
    {
        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public static DirectoryInfo CreateDirectory(string path)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1Directory.CreateDirectory(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="sourceDirName"></param>
        /// <param name="destDirName"></param>
        //[SecuritySafeCritical]
        public static void Move(string sourceDirName, string destDirName)
        {
            ImplementationFactory.CurrentFactory.StatelessC1Directory.Move(sourceDirName, destDirName);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        public static void Delete(string path)
        {
            ImplementationFactory.CurrentFactory.StatelessC1Directory.Delete(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="recursive"></param>
        //[SecuritySafeCritical]
        public static void Delete(string path, bool recursive)
        {
            ImplementationFactory.CurrentFactory.StatelessC1Directory.Delete(path, recursive);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        //[SecuritySafeCritical]
        public static bool Exists(string path)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1Directory.Exists(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <returns></returns>
        //[SecuritySafeCritical]
        public static string GetCurrentDirectory()
        {
            return ImplementationFactory.CurrentFactory.StatelessC1Directory.GetCurrentDirectory();
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        //[SecuritySafeCritical]
        public static void SetCurrentDirectory(string path)
        {
            ImplementationFactory.CurrentFactory.StatelessC1Directory.SetCurrentDirectory(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        //[SecuritySafeCritical]
        public static DirectoryInfo GetParent(string path)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1Directory.GetParent(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        //[SecuritySafeCritical]
        public static string GetDirectoryRoot(string path)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1Directory.GetDirectoryRoot(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public static string[] GetDirectories(string path)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1Directory.GetDirectories(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="searchPattern"></param>
        /// <returns></returns>
        public static string[] GetDirectories(string path, string searchPattern)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1Directory.GetDirectories(path, searchPattern);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="searchPattern"></param>
        /// <param name="searchOption"></param>
        /// <returns></returns>
        public static string[] GetDirectories(string path, string searchPattern, SearchOption searchOption)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1Directory.GetDirectories(path, searchPattern, searchOption);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public static string[] GetFiles(string path)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1Directory.GetFiles(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="searchPattern"></param>
        /// <returns></returns>
        public static string[] GetFiles(string path, string searchPattern)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1Directory.GetFiles(path, searchPattern);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="searchPattern"></param>
        /// <param name="searchOption"></param>
        /// <returns></returns>
        public static string[] GetFiles(string path, string searchPattern, SearchOption searchOption)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1Directory.GetFiles(path, searchPattern, searchOption);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        //[SecuritySafeCritical]
        public static DateTime GetCreationTime(string path)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1Directory.GetCreationTime(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        //[SecuritySafeCritical]
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



        ////[SecuritySafeCritical]
        //public static void SetAccessControl(string path, DirectorySecurity directorySecurity)
        //{
        //    throw new NotImplementedException();
        //}



        //public static void SetCreationTime(string path, DateTime creationTime)
        //{
        //    throw new NotImplementedException();
        //}



        ////[SecuritySafeCritical]
        //public static void SetCreationTimeUtc(string path, DateTime creationTimeUtc)
        //{ 
        //    throw new NotImplementedException(); 
        //}



        ////[SecuritySafeCritical]
        //public static string[] GetLogicalDrives()
        //{ 
        //    throw new NotImplementedException(); 
        //}



        ////[SecuritySafeCritical]
        //public static DateTime GetLastAccessTime(string path)
        //{ 
        //    throw new NotImplementedException(); 
        //}



        //public static void SetLastAccessTime(string path, DateTime lastAccessTime)
        //{ 
        //    throw new NotImplementedException(); 
        //}



        ////[SecuritySafeCritical]
        //public static DateTime GetLastAccessTimeUtc(string path)
        //{ 
        //    throw new NotImplementedException(); 
        //}



        ////[SecuritySafeCritical]
        //public static void SetLastAccessTimeUtc(string path, DateTime lastAccessTimeUtc)
        //{ 
        //    throw new NotImplementedException(); 
        //}



        ////[SecuritySafeCritical]
        //public static DateTime GetLastWriteTime(string path)
        //{ 
        //    throw new NotImplementedException(); 
        //}



        //public static void SetLastWriteTime(string path, DateTime lastWriteTime)
        //{ 
        //    throw new NotImplementedException(); 
        //}



        ////[SecuritySafeCritical]
        //public static DateTime GetLastWriteTimeUtc(string path)
        //{ 
        //    throw new NotImplementedException(); 
        //}



        //[SecuritySafeCritical]
        //public static void SetLastWriteTimeUtc(string path, DateTime lastWriteTimeUtc)
        //{ 
        //    throw new NotImplementedException(); 
        //}
    }





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
        //[SecuritySafeCritical]
        public static bool Exists(string path)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.Exists(path);
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
        //[SecuritySafeCritical]
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
        //[SecuritySafeCritical]
        public static void Replace(string sourceFileName, string destinationFileName, string destinationBackupFileName, bool ignoreMetadataErrors)
        {
            ImplementationFactory.CurrentFactory.StatelessC1File.Replace(sourceFileName, destinationFileName, destinationBackupFileName, ignoreMetadataErrors);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        //[SecuritySafeCritical]
        public static void Delete(string path)
        {
            ImplementationFactory.CurrentFactory.StatelessC1File.Delete(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        //[SecuritySafeCritical, TargetedPatchingOptOut("Performance critical to inline this type of method across NGen image boundaries")]
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
        //[SecuritySafeCritical, TargetedPatchingOptOut("Performance critical to inline this type of method across NGen image boundaries")]
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
        //[SecuritySafeCritical]
        public static C1FileStream Create(string path, int bufferSize, FileOptions options)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.Create(path, bufferSize, options);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        //[SecuritySafeCritical]
        public static StreamWriter CreateText(string path)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.CreateText(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        //[SecuritySafeCritical]
        public static StreamWriter AppendText(string path)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.AppendText(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="contents"></param>
        //[SecuritySafeCritical]
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
        //[SecuritySafeCritical]
        public static void AppendAllText(string path, string contents, Encoding encoding)
        {
            ImplementationFactory.CurrentFactory.StatelessC1File.AppendAllText(path, contents, encoding);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="contents"></param>
        //[SecuritySafeCritical]
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
        //[SecuritySafeCritical]
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
        //[SecuritySafeCritical]
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
        //[SecuritySafeCritical, TargetedPatchingOptOut("Performance critical to inline this type of method across NGen image boundaries")]
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
        //[SecuritySafeCritical]
        public static C1FileStream Open(string path, FileMode mode, FileAccess access, FileShare share)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.Open(path, mode, access, share);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        //[SecuritySafeCritical]
        public static C1FileStream OpenRead(string path)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.OpenRead(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        //[SecuritySafeCritical]
        public static StreamReader OpenText(string path)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.OpenText(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        //[SecuritySafeCritical]
        public static C1FileStream OpenWrite(string path)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.OpenWrite(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        //[SecuritySafeCritical]
        public static byte[] ReadAllBytes(string path)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.ReadAllBytes(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        //[SecuritySafeCritical]
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
        //[SecuritySafeCritical]           
        public static string[] ReadAllLines(string path, Encoding encoding)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.ReadAllLines(path, encoding);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        //[SecuritySafeCritical]
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
        //[SecuritySafeCritical]
        public static string ReadAllText(string path, Encoding encoding)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.ReadAllText(path, encoding);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        //[SecuritySafeCritical]
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
        //[SecuritySafeCritical]
        public static IEnumerable<string> ReadLines(string path, Encoding encoding)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.ReadLines(path, encoding);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="bytes"></param>
        //[SecuritySafeCritical]
        public static void WriteAllBytes(string path, byte[] bytes)
        {
            ImplementationFactory.CurrentFactory.StatelessC1File.WriteAllBytes(path, bytes);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="contents"></param>
        //[SecuritySafeCritical]
        public static void WriteAllLines(string path, IEnumerable<string> contents)
        {
            ImplementationFactory.CurrentFactory.StatelessC1File.WriteAllLines(path, contents);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="contents"></param>
        //[SecuritySafeCritical]
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
        //[SecuritySafeCritical]
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
        //[SecuritySafeCritical]
        public static void WriteAllLines(string path, string[] contents, Encoding encoding)
        {
            ImplementationFactory.CurrentFactory.StatelessC1File.WriteAllLines(path, contents, encoding);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="contents"></param>
        //[SecuritySafeCritical]
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
        //[SecuritySafeCritical]
        public static void WriteAllText(string path, string contents, Encoding encoding)
        {
            ImplementationFactory.CurrentFactory.StatelessC1File.WriteAllText(path, contents, encoding);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        //[SecuritySafeCritical]
        public static FileAttributes GetAttributes(string path)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.GetAttributes(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="fileAttributes"></param>
        //[SecuritySafeCritical]
        public static void SetAttributes(string path, FileAttributes fileAttributes)
        {
            ImplementationFactory.CurrentFactory.StatelessC1File.SetAttributes(path, fileAttributes);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        //[SecuritySafeCritical]
        public static DateTime GetCreationTime(string path)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.GetCreationTime(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        //[SecuritySafeCritical]
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
        //[SecuritySafeCritical]
        public static void SetCreationTimeUtc(string path, DateTime creationTimeUtc)
        {
            ImplementationFactory.CurrentFactory.StatelessC1File.SetCreationTimeUtc(path, creationTimeUtc);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        //[SecuritySafeCritical]
        public static DateTime GetLastAccessTime(string path)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.GetLastAccessTime(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        //[SecuritySafeCritical]
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
        //[SecuritySafeCritical]
        public static void SetLastAccessTimeUtc(string path, DateTime lastAccessTimeUtc)
        {
            ImplementationFactory.CurrentFactory.StatelessC1File.SetLastAccessTimeUtc(path, lastAccessTimeUtc);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        //[SecuritySafeCritical]
        public static DateTime GetLastWriteTime(string path)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1File.GetLastWriteTime(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        //[SecuritySafeCritical]
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
        //[SecuritySafeCritical]
        public static void SetLastWriteTimeUtc(string path, DateTime lastWriteTimeUtc)
        {
            ImplementationFactory.CurrentFactory.StatelessC1File.SetLastWriteTimeUtc(path, lastWriteTimeUtc);
        }



        //public static FileStream Create(string path, int bufferSize, System.IO.FileOptions options, System.Security.AccessControl.FileSecurity fileSecurity)
        //{ 
        //    throw new NotImplementedException(); 
        //}




        //[SecuritySafeCritical]
        //public static void Encrypt(string path)
        //{ 
        //    throw new NotImplementedException(); 
        //}



        //[SecuritySafeCritical]
        //public static void Decrypt(string path)
        //{ 
        //    throw new NotImplementedException(); 
        //}



        //[TargetedPatchingOptOut("Performance critical to inline this type of method across NGen image boundaries")]
        //public static System.Security.AccessControl.FileSecurity GetAccessControl(string path)
        //{ 
        //    throw new NotImplementedException(); 
        //}



        //public static System.Security.AccessControl.FileSecurity GetAccessControl(string path, System.Security.AccessControl.AccessControlSections includeSections)
        //{ 
        //    throw new NotImplementedException(); 
        //}



        //[SecuritySafeCritical]
        //public static void SetAccessControl(string path, System.Security.AccessControl.FileSecurity fileSecurity)
        //{ 
        //    throw new NotImplementedException(); 
        //}
    }


#warning MRJ: SecuritySafeCritical is used on FileStream's methods, so, use it here??
    /// <summary>
    /// IOLayer - documentation pending
    /// </summary>
    public class C1FileStream : Stream, IDisposable
    {
        private ImplementationContainer<C1FileStreamImplementation> _implementation;



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="mode"></param>
        public C1FileStream(string path, FileMode mode)
            : this(path, mode, (mode == FileMode.Append) ? FileAccess.Write : FileAccess.ReadWrite, FileShare.Read)
        {
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="mode"></param>
        /// <param name="access"></param>
        public C1FileStream(string path, FileMode mode, FileAccess access)
            : this(path, mode, access, FileShare.Read)
        {
        }

#warning MRJ: Clean up these constructors

        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="mode"></param>
        /// <param name="access"></param>
        /// <param name="share"></param>
        public C1FileStream(string path, FileMode mode, FileAccess access, FileShare share)
        {
            _implementation = new ImplementationContainer<C1FileStreamImplementation>(() => ImplementationFactory.CurrentFactory.CreateC1FileStream(path, mode, access, share));
            _implementation.CreateImplementation();
        }


#warning MRJ: Implement this!!!
        public C1FileStream(string path, FileMode mode, FileAccess access, FileShare share, int bufferSize)
        {
            _implementation = new ImplementationContainer<C1FileStreamImplementation>(() => ImplementationFactory.CurrentFactory.CreateC1FileStream(path, mode, access, share));
            _implementation.CreateImplementation();
        }


#warning MRJ: Implement this!!!
        public C1FileStream(string path, FileMode mode, FileAccess access, FileShare share, int bufferSize, FileOptions options)
        {
            _implementation = new ImplementationContainer<C1FileStreamImplementation>(() => ImplementationFactory.CurrentFactory.CreateC1FileStream(path, mode, access, share));
            _implementation.CreateImplementation();
        }


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public string Name
        {
            get
            {
                throw new NotImplementedException();
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public override long Length
        {
            [SecuritySafeCritical]
            get
            {
                return _implementation.Implementation.Length;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        public override void SetLength(long value)
        {
            _implementation.Implementation.SetLength(value);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public override long Position
        {
            [SecuritySafeCritical]
            get
            {
                return _implementation.Implementation.Position;
            }
            [SecuritySafeCritical]
            set
            {
                _implementation.Implementation.Position = value;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="array"></param>
        /// <param name="offset"></param>
        /// <param name="count"></param>
        /// <returns></returns>
        public override int Read([In, Out] byte[] array, int offset, int count)
        {
            return _implementation.Implementation.Read(array, offset, count);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <returns></returns>
        public override int ReadByte()
        {
            return _implementation.Implementation.ReadByte();
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="array"></param>
        /// <param name="offset"></param>
        /// <param name="count"></param>
        public override void Write(byte[] array, int offset, int count)
        {
            _implementation.Implementation.Write(array, offset, count);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        public override void WriteByte(byte value)
        {
            _implementation.Implementation.WriteByte(value);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="offset"></param>
        /// <param name="origin"></param>
        /// <returns></returns>
        public override long Seek(long offset, SeekOrigin origin)
        {
            return _implementation.Implementation.Seek(offset, origin);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public override bool CanRead
        {
#warning MRJ: Should this be here or not?
            //[TargetedPatchingOptOut("Performance critical to inline this type of method across NGen imagetiur boundaries")]
            get
            {
                return _implementation.Implementation.CanRead;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public override bool CanSeek
        {
#warning MRJ: Should this be here or not?
            //[TargetedPatchingOptOut("Performance critical to inline this type of method across NGen image boundaries")]
            get
            {
                return _implementation.Implementation.CanSeek;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public override bool CanWrite
        {
#warning MRJ: Should this be here or not?
            //[TargetedPatchingOptOut("Performance critical to inline this type of method across NGen image boundaries")]
            get
            {
                return _implementation.Implementation.CanWrite;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public override void Flush()
        {
            _implementation.Implementation.Flush();
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="flushToDisk"></param>
        public virtual void Flush(bool flushToDisk)
        {
            _implementation.Implementation.Flush(flushToDisk);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public override void Close()
        {
            _implementation.Implementation.Close();
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        ~C1FileStream()
        {
            Dispose(false);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="disposing"></param>
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _implementation.DisposeImplementation();
            }
        }



        //public virtual bool IsAsync 
        //{ 
        //    get 
        //    { 
        //        throw new NotImplementedException(); 
        //    } 
        //}



        ////[Obsolete("This property has been deprecated.  Please use FileStream's SafeFileHandle property instead.  http://go.microsoft.com/fwlink/?linkid=14202")]
        //public virtual IntPtr Handle 
        //{ 
        //    get 
        //    { 
        //        throw new NotImplementedException(); 
        //    } 
        //}



        //public FileSecurity GetAccessControl() 
        //{ 
        //    throw new NotImplementedException(); 
        //}



        //public void SetAccessControl(FileSecurity fileSecurity) 
        //{ 
        //    throw new NotImplementedException(); 
        //}



        //public virtual void Lock(long position, long length) 
        //{ 
        //    throw new NotImplementedException(); 
        //}



        //public virtual void Unlock(long position, long length) 
        //{ 
        //    throw new NotImplementedException(); 
        //}
    }





    /// <summary>
    /// IOLayer - documentation pending
    /// </summary>
    public class C1FileSystemWatcher : ImplementationContainer<C1FileSystemWatcherImplementation>
    {
        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        public C1FileSystemWatcher(string path)
            : this(path, null)
        {
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="filter"></param>
        public C1FileSystemWatcher(string path, string filter)
            : base(() => ImplementationFactory.CurrentFactory.CreateC1FileSystemWatcher(path, filter))
        {            
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public bool EnableRaisingEvents
        {
            get
            {
                return this.Implementation.EnableRaisingEvents;
            }
            set
            {
                this.Implementation.EnableRaisingEvents = value;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public string Path
        {
            get
            {
                return this.Implementation.Path;
            }
            set
            {
                this.Implementation.Path = value;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public string Filter
        {
            get
            {
                return this.Implementation.Filter;
            }
            set
            {
                this.Implementation.Filter = value;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public bool IncludeSubdirectories
        {
            get
            {
                return this.Implementation.IncludeSubdirectories;
            }
            set
            {
                this.Implementation.IncludeSubdirectories = value;
            }
        }
        


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public event FileSystemEventHandler Created
        {
            add
            {
                this.Implementation.Created += value;
            }
            remove
            {
                this.Implementation.Created -= value;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public event FileSystemEventHandler Changed
        {
            add
            {
                this.Implementation.Changed += value;
            }
            remove
            {
                this.Implementation.Changed -= value;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public event RenamedEventHandler Renamed
        {
            add
            {
                this.Implementation.Renamed += value;
            }
            remove
            {
                this.Implementation.Renamed -= value;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public event FileSystemEventHandler Deleted
        {
            add
            {
                this.Implementation.Deleted += value;
            }
            remove
            {
                this.Implementation.Deleted -= value;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public event ErrorEventHandler Error
        {
            add
            {
                this.Implementation.Error += value;
            }
            remove
            {
                this.Implementation.Error -= value;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public NotifyFilters NotifyFilter
        {
            get
            {
                return this.Implementation.NotifyFilter;
            }
            set
            {
                this.Implementation.NotifyFilter = value;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public void BeginInit()
        {
            this.Implementation.BeginInit();
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public void EndInit()
        {
            this.Implementation.EndInit();
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="changeType"></param>
        /// <returns></returns>
        public C1WaitForChangedResult WaitForChanged(WatcherChangeTypes changeType)
        {
            return this.Implementation.WaitForChanged(changeType);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="changeType"></param>
        /// <param name="timeout"></param>
        /// <returns></returns>
        public C1WaitForChangedResult WaitForChanged(WatcherChangeTypes changeType, int timeout)
        {
            return this.Implementation.WaitForChanged(changeType, timeout);
        }
    }




    /// <summary>
    /// IOLayer - documentation pending
    /// </summary>
    [StructLayout(LayoutKind.Sequential)]
    public struct C1WaitForChangedResult
    {
        public string Name { get; set; }
        public string OldName { get; set; }
        public WatcherChangeTypes ChangeType { get; set; }        
        public bool TimedOut { get; set; }
    }
}



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

namespace Composite.Plugins.IO.IOProviders.LocalIOPorivder
{
    public class LocalC1Directory : IC1Directory
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass")]
        public DirectoryInfo CreateDirectory(string path)
        {
            return System.IO.Directory.CreateDirectory(path);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass")]
        public void Delete(string path)
        {
            System.IO.Directory.Delete(path);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass")]
        public void Delete(string path, bool recursive)
        {
            System.IO.Directory.Delete(path, recursive);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass")]
        public void Move(string sourceDirName, string destDirName)
        {
            System.IO.Directory.Move(sourceDirName, destDirName);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass")]
        public bool Exists(string path)
        {
            return System.IO.Directory.Exists(path);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass")]
        public string GetCurrentDirectory()
        {
            return System.IO.Directory.GetCurrentDirectory();
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass")]
        public void SetCurrentDirectory(string path)
        {
            System.IO.Directory.SetCurrentDirectory(path);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass")]
        public DirectoryInfo GetParent(string path)
        {
            return System.IO.Directory.GetParent(path);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass")]
        public string GetDirectoryRoot(string path)
        {
            return System.IO.Directory.GetDirectoryRoot(path);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass")]
        public string[] GetDirectories(string path)
        {
            return System.IO.Directory.GetDirectories(path);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass")]
        public string[] GetDirectories(string path, string searchPattern)
        {
            return System.IO.Directory.GetDirectories(path, searchPattern);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass")]
        public string[] GetDirectories(string path, string searchPattern, SearchOption searchOption)
        {
            return System.IO.Directory.GetDirectories(path, searchPattern, searchOption);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass")]
        public string[] GetFiles(string path)
        {
            return System.IO.Directory.GetFiles(path);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass")]
        public string[] GetFiles(string path, string searchPattern)
        {
            return System.IO.Directory.GetFiles(path, searchPattern);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass")]
        public string[] GetFiles(string path, string searchPattern, SearchOption searchOption)
        {
            return System.IO.Directory.GetFiles(path, searchPattern, searchOption);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass")]
        public DateTime GetCreationTime(string path)
        {
            return System.IO.Directory.GetCreationTime(path);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass")]
        public DateTime GetCreationTimeUtc(string path)
        {
            return System.IO.Directory.GetCreationTimeUtc(path);
        }
    }



    public class LocalC1File : IC1File
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass")]
        public bool Exists(string path)
        {
            return File.Exists(path);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass")]
        public void Copy(string sourceFileName, string destFileName)
        {
            File.Copy(sourceFileName, destFileName);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass")]
        public void Copy(string sourceFileName, string destFileName, bool overwrite)
        {
            File.Copy(sourceFileName, destFileName, overwrite);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass")]
        public void Move(string sourceFileName, string destFileName)
        {
            File.Move(sourceFileName, destFileName);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass")]
        public void Replace(string sourceFileName, string destinationFileName, string destinationBackupFileName)
        {
            File.Replace(sourceFileName, destinationFileName, destinationBackupFileName);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass")]
        public void Replace(string sourceFileName, string destinationFileName, string destinationBackupFileName, bool ignoreMetadataErrors)
        {
            File.Replace(sourceFileName, destinationFileName, destinationBackupFileName, ignoreMetadataErrors);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass")]
        public void Delete(string path)
        {
            File.Delete(path);
        }



        public C1FileStream Create(string path)
        {
            return new C1FileStream(path, FileMode.Create, FileAccess.ReadWrite, FileShare.None);
        }



        public C1FileStream Create(string path, int bufferSize)
        {
            return new C1FileStream(path, FileMode.Create, FileAccess.ReadWrite, FileShare.None, bufferSize);
        }



        public C1FileStream Create(string path, int bufferSize, FileOptions options)
        {
            return new C1FileStream(path, FileMode.Create, FileAccess.ReadWrite, FileShare.None, bufferSize, options);
        }



        public Core.IO.StreamWriter CreateText(string path)
        {
            return new Core.IO.StreamWriter(path, false);
        }



        public Core.IO.StreamWriter AppendText(string path)
        {
            return new Core.IO.StreamWriter(path, true);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass")]
        public void AppendAllText(string path, string contents)
        {
            File.AppendAllText(path, contents);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass")]
        public void AppendAllText(string path, string contents, Encoding encoding)
        {
            File.AppendAllText(path, contents, encoding);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass")]
        public void AppendAllLines(string path, IEnumerable<string> contents)
        {
            File.AppendAllLines(path, contents);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass")]
        public void AppendAllLines(string path, IEnumerable<string> contents, Encoding encoding)
        {
            File.AppendAllLines(path, contents, encoding);
        }



        public C1FileStream Open(string path, FileMode mode)
        {
            return new C1FileStream(path, mode);
        }



        public C1FileStream Open(string path, FileMode mode, FileAccess access)
        {
            return new C1FileStream(path, mode, access);
        }



        public C1FileStream Open(string path, FileMode mode, FileAccess access, FileShare share)
        {
            return new C1FileStream(path, mode, access, share);
        }



        public C1FileStream OpenRead(string path)
        {
            return new C1FileStream(path, FileMode.Open, FileAccess.Read, FileShare.Read);
        }



        public Core.IO.StreamReader OpenText(string path)
        {
            return new Core.IO.StreamReader(path);
        }



        public C1FileStream OpenWrite(string path)
        {
            return new C1FileStream(path, FileMode.OpenOrCreate, FileAccess.Write, FileShare.None);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass")]
        public byte[] ReadAllBytes(string path)
        {
            return File.ReadAllBytes(path);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass")]
        public string[] ReadAllLines(string path)
        {
            return File.ReadAllLines(path);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass")]
        public string[] ReadAllLines(string path, Encoding encoding)
        {
            return File.ReadAllLines(path, encoding);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass")]
        public string ReadAllText(string path)
        {
            return File.ReadAllText(path);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass")]
        public string ReadAllText(string path, Encoding encoding)
        {
            return File.ReadAllText(path, encoding);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass")]
        public IEnumerable<string> ReadLines(string path)
        {
            return File.ReadLines(path);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass")]
        public IEnumerable<string> ReadLines(string path, Encoding encoding)
        {
            return File.ReadLines(path, encoding);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass")]
        public void WriteAllBytes(string path, byte[] bytes)
        {
            File.WriteAllBytes(path, bytes);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass")]
        public void WriteAllLines(string path, IEnumerable<string> contents)
        {
            File.WriteAllLines(path, contents);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass")]
        public void WriteAllLines(string path, IEnumerable<string> contents, Encoding encoding)
        {
            File.WriteAllLines(path, contents, encoding);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass")]
        public void WriteAllLines(string path, string[] contents)
        {
            File.WriteAllLines(path, contents);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass")]
        public void WriteAllLines(string path, string[] contents, Encoding encoding)
        {
            File.WriteAllLines(path, contents, encoding);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass")]
        public void WriteAllText(string path, string contents)
        {
            File.WriteAllText(path, contents);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass")]
        public void WriteAllText(string path, string contents, Encoding encoding)
        {
            File.WriteAllText(path, contents, encoding);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass")]
        public FileAttributes GetAttributes(string path)
        {
            return File.GetAttributes(path);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass")]
        public void SetAttributes(string path, FileAttributes fileAttributes)
        {
            File.SetAttributes(path, fileAttributes);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass")]
        public DateTime GetCreationTime(string path)
        {
            return File.GetCreationTime(path);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass")]
        public DateTime GetCreationTimeUtc(string path)
        {
            return File.GetCreationTimeUtc(path);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass")]
        public void SetCreationTime(string path, DateTime creationTime)
        {
            File.SetCreationTime(path, creationTime);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass")]
        public void SetCreationTimeUtc(string path, DateTime creationTimeUtc)
        {
            File.SetCreationTimeUtc(path, creationTimeUtc);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass")]
        public DateTime GetLastAccessTime(string path)
        {
            return File.GetLastAccessTime(path);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass")]
        public DateTime GetLastAccessTimeUtc(string path)
        {
            return File.GetLastAccessTimeUtc(path);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass")]
        public void SetLastAccessTime(string path, DateTime lastAccessTime)
        {
            File.SetLastAccessTime(path, lastAccessTime);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass")]
        public void SetLastAccessTimeUtc(string path, DateTime lastAccessTimeUtc)
        {
            File.SetLastAccessTimeUtc(path, lastAccessTimeUtc);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass")]
        public DateTime GetLastWriteTime(string path)
        {
            return File.GetLastWriteTime(path);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass")]
        public DateTime GetLastWriteTimeUtc(string path)
        {
            return File.GetLastWriteTimeUtc(path);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass")]
        public void SetLastWriteTime(string path, DateTime lastWriteTime)
        {
            File.SetLastWriteTime(path, lastWriteTime);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass")]
        public void SetLastWriteTimeUtc(string path, DateTime lastWriteTimeUtc)
        {
            File.SetLastWriteTimeUtc(path, lastWriteTimeUtc);
        }
    }



    public class LocalC1FileStream : IC1FileStream
    {
        private FileStream _fileStream;



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileStreamClass:DoNotUseFileStreamClass")]
        public LocalC1FileStream(string path, FileMode mode, FileAccess access, FileShare share)
        {
            _fileStream = new System.IO.FileStream(path, mode, access, share);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileStreamClass:DoNotUseFileStreamClass")]
        public string Name
        {
            get
            {
                return _fileStream.Name;
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileStreamClass:DoNotUseFileStreamClass")]
        public long Length
        {
            get
            {
                return _fileStream.Length;
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileStreamClass:DoNotUseFileStreamClass")]
        public void SetLength(long value)
        {
            _fileStream.SetLength(value);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileStreamClass:DoNotUseFileStreamClass")]
        public long Position
        {
            get
            {
                return _fileStream.Position;
            }
            set
            {
                _fileStream.Position = value;
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileStreamClass:DoNotUseFileStreamClass")]
        public int Read(byte[] array, int offset, int count)
        {
            return _fileStream.Read(array, offset, count);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileStreamClass:DoNotUseFileStreamClass")]
        public int ReadByte()
        {
            return _fileStream.ReadByte();
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileStreamClass:DoNotUseFileStreamClass")]
        public void Write(byte[] array, int offset, int count)
        {
            _fileStream.Write(array, offset, count);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileStreamClass:DoNotUseFileStreamClass")]
        public void WriteByte(byte value)
        {
            _fileStream.WriteByte(value);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileStreamClass:DoNotUseFileStreamClass")]
        public long Seek(long offset, SeekOrigin origin)
        {
            return _fileStream.Seek(offset, origin);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileStreamClass:DoNotUseFileStreamClass")]
        public bool CanRead
        {
            get
            {
                return _fileStream.CanRead;
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileStreamClass:DoNotUseFileStreamClass")]
        public bool CanSeek
        {
            get
            {
                return _fileStream.CanSeek;
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileStreamClass:DoNotUseFileStreamClass")]
        public bool CanWrite
        {
            get
            {
                return _fileStream.CanWrite;
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileStreamClass:DoNotUseFileStreamClass")]
        public void Flush()
        {
            _fileStream.Flush();
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileStreamClass:DoNotUseFileStreamClass")]
        public void Flush(bool flushToDisk)
        {
            _fileStream.Flush(flushToDisk);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileStreamClass:DoNotUseFileStreamClass")]
        public void Close()
        {
            _fileStream.Close();
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileStreamClass:DoNotUseFileStreamClass")]
        public void Dispose()
        {
            _fileStream.Dispose();
        }
    }




    public class LocalC1FileSystemWatcher : IC1FileSystemWatcher
    {
        private FileSystemWatcher _fileSystemWatcher;


        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileSystemWatcherClass:DoNotUseFileSystemWatcherClass")]
        public LocalC1FileSystemWatcher(string path, string filter)
        {
            _fileSystemWatcher = new FileSystemWatcher(path, filter);
        }




        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileSystemWatcherClass:DoNotUseFileSystemWatcherClass")]
        public bool EnableRaisingEvents 
        {
            get
            {
                return _fileSystemWatcher.EnableRaisingEvents;
            }
            set
            {
                _fileSystemWatcher.EnableRaisingEvents = value;
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileSystemWatcherClass:DoNotUseFileSystemWatcherClass")]
        public string Path 
        {
            get
            {
                return _fileSystemWatcher.Path;
            }
            set
            {
                _fileSystemWatcher.Path = value;
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileSystemWatcherClass:DoNotUseFileSystemWatcherClass")]
        public string Filter 
        {
            get
            {
                return _fileSystemWatcher.Filter;
            }
            set
            {
                _fileSystemWatcher.Filter = value;
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileSystemWatcherClass:DoNotUseFileSystemWatcherClass")]
        public bool IncludeSubdirectories 
        {
            get
            {
                return _fileSystemWatcher.IncludeSubdirectories;
            }
            set
            {
                _fileSystemWatcher.IncludeSubdirectories = value;
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileSystemWatcherClass:DoNotUseFileSystemWatcherClass")]
        public event FileSystemEventHandler Created
        {
            add
            {
                _fileSystemWatcher.Created += value;
            }
            remove
            {
                _fileSystemWatcher.Created -= value;
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileSystemWatcherClass:DoNotUseFileSystemWatcherClass")]
        public event FileSystemEventHandler Changed
        {
            add
            {
                _fileSystemWatcher.Changed += value;
            }
            remove
            {
                _fileSystemWatcher.Changed -= value;
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileSystemWatcherClass:DoNotUseFileSystemWatcherClass")]
        public event RenamedEventHandler Renamed
        {
            add
            {
                _fileSystemWatcher.Renamed += value;
            }
            remove
            {
                _fileSystemWatcher.Renamed -= value;
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileSystemWatcherClass:DoNotUseFileSystemWatcherClass")]
        public event FileSystemEventHandler Deleted
        {
            add
            {
                _fileSystemWatcher.Deleted += value;
            }
            remove
            {
                _fileSystemWatcher.Deleted -= value;
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileSystemWatcherClass:DoNotUseFileSystemWatcherClass")]
        public event ErrorEventHandler Error
        {
            add
            {
                _fileSystemWatcher.Error += value;
            }
            remove
            {
                _fileSystemWatcher.Error -= value;
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileSystemWatcherClass:DoNotUseFileSystemWatcherClass")]
        public NotifyFilters NotifyFilter 
        {
            get
            {
                return _fileSystemWatcher.NotifyFilter;
            }
            set
            {
                _fileSystemWatcher.NotifyFilter = value;
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileSystemWatcherClass:DoNotUseFileSystemWatcherClass")]
        public void BeginInit()
        {
            _fileSystemWatcher.BeginInit();
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileSystemWatcherClass:DoNotUseFileSystemWatcherClass")]
        public void EndInit()
        {
            _fileSystemWatcher.EndInit();
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileSystemWatcherClass:DoNotUseFileSystemWatcherClass")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseWaitForChangedResultClass:DoNotUseWaitForChangedResultClass")]
        public C1WaitForChangedResult WaitForChanged(WatcherChangeTypes changeType)
        {
            WaitForChangedResult result = _fileSystemWatcher.WaitForChanged(changeType);

            return new C1WaitForChangedResult
            {
                Name = result.Name,
                OldName = result.OldName, 
                ChangeType = result.ChangeType,
                TimedOut = result.TimedOut
            };
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileSystemWatcherClass:DoNotUseFileSystemWatcherClass")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseWaitForChangedResultClass:DoNotUseWaitForChangedResultClass")]
        public C1WaitForChangedResult WaitForChanged(WatcherChangeTypes changeType, int timeout)
        {
            WaitForChangedResult result = _fileSystemWatcher.WaitForChanged(changeType, timeout);

            return new C1WaitForChangedResult
            {
                Name = result.Name,
                OldName = result.OldName,
                ChangeType = result.ChangeType,
                
                TimedOut = result.TimedOut
            };
        }
    }
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





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
        Composite.Core.IO.StreamWriter CreateText(string path);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        Composite.Core.IO.StreamWriter AppendText(string path);


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
        Composite.Core.IO.StreamReader OpenText(string path);


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



    /// <summary>
    /// IOLayer - documentation pending
    /// </summary>
    public interface IC1FileStream : IDisposable
    {
        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        string Name { get; }


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        long Length { get; }


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        void SetLength(long value);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        long Position { get; set; }


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="array"></param>
        /// <param name="offset"></param>
        /// <param name="count"></param>
        /// <returns></returns>
        int Read(byte[] array, int offset, int count);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <returns></returns>
        int ReadByte();


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="array"></param>
        /// <param name="offset"></param>
        /// <param name="count"></param>
        void Write(byte[] array, int offset, int count);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        void WriteByte(byte value);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="offset"></param>
        /// <param name="origin"></param>
        /// <returns></returns>
        long Seek(long offset, System.IO.SeekOrigin origin);
        

        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        bool CanRead { get; }


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        bool CanSeek { get; }


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        bool CanWrite { get; }


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        void Flush();


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="flushToDisk"></param>
        void Flush(bool flushToDisk);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        void Close();
    }



    /// <summary>
    /// IOLayer - documentation pending
    /// </summary>
    public interface IC1FileSystemWatcher
    {
        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        bool EnableRaisingEvents { get; set; }


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        string Path { get; set; }


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        string Filter { get; set; }


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        bool IncludeSubdirectories { get; set; }


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        event FileSystemEventHandler Created;


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        event FileSystemEventHandler Changed;


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        event RenamedEventHandler Renamed;


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        event FileSystemEventHandler Deleted;


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        event ErrorEventHandler Error;


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>        
        NotifyFilters NotifyFilter { get; set; }


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        void BeginInit();


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        void EndInit();


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="changeType"></param>
        /// <returns></returns>
        C1WaitForChangedResult WaitForChanged(WatcherChangeTypes changeType);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="changeType"></param>
        /// <param name="timeout"></param>
        /// <returns></returns>
        C1WaitForChangedResult WaitForChanged(WatcherChangeTypes changeType, int timeout);
    }








    internal interface IIOProvider
    {
        IC1Directory C1Directory { get; }
        IC1File C1File { get; }


        IC1FileStream CreateFileStream(string path, FileMode mode, FileAccess access, FileShare share);
        IC1FileSystemWatcher CreateFileSystemWatcher(string path, string filter);

        // --- Classes/Structs ---
        // static Directory
        // static File
        // FileStream
        // FileSystemWatcher
        // StreamReader
        // StreamWriter
        // WaitForChangedResult
        // Configuration
        // FileConfigurationSource
        // FileConfigurationSourceImplementation??


        // --- Methods ---
        // XDocumentUtils.Load
        // XDocumentUtils.Save
        // XElementUtils.Load
        // XElementUtils.SaveToPath
        // XmlReaderUtils.Create
        // XmlSchemaSetUtils.AddFromPath
        // XmlWriterUtils.Create
        // XslCompiledTransformUtils.LoadFromPath 
    }

}



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



namespace Composite.Core.IO
{
    internal static class IOFacade
    {
        public static IC1Directory C1Directory
        {
            get
            {
                return new LocalC1Directory();
            }
        }



        public static IC1File C1File
        {
            get
            {
                return new LocalC1File();
            }
        }



        public static IC1FileStream CreateFileStream(string path, FileMode mode, FileAccess access, FileShare share)
        {
            return new LocalC1FileStream(path, mode, access, share);
        }



        public static IC1FileSystemWatcher CreateFileSystemWatcher(string path, string filter)
        {
            return new LocalC1FileSystemWatcher(path, filter);
        }
    }
}



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




namespace Martin
{

#warning MRJ: Delete this class
    public static class MRJTest
    {
        public static void Hans()
        {
            // Ex 1 - Static method
            // Old: Directory.GetDirectories("c:\\")
            string[] directories = C1Directory.GetDirectories("c:\\");


            C1Directory.CreateDirectory("lkj");

            // Ex 2 - Class
            // Old: new FileStream("abe.txt", FileMode.Create)
            using (C1FileStream fileStream = new C1FileStream("c:\\abe.txt", FileMode.Create))
            {
                byte[] bytes = { 65, 13, 10 };

                fileStream.Write(bytes, 0, bytes.Length);
            }


            /*
            // Ex 2 - Static method
            // Old: File.AppendAllText("abe.txt", "Some some");
            IOFacade.File.AppendAllText("abe.txt", "Some some");



            



            // Ex 4 - Non-static method (solved by overload)
            // Old: XDocument.Load("abe.txt");
            XDocument doc1 = IOFacade.LoadXDocument("abe.txt");
            // VS
            XDocument doc2 = XDocumentUtils.Load("abe.txt"); // This is just an overload using C1FileStream



            // Ex 5 - Non-static method (solved by overload)
            XmlReaderSettings xmlReaderSettings = new XmlReaderSettings();
            // Old: xmlReaderSettings.Schemas.Add(null, "monkey.xsd");
            // IOFacade.AddFromPath(xmlReaderSettings, null, "monkey.xsd"); // Overload added to IOFacade
            xmlReaderSettings.Schemas.AddFromPath(null, "monkey.xsd");
            // VS
            // XmlSchemaSetUtils.AddFromPath(xmlReaderSettings, null, "monkey.xsd"); // Overload added to XmlSchemaSetUtils
            xmlReaderSettings.Schemas.AddFromPath(null, "monkey.xsd"); // This is just an overload using C1FileStream*/
        }
    }
}
