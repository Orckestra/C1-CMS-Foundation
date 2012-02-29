using System;
using System.IO;
using System.Security.AccessControl;
using Composite.Core.IO;
using Composite.Core.IO.Plugins.IOProvider;


namespace Composite.Plugins.IO.IOProviders.LocalIOProvider
{
    internal class LocalC1Directory : IC1Directory
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileSystemInfoClass:DotNotUseFileSystemInfoClass")]
        public C1DirectoryInfo CreateDirectory(string path)
        {
            return new C1DirectoryInfo(Directory.CreateDirectory(path).FullName);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass")]
        public void Delete(string path)
        {
            Directory.Delete(path);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass")]
        public void Delete(string path, bool recursive)
        {
            Directory.Delete(path, recursive);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass")]
        public void Move(string sourceDirName, string destDirName)
        {
            Directory.Move(sourceDirName, destDirName);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass")]
        public bool Exists(string path)
        {
            return Directory.Exists(path);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass")]
        public string GetCurrentDirectory()
        {
            return Directory.GetCurrentDirectory();
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass")]
        public void SetCurrentDirectory(string path)
        {
            Directory.SetCurrentDirectory(path);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseFileSystemInfoClass:DotNotUseFileSystemInfoClass")]
        public C1DirectoryInfo GetParent(string path)
        {
            return new C1DirectoryInfo(Directory.GetParent(path).FullName);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass")]
        public string GetDirectoryRoot(string path)
        {
            return Directory.GetDirectoryRoot(path);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass")]
        public string[] GetDirectories(string path)
        {
            return Directory.GetDirectories(path);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass")]
        public string[] GetDirectories(string path, string searchPattern)
        {
            return Directory.GetDirectories(path, searchPattern);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass")]
        public string[] GetDirectories(string path, string searchPattern, SearchOption searchOption)
        {
            return Directory.GetDirectories(path, searchPattern, searchOption);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass")]
        public string[] GetFiles(string path)
        {
            return Directory.GetFiles(path);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass")]
        public string[] GetFiles(string path, string searchPattern)
        {
            return Directory.GetFiles(path, searchPattern);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass")]
        public string[] GetFiles(string path, string searchPattern, SearchOption searchOption)
        {
            return Directory.GetFiles(path, searchPattern, searchOption);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass")]
        public DateTime GetCreationTime(string path)
        {
            return Directory.GetCreationTime(path);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass")]
        public DateTime GetCreationTimeUtc(string path)
        {
            return Directory.GetCreationTimeUtc(path);
        }

        /// <summary>
        /// Gets a <see cref="System.Security.AccessControl.DirectorySecurity" /> object that encapsulates the access control list (ACL) entries for a specified directory.
        /// </summary>
        /// <param name="path">The path to a directory</param>
        /// <returns>A <see cref="System.Security.AccessControl.DirectorySecurity" /> object that encapsulates the access control rules for the file described by the <param name="path"></param> parameter.</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass")]
        public DirectorySecurity GetAccessControl(string path)
        {
            return Directory.GetAccessControl(path);
        }
    }
}
