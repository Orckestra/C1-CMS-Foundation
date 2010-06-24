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

public partial class Spikes_MAW_Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        using (new DataScope(DataScopeIdentifier.Administrated))
        {
            var x = from c in DataFacade.GetData<IXhtmlEditorElementClassConfiguration>()
            select  c;

            Response.Write(x.Count().ToString());
        }
    }
}
