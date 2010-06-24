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
using Composite.Renderings.Page;
using Composite.Types;
using System.Linq.Expressions;

public partial class Spikes_MAW_Reference : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        DataReference<IPage> x = ValueTypeConverter.Convert<DataReference<IPage>>("f981af7d-b89b-4a1d-9183-a67878cc5d53");
        //string y = ValueTypeConverter.Convert<string>(x);
        //this.Controls.Add(new LiteralControl(y));
        this.Controls.Add( new LiteralControl(x.Data.Title.ToString()) );

//        var xx = DataFacade.GetData<IPage>().Where(f => f.Id == Guid.Empty).AsQueryable().ToList();

        //Func<IPage, bool> palle = f => f.Id == Guid.Empty;


        //var xx = DataFacade.GetData<IPage>().Where(palle).ToList();
        //Expression<Func<IPage, bool>> expr = f => f.Id == Guid.Empty;
        //var xx2 = DataFacade.GetData<IPage>().Where(expr).ToList();
    }
}
