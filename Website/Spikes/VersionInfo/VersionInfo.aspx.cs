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
using Composite.Security;
using Composite.Data;
using System.Collections.Generic;
using Composite.Data.ProcessControlled;

public partial class Spikes_VersionInfo_Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Request.QueryString["EntityToken"] == null)
        {
            VersionInfoHolder.Controls.Add(new LiteralControl("No entity token.... nothing to do.... STUPID!"));

            return;
        }

        string serializedEntityToken = Request.QueryString["EntityToken"];

        DataEntityToken entityToken = (DataEntityToken)EntityTokenSerializer.Deserialize(serializedEntityToken);

        List<IData> datas = DataFacade.GetDataFromOtherScope(entityToken.Data, DataScopeIdentifier.Versioned).ToList();

        XElement table = new XElement("table", new XAttribute("border", "1px"));

        table.Add(new XElement("tr", 
                new XElement("th", "Major"), 
                new XElement("th", "Minor"), 
                new XElement("th", "Changed by"), 
                new XElement("th", "Change date")
            ));

        foreach (IData data in datas)
        {            
            IVersionControlled versionControlled = (IVersionControlled)data;

            XElement row = new XElement("tr");

            row.Add(new XElement("td", versionControlled.MajorVersionNumber));
            row.Add(new XElement("td", versionControlled.MinorVersionNumber));
            row.Add(new XElement("td", versionControlled.ChangedBy));
            row.Add(new XElement("td", versionControlled.ChangeDate));

            table.Add(row);            
        }

        VersionInfoHolder.Controls.Add(new LiteralControl(table.ToString()));
    }
}
