using System;
using System.Text;
using System.Web.UI;
using Composite.Core.IO;


public partial class IconRendererHarmonyControl : System.Web.UI.UserControl
{

    protected void Page_Load(object sender, EventArgs e)
    {
        string size = Request.QueryString["size"];
        if (String.IsNullOrEmpty(size))
        {
            size = "24";
        }

        string path = System.IO.Path.Combine(PathUtil.Resolve(PathUtil.BaseDirectory), "Composite\\images\\icons\\harmony");
        string[] dirEntries = C1Directory.GetDirectories(path);

        StringBuilder builder = new StringBuilder();

        foreach (string dirName in dirEntries)
        {
            int index = dirName.LastIndexOf("\\");
            int length = dirName.Length - index;

            builder.AppendLine(
                "<ui:pageheading>" +
                dirName.Substring(index + 1, length - 1) +
                "</ui:pageheading>"
            );

            string[] fileEntries = C1Directory.GetFiles(dirName);
            foreach (string fileName in fileEntries)
            {
                if (fileName.Contains("_" + size))
                {
                    string url = fileName.Remove(0, PathUtil.Resolve(PathUtil.BaseDirectory).Length).Replace("\\", "/");

                    url = Composite.Core.WebClient.UrlUtils.ResolvePublicUrl(url);

                    string s = url.Substring(url.LastIndexOf("/") + 1);
                    s = s.Substring(0, (s.LastIndexOf("_")));
                    
                    

                    builder.AppendLine("<div class=\"img\"><img src=\"" + url + "\"/><span>" + s + "</span></div>");
                }
            }
        }

        dynamicOutputPlaceHolder.Controls.Add(new LiteralControl(builder.ToString()));
    }
}