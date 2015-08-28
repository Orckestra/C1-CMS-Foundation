using System.Xml;
using Composite.Core.IO;
using System;
using System.IO;
using System.Linq;
using System.Xml.Linq;

public partial class GenerateIconSprite : System.Web.UI.Page
{

    private string svgBlank = @"<?xml version=""1.0"" encoding=""UTF-8"" standalone=""no""?><svg version=""1.1"" xmlns=""http://www.w3.org/2000/svg"" xmlns:xlink=""http://www.w3.org/1999/xlink"" width=""24"" height=""24""  viewBox=""0 0 128 128"">
    <defs></defs></svg>";

    protected void Page_Load(object sender, EventArgs e)
    {
        var pathSVGIcons = Server.MapPath("~/Composite/images/icons/svg/");

        XNamespace svgNamespace = @"http://www.w3.org/2000/svg";

        var svgSprite = XElement.Parse(svgBlank);

        var defs = svgSprite.Descendants(svgNamespace + "defs").First();

        foreach (var file in Directory.GetFiles(pathSVGIcons))
        {
            var id = Path.GetFileNameWithoutExtension(file);
            var svgElement = XElement.Load(file);

            var taggetGroup = svgElement.Descendants(svgNamespace + "g").FirstOrDefault(el => (string) el.Attribute("id") == id);

            if (taggetGroup != null)
            {
                defs.Add(taggetGroup);
            }
        }


       var settings = new XmlWriterSettings {OmitXmlDeclaration = true};

        using (XmlWriter xw = XmlWriter.Create(PathUtil.Resolve("~/Composite/images/sprite.svg"), settings))
        {
            svgSprite.Save(xw);
        }
    }
}