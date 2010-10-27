using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Security;
using System.Runtime;
using System.Runtime.InteropServices;

namespace Composite.Core.NewIO
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class File
    {
        // THIS IS NOT A PART OF System.IO.File
        public static long GetLength(string path)
        {
            System.IO.FileInfo fileInfo = new System.IO.FileInfo(path);

            return fileInfo.Length; 
        }


        //[SecuritySafeCritical]
        //public static void AppendAllLines(string path, IEnumerable<string> contents){ throw new NotImplementedException(); }
        //[SecuritySafeCritical]
        //public static void AppendAllLines(string path, IEnumerable<string> contents, Encoding encoding){ throw new NotImplementedException(); }
        //[SecuritySafeCritical]



        public static void AppendAllText(string path, string contents)
        {
            System.IO.File.AppendAllText(path, contents);
        }
        
        //[SecuritySafeCritical]
        //public static void AppendAllText(string path, string contents, Encoding encoding){ throw new NotImplementedException(); }
        //[SecuritySafeCritical]
        //public static StreamWriter AppendText(string path){ throw new NotImplementedException(); }
        
        public static void Copy(string sourceFileName, string destFileName)
        {
            System.IO.File.Copy(sourceFileName, destFileName); 
        }
        
        public static void Copy(string sourceFileName, string destFileName, bool overwrite)
        {
            System.IO.File.Copy(sourceFileName, destFileName, overwrite);
        }
        
        //[SecuritySafeCritical, TargetedPatchingOptOut("Performance critical to inline this type of method across NGen image boundaries")]
        
        public static FileStream Create(string path)
        {
            return new FileStream(System.IO.File.Create(path)); 
        }
        
        //[SecuritySafeCritical, TargetedPatchingOptOut("Performance critical to inline this type of method across NGen image boundaries")]
        //public static FileStream Create(string path, int bufferSize){ throw new NotImplementedException(); }
        //[SecuritySafeCritical]
        //public static FileStream Create(string path, int bufferSize, System.IO.FileOptions options){ throw new NotImplementedException(); }
        //public static FileStream Create(string path, int bufferSize, System.IO.FileOptions options, System.Security.AccessControl.FileSecurity fileSecurity){ throw new NotImplementedException(); }
        //[SecuritySafeCritical]
        //public static StreamWriter CreateText(string path){ throw new NotImplementedException(); }
        //[SecuritySafeCritical]
        //public static void Decrypt(string path){ throw new NotImplementedException(); }
        //[SecuritySafeCritical]
        
        public static void Delete(string path)
        {
            System.IO.File.Delete(path);
        }
        
        //[SecuritySafeCritical]
        //public static void Encrypt(string path){ throw new NotImplementedException(); }
        //[SecuritySafeCritical]
        
        public static bool Exists(string path)
        {
            return System.IO.File.Exists(path);
        }
        
        //[TargetedPatchingOptOut("Performance critical to inline this type of method across NGen image boundaries")]
        //public static System.Security.AccessControl.FileSecurity GetAccessControl(string path){ throw new NotImplementedException(); }
        //public static System.Security.AccessControl.FileSecurity GetAccessControl(string path, System.Security.AccessControl.AccessControlSections includeSections){ throw new NotImplementedException(); }
        //[SecuritySafeCritical]
        
        public static System.IO.FileAttributes GetAttributes(string path)
        {
            return System.IO.File.GetAttributes(path); 
        }
        
        //[SecuritySafeCritical]
        
        public static DateTime GetCreationTime(string path)
        {
            return System.IO.File.GetCreationTime(path); 
        }
        
        //[SecuritySafeCritical]
        //public static DateTime GetCreationTimeUtc(string path){ throw new NotImplementedException(); }
        //[SecuritySafeCritical]
        //public static DateTime GetLastAccessTime(string path){ throw new NotImplementedException(); }
        //[SecuritySafeCritical]
        //public static DateTime GetLastAccessTimeUtc(string path){ throw new NotImplementedException(); }
        //[SecuritySafeCritical]
        
        public static DateTime GetLastWriteTime(string path)
        {
            return System.IO.File.GetLastWriteTime(path);
        }
        
        //[SecuritySafeCritical]
        //public static DateTime GetLastWriteTimeUtc(string path){ throw new NotImplementedException(); }
        //[SecuritySafeCritical]
        
        public static void Move(string sourceFileName, string destFileName)
        {
            System.IO.File.Move(sourceFileName, destFileName); 
        }
        
        //[SecuritySafeCritical]
        
        public static FileStream Open(string path, System.IO.FileMode mode)
        {
            return new FileStream(System.IO.File.Open(path, mode)); 
        }
        
        //[SecuritySafeCritical, TargetedPatchingOptOut("Performance critical to inline this type of method across NGen image boundaries")]
        
        public static FileStream Open(string path, System.IO.FileMode mode, System.IO.FileAccess access)
        { 
            return new FileStream(System.IO.File.Open(path, mode, access));
        }
        
        //[SecuritySafeCritical]
        
        public static FileStream Open(string path, System.IO.FileMode mode, System.IO.FileAccess access, System.IO.FileShare share)
        { 
            return new FileStream(System.IO.File.Open(path, mode, access, share)); 
        }
        
        //[SecuritySafeCritical]
        
        public static FileStream OpenRead(string path)
        {
            return new FileStream(System.IO.File.OpenRead(path));    
        }
        
        //[SecuritySafeCritical]
        //public static StreamReader OpenText(string path){ throw new NotImplementedException(); }
        //[SecuritySafeCritical]
        //public static FileStream OpenWrite(string path){ throw new NotImplementedException(); }
        //[SecuritySafeCritical]
        
        public static byte[] ReadAllBytes(string path)
        {
            return System.IO.File.ReadAllBytes(path);
        }
        
        //[SecuritySafeCritical]
        
        public static string[] ReadAllLines(string path)
        {
            return System.IO.File.ReadAllLines(path); 
        }
        
        //[SecuritySafeCritical]
        //public static string[] ReadAllLines(string path, Encoding encoding){ throw new NotImplementedException(); }
        //[SecuritySafeCritical]
        
        public static string ReadAllText(string path)
        {
            return System.IO.File.ReadAllText(path); 
        }
        
        //[SecuritySafeCritical]
        //public static string ReadAllText(string path, Encoding encoding){ throw new NotImplementedException(); }
        //[SecuritySafeCritical]
        //public static IEnumerable<string> ReadLines(string path){ throw new NotImplementedException(); }
        //[SecuritySafeCritical]
        //public static IEnumerable<string> ReadLines(string path, Encoding encoding){ throw new NotImplementedException(); }
        //public static void Replace(string sourceFileName, string destinationFileName, string destinationBackupFileName){ throw new NotImplementedException(); }
        //[SecuritySafeCritical]
        //public static void Replace(string sourceFileName, string destinationFileName, string destinationBackupFileName, bool ignoreMetadataErrors){ throw new NotImplementedException(); }
        //[SecuritySafeCritical]
        //public static void SetAccessControl(string path, System.Security.AccessControl.FileSecurity fileSecurity){ throw new NotImplementedException(); }
        //[SecuritySafeCritical]
        
        public static void SetAttributes(string path, System.IO.FileAttributes fileAttributes)
        {
            System.IO.File.SetAttributes(path, fileAttributes); 
        }
        

        public static void SetCreationTime(string path, DateTime creationTime)
        {
            System.IO.File.SetCreationTime(path, creationTime); 
        }
        //[SecuritySafeCritical]
        //public static void SetCreationTimeUtc(string path, DateTime creationTimeUtc){ throw new NotImplementedException(); }
        //public static void SetLastAccessTime(string path, DateTime lastAccessTime){ throw new NotImplementedException(); }
        //[SecuritySafeCritical]
        //public static void SetLastAccessTimeUtc(string path, DateTime lastAccessTimeUtc){ throw new NotImplementedException(); }
        


        public static void SetLastWriteTime(string path, DateTime lastWriteTime)
        {
            System.IO.File.SetLastWriteTime(path, lastWriteTime);
        }


        //[SecuritySafeCritical]
        //public static void SetLastWriteTimeUtc(string path, DateTime lastWriteTimeUtc){ throw new NotImplementedException(); }
        //[SecuritySafeCritical]
        //public static void WriteAllBytes(string path, byte[] bytes){ throw new NotImplementedException(); }
        //[SecuritySafeCritical]
        
        public static void WriteAllLines(string path, IEnumerable<string> contents)
        { 
            System.IO.File.WriteAllLines(path, contents); 
        }
        
        //[SecuritySafeCritical]
        //public static void WriteAllLines(string path, string[] contents){ throw new NotImplementedException(); }
        //[SecuritySafeCritical]
        //public static void WriteAllLines(string path, IEnumerable<string> contents, Encoding encoding){ throw new NotImplementedException(); }
        //[SecuritySafeCritical]
        //public static void WriteAllLines(string path, string[] contents, Encoding encoding){ throw new NotImplementedException(); }
        //[SecuritySafeCritical]
        
        public static void WriteAllText(string path, string contents)
        {
            System.IO.File.WriteAllText(path, contents); 
        }
        
        //[SecuritySafeCritical]
        
        public static void WriteAllText(string path, string contents, Encoding encoding)
        {
            System.IO.File.WriteAllText(path, contents, encoding); 
        }
    }
}
