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
using System.Reflection;
using Composite.Types;
using Composite.Security;

public partial class Spikes_ShowAllActionTokenTypes_ShowAllActionTokenTypes : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        foreach (Assembly assembly in AppDomain.CurrentDomain.GetAssemblies())
        {
            if (TypeLocator.IsProbeableAssembly(assembly.FullName))
            {
                Type[] types = assembly.GetTypes();

                foreach (Type type in types)
                {
                    if (typeof(ActionToken).IsAssignableFrom(type) == true)
                    {
                        XElement element = new XElement("p", type.FullName);

                        Response.Write(element.ToString());
                    }
                }
            }
        }
    }
}
