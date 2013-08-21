using System;
using System.Collections.Generic;
using System.Configuration;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Hosting;
using System.Web.UI;
using System.Xml.Linq;

namespace Composite.Core.WebClient
{



    /// <summary>
    /// Summary description for ScriptLoader
    /// </summary>
    public static class StyleLoader
    {




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