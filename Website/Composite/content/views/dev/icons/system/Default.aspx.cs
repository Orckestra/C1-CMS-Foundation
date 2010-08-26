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
using Composite.Core.ResourceSystem;

public partial class Spikes_Icons_Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        var imageTags =
            from iconHandle in IconResourceSystemFacade.GetAllIconHandles()
            orderby iconHandle.ResourceNamespace, iconHandle.ResourceName
            select new XElement("div",
                new XAttribute("class", "iconcontainer"),
                new XElement("img",
                    new XAttribute("src", BuildImgUrl(iconHandle))),
                new XElement( "span",
                    new XAttribute( "class", "iconnamespace" ),
                    new XText( iconHandle.ResourceNamespace )),
                new XElement( "span",
                    new XAttribute( "class", "iconname" ),
                    new XText( iconHandle.ResourceName ))
                );

        XElement imageContainer = 
            new XElement("div", 
                new XAttribute( "class", "iconscontainer " + IconSize.SelectedValue ),
                imageTags);

        IconPlaceHolder.Controls.Add(new LiteralControl(imageContainer.ToString()));
    }

    private string BuildImgUrl(ResourceHandle iconHandle)
    {
        return
            string.Format("../../../../../services/Icon/GetIcon.ashx?resourceName={0}&resourceNamespace={1}&size={2}", iconHandle.ResourceName, iconHandle.ResourceNamespace, IconSize.SelectedValue);
    }


    protected void IconSize_SelectedIndexChanged(object sender, EventArgs e)
    {

    }
}
