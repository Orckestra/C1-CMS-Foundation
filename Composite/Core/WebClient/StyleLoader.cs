using System.Text;

namespace Composite.Core.WebClient
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class StyleLoader
    {
        /// <exclude />
        public static string Render(string directive = null)
        {
            var _builder = new StringBuilder();
            string root = UrlUtils.AdminRootPath;

            bool isInDevelopMode = CookieHandler.Get("mode") == "develop";

            if (isInDevelopMode)
            {
                _builder.AppendLine(stylesheet(root + "/styles/styles.css"));
            }
            else
            {
                _builder.AppendLine(stylesheet(root + "/styles/styles.min.css"));
            }

            return _builder.ToString();
        }

        private static string stylesheet(string url)
        {
            return @"<link rel=""stylesheet"" type=""text/css"" href=""" + url + @"""/>";
        }
    }

}