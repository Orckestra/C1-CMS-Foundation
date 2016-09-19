using System;
using Composite.Data.Types;

public partial class ViewUnpublishedItems : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!this.IsPostBack)
        {
            headerRepeater.DataSource = VersionedDataHelper.GetExtraPropertiesNames();
            headerRepeater.DataBind();
        }

    }

}
