using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.UI;
using System.Web.Hosting;
using System.IO;

namespace Composite.Core.WebClient
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public static class UrlUtils
	{
        private const string _adminFolderName = "Composite";
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
        

        public static string ResolveAdminUrl(string adminRelativePath)
        {
            if (adminRelativePath == null) throw new ArgumentNullException("adminRelativePath");
            if (adminRelativePath.IndexOf('~') > -1 || adminRelativePath.StartsWith("/") )
            {
                throw new ArgumentException("The relative URL may not be rooted or contain '~'");
            }

            return string.Format("{0}/{1}/{2}", _applicationVirtualPath, _adminFolderName, adminRelativePath);
        }


        public static string ResolvePublicUrl(string publicRelativePath)
        {
            if (publicRelativePath == null) throw new ArgumentNullException("publicRelativePath");
            if (publicRelativePath.IndexOf('~') > -1 || publicRelativePath.StartsWith("/") )
            {
                throw new ArgumentException("The relative URL may not be rooted or contain '~'");
            }

            return string.Format("{0}/{1}", _applicationVirtualPath, publicRelativePath);
        }


        public static string PublicRootPath
        {
            get
            {
                return _applicationVirtualPath;
            }
        }


        public static string AdminRootPath
        {
            get
            {
                return string.Format("{0}/{1}", _applicationVirtualPath, _adminFolderName);
            }
        }


        public static string Combine( string path1, string path2 )
        {
            return Path.Combine(path1,path2).Replace( Path.DirectorySeparatorChar, '/' );
        }
    }
}
