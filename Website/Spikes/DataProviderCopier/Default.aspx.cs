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
using System.Collections.Generic;



public partial class Spikes_DataProviderCopier_Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (this.IsPostBack == false)
        {
            sourceDataProviderDropDownList.DataSource = DataFacade.GetDynamicDataProviderNames();
            sourceDataProviderDropDownList.DataBind();
            destinationDataProviderDropDownList.DataSource = DataFacade.GetDynamicDataProviderNames();
            destinationDataProviderDropDownList.DataBind();
        }

    }

    protected void doCopyButton_Click(object sender, EventArgs e)
    {
        if (sourceDataProviderDropDownList.SelectedValue == destinationDataProviderDropDownList.SelectedValue)
        {
            lblResult.Text = "Source and Target cannot be the same!";
            return;
        }

        string sourceProviderName = this.sourceDataProviderDropDownList.SelectedValue;
        string targetProviderName = this.destinationDataProviderDropDownList.SelectedValue;

        DataProviderCopier dataProviderCopier = new DataProviderCopier(sourceProviderName, targetProviderName);

        dataProviderCopier.FullCopy();

        lblResult.Text = "Copy done!";
    }
}
