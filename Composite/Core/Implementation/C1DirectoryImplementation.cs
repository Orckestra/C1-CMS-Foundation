using System;
using System.IO;
using Composite.Core.IO;


namespace Composite.Core.Implementation
{
    /// <summary>
    /// Implementation of <see cref="Composite.Core.IO.C1Directory"/>.
    /// </summary>
    public class C1DirectoryImplementation
    {
        /// <summary>
        /// See <see cref="Composite.Core.IO.C1Directory"/>.
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public virtual C1DirectoryInfo CreateDirectory(string path)
        {
            return IOFacade.C1Directory.CreateDirectory(path);
        }



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1Directory"/>.
        /// </summary>
        /// <param name="sourceDirName"></param>
        /// <param name="destinationDirName"></param>        
        public virtual void Move(string sourceDirName, string destinationDirName)
        {
            IOFacade.C1Directory.Move(sourceDirName, destinationDirName);
        }



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1Directory"/>.
        /// </summary>
        /// <param name="path"></param>
        public virtual void Delete(string path)
        {
            IOFacade.C1Directory.Delete(path);
        }



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1Directory"/>.
        /// </summary>
        /// <param name="path"></param>
        /// <param name="recursive"></param>
        public virtual void Delete(string path, bool recursive)
        {
            IOFacade.C1Directory.Delete(path, recursive);
        }



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1Directory"/>.
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public virtual bool Exists(string path)
        {
            return IOFacade.C1Directory.Exists(path);
        }



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1Directory"/>.
        /// </summary>
        /// <returns></returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1024:UsePropertiesWhereAppropriate")]
        public virtual string GetCurrentDirectory()
        {
            return IOFacade.C1Directory.GetCurrentDirectory();
        }



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1Directory"/>.
        /// </summary>
        /// <param name="path"></param>
        public virtual void SetCurrentDirectory(string path)
        {
            IOFacade.C1Directory.SetCurrentDirectory(path);
        }



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1Directory"/>.
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public virtual C1DirectoryInfo GetParent(string path)
        {
            return IOFacade.C1Directory.GetParent(path);
        }



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1Directory"/>.
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public virtual string GetDirectoryRoot(string path)
        {
            return IOFacade.C1Directory.GetDirectoryRoot(path);
        }



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1Directory"/>.
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public virtual string[] GetDirectories(string path)
        {
            return IOFacade.C1Directory.GetDirectories(path);
        }



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1Directory"/>.
        /// </summary>
        /// <param name="path"></param>
        /// <param name="searchPattern"></param>
        /// <returns></returns>
        public virtual string[] GetDirectories(string path, string searchPattern)
        {
            return IOFacade.C1Directory.GetDirectories(path, searchPattern);
        }



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1Directory"/>.
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
        /// See <see cref="Composite.Core.IO.C1Directory"/>.
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public virtual string[] GetFiles(string path)
        {
            return IOFacade.C1Directory.GetFiles(path);
        }



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1Directory"/>.
        /// </summary>
        /// <param name="path"></param>
        /// <param name="searchPattern"></param>
        /// <returns></returns>
        public virtual string[] GetFiles(string path, string searchPattern)
        {
            return IOFacade.C1Directory.GetFiles(path, searchPattern);
        }



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1Directory"/>.
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
        /// See <see cref="Composite.Core.IO.C1Directory"/>.
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public virtual DateTime GetCreationTime(string path)
        {
            return IOFacade.C1Directory.GetCreationTime(path);
        }



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1Directory"/>.
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
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



        //public virtual void SetAccessControl(string path, DirectorySecurity directorySecurity)
        //{
        //    throw new NotImplementedException();
        //}


        /// <exclude />
        public virtual void SetCreationTime(string path, DateTime creationTime)
        {
            IOFacade.C1Directory.SetCreationTime(path, creationTime);
            
        }


        /// <exclude />
        public virtual void SetCreationTimeUtc(string path, DateTime creationTimeUtc)
        {
            IOFacade.C1Directory.SetCreationTimeUtc(path, creationTimeUtc);
        }



        //public virtual string[] GetLogicalDrives()
        //{ 
        //    throw new NotImplementedException(); 
        //}



        //public virtual DateTime GetLastAccessTime(string path)
        //{ 
        //    throw new NotImplementedException(); 
        //}



        //public virtual void SetLastAccessTime(string path, DateTime lastAccessTime)
        //{ 
        //    throw new NotImplementedException(); 
        //}



        //public virtual DateTime GetLastAccessTimeUtc(string path)
        //{ 
        //    throw new NotImplementedException(); 
        //}



        //public virtual void SetLastAccessTimeUtc(string path, DateTime lastAccessTimeUtc)
        //{ 
        //    throw new NotImplementedException(); 
        //}



        //public virtual DateTime GetLastWriteTime(string path)
        //{ 
        //    throw new NotImplementedException(); 
        //}



        //public virtual void SetLastWriteTime(string path, DateTime lastWriteTime)
        //{ 
        //    throw new NotImplementedException(); 
        //}



        //public virtual DateTime GetLastWriteTimeUtc(string path)
        //{ 
        //    throw new NotImplementedException(); 
        //}



        //public virtual void SetLastWriteTimeUtc(string path, DateTime lastWriteTimeUtc)
        //{ 
        //    throw new NotImplementedException(); 
        //}
    }
}
