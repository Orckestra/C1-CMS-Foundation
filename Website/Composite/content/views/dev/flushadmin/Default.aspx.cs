using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Composite.Core.Types;
using Composite.C1Console.Events;
using System.Reflection;


public partial class FlushAdmin_Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (this.Request.QueryString["Type"] != null)
        {
            Type type = TypeManager.GetType(this.Request.QueryString["Type"]);

            FlushAttribute flushAttribute = type.GetCustomAttributes(false).Where(f => f.GetType() == typeof(FlushAttribute)).Single() as FlushAttribute;

            MethodInfo methodInfo =
                (from m in type.GetMethods(BindingFlags.NonPublic | BindingFlags.Public | BindingFlags.Static)
                 where m.Name == flushAttribute.MethodName
                 select m).SingleOrDefault();

            methodInfo.Invoke(null, null);

            FlushAdminPlaceHolder.Controls.Add(new LiteralControl(string.Format(@"<b>{0} flushed</b>", this.Request.QueryString["Type"])));
            FlushAdminPlaceHolder.Controls.Add(new LiteralControl("<br /><br /><br />"));
        }
        
        FlushAdminPlaceHolder.Controls.Add(new LiteralControl(@"<table border=""0"">"));

        foreach (Type type in AssemblyFacade.GetAllAssemblies().GetTypes())
        {
            FlushAttribute flushAttribute = type.GetCustomAttributes(false).Where(f => f.GetType() == typeof(FlushAttribute)).SingleOrDefault() as FlushAttribute;


            if (flushAttribute == null) continue;            

            MethodInfo methodInfo =
                (from m in type.GetMethods(BindingFlags.NonPublic | BindingFlags.Public | BindingFlags.Static)
                 where m.Name == flushAttribute.MethodName
                 select m).SingleOrDefault();

            if (methodInfo == null) continue;

            FlushAdminPlaceHolder.Controls.Add(new LiteralControl("<tr>"));
            FlushAdminPlaceHolder.Controls.Add(new LiteralControl("<td>" + type.FullName + "</td>"));
            FlushAdminPlaceHolder.Controls.Add(new LiteralControl(string.Format(@"<td><a href=""{0}?Type={1}"">Flush</a></td>", this.Request.CurrentExecutionFilePath, HttpUtility.UrlEncode(type.GetVersionNeutralName()))));
            FlushAdminPlaceHolder.Controls.Add(new LiteralControl("</tr>"));
        }

        FlushAdminPlaceHolder.Controls.Add(new LiteralControl("</table>"));
    }
}
