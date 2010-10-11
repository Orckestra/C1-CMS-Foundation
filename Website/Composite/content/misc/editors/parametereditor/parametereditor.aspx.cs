using System;
using System.Data;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;

/// <summary>
/// Summary description for functioneditor
/// </summary>
public partial class parametereditor : Composite.Core.WebClient.XhtmlPage
{

	private void Page_Load(object sender, EventArgs args)
	{
		/*
		 * Force NET mumbojumbo scripts to appear, even when not needed.
		 */
		this.GetPostBackEventReference ( this, string.Empty );
	}
}