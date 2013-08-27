using System;
using System.Text;
using System.Web.Hosting;

namespace Composite.Core.WebClient
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class StyleLoader
    {
        /// <exclude />
        public static string Render(string directive = null)
        {
            StringBuilder _builder = new StringBuilder();
            string root = UrlUtils.AdminRootPath;

            if (directive == "compile")
            {
                StyleCompiler.Compile(HostingEnvironment.MapPath(root + "/styles/styles.css"),
                                      HostingEnvironment.MapPath(root + "/styles/styles_compiled.css"));

                StyleCompiler.Compile(HostingEnvironment.MapPath(root + "/skins/skin.css"),
                                      HostingEnvironment.MapPath(root + "/skins/skin_compiled.css"));

                return string.Empty;
            }

            bool isInDevelopMode = CookieHandler.Get("mode") == "develop";

            if (isInDevelopMode)
            {
                _builder.AppendLine(stylesheet(root + "/styles/styles.css.aspx"));
                _builder.AppendLine(stylesheet(root + "/skins/skin.css.aspx"));
            }
            else
            {
                _builder.AppendLine(stylesheet(root + "/styles/styles_compiled.css.aspx"));
                _builder.AppendLine(stylesheet(root + "/skins/skin_compiled.css.aspx"));
            }

            _builder.AppendLine(stylesheet(root + "/skins/dynamicskin.css.aspx"));

            return _builder.ToString();

        }

        private static string stylesheet(string url)
        {
            return @"<link rel=""stylesheet"" type=""text/css"" href=""" + url + @"""/>";
        }
    }

}