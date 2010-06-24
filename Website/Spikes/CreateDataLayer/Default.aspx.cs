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
using Composite.Types;
using Composite.Data;
using System.Collections.Generic;
using Composite.Data.DynamicTypes;

public partial class Spikes_CreateDataLayer_Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Page.IsPostBack == false)
        {
            TypeLocator typeLocator = new TypeLocator();

            IEnumerable<Type> idataTypes = TypeLocator.FindTypes(TypeIncludes.InterfaceTypes, typeof(IData));

            var createableTypes =
                from idataType in idataTypes
                where idataType.GetCustomAttributes(typeof(ImmutableTypeIdAttribute), false).Length > 0
                orderby idataType.FullName
                select idataType;

            this.TypesListBox.DataSource = createableTypes;
            this.TypesListBox.DataValueField = "AssemblyQualifiedName";
            this.TypesListBox.DataTextField = "FullName";
            this.TypesListBox.DataBind();
        }
    }


    protected void ReCreateButton_Click(object sender, EventArgs e)
    {
        string dataProviderName = this.DataProviderNameTextBox.Text;
        var dataTypeDescriptors = new List<DataTypeDescriptor>();

        for (int i = 0; i < this.TypesListBox.Items.Count; i++)
        {
            if (this.TypesListBox.Items[i].Selected == true)
            {
                Type idataType = TypeManager.GetType(this.TypesListBox.Items[i].Value);
                DataTypeDescriptor dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(idataType);
                dataTypeDescriptors.Add(dataTypeDescriptor);
            }
        }

        foreach( var dataTypeDescriptor in dataTypeDescriptors )
        {
            DynamicTypeManager.DropStore( dataProviderName, dataTypeDescriptor );
            DynamicTypeManager.CreateStore( dataProviderName, dataTypeDescriptor );
        }
        
        this.Controls.Add( new LiteralControl( "<h1>DONE!</h1>" ));
    }
}
