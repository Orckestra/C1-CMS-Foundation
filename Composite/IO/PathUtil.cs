using System;
using System.IO;
using System.Text;
using System.Web.Hosting;

namespace Composite.IO
{
    public static class PathUtil
    {
        private static readonly string _appBasePath;

        static PathUtil()
        {
            if (!HostingEnvironment.IsHosted)
            {
                _appBasePath = Environment.CurrentDirectory;
            }
            else
            {
                _appBasePath = AppDomain.CurrentDomain.BaseDirectory;
            }
        }

        public static string BaseDirectory
        {
            get
            {
                return _appBasePath;
            }
        }

        /// <summary>
        /// Resolves a (tilde based) partial path to a full path
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public static string Resolve(string path)
        {
            if (string.IsNullOrEmpty(path) == true) throw new ArgumentNullException("path");
            if (path.StartsWith("~"))
            {
                if (path == "~")
                {
                    return BaseDirectory;
                }

                string tildeLessPath = path.Remove(0, 1);
                if (Path.IsPathRooted(tildeLessPath) == false) throw new ArgumentException("Tilde based paths must start with tilde (~) and then a directory separator , like ~/folder/file.txt", "path");

                string appRootRelativePath = tildeLessPath.Remove(0, 1);
                if (Path.IsPathRooted(appRootRelativePath) == true) throw new ArgumentException("Invalid path", "path");

                appRootRelativePath = appRootRelativePath.Replace( '/', '\\' );

                return Path.Combine(_appBasePath, appRootRelativePath);
            }

            if (Path.IsPathRooted(path) == false) throw new ArgumentException("Relative paths must start with tilde (~), like ~/folder/file.txt", "path");

            return path.Replace('/', '\\');
        }


        public static string CleanFileName(string s)
        {
            StringBuilder sb = new StringBuilder();

            foreach (var c in s)
            {
                if ("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ -_.1234567890".IndexOf(c) > -1)
                {
                    sb.Append(c);
                }
            }

            string result = sb.ToString();

            if (string.IsNullOrEmpty(result) == true)
            {
                return null;
            }
            else
            {
                return result;
            }
        }



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
    }
}
