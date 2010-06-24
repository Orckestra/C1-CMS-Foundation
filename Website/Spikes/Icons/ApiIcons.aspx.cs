using System;
using System.Collections;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;
using Composite.ResourceSystem;
using System.Collections.Generic;

public partial class Spikes_Icons_ApiIcons : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        Type commonCommandIconsType = typeof(Composite.ResourceSystem.Icons.CommonCommandIcons);
        Type commonElementIconsType = typeof(Composite.ResourceSystem.Icons.CommonElementIcons);
        Dictionary<string, ResourceHandle> commandIcons = GetIconsFromProperties(commonCommandIconsType);
        Dictionary<string, ResourceHandle> elementIcons = GetIconsFromProperties(commonElementIconsType);

        XElement imageContainer = IconsToHtml(commandIcons);
        IconPlaceHolder.Controls.Add(new LiteralControl("<h1>" + commonCommandIconsType.Name + "</h1>"));
        IconPlaceHolder.Controls.Add(new LiteralControl(imageContainer.ToString()));

        imageContainer = IconsToHtml(elementIcons);
        IconPlaceHolder.Controls.Add(new LiteralControl("<h1>" + commonElementIconsType.Name + "</h1>"));
        IconPlaceHolder.Controls.Add(new LiteralControl(imageContainer.ToString()));

    }

    private XElement IconsToHtml(Dictionary<string, ResourceHandle> commandIcons)
    {
        var imageTags =
            from iconHandle in commandIcons
            orderby iconHandle.Value.ResourceNamespace, iconHandle.Value.ResourceName
            select new XElement("div",
                new XAttribute("class", "iconcontainer"),
                new XElement("img",
                    new XAttribute("src", BuildImgUrl(iconHandle.Value))),
                new XElement("span",
                    new XAttribute("class", "propertyname"),
                    new XText(iconHandle.Key)) /*,
                new XElement("span",
                    new XAttribute("class", "iconnamespace"),
                    new XText(iconHandle.Value.ResourceNamespace)),
                new XElement("span",
                    new XAttribute("class", "iconname"),
                    new XText(iconHandle.Value.ResourceName)) */
                );

        XElement imageContainer =
            new XElement("div",
                new XAttribute("class", "iconscontainer " + IconSize.SelectedValue),
                imageTags);
        return imageContainer;
    }


    private Dictionary<string,ResourceHandle> GetIconsFromProperties(Type iconsType)
    {
        Dictionary<string, ResourceHandle> found = new Dictionary<string, ResourceHandle>();

        var iconProperties = iconsType.GetProperties().Where(p => p.PropertyType == typeof(ResourceHandle));

        foreach (var iconProperty in iconProperties)
        {
            ResourceHandle rh = (ResourceHandle)iconProperty.GetValue(null, null);
            found.Add(iconProperty.Name, rh);
        }

        return found;
    }


    private string BuildImgUrl(ResourceHandle iconHandle)
    {
        return
            string.Format("../../Composite/services/Icon/GetIcon.ashx?resourceName={0}&resourceNamespace={1}&size={2}", iconHandle.ResourceName, iconHandle.ResourceNamespace, IconSize.SelectedValue);
    }

}
