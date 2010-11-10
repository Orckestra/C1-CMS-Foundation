using System;

namespace Composite.Core.IO
{
    /// <summary>
    /// This should be a part of the I/O layer
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class Directory11
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass", Justification = "The implementation may use it")]
        public static System.IO.DirectoryInfo CreateDirectory(string path)
        {
            return System.IO.Directory.CreateDirectory(path);
        }


        //public static DirectoryInfo CreateDirectory(string path, DirectorySecurity directorySecurity) { throw new NotImplementedException(); }


        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass", Justification = "The implementation may use it")]
        public static void Delete(string path)
        {
            System.IO.Directory.Delete(path);
        }


        //[SecuritySafeCritical]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass", Justification = "The implementation may use it")]
        public static void Delete(string path, bool recursive) 
        {
            System.IO.Directory.Delete(path, recursive); 
        }

        //public static IEnumerable<string> EnumerateDirectories(string path){ throw new NotImplementedException(); }
        //public static IEnumerable<string> EnumerateDirectories(string path, string searchPattern){ throw new NotImplementedException(); }
        //public static IEnumerable<string> EnumerateDirectories(string path, string searchPattern, System.IO.SearchOption searchOption){ throw new NotImplementedException(); }
        //public static IEnumerable<string> EnumerateFiles(string path){ throw new NotImplementedException(); }
        //public static IEnumerable<string> EnumerateFiles(string path, string searchPattern){ throw new NotImplementedException(); }
        //public static IEnumerable<string> EnumerateFiles(string path, string searchPattern, System.IO.SearchOption searchOption){ throw new NotImplementedException(); }
        //public static IEnumerable<string> EnumerateFileSystemEntries(string path){ throw new NotImplementedException(); }
        //public static IEnumerable<string> EnumerateFileSystemEntries(string path, string searchPattern){ throw new NotImplementedException(); }
        //public static IEnumerable<string> EnumerateFileSystemEntries(string path, string searchPattern, System.IO.SearchOption searchOption){ throw new NotImplementedException(); }
        //private static IEnumerable<string> EnumerateFileSystemNames(string path, string searchPattern, System.IO.SearchOption searchOption, bool includeFiles, bool includeDirs){ throw new NotImplementedException(); }
        //[SecuritySafeCritical]


        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass", Justification = "The implementation may use it")]
        public static bool Exists(string path)
        {
            return System.IO.Directory.Exists(path); 
        }
        
        //public static DirectorySecurity GetAccessControl(string path){ throw new NotImplementedException(); }
        //public static DirectorySecurity GetAccessControl(string path, AccessControlSections includeSections){ throw new NotImplementedException(); }
        //[SecuritySafeCritical]

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass", Justification = "The implementation may use it")]
        public static DateTime GetCreationTime(string path)
        {
            return System.IO.Directory.GetCreationTime(path); 
        }

        //[SecuritySafeCritical]
        //public static DateTime GetCreationTimeUtc(string path){ throw new NotImplementedException(); }
        //[SecuritySafeCritical]
        //public static string GetCurrentDirectory(){ throw new NotImplementedException(); }
        //internal static string GetDemandDir(string fullPath, bool thisDirOnly){ throw new NotImplementedException(); }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass", Justification = "The implementation may use it")]
        public static string[] GetDirectories(string path)
        {
            return System.IO.Directory.GetDirectories(path); 
        }
        
        //public static string[] GetDirectories(string path, string searchPattern)
        //{
        //    return System.IO.Directory.GetDirectories(path, searchPattern); 
        //}

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass", Justification = "The implementation may use it")]
        public static string[] GetDirectories(string path, string searchPattern, System.IO.SearchOption searchOption)
        {
            return System.IO.Directory.GetDirectories(path, searchPattern, searchOption); 
        }
        
        //[SecuritySafeCritical]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass", Justification = "The implementation may use it")]
        public static string GetDirectoryRoot(string path)
        {
            return System.IO.Directory.GetDirectoryRoot(path); 
        }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass", Justification = "The implementation may use it")]
        public static string[] GetFiles(string path)
        {
            return System.IO.Directory.GetFiles(path); 
        }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass", Justification = "The implementation may use it")]
        public static string[] GetFiles(string path, string searchPattern)
        {
            return System.IO.Directory.GetFiles(path, searchPattern); 
        }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass", Justification = "The implementation may use it")]
        public static string[] GetFiles(string path, string searchPattern, System.IO.SearchOption searchOption)
        {
            return System.IO.Directory.GetFiles(path, searchPattern, searchOption); 
        }
        
        //public static string[] GetFileSystemEntries(string path){ throw new NotImplementedException(); }
        //public static string[] GetFileSystemEntries(string path, string searchPattern){ throw new NotImplementedException(); }
        //public static string[] GetFileSystemEntries(string path, string searchPattern, System.IO.SearchOption searchOption){ throw new NotImplementedException(); }
        //[SecuritySafeCritical]
        //public static DateTime GetLastAccessTime(string path){ throw new NotImplementedException(); }
        //[SecuritySafeCritical]
        //public static DateTime GetLastAccessTimeUtc(string path){ throw new NotImplementedException(); }
        //[SecuritySafeCritical]
        //public static DateTime GetLastWriteTime(string path){ throw new NotImplementedException(); }
        //[SecuritySafeCritical]
        //public static DateTime GetLastWriteTimeUtc(string path){ throw new NotImplementedException(); }
        //[SecuritySafeCritical]
        //public static string[] GetLogicalDrives(){ throw new NotImplementedException(); }
        //[SecuritySafeCritical]
        //public static DirectoryInfo GetParent(string path){ throw new NotImplementedException(); }
        //[SecuritySafeCritical]

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass", Justification = "The implementation may use it")]
        public static void Move(string sourceDirName, string destDirName)
        {
            System.IO.Directory.Move(sourceDirName, destDirName); 
        }
        
        //[SecuritySafeCritical]
        //public static void SetAccessControl(string path, DirectorySecurity directorySecurity){ throw new NotImplementedException(); }
        //public static void SetCreationTime(string path, DateTime creationTime){ throw new NotImplementedException(); }
        //[SecuritySafeCritical]
        //public static void SetCreationTimeUtc(string path, DateTime creationTimeUtc){ throw new NotImplementedException(); }
        //[SecuritySafeCritical]
        //public static void SetCurrentDirectory(string path){ throw new NotImplementedException(); }
        //public static void SetLastAccessTime(string path, DateTime lastAccessTime){ throw new NotImplementedException(); }
        //[SecuritySafeCritical]
        //public static void SetLastAccessTimeUtc(string path, DateTime lastAccessTimeUtc){ throw new NotImplementedException(); }
        //public static void SetLastWriteTime(string path, DateTime lastWriteTime){ throw new NotImplementedException(); }
        //[SecuritySafeCritical]
        //public static void SetLastWriteTimeUtc(string path, DateTime lastWriteTimeUtc){ throw new NotImplementedException(); }       
    }
}
