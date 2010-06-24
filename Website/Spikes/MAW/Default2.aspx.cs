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
using Composite.Data;
using Composite.Data.Types;

public partial class Spikes_MAW_Default2 : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        var x = DataFacade.GetData<IDynamicTypeFormDefinitionFile>().FirstOrDefault();

        Response.Write(x.FolderPath);

     //   Maw.HangTest01;
    }
}
