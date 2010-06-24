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
using System.ComponentModel; 
using System.Text;
using System.IO;
using System.Diagnostics;

public partial class StyleLoaderControl2 : System.Web.UI.UserControl
{
 
 	private string[] _defaultstyles;
    private string[] _skinstyles;
 
    protected override void Render(HtmlTextWriter writer)
    {
    	
    	/**
    	 * TODO: externalize to some kind of config.
    	 */
    	_defaultstyles = new string[] {
    	
    		"styles/default/base.css",
			"styles/default/texts.css",
			"styles/default/labels.css",
			"styles/default/splash.css",
			"styles/default/dialogs.css",
			"styles/default/dialogpages.css",
			"styles/default/popups.css",
			"styles/default/menus.css",
			"styles/default/shadows.css",
			"styles/default/buttons.css",
			"styles/default/matrixes.css",
			"styles/default/titlebars.css",
			"styles/default/controls.css",
			"styles/default/toolbars.css",
			"styles/default/tabboxes.css",
			"styles/default/splitboxes.css",
			"styles/default/decks.css",
			"styles/default/trees.css",
			"styles/default/docks.css",
			"styles/default/pages.css",
			"styles/default/views.css",
			"styles/default/explorer.css",
			"styles/default/wysiwygeditors.css",
			"styles/default/sourcecodeeditors.css",
			"styles/default/broadcasters.css",
			"styles/default/fields.css",
			"styles/default/selectors.css",
			"styles/default/keys.css",
			"styles/default/bindingmappings.css",
			"styles/default/cursors.css",
			"styles/default/updatepanels.css",
			"styles/default/balloons.css",
			"styles/default/errors.css",
			"styles/default/lazybindings.css"				
    	};
    	
    	/**
    	 * TODO: externalize to some kind of config.
    	 */
    	_skinstyles = new string[] {
    		
    		"skins/system/menus.css",
			"skins/system/toolbars.css",
			"skins/system/buttons.css",
			"skins/system/controls.css",
			"skins/system/tabboxes.css",
			"skins/system/titlebars.css",
			"skins/system/docks.css",
			"skins/system/trees.css",
			"skins/system/explorer.css",
			"skins/system/dialogs.css",
			"skins/system/dialogpages.css",
			"skins/system/shadows.css",
			"skins/system/fields.css",
			"skins/system/imageeditor.css",
			"skins/system/splash.css",
			"skins/system/balloons.css"
    	};
    	
    	string root = Composite.WebClient.UrlUtils.AdminRootPath; // fullPathWindowsStyle.Replace('\\', '/',
		StringBuilder _builder = new StringBuilder ();

        // TODO: Check if we need this class at all. 
        string[] lines = File.ReadAllLines( root + "/" /* + scriptPath */); 
        foreach (string line in lines)
        {
            _builder.AppendLine ( line.ToString());
        }
	
		/*		
		for (int i = 0; i < _defaultstyles.Length; i++)
        {
        	string location = _defaultstyles [ i ];
        	_builder.AppendLine ( 
        		stylesheet ( root + "/" + location )
        	);
        }
        
        // TODO: let's just merge to two string arrays...
        for (int i = 0; i < _skinstyles.Length; i++)
        {
        	string location = _skinstyles [ i ];
        	_builder.AppendLine ( 
        		stylesheet ( root + "/" + location )
        	);
        }
		
		writer.Write ( _builder.ToString ());

		writer.WriteLine ( stylesheet ( root + "/styles/styles.css.aspx" ),
		writer.WriteLine ( stylesheet ( root + "/skins/skin.css.aspx" ),
		*/
    }
	
	private string stylesheet ( string url ) 
	{
		return @"<link rel=""stylesheet"" type=""text/css"" href=""" + url + @".aspx""/>";
	}
}