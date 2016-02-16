using System;
using System.IO;
using System.Web;
using System.Web.Hosting;
using System.Web.WebPages;

namespace Composite.Core.IO
{
    /// <exclude />
    public static class SpecialModesFileResolver
    {
        /// <exclude />
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
            
            return pathProvider.FileExists(file) ? file : null;
        }
    }
}