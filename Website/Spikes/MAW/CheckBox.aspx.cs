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
using Composite.Logging;

public partial class Spikes_MAW_CheckBox : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        LoggingService.LogVerbose("EventTarget", Request.Form["__EVENTTARGET"]);

    }
    protected void hejsa_CheckedChanged(object sender, EventArgs e)
    {

    }
}
