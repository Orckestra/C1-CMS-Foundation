using System;
using System.ComponentModel;
using System.IO;
using System.Runtime.InteropServices;
using System.Text;
using Microsoft.Win32.SafeHandles;

namespace Composite.Core.IO
{
    internal static class ReparsePointUtils
    {
        public static bool DirectoryIsReparsePoint(string directoryPath)
        {
            return (new C1DirectoryInfo(directoryPath).Attributes & FileAttributes.ReparsePoint) > 0;
        }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseDirectoryInfoClass:DotNotUseDirectoryInfoClass")]
        public static string GetDirectoryReparsePointTarget(string directoryPath)
        {
            var dirInfo = new DirectoryInfo(directoryPath);

            return GetSymbolicLinkTarget(dirInfo);
        }

        private const int CREATION_DISPOSITION_OPEN_EXISTING = 3;

        private const int FILE_FLAG_BACKUP_SEMANTICS = 0x02000000;

        // http://msdn.microsoft.com/en-us/library/aa364962%28VS.85%29.aspx
        [DllImport("kernel32.dll", EntryPoint = "GetFinalPathNameByHandleW", CharSet = CharSet.Unicode, SetLastError = true)]
        private static extern int GetFinalPathNameByHandle(IntPtr handle, [In, Out] StringBuilder path, int bufLen, int flags);

        // http://msdn.microsoft.com/en-us/library/aa363858(VS.85).aspx
        [DllImport("kernel32.dll", EntryPoint = "CreateFileW", CharSet = CharSet.Unicode, SetLastError = true)]
        private static extern SafeFileHandle CreateFile(string lpFileName, int dwDesiredAccess, int dwShareMode,
        IntPtr SecurityAttributes, int dwCreationDisposition, int dwFlagsAndAttributes, IntPtr hTemplateFile);

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseDirectoryInfoClass:DotNotUseDirectoryInfoClass")]
        private static string GetSymbolicLinkTarget(DirectoryInfo symlink)
        {
            SafeFileHandle directoryHandle = CreateFile(symlink.FullName, 0, 2, System.IntPtr.Zero, CREATION_DISPOSITION_OPEN_EXISTING, FILE_FLAG_BACKUP_SEMANTICS, System.IntPtr.Zero);
            if (directoryHandle.IsInvalid)
                throw new Win32Exception(Marshal.GetLastWin32Error());

            var path = new StringBuilder(512);
            int size = GetFinalPathNameByHandle(directoryHandle.DangerousGetHandle(), path, path.Capacity, 0);
            if (size < 0)
                throw new Win32Exception(Marshal.GetLastWin32Error());
            // The remarks section of GetFinalPathNameByHandle mentions the return being prefixed with "\\?\"
            // More information about "\\?\" here -> http://msdn.microsoft.com/en-us/library/aa365247(v=VS.85).aspx
            if (path[0] == '\\' && path[1] == '\\' && path[2] == '?' && path[3] == '\\')
            {
                return path.ToString().Substring(4); 
            }

            return path.ToString();
        }
    }
}
