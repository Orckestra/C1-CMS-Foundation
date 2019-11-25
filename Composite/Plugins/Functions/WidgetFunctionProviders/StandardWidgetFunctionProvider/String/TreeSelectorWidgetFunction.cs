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
                    "Element Provider", new HelpDefinition("The name of a tree element provider (as defined in Composite.config)")));

            base.AddParameterProfile(
                new ParameterProfile("SelectableElementPropertyName",
                    typeof(string),
                    true,
                    new ConstantValueProvider(string.Empty),
                    StandardWidgetFunctions.TextBoxWidget,
                    null,
                    "Selectable Element Property Name", new HelpDefinition("The name of a property used to identify a selectable tree element by")));

            base.AddParameterProfile(
                new ParameterProfile("SelectableElementPropertyValue",
                    typeof(string),
                    false,
                    new ConstantValueProvider(string.Empty),
                    StandardWidgetFunctions.TextBoxWidget,
                    null,
                    "Selectable Element Property Value", new HelpDefinition("The value of the property optionally used (if provided) to further identify a selectable tree element by")));

            base.AddParameterProfile(
                new ParameterProfile("SelectableElementReturnValue",
                    typeof(string),
                    false,
                    new ConstantValueProvider(string.Empty),
                    StandardWidgetFunctions.TextBoxWidget,
                    null,
                    "Selectable Element Return Value", new HelpDefinition("The value to return for the selected tree element")));
            base.AddParameterProfile(
                new ParameterProfile("SerializedSearchToken",
                    typeof(string),
                    false,
                    new ConstantValueProvider(string.Empty),
                    StandardWidgetFunctions.TextBoxWidget,
                    null,
                    "Selectable Element Return Value", new HelpDefinition("A search token to filter tree elements by")));
            base.AddParameterProfile(
                new ParameterProfile("Required",
                    typeof(bool),
                    false,
                    new ConstantValueProvider(true),
                    StandardWidgetFunctions.GetBoolSelectorWidget("Yes, selection is required", "No, a 'none' selection is allowed."),
                    null,
                    "Required", new HelpDefinition("An option that indicates whether the user is required to make a selection")));

        }


        public override XElement GetWidgetMarkup(ParameterList parameters, string label, HelpDefinition helpDefinition, string bindingSourceName)
        {
            XElement formElement = base.BuildBasicWidgetMarkup("TreeSelector", "SelectedKey", label, helpDefinition, bindingSourceName);
            foreach (var propertyName  in new []
            {
                "ElementProvider", "SelectableElementPropertyName", "SelectableElementPropertyValue", "SelectableElementReturnValue", "SerializedSearchToken", "Required"
            })
            {
                string propertyValue = parameters.GetParameter<string>(propertyName);
                formElement.Add(new XAttribute(propertyName, propertyValue));
            }
            return formElement;
        }
    }
}
