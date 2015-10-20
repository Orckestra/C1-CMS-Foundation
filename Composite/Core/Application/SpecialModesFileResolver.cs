using System;
using System.IO;
using System.Web;
using System.Web.Hosting;
using System.Web.WebPages;

namespace Composite.Core.Application
{
    /// <summary>
    /// 
    /// </summary>
    public static class SpecialModesFileResolver
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="directory"></param>
        /// <param name="file"></param>
        /// <param name="extension"></param>
        /// <param name="context"></param>
        /// <returns></returns>
        public static string ResolveFileInInDirectory(string directory, string file, string extension, HttpContextBase context)
        {
            var pathProvider = HostingEnvironment.VirtualPathProvider;
            var modes = DisplayModeProvider.Instance.GetAvailableDisplayModesForContext(context, null);

            foreach (var mode in modes)
            {
                var specialFile = Path.Combine(directory, String.Format("{0}{1}", file, extension));

                var displayInfo = mode.GetDisplayInfo(context, specialFile, pathProvider.FileExists);
                if (displayInfo != null)
                {
                    return displayInfo.FilePath;
                }
            }

            file = Path.Combine(directory, file + extension);
            if (pathProvider.FileExists(file))
            {
                return file;
            }

            return null;
        }
    }
}