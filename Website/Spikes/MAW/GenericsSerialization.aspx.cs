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
using Composite.Data.Types;
using Composite.Data;

public partial class Spikes_MAW_GenericsSerialization : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        Type t = typeof(DataReference<IPage>);
        string definitionName = t.GetGenericTypeDefinition().FullName;
        Type definitionType = Type.GetType(definitionName);
        Type recreated = definitionType.MakeGenericType(typeof(IPage));

        Response.Write(t.FullName);
        Response.Write("<br />");
        Response.Write(recreated.FullName);

    }
}
