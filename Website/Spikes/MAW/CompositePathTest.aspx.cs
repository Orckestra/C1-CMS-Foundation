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
using Composite.Renderings;
using Composite.Renderings.Page;


public partial class Spikes_MAW_CompositePathTest : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        var images = DataFacade.GetData<IImageFile>().ToList();

        XElement x = new XElement("ul");

        x.Add(
            from file in images
            select new XElement("li", file.CompositePath,
                from f2 in DataFacade.GetData<IImageFile>()
                where f2.CompositePath == file.CompositePath
                select new XElement("strong", f2.FileName ))
            );

        ph.Controls.Add( x.AsAspNetControl() );

    }
}
