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
using Composite.Functions;

public partial class Spikes_MAW_GetFunctionData : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        XElement outputTable = new XElement("table", new XAttribute("border","1"));

        foreach (string functionName in FunctionFacade.FunctionNames.OrderBy(f => f))
        {
            IFunction function = FunctionFacade.GetFunction(functionName);

            XElement row = new XElement("tr");

            
            row = new XElement("tr");
            row.Add(
                new XElement("td", functionName + ".description"),
                new XElement("td", function.Description));
            outputTable.Add(row);

            foreach (ParameterProfile pp in function.ParameterProfiles.OrderBy(f => f.Name))
            {
                row = new XElement("tr");
                row.Add(
                    new XElement("td", functionName + ".param." + pp.Name + ".help"),
                    new XElement("td", pp.HelpDefinition.GetLocalized().HelpText));
                outputTable.Add(row);

                row = new XElement("tr");
                row.Add(
                    new XElement("td", functionName + ".param." + pp.Name + ".label"),
                    new XElement("td", pp.LabelLocalized));
                outputTable.Add(row);
            }
        }

        Response.Write(outputTable.ToString());
    }
}
