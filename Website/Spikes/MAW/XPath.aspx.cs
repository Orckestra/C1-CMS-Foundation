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
using System.Xml.XPath;
using Composite.Data;
using Composite.Data.Types;
using System.Collections.Generic;

public partial class Spikes_MAW_XPath : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        var xml =
            new XElement( "root",
            from record in DataFacade.GetData<Composite.Data.Types.IUser>()
            select new XElement( "User",
                new XAttribute("name", record.Username),
                new XAttribute("pwd", record.EncryptedPassword)));

    }
}
