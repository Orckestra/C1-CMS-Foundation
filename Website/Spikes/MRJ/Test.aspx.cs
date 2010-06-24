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
using Composite.ConsoleEventSystem;
using Composite.Data.Types;
using Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController;
using Composite.Users;
using System.Threading;
using Composite.Data.DynamicTypes;
using Composite;
using Composite.Types;
using System.Reflection;





public partial class Spikes_Test : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        Type type = TypeManager.GetType("DynamicType:Martin.IGlobalTest2");

        PropertyInfo idPropertyInfo = type.GetProperty("Id");
        PropertyInfo myStringFieldPropertyInfo = type.GetProperty("MyStringField");

        for (int i = 0; i < 500; i++)
        {
            IData data = DataFacade.BuildNew(type);
            idPropertyInfo.SetValue(data, Guid.NewGuid(), null);
            myStringFieldPropertyInfo.SetValue(data, "Some value", null);

            DataFacade.AddNew(data);
        }
    }
}
