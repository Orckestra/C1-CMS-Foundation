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

public partial class HelpContentControl : System.Web.UI.UserControl
{
    protected void Page_Load(object sender, EventArgs e)
    {
	}

    protected override void Render(HtmlTextWriter writer) 
    {
		
		
		string urlfragment = Request.QueryString [ "id" ];
		
		if ( urlfragment == null ) 
		{
			urlfragment = "test.xml";
		}
	    
	    string path = Server.MapPath("~/Composite/help/content/" + urlfragment );
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