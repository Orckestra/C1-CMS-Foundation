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
using InlinePageDataDemo;
using Composite.Data;

public partial class Spikes_MAW_WebUserControl : System.Web.UI.UserControl
{
    public string PalleProperty;

    protected void Page_Load(object sender, EventArgs e)
    {
    //    this.Page.Form.Attributes.Add("onsubmit", "alert('preview'); return false;");

        Control c = this.Page.FindControl("test");

        if (c != null) c.Controls.Add(new LiteralControl("<p>running</p>"));

    }


    protected void Button1_Click(object sender, EventArgs e)
    {
        foreach (string name in DataFacade.GetData<IPageInlineSample>().Select(f => f.Name))
        {
            this.Controls.Add(new LiteralControl("<div>" + name + "</div>"));
        }

        string paramValue = this.Attributes["param"] ?? "(no value)";

        this.Controls.Add(new LiteralControl("hello dude " + paramValue));

        Control c = this.Page.FindControl("test");

        if (c != null) c.Controls.Add(new LiteralControl("<p>wheee!!! we can travel around!!</p>"));

        this.Page.Title += " - we can even work with the page title :)";
    }
}
