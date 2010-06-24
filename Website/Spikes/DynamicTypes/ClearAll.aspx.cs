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
using System.Collections.Generic;
using Composite.Data.DynamicTypes.Foundation;
using Composite.Data;


public partial class Spikes_DynamicTypes_ClearAll : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        /*List<Guid> typeDescriptorIds = DataFacade.GetData<IDataTypeDescriptor>().Select(dtd => dtd.Id).ToList();
            
        foreach (Guid id in typeDescriptorIds)
        {
            DynamicTypesMetaDataFacade.DeleteMetaData(id);
        }

        Response.Write("Meta datas cleared!");*/
        Response.Write("NOT WORKING!!!");
    }
}
