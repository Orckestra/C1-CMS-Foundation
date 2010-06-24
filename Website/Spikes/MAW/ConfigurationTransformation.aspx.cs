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
using Composite.ConfigurationSystem;

public partial class Spikes_MAW_ConfigurationTransformation : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        XDocument xslt = XDocument.Load(this.MapPath("ConfigurationTransformation.xslt"));
        ConfigurationServices.TransformConfiguration(xslt, false);
    }
}
