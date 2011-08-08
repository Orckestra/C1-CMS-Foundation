using System;
using System.IO;
using System.Web.Hosting;


namespace Composite.Core.WebClient
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public static class UrlUtils
	{
        private const string _adminFolderName = "Composite";
        private const string _renderersFolderName = "Renderers";
        private static readonly string _applicationVirtualPath;


        static UrlUtils()
        {
            if (HostingEnvironment.ApplicationVirtualPath != null)
            {
                string appPath = HostingEnvironment.ApplicationVirtualPath;

                if (appPath.EndsWith("/") || appPath.EndsWith(@"\"))
                {
                    appPath = appPath.Remove(appPath.Length - 1, 1);
                }

                _applicationVirtualPath = appPath;
            }
            else
            {
                _applicationVirtualPath = "";
            }
        }


        /// <exclude />
        public static string ResolveAdminUrl(string adminRelativePath)
        {
            if (adminRelativePath == null) throw new ArgumentNullException("adminRelativePath");
            if (adminRelativePath.IndexOf('~') > -1 || adminRelativePath.StartsWith("/") )
            {
                throw new ArgumentException("The relative URL may not be rooted or contain '~'");
            }

            string[] split = adminRelativePath.Split('?');
            string checkForBackSlashes = split[0];
            if (checkForBackSlashes.Contains(@"\"))
            {
                Log.LogWarning("ResolveAdminUrl", string.Format(@"The url '{0}' contains '\' which is not allowed.", checkForBackSlashes));
            }

            return string.Format("{0}/{1}/{2}", _applicationVirtualPath, _adminFolderName, adminRelativePath);
        }


        /// <exclude />
        public static string ResolvePublicUrl(string publicRelativePath)
        {
            if (publicRelativePath == null) throw new ArgumentNullException("publicRelativePath");

            if (publicRelativePath.StartsWith("/"))
            {
                throw new ArgumentException("The relative URL may not be rooted or contain '~'");
            }

            if (publicRelativePath.StartsWith("~/"))
            {
                publicRelativePath = publicRelativePath.Remove(0, 2);
            }

            return string.Format("{0}/{1}", _applicationVirtualPath, publicRelativePath);
        }


        /// <exclude />
        public static string PublicRootPath
        {
            get
            {
                return _applicationVirtualPath;
            }
        }


        /// <exclude />
        public static string AdminRootPath
        {
            get
            {
                return string.Format("{0}/{1}", _applicationVirtualPath, _adminFolderName);
            }
        }


        /// <exclude />
        public static string RenderersRootPath
        {
            get
            {
                return string.Format("{0}/{1}", _applicationVirtualPath, _renderersFolderName);
            }
        }

        /// <exclude />
        public static string Combine( string path1, string path2 )
        {
            if (string.IsNullOrEmpty(path1)) return path2;
            if (string.IsNullOrEmpty(path1)) return path2;

            bool path1EndsWithSlash = path1.EndsWith("/");
            bool path2StartsWithSlash = path2.StartsWith("/");

            if (path1EndsWithSlash != path2StartsWithSlash)
            {
                return path1 + path2;
            }

            if (path1EndsWithSlash)
            {
                return path1 + path2.Substring(1);
            }

            return path1 + "/" + path2;
        }
    }
}
