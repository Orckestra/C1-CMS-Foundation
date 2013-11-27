using System;
using System.Web.UI;
using Composite.Core.WebClient;

public partial class ScriptLoaderControl : System.Web.UI.UserControl
{

    public string type;
    public string directive;
    public bool updateManagerDisabled;

    private ScriptLoader _scriptloader; 

    /**
     * Notice that automatic compression doesn't work!
     */
    protected void Page_Load(object sender, EventArgs e)
    {
        _scriptloader = new ScriptLoader(type, directive, updateManagerDisabled);
    }
	


    protected override void Render(HtmlTextWriter writer)
    {
        writer.Write(_scriptloader.Render());
    }
}