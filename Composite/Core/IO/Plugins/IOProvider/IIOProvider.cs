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
        /// <param name="path"></param>
        /// <param name="directorySecurity"></param>
        /// <returns></returns>
        public virtual DirectoryInfo CreateDirectory(string path, DirectorySecurity directorySecurity)
        {
            return IOFacade.C1Directory.CreateDirectory(path, directorySecurity);
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
        /// <param name="path"></param>
        /// <param name="directorySecurity"></param>
        /// <returns></returns>
        public static DirectoryInfo CreateDirectory(string path, DirectorySecurity directorySecurity)
        {
            return ImplementationFactory.CurrentFactory.StatelessC1Directory.CreateDirectory(path, directorySecurity);
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


}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

namespace Composite.Plugins.IO.IOProviders.LocalIOPorivder
{
    public class LocalC1Directory : IC1Directory
    {
        public DirectoryInfo CreateDirectory(string path)
        {
            return System.IO.Directory.CreateDirectory(path);
        }



        public DirectoryInfo CreateDirectory(string path, DirectorySecurity directorySecurity)
        {
            return System.IO.Directory.CreateDirectory(path, directorySecurity);
        }



        public void Delete(string path)
        {
            System.IO.Directory.Delete(path);
        }



        public void Delete(string path, bool recursive)
        {
            System.IO.Directory.Delete(path, recursive);
        }



        public void Move(string sourceDirName, string destDirName)
        {
            System.IO.Directory.Move(sourceDirName, destDirName);
        }



        public bool Exists(string path)
        {
            return System.IO.Directory.Exists(path);
        }



        public string GetCurrentDirectory()
        {
            return System.IO.Directory.GetCurrentDirectory();
        }



        public void SetCurrentDirectory(string path)
        {
            System.IO.Directory.SetCurrentDirectory(path);
        }



        public DirectoryInfo GetParent(string path)
        {
            return System.IO.Directory.GetParent(path);
        }



        public string GetDirectoryRoot(string path)
        {
            return System.IO.Directory.GetDirectoryRoot(path);
        }



        public string[] GetDirectories(string path)
        {
            return System.IO.Directory.GetDirectories(path);
        }



        public string[] GetDirectories(string path, string searchPattern)
        {
            return System.IO.Directory.GetDirectories(path, searchPattern);
        }



        public string[] GetDirectories(string path, string searchPattern, SearchOption searchOption)
        {
            return System.IO.Directory.GetDirectories(path, searchPattern, searchOption);
        }



        public string[] GetFiles(string path)
        {
            return System.IO.Directory.GetFiles(path);
        }



        public string[] GetFiles(string path, string searchPattern)
        {
            return System.IO.Directory.GetFiles(path, searchPattern);
        }



        public string[] GetFiles(string path, string searchPattern, SearchOption searchOption)
        {
            return System.IO.Directory.GetFiles(path, searchPattern, searchOption);
        }



        public DateTime GetCreationTime(string path)
        {
            return System.IO.Directory.GetCreationTime(path);
        }



        public DateTime GetCreationTimeUtc(string path)
        {
            return System.IO.Directory.GetCreationTimeUtc(path);
        }
    }



    public class LocalC1FileStream : IC1FileStream
    {
        private System.IO.FileStream _fileStream;


        public LocalC1FileStream(string path, FileMode mode, FileAccess access, FileShare share)
        {
            _fileStream = new System.IO.FileStream(path, mode, access, share);
        }



        public string Name
        {
            get
            {
                return _fileStream.Name;
            }
        }



        public long Length
        {
            get
            {
                return _fileStream.Length;
            }
        }



        public void SetLength(long value)
        {
            _fileStream.SetLength(value);
        }



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



        public int Read(byte[] array, int offset, int count)
        {
            return _fileStream.Read(array, offset, count);
        }



        public int ReadByte()
        {
            return _fileStream.ReadByte();
        }



        public void Write(byte[] array, int offset, int count)
        {
            _fileStream.Write(array, offset, count);
        }



        public void WriteByte(byte value)
        {
            _fileStream.WriteByte(value);
        }



        public long Seek(long offset, SeekOrigin origin)
        {
            return _fileStream.Seek(offset, origin);
        }



        public bool CanRead
        {
            get
            {
                return _fileStream.CanRead;
            }
        }



        public bool CanSeek
        {
            get
            {
                return _fileStream.CanSeek;
            }
        }



        public bool CanWrite
        {
            get
            {
                return _fileStream.CanWrite;
            }
        }



        public void Flush()
        {
            _fileStream.Flush();
        }



        public void Flush(bool flushToDisk)
        {
            _fileStream.Flush(flushToDisk);
        }



        public void Close()
        {
            _fileStream.Close();
        }



        public void Dispose()
        {
            _fileStream.Dispose();
        }
    }
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





namespace Composite.Core.IO.Plugins.IOProvider
{
    public interface IC1Directory
    {
        DirectoryInfo CreateDirectory(string path);
        DirectoryInfo CreateDirectory(string path, DirectorySecurity directorySecurity);
        void Delete(string path);
        void Delete(string path, bool recursive);
        void Move(string sourceDirName, string destDirName);
        bool Exists(string path);
        string GetCurrentDirectory();
        void SetCurrentDirectory(string path);
        DirectoryInfo GetParent(string path);
        string GetDirectoryRoot(string path);
        string[] GetDirectories(string path);
        string[] GetDirectories(string path, string searchPattern);
        string[] GetDirectories(string path, string searchPattern, SearchOption searchOption);
        string[] GetFiles(string path);
        string[] GetFiles(string path, string searchPattern);
        string[] GetFiles(string path, string searchPattern, SearchOption searchOption);
        DateTime GetCreationTime(string path);
        DateTime GetCreationTimeUtc(string path);
    }



    public interface IC1FileStream : IDisposable
    {
        string Name { get; }
        long Length { get; }
        void SetLength(long value);
        long Position { get; set; }
        int Read(byte[] array, int offset, int count);
        int ReadByte();
        void Write(byte[] array, int offset, int count);
        void WriteByte(byte value);
        long Seek(long offset, System.IO.SeekOrigin origin);
        bool CanRead { get; }
        bool CanSeek { get; }
        bool CanWrite { get; }
        void Flush();
        void Flush(bool flushToDisk);
        void Close();
    }



    internal interface IIOProvider
    {

        IC1FileStream CreateFileStream(string path, FileMode mode, FileAccess access, FileShare share);
        IC1Directory C1Directory { get; }


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

        public static IC1FileStream CreateFileStream(string path, FileMode mode, FileAccess access, FileShare share)
        {
            return new LocalC1FileStream(path, mode, access, share);
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
