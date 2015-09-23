using Composite.Core.IO;

namespace Composite.Core.WebClient
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class StyleLoader
    {
        /// <exclude />
        public static string Render(string directive = null)
        {
            string root = UrlUtils.AdminRootPath;

            bool isInDevelopMode = CookieHandler.Get("mode") == "develop";

            string styleFile = isInDevelopMode 
                ? "/styles/styles.css" 
                : "/styles/styles.min.css";

            string cssLink = root + styleFile;

            string filePath = PathUtil.Resolve("~/Composite" + styleFile);
            if (C1File.Exists(filePath))
            {
                cssLink += "?timestamp=" + C1File.GetLastWriteTimeUtc(filePath).GetHashCode();
            }

            return stylesheet(cssLink);
        }

        private static string stylesheet(string url)
        {
            return @"<link rel=""stylesheet"" type=""text/css"" href=""" + url + @"""/>";
        }
    }

}