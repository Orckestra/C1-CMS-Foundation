using System;
using System.ComponentModel;
using System.IO;
using System.Security.AccessControl;
using System.Security.Principal;
using System.Text;
using System.Web.Hosting;
using Composite.Core.Extensions;


namespace Composite.Core.IO
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [EditorBrowsable(EditorBrowsableState.Never)] 
    public static class PathUtil
    {
        private static readonly string _appBasePath;

        /// <exclude />
        static PathUtil()
        {
            if (HostingEnvironment.IsHosted)
            {
                _appBasePath = HostingEnvironment.ApplicationPhysicalPath;
            }
            else
            {
                _appBasePath = AppDomain.CurrentDomain.BaseDirectory;
            }
        }

        
        /// <summary>
        /// Root directory of website 
        /// </summary>
        /// <exclude />
        public static string BaseDirectory
        {
            get
            {
                return _appBasePath;
            }
        }

        /// <summary>
        /// Resolves a (tilde based) partial path to a full file system path. 
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public static string Resolve(string path)
        {
            if (String.IsNullOrEmpty(path)) throw new ArgumentNullException("path");
            if (path.StartsWith("~"))
            {
                if (path == "~")
                {
                    return BaseDirectory;
                }

                string tildeLessPath = path.Remove(0, 1);
                if (Path.IsPathRooted(tildeLessPath) == false) throw new ArgumentException("Tilde based paths must start with tilde (~) and then a directory separator , like ~/folder/file.txt", "path");

                string appRootRelativePath = tildeLessPath.Remove(0, 1);
                if (Path.IsPathRooted(appRootRelativePath)) throw new ArgumentException("Invalid path", "path");

                appRootRelativePath = appRootRelativePath.Replace( '/', '\\' );

                return Path.Combine(_appBasePath, appRootRelativePath);
            }

            if (Path.IsPathRooted(path) == false) throw new ArgumentException("Relative paths must start with tilde (~), like ~/folder/file.txt", "path");

            return path.Replace('/', '\\');
        }

        /// <exclude />
        public static string CleanFileName(string s)
        {
            return CleanFileName(s, false);
        }


        /// <exclude />
        public static string CleanFileName(string s, bool allowUnicodeLetters)
        {
            var sb = new StringBuilder();

            foreach (var c in s)
            {
                if ("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ -_.1234567890".IndexOf(c) > -1
                    || (allowUnicodeLetters && Char.IsLetter(c)))
                {
                    sb.Append(c);
                }
            }

            return sb.Length > 0 ? sb.ToString() : null;
        }

        /// <exclude />
        public static string GetWebsitePath(string path)
        {
            string s = path.Remove(0, BaseDirectory.Length);
            s = s.Replace('\\', '/');
            if (s.StartsWith("'/'") == false)
            {
                s = "/" + s;
            }

            return s;
        }

        /// <summary>
        /// Indicates whether current Windows user has the NTFS write permission to a file or a folder
        /// </summary>
        /// <param name="fileOrDirectoryPath">Path to a file or a folder</param>
        /// <returns></returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirectoryClass:DoNotUseDirectoryClass")]
        public static bool WritePermissionGranted(string fileOrDirectoryPath)
        {
            try
            {
                AuthorizationRuleCollection rules;

                if (C1File.Exists(fileOrDirectoryPath))
                {
                    FileSystemSecurity security = File.GetAccessControl(fileOrDirectoryPath);

                    rules = security.GetAccessRules(true, true, typeof(NTAccount));
                }
                else if (C1Directory.Exists(fileOrDirectoryPath))
                {
                    DirectorySecurity security = Directory.GetAccessControl(fileOrDirectoryPath);

                    rules = security.GetAccessRules(true, true, typeof(NTAccount));
                }
                else
                {
                    throw new FileNotFoundException("File or directory '{0}' does not exist".FormatWith(fileOrDirectoryPath));
                }

                var currentuser = new WindowsPrincipal(WindowsIdentity.GetCurrent());
                bool result = false;
                foreach (FileSystemAccessRule rule in rules)
                {
                    if ((rule.FileSystemRights & (FileSystemRights.WriteData | FileSystemRights.Write)) == 0)
                    {
                        continue;
                    }

                    if (rule.IdentityReference.Value.StartsWith("S-1-"))
                    {
                        var sid = new SecurityIdentifier(rule.IdentityReference.Value);
                        if (!currentuser.IsInRole(sid))
                        {
                            continue;
                        }
                    }
                    else
                    {
                        if (!currentuser.IsInRole(rule.IdentityReference.Value))
                        {
                            continue;
                        }
                    }

                    if (rule.AccessControlType == AccessControlType.Deny)
                        return false;
                    if (rule.AccessControlType == AccessControlType.Allow)
                        result = true;
                }
                return result;
            }
            catch
            {
                return false;
            }
        }
    }
}
