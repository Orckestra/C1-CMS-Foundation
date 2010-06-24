using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Xml.Linq;
using Composite.Data;
using Composite.Data.Types;


public partial class Spikes_PageLocalOrdering_ShowLocalOrdering : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
       /* if (Request.QueryString["ParentPageId"] == null)
        {
            PlaceHolder.Controls.Add(new LiteralControl("No ParentPageId.... nothing to do.... STUPID!"));

            return;
        }

        string parentPageIdString = Request.QueryString["ParentPageId"];

        Guid parentPage = new Guid(parentPageIdString);

        List<IPage> pages;
        using (DataScope dataScope = new DataScope(DataScopeIdentifier.Administrated))
        {
            pages =
                (from p in DataFacade.GetData<IPage>()
                 where p.ParentId == parentPage
                 orderby p.LocalOrdering
                 select p).ToList();
        }

        XElement table = 
            new XElement("table", new XAttribute("border", "1px"),                
                new XElement("tr",
                    new XElement("th", "Local ordering"),
                    new XElement("th", "Page title")
                )
            );
        foreach (IPage page in pages)
        {
            XElement row =
                new XElement("tr",
                    new XElement("td", page.LocalOrdering),
                    new XElement("td", page.Title)
                );

            table.Add(row);
        }

        PlaceHolder.Controls.Add(new LiteralControl(table.ToString()));*/
    }
}
