using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Composite.Forms;
using Composite.Functions;
using System.Xml.Linq;
using Composite.Xml;
using System.Xml;
using Composite.Forms.WebChannel;
using System.Web.UI;
using Composite.Validation.ClientValidationRules;

namespace Composite.WebClient
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public static class FunctionUiHelper
	{
        public static FormTreeCompiler AttachAndCompileParameterWidgets(Control attachmentControl, IEnumerable<ParameterProfile> parameterProfiles, Dictionary<string, object> bindings, string uniqueName, string panelLabel, IFormChannelIdentifier channelIdentifier, bool reset)
        {
            FormTreeCompiler compiler = FunctionUiHelper.BuildWidgetForParameters(parameterProfiles, bindings, uniqueName, panelLabel, channelIdentifier);
            IWebUiControl webUiControl = (IWebUiControl)compiler.UiControl;
            Control form = webUiControl.BuildWebControl();
            attachmentControl.Controls.Add(form);

            if (reset == true)
            {
                webUiControl.InitializeViewState();
            }

            return compiler;
        }


        public static FormTreeCompiler BuildWidgetForParameters(IEnumerable<ParameterProfile> parameterProfiles, Dictionary<string, object> bindings, string uniqueName, string panelLabel, IFormChannelIdentifier channelIdentifier)
        {
            XNamespace stdControlLibSpace = Namespaces.BindingFormsStdUiControls10;

            XElement bindingsDeclaration = new XElement(Namespaces.BindingForms10 + "bindings");
            XElement widgetPlaceholder = new XElement(stdControlLibSpace + "FieldGroup", new XAttribute("Label", panelLabel));

            Dictionary<string, List<ClientValidationRule>> bindingsValidationRules = new Dictionary<string, List<ClientValidationRule>>();

            foreach (ParameterProfile parameterProfile in parameterProfiles)
            {
                bindingsDeclaration.Add(
                    new XElement(Namespaces.BindingForms10 + "binding",
                        new XAttribute("optional", true),
                        new XAttribute("name", parameterProfile.Name),
                        new XAttribute("type", parameterProfile.Type.AssemblyQualifiedName)));
//                        new XAttribute("type", typeof(object).AssemblyQualifiedName)));

                IWidgetFunction widgetFunction = parameterProfile.WidgetFunction;

                FunctionContextContainer context = new FunctionContextContainer();
                XElement uiMarkup = FunctionFacade.GetWidgetMarkup(widgetFunction, parameterProfile.Type, parameterProfile.WidgetFunctionParameters, parameterProfile.Label, parameterProfile.HelpDefinition, parameterProfile.Name, context);

                widgetPlaceholder.Add(uiMarkup);

                if (bindings.ContainsKey(parameterProfile.Name) == false)
                {
                    bindings.Add(parameterProfile.Name, "");
                }

                if (parameterProfile.IsRequired == true)
                {
                    bindingsValidationRules.Add(parameterProfile.Name, new List<ClientValidationRule> { new NotNullClientValidationRule() });
                }
            }

            FormDefinition widgetFormDefinition = BuildFormDefinition(bindingsDeclaration, widgetPlaceholder, bindings);

            FormTreeCompiler compiler = new FormTreeCompiler();

            using (XmlReader reader = widgetFormDefinition.FormMarkup)
            {
                compiler.Compile(reader, channelIdentifier, widgetFormDefinition.Bindings, false, "WidgetParameterSetters" + uniqueName, bindingsValidationRules);
            }

            return compiler;
        }


        /// <summary>
        /// 
        /// </summary>
        /// <param name="uiControlMarkup">The visual content of the form. All namespaces that controls and functions belong to must be declared.</param>
        /// <param name="bindingDeclarationMarkup">Bining declarations - a list of elements like &lt;binding name="..." type="..." optional="false" xmlns="http://www.composite.net/ns/management/bindingforms/1.0" /></param>
        /// <returns></returns>
        private static FormDefinition BuildFormDefinition(XNode bindingsDeclarationMarkup, XNode uiControlMarkup, Dictionary<string, object> bindings)
        {
            XNamespace placeholderSpace = "#internal";
            XNamespace stdControlLibSpace = Namespaces.BindingFormsStdUiControls10;

            string formXml =
            #region XML for form
 @"<?xml version='1.0' encoding='utf-8' ?>
<cms:formdefinition
  xmlns:internal='" + placeholderSpace + @"'
  xmlns:cms='" + Namespaces.BindingForms10 + @"'>

  <internal:bindingsDeclarationPlaceholder />

  <cms:layout>
    <!--FieldGroup xmlns='" + stdControlLibSpace + @"'-->
      <internal:uiControlPlaceholder />
    <!--/FieldGroup-->
  </cms:layout>
  
</cms:formdefinition>";
            #endregion

            var formMarkup = XDocument.Parse(formXml);

            XElement bindingDeclarationPlaceholder = formMarkup.Descendants(placeholderSpace + "bindingsDeclarationPlaceholder").First();

            bindingDeclarationPlaceholder.ReplaceWith(bindingsDeclarationMarkup);

            XElement uiControlPlaceholder = formMarkup.Descendants(placeholderSpace + "uiControlPlaceholder").First();
            uiControlPlaceholder.ReplaceWith(uiControlMarkup);

            return new FormDefinition(formMarkup.CreateReader(), bindings);
        }



	}


}
