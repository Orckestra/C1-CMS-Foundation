using System;
using System.Text;
using System.Web;
using System.Web.UI;
using Composite.Core.IO;

public partial class IconRendererControl : System.Web.UI.UserControl
{

    protected void Page_Load(object sender, EventArgs e)
    {
    	string size = Request.QueryString [ "size" ];
    	if ( String.IsNullOrEmpty ( size )) {
    		size = "24";
    	}

        string path = Server.MapPath ( "../../../../../images/icons/republic" );
        string [] dirEntries = C1Directory.GetDirectories ( path );
			
		StringBuilder builder = new StringBuilder (); 
        
        foreach(string dirName in dirEntries)
		{
		   // do something with fileName
		   if ( dirName.Contains ( "republic_" )) {
		   		string [] fileEntries = C1Directory.GetFiles ( dirName );
		   		foreach(string fileName in fileEntries) {
		   			if ( fileName.Contains ( "_" + size + "px_" )) {
		   				string string1 = fileName.Replace ( "\\", "/" ).ToLowerInvariant();
		   				string string2 = string1.Substring ( 
		   					string1.IndexOf ( "images" ) // Website
		   				);
		   				string string3 = string1.Substring ( 
		   					string1.LastIndexOf ( "/" ) + 1 
		   				);
		   				string3 = string3.Substring ( 0, 4 );

                        builder.AppendLine(string.Format(@"<div class=""img""><img src=""{0}/{1}"" /><span>{2}</span></div>", Composite.Core.WebClient.UrlUtils.AdminRootPath, HttpUtility.HtmlAttributeEncode(string2), HttpUtility.HtmlEncode(string3)));
			   		}
		   		}
		   }
		}

        dynamicOutputPlaceHolder.Controls.Add( new LiteralControl( builder.ToString () ));
    }
}