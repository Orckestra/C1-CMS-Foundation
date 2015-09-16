using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.UI;
using System.Xml;
using System.Xml.Linq;

using Composite.C1Console.Forms;
using Composite.C1Console.Forms.WebChannel;
using Composite.Core.Types;
using Composite.Core.Xml;
using Composite.Data.Validation.ClientValidationRules;
using Composite.Functions;


namespace Composite.Core.WebClient
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public static class FunctionUiHelper
	{
        /// <exclude />
        public static FormTreeCompiler AttachAndCompileParameterWidgets(Control attachmentControl, IEnumerable<ParameterProfile> parameterProfiles, Dictionary<string, object> bindings, string uniqueName, string panelLabel, IFormChannelIdentifier channelIdentifier, bool reset)
        {
            FormTreeCompiler compiler = FunctionUiHelper.BuildWidgetForParameters(parameterProfiles, bindings, uniqueName, panelLabel, channelIdentifier);
            IWebUiControl webUiControl = (IWebUiControl)compiler.UiControl;
            Control form = webUiControl.BuildWebControl();
            attachmentControl.Controls.Add(form);

            if (reset)
            {
                webUiControl.InitializeViewState();
            }

            return compiler;
        }


        /// <exclude />
        public static FormTreeCompiler BuildWidgetForParameters(IEnumerable<ParameterProfile> parameterProfiles, Dictionary<string, object> bindings, string uniqueName, string panelLabel, IFormChannelIdentifier channelIdentifier)
        {
            XNamespace stdControlLibSpace = Namespaces.BindingFormsStdUiControls10;

            var bindingsDeclaration = new XElement(Namespaces.BindingForms10 + "bindings");
            var widgetPlaceholder = new XElement(stdControlLibSpace + "FieldGroup", new XAttribute("Label", panelLabel));

            var bindingsValidationRules = new Dictionary<string, List<ClientValidationRule>>();

            foreach (ParameterProfile parameterProfile in parameterProfiles.Where(f=>f.WidgetFunction!=null))
            {
                IWidgetFunction widgetFunction = parameterProfile.WidgetFunction;

                Type bindingType = widgetFunction != null && parameterProfile.Type.IsLazyGenericType() ? 
                                    widgetFunction.ReturnType : parameterProfile.Type;

                bindingsDeclaration.Add(
                    new XElement(Namespaces.BindingForms10 + "binding",
                        new XAttribute("optional", true),
                        new XAttribute("name", parameterProfile.Name),
                        new XAttribute("type", bindingType.AssemblyQualifiedName)));

                var context = new FunctionContextContainer();
                XElement uiMarkup = FunctionFacade.GetWidgetMarkup(widgetFunction, parameterProfile.Type, parameterProfile.WidgetFunctionParameters, parameterProfile.Label, parameterProfile.HelpDefinition, parameterProfile.Name, context);

                widgetPlaceholder.Add(uiMarkup);

                if (!bindings.ContainsKey(parameterProfile.Name))
                {
                    bindings.Add(parameterProfile.Name, "");
                }

                if (parameterProfile.IsRequired)
                {
                    bindingsValidationRules.Add(parameterProfile.Name, new List<ClientValidationRule> { new NotNullClientValidationRule() });
                }
            }

            FormDefinition widgetFormDefinition = BuildFormDefinition(bindingsDeclaration, widgetPlaceholder, bindings);

            var compiler = new FormTreeCompiler();

            using (XmlReader reader = widgetFormDefinition.FormMarkup)
            {
                compiler.Compile(reader, channelIdentifier, widgetFormDefinition.Bindings, false, "WidgetParameterSetters" + uniqueName, bindingsValidationRules);
            }

            return compiler;
        }


        /// <summary>
        /// 
        /// </summary>
        /// <param name="bindingsDeclarationMarkup">Binding declarations - a list of elements like &lt;binding name="..." type="..." optional="false" xmlns="http://www.composite.net/ns/management/bindingforms/1.0" /></param>
        /// <param name="uiControlMarkup">The visual content of the form. All namespaces that controls and functions belong to must be declared.</param>
        /// <param name="bindings"></param>                
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
