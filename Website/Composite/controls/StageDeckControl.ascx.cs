using System;
using System.Web.UI;
using System.Xml;
using Composite.Core.Xml;


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

        using (XmlReader reader = XmlReaderUtils.Create(path, settings))
        {
            doc.Load(reader);
        }
        writer.Write( doc.DocumentElement.OuterXml );
    }
}