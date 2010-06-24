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
using Composite.Data.DynamicTypes;
using Composite.Data;
using Spikes.MRJ;
using Composite.EventSystem;
using System.Collections.Generic;
using System.Reflection;


public partial class Spikes_MRJ_DDLSpike : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        DataTypeDescriptor dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(typeof(IMyData));

        //DynamicTypeManager.DropStore("FrejaWebDevStoreSqlDataProvider", dataTypeDescriptor);


        List<IMyData> myDatas = DataFacade.GetData<IMyData>().ToList();

        foreach (IMyData myData in myDatas)
        {
            foreach (PropertyInfo propertyInfo in typeof(IMyData).GetProperties())
            {
                Response.Write(string.Format("{0}: ", propertyInfo.Name));
                Response.Write(propertyInfo.GetGetMethod().Invoke(myData, new object[] { }).ToString());
                Response.Write("<br />");
            }

            Response.Write("<br />");
            Response.Write("<br />");
        }

        IMyData data = DataFacade.BuildNew<IMyData>();
        data.Id = Guid.NewGuid();
        data.Name = "Hejsa";
        data.Value = 100;
        DataFacade.AddNew<IMyData>(data);

        //DynamicTypeManager.CreateStore("FrejaWebDevStoreSqlDataProvider", dataTypeDescriptor);

        /*DynamicTypeManager.EnsureStore("FrejaWebDevStoreSqlDataProvider", dataTypeDescriptor);

        GlobalEventSystemFacade.FireFlushEvent();
        GlobalEventSystemFacade.FirePostFlushEvent();

        List<IMyData> myDatas = DataFacade.GetData<IMyData>().ToList();

        foreach (IMyData myData in myDatas)
        {
            foreach (PropertyInfo propertyInfo in typeof(IMyData).GetProperties())
            {
                Response.Write(string.Format("{0}: ", propertyInfo.Name));
                Response.Write(propertyInfo.GetGetMethod().Invoke(myData, new object[]{}).ToString());
                Response.Write("<br />");
            }

            Response.Write("<br />");
            Response.Write("<br />");
        }*/
    }
}
