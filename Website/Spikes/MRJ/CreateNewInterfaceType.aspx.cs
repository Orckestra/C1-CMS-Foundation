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
using Composite.Data.GeneratedTypes;
using Composite.Data;
using System.Collections.Generic;

public partial class Spikes_MRJ_CreateNewInterfaceType : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

        string uniqueString = string.Format("{0}", System.IO.Path.GetRandomFileName().Replace(".",""));
        string typeNamespace = "AutoCreated";
        string typeName = string.Format("IAutoCreateGeneratedType{0}", uniqueString);
        string typeTitle = string.Format("Auto Type {0}", uniqueString);

        string labelFieldName = "Name";

        DataFieldDescriptor fieldDescriptor2 = new DataFieldDescriptor(Guid.NewGuid(), "Value", StoreFieldType.Integer, typeof(int));
        fieldDescriptor2.FormRenderingProfile.Label = "Value";
        fieldDescriptor2.FormRenderingProfile.HelpText = "The Value";
//        fieldDescriptor2.FormRenderingProfile.WidgetFunctionName = "Composite.Widgets.TextBox";

        DataFieldDescriptor fieldDescriptor3 = new DataFieldDescriptor(Guid.NewGuid(), "Name", StoreFieldType.String(128), typeof(string));
        fieldDescriptor3.FormRenderingProfile.Label = "Name";
        fieldDescriptor3.FormRenderingProfile.HelpText = "The Name";
//        fieldDescriptor3.FormRenderingProfile.WidgetFunctionName = "Composite.Widgets.TextBox";

        DataFieldDescriptor fieldDescriptor4 = new DataFieldDescriptor(Guid.NewGuid(), "Date", StoreFieldType.DateTime, typeof(DateTime));
        fieldDescriptor4.FormRenderingProfile.Label = "Date";
        fieldDescriptor4.FormRenderingProfile.HelpText = "The Date";
//        fieldDescriptor4.FormRenderingProfile.WidgetFunctionName = "Composite.Widgets.DateSelector";

        List<DataFieldDescriptor> dataFields = new List<DataFieldDescriptor> { fieldDescriptor2, fieldDescriptor3, fieldDescriptor4 };

        CreateType(typeNamespace, typeName, typeTitle, dataFields, labelFieldName, true, true, true);
    }


    private void CreateType(string typeNamespace, string typeName, string typeTitle, IEnumerable<DataFieldDescriptor> dataFieldDescriptors, string labelFieldName, bool hasPublishing, bool hasRecycleBin, bool hasVersioning)
    {
        GeneratedTypesHelper helper;
        helper = new GeneratedTypesHelper();

        helper.SetPublishControlled(hasPublishing);
//        helper.SetDeleteControlled(hasRecycleBin);
//        helper.SetVersionControlled(hasVersioning);

        helper.SetNewTypeFullName(typeName, typeNamespace);
        helper.SetNewTypeTitle(typeTitle);
        helper.SetNewFieldDescriptors(dataFieldDescriptors, labelFieldName);

//        helper.CreateType();
    }
}
