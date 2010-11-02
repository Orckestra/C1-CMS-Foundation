using System;
using System.Web.UI;


public partial class FieldGroupControl : System.Web.UI.UserControl
{
	
	
	public string label;
	public string image;

	protected void Page_Load ( object sender, EventArgs e )
	{
	}

	protected override void RenderChildren ( HtmlTextWriter writer ) 
	{
	
	
		string absroot = Request.ApplicationPath;
		string webroot = Request.AppRelativeCurrentExecutionFilePath.Split ( '/' )[ 1 ];
		string fileurl = Server.MapPath ( absroot + "/" + webroot + "/templates/fieldgroupmatrix.xml" );
		
		/*
		XmlDocument doc = new XmlDocument();
		XmlReaderSettings settings = new XmlReaderSettings();
        settings.IgnoreComments = true;

        using (XmlReader reader = XmlReader.Create(fileurl, settings))
        {
            doc.Load(reader);
        }
        writer.Write( doc.DocumentElement.OuterXml );
        */
     
		base.RenderChildren ( writer );
	}
}