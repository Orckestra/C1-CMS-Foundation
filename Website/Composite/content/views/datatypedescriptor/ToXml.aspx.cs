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
using Composite.Core.Types;
using Composite.Data.DynamicTypes;


public partial class Composite_content_views_datatypedescriptor_ToXml : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string typeName = this.Request.QueryString["TypeName"];

        Type type = TypeManager.GetType(typeName);

        DataTypeDescriptor dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(type);
        XElement element = dataTypeDescriptor.ToXml();

        this.DataTypeDescriptorHolder.Controls.Add(new LiteralControl(new XElement("h3", "Xml").ToString()));
        this.DataTypeDescriptorHolder.Controls.Add(new LiteralControl(new XElement("pre", element.ToString()).ToString()));

        this.DataTypeDescriptorHolder.Controls.Add(new LiteralControl(new XElement("h3", "Xml attribute encoded xml").ToString()));
        XElement dummyElement = new XElement("Dummy", new XAttribute("dummy", element.ToString()));
        string dummyString = dummyElement.ToString();
        dummyString = dummyString.Remove(0, 13);
        dummyString = dummyString.Remove(dummyString.Length - 3);
        this.DataTypeDescriptorHolder.Controls.Add(new LiteralControl(new XElement("pre", dummyString).ToString()));
    }
}
