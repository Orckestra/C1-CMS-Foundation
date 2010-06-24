using System;
using System.Data;
using System.Configuration;
using System.Collections;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using System.Xml;

public partial class StageDeckControl : System.Web.UI.UserControl
{
    protected void Page_Load(object sender, EventArgs e)
    {
	}

    protected override void Render(HtmlTextWriter writer) 
    {

        string path = Server.MapPath("../../../templates/defaultstagedeck.xml");
        
        XmlDocument doc = new XmlDocument();
		XmlReaderSettings settings = new XmlReaderSettings();
        settings.IgnoreComments = true;

        using (XmlReader reader = XmlReader.Create(path, settings))
        {
            doc.Load(reader);
        }
        writer.Write( doc.DocumentElement.OuterXml );
    }
}