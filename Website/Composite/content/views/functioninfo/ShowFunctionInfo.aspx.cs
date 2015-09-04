using System;
using System.Linq;
using System.Web.UI;
using System.Xml.Linq;
using Composite.Functions;
using Composite.Core.ResourceSystem;
using Composite.Core.Types;
using Composite.Functions.Foundation;


public partial class Composite_content_views_functioninfo_ShowFunctionInfo : System.Web.UI.Page
{
    public string PageLabel { get; set; }


    public Composite_content_views_functioninfo_ShowFunctionInfo()
    {
        PageLabel = "Function Info";
    }


    protected void Page_Load(object sender, EventArgs e)
    {
        string functionName = Request.QueryString["Name"];
        bool isWidget = bool.Parse(Request.QueryString["IsWidget"] ?? "false");

        this.PageLabel = functionName;

        IMetaFunction function = isWidget ? FunctionFacade.GetWidgetFunction(functionName)
                                           : (IMetaFunction) FunctionFacade.GetFunction(functionName);

        var functionDescriptors = new XElement("ul", new XAttribute("id", "functionList"));
        XElement descriptionElement = null;
        XElement parametersTable = null;

        XNamespace functionNamespace = FunctionTreeConfigurationNames.NamespaceName;
        var codeElement = new XElement(functionNamespace + (isWidget ? "widgetfunction" : "function"),
            new XAttribute("name", functionName),
            new XAttribute(XNamespace.Xmlns + "f", FunctionTreeConfigurationNames.NamespaceName));


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
                        new XAttribute("class", "type"),
                        new XElement("span",
                            new XAttribute("class", "typeinfo"),
                            parameterProfile.Type.GetShortLabel())),
                    new XElement("td",
                        new XAttribute("class", "description"),
                            helpText
                        )
                    );
                parametersTable.Add(parameterRow);



                var codeParameter = new XElement(functionNamespace + "param", new XAttribute("name", parameterProfile.Name));

                string value = parameterProfile.IsRequired ? "[Required Value]" : "[Optional Value]";

                if (parameterProfile.Type.IsPrimitive || parameterProfile.Type == typeof(string) || parameterProfile.Type == typeof(Guid))
                {
                    codeParameter.Add(new XAttribute("value", value));
                }
                else
                {
                    codeParameter.Add(value);
                }

                codeParameter.Add(new XAttribute(XNamespace.Xmlns + "f", FunctionTreeConfigurationNames.NamespaceName));

                codeElement.Add(codeParameter);
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

        var hans = new XElement("div", functionDescriptors);
        hans.Add(new XElement("div", new XAttribute("style", "padding-left: 45px"),
            new XElement("div", new XAttribute("style", "font-weight: bold"), "Function Markup"),
            new XElement("div", new XAttribute("style", "padding-left: 10px"), new XElement("pre", codeElement.ToString(SaveOptions.OmitDuplicateNamespaces)))
        ));

        functionInfoPlaceholder.Controls.Add(new LiteralControl(hans.ToString(SaveOptions.DisableFormatting)));
    }
}
