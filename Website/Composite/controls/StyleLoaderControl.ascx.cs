using System;
using System.Collections.Generic;
using System.IO;
using System.Web.Hosting;
using System.Web.UI;
using Composite.Core.WebClient;

namespace Composite.controls
{
    public partial class StyleLoaderControl : System.Web.UI.UserControl
    {
        public string Directive { get; set; }

        protected override void Render(HtmlTextWriter writer)
        {
            string root = UrlUtils.AdminRootPath;

            if (Directive == "compile")
            {
                StyleCompiler.Compile(HostingEnvironment.MapPath(root + "/styles/styles.css"),
                                      HostingEnvironment.MapPath(root + "/styles/styles_compiled.css"));

                StyleCompiler.Compile(HostingEnvironment.MapPath(root + "/skins/skin.css"),
                                      HostingEnvironment.MapPath(root + "/skins/skin_compiled.css"));

                return;
            }

            bool isInDevelopMode = CookieHandler.Get("mode") == "develop";

            if (isInDevelopMode)
            {
                writer.WriteLine(stylesheet(root + "/styles/styles.css.aspx"));
                writer.WriteLine(stylesheet(root + "/skins/skin.css.aspx"));
            }
            else
            {
                writer.WriteLine(stylesheet(root + "/styles/styles_compiled.css.aspx"));
                writer.WriteLine(stylesheet(root + "/skins/skin_compiled.css.aspx"));
            }

            writer.WriteLine(stylesheet(root + "/skins/dynamicskin.css.aspx"));
        }

        private string stylesheet(string url)
        {
            return @"<link rel=""stylesheet"" type=""text/css"" href=""" + url + @"""/>";
        }
    }
}