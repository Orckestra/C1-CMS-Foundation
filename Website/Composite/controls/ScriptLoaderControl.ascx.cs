using System;
using System.Collections.Generic;
using System.Configuration;
using System.Diagnostics;
using System.IO;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Xml.Linq;
using System.Linq;

using Composite.Core.WebClient;


public partial class ScriptLoaderControl : System.Web.UI.UserControl
{

    public string type;
    public string directive;

    private ScriptLoader _scriptloader; 

    /**
     * Notice that automatic compression doesn't work!
     */
    protected void Page_Load(object sender, EventArgs e)
    {
        _scriptloader = new ScriptLoader(type, directive);
    }
	


    protected override void Render(HtmlTextWriter writer)
    {
        writer.Write(_scriptloader.Render());
    }
	      

}