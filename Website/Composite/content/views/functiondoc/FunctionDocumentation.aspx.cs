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
using System.Collections.Generic;
using Composite.ResourceSystem;
using Composite.Types;

public partial class Spikes_MAW_FunctionDocumentation : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string functionPrefix = Request.QueryString["functionPrefix"] ?? "";
        bool widgets = bool.Parse(Request.QueryString["widgets"] ?? "false");


        List<string> functionNames;

        if (widgets == false)
            functionNames = FunctionFacade.FunctionNames.Where(f => f.StartsWith(functionPrefix)).OrderBy(f => f).ToList();
        else
            functionNames = FunctionFacade.WidgetFunctionNames.Where(f => f.StartsWith(functionPrefix)).OrderBy(f => f).ToList();

        functionNames = functionNames.Where(f => f.StartsWith(functionPrefix)).OrderBy(f => f).ToList();


        XElement functionDescriptors = new XElement("ul",
            new XAttribute("id", "functionList"));

        foreach (string functionName in functionNames)
        {
            IMetaFunction function;
            if (widgets == false)
                function = FunctionFacade.GetFunction(functionName);
            else
                function = FunctionFacade.GetWidgetFunction(functionName);

            XElement descriptionElement = null;
            XElement parametersTable = null;

            if (string.IsNullOrEmpty(function.Description) == false)
            {
                descriptionElement = new XElement("div",
                    new XAttribute("class", "description"),
                    StringResourceSystemFacade.ParseString(function.Description));
            }

            if (function.ParameterProfiles.Any() == true)
            {
                parametersTable = new XElement("table", new XAttribute("class", "parameters"));
                foreach (ParameterProfile parameterProfile in function.ParameterProfiles)
                {
                    string helpText = parameterProfile.HelpDefinition.GetLocalized().HelpText;

                    if (string.IsNullOrEmpty(helpText) == false)
                    {
                        helpText = string.Format(" {0}", helpText);
                    }

                    XElement parameterRow = new XElement("tr",
                        new XAttribute("title", parameterProfile.LabelLocalized),
                        new XElement("td",
                            new XAttribute("class", string.Format("requiredInfo required{0}", parameterProfile.IsRequired))),
                        new XElement("td",
                            new XAttribute("class", "name"),
                            parameterProfile.Name),
                        new XElement("td",
                            new XAttribute("class", "description"),
                            new XElement("span",
                                new XAttribute("class", "typeinfo"),
                                string.Format("{0}", parameterProfile.Type.GetShortLabel())),
                            (string.IsNullOrEmpty(helpText) ? "" : string.Format(" {0}", helpText)))
                        );
                    parametersTable.Add(parameterRow);
                }
            }

            XElement functionDescriptor = new XElement("li",
                new XElement("div",
                    new XAttribute("class", "header"),
                    functionName,
                    new XElement("span",
                        new XAttribute("class", "typeinfo"),
                        " ← " + function.ReturnType.GetShortLabel())),
                descriptionElement,
                parametersTable
                );

            functionDescriptors.Add(functionDescriptor);
        }

        functionDescriptorsPlaceholder.Controls.Add(new LiteralControl(functionDescriptors.ToString(SaveOptions.DisableFormatting)));
    }
}
