using System;
using System.Linq;
using System.Web.UI;
using System.Xml.Linq;
using Composite.Functions;
using System.Collections.Generic;
using Composite.Core.ResourceSystem;
using Composite.Core.Types;

public partial class Spikes_MAW_FunctionDocumentation : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string functionPrefix = Request.QueryString["functionPrefix"] ?? "";
        bool widgets = bool.Parse(Request.QueryString["widgets"] ?? "false");


        List<string> functionNames = widgets ? FunctionFacade.WidgetFunctionNames : FunctionFacade.FunctionNames;

        functionNames = functionNames.Where(f => f.StartsWith(functionPrefix)).OrderBy(f => f).ToList();


        var functionDescriptors = new XElement("ul",
            new XAttribute("id", "functionList"));

        foreach (string functionName in functionNames)
        {
            IMetaFunction function;
            if (!widgets)
                function = FunctionFacade.GetFunction(functionName);
            else
                function = FunctionFacade.GetWidgetFunction(functionName);

            XElement descriptionElement = null;
            XElement parametersTable = null;

            if (!string.IsNullOrEmpty(function.Description))
            {
                descriptionElement = new XElement("div",
                    new XAttribute("class", "description"),
                    StringResourceSystemFacade.ParseString(function.Description));
            }

            if (function.ParameterProfiles.Any())
            {
                parametersTable = new XElement("table", new XAttribute("class", "parameters"));
                foreach (ParameterProfile parameterProfile in function.ParameterProfiles)
                {
                    string helpText = parameterProfile.HelpDefinition.GetLocalized().HelpText;

                    if (!string.IsNullOrEmpty(helpText))
                    {
                        helpText = string.Format(" {0}", helpText);
                    }

                    var parameterRow = new XElement("tr",
                        new XAttribute("title", parameterProfile.LabelLocalized),
                        new XElement("td",
                            new XAttribute("class", string.Format("requiredInfo required{0}", parameterProfile.IsRequired))),
                        new XElement("td",
                            new XAttribute("class", "name"),
                            parameterProfile.Name),
                        new XElement("td",
                            new XAttribute("class", "parameterType"),
                            parameterProfile.Type.GetShortLabel()),
                        new XElement("td",
                            new XAttribute("class", "description"),
                            new XElement("span",
                                new XAttribute("class", "typeinfo"),
                                helpText ?? ""))
                        );
                    parametersTable.Add(parameterRow);
                }
            }

            var functionDescriptor = new XElement("li",
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
