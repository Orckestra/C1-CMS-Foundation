using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
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

        IMetaFunction function;
        if (!isWidget) function = FunctionFacade.GetFunction(functionName);
        else function = FunctionFacade.GetWidgetFunction(functionName);

        XElement functionDescriptors = new XElement("ul", new XAttribute("id", "functionList"));
        XElement descriptionElement = null;
        XElement parametersTable = null;

        XNamespace functionNamespace = FunctionTreeConfigurationNames.NamespaceName;
        XElement codeElement = new XElement(functionNamespace + "function",
            new XAttribute("name", functionName),
            new XAttribute(XNamespace.Xmlns + "f", FunctionTreeConfigurationNames.NamespaceName));


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



                XElement codeParameter = new XElement("param", new XAttribute("name", parameterProfile.Name));

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

        var hans = new XElement("div", functionDescriptors);
        hans.Add(new XElement("div", new XAttribute("style", "padding-left: 45px"),
            new XElement("div", new XAttribute("style", "font-weight: bold"), "Function Markup"),
            new XElement("div", new XAttribute("style", "padding-left: 10px"), new XElement("pre", codeElement.ToString(SaveOptions.OmitDuplicateNamespaces)))
        ));

        functionInfoPlaceholder.Controls.Add(new LiteralControl(hans.ToString(SaveOptions.DisableFormatting)));
    }
}
