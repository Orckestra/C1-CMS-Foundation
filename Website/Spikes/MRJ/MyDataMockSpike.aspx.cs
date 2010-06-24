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
using System.Collections.Generic;
using Composite.Data;

public partial class Spikes_MRJ_MyDataMockSpike : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
       /* List<IMyDataMock> mocks = DataFacade.GetData<IMyDataMock>().ToList();

        Response.Write(new XElement("hr"));

        foreach (IMyDataMock mock in mocks)
        {
            Response.Write(new XElement("div", string.Format("Id = {0}", mock.Id)));
            Response.Write(new XElement("div", string.Format("Name = {0}", mock.Name)));
            Response.Write(new XElement("div", string.Format("Value = {0}", mock.Value)));
            Response.Write(new XElement("hr"));
        }*/
    }
}
