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
using Composite.EventSystem;

public partial class Spikes_BackendStatus_Flush : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        GlobalEventSystemFacade.FlushTheSystem();

        Response.Write("System flushed");
    }
}
