using System;
using System.Data;
using System.Configuration;
using System.Collections;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using System.Xml.Linq;
using System.IO;

public partial class Spikes_Icons_Republic : System.Web.UI.Page
{
    private string _relativePath ="../../Composite/images/icons/republic";
    protected void Page_Load(object sender, EventArgs e)
    {

        string iconsBasePath = this.MapPath("../../Composite/images/icons/republic");
        string[] files = Directory.GetFiles(iconsBasePath, IconSize.SelectedValue, SearchOption.AllDirectories);

        var imageTags =
            from file in files
            orderby file
            select new XElement("div",
                new XAttribute("class", "iconcontainer"),
                new XElement("img",
                    new XAttribute("src", BuildImgUrl(file, iconsBasePath)),
                    new XAttribute("title", BuildLabel(file, iconsBasePath)))

                );

        XElement imageContainer =
            new XElement("div",
                new XAttribute("class", "iconscontainer " + IconSize.SelectedValue),
                imageTags);

        IconPlaceHolder.Controls.Add(new LiteralControl(imageContainer.ToString()));
    }


    private string BuildImgUrl(string fullPath, string iconsBasePath)
    {
        return (_relativePath + fullPath.Substring(iconsBasePath.Length)).Replace('\\','/');
    }

    private string BuildLabel(string fullPath, string iconsBasePath)
    {
        string label = (fullPath.Substring(iconsBasePath.Length)).Replace('\\', '/');

        return label.Substring( label.LastIndexOf('/'));
    }

    protected void IconSize_SelectedIndexChanged(object sender, EventArgs e)
    {

    }


}
