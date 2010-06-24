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
using System.Xml.Xsl;

public class XsltExtensionDefinition
{
    public XNamespace ExtensionNamespace { get; set; }
    public object EntensionObject { get; set; }
}

public partial class Spikes_MAW_XsltExtensions : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        XsltExtensionDefinition mulle = null;

        XsltArgumentList x = new XsltArgumentList();

        x.AddExtensionObject(mulle.ExtensionNamespace.ToString(), mulle.EntensionObject);
    }
}
