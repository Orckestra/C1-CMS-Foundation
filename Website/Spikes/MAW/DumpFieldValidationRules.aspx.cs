using System;
using System.Data;
using System.Configuration;
using System.Collections;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using System.Xml.Linq;
using Composite.Data;
using Composite.Data.Types;

public partial class Spikes_MAW_DumpFieldValidationRules : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        var listElements =
            from y in DataFacade.GetData<IDataFieldDescriptor_ValidatorFunctionMarkup>()
            select new XElement("li", y.ValidatorFunctionMarkup );

        var list = new XElement( "ul", listElements );

        list.Add(new XElement("li", "..."));

        this.PlaceHolder.Controls.Add(new LiteralControl(list.ToString()));

    }
}
