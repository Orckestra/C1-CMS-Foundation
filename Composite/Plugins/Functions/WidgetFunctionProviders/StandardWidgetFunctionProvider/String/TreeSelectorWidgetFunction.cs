using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;

using Composite.Functions;
using Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Foundation;
using Composite.C1Console.Forms.CoreUiControls;
using Composite.Core.Xml;

namespace Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.String
{
    internal sealed class TreeSelectorWidgetFunction : CompositeWidgetFunctionBase
    {
        private const string _functionName = "TreeSelector";
        public const string CompositeName = CompositeWidgetFunctionBase.CommonNamespace + ".String." + _functionName;

        public TreeSelectorWidgetFunction(EntityTokenFactory entityTokenFactory)
            : base(CompositeName, typeof(string), entityTokenFactory)
        {
            SetParameterProfiles();
        }


        private void SetParameterProfiles()
        {
            base.AddParameterProfile(
                new ParameterProfile("ElementProvider",
                    typeof(string),
                    true,
                    new ConstantValueProvider(string.Empty),
                    StandardWidgetFunctions.TextBoxWidget,
                    null,
                    "Element Provider", new HelpDefinition("Tree Provider")));

            base.AddParameterProfile(
                new ParameterProfile("SelectionProperty",
                    typeof(string),
                    true,
                    new ConstantValueProvider(string.Empty),
                    StandardWidgetFunctions.TextBoxWidget,
                    null,
                    "SelectionProperty", new HelpDefinition("")));

            base.AddParameterProfile(
                new ParameterProfile("SelectionValue",
                    typeof(string),
                    false,
                    new ConstantValueProvider(string.Empty),
                    StandardWidgetFunctions.TextBoxWidget,
                    null,
                    "SelectionValue", new HelpDefinition("")));

            base.AddParameterProfile(
                new ParameterProfile("SelectionResult",
                    typeof(string),
                    false,
                    new ConstantValueProvider(string.Empty),
                    StandardWidgetFunctions.TextBoxWidget,
                    null,
                    "SelectionResult", new HelpDefinition("")));
            base.AddParameterProfile(
                new ParameterProfile("SerializedSearchToken",
                    typeof(string),
                    false,
                    new ConstantValueProvider(string.Empty),
                    StandardWidgetFunctions.TextBoxWidget,
                    null,
                    "SerializedSearchToken", new HelpDefinition("")));
            base.AddParameterProfile(
                new ParameterProfile("Required",
                    typeof(bool),
                    false,
                    new ConstantValueProvider(false),
                    StandardWidgetFunctions.CheckBoxWidget,
                    null,
                    "Required", new HelpDefinition("")));
        }


        public override XElement GetWidgetMarkup(ParameterList parameters, string label, HelpDefinition helpDefinition, string bindingSourceName)
        {
            XElement formElement = base.BuildBasicWidgetMarkup("TreeSelector", "SelectedKey", label, helpDefinition, bindingSourceName);
            foreach (var propertyName  in new []
            {
                "ElementProvider", "SelectionProperty", "SelectionValue", "SelectionResult", "SerializedSearchToken", "Required"
            })
            {
                string propertyValue = parameters.GetParameter<string>(propertyName);
                formElement.Add(new XAttribute(propertyName, propertyValue));
            }
            return formElement;
        }
    }
}
