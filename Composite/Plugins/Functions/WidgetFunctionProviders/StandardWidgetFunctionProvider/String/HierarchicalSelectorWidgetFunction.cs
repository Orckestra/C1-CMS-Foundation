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
    internal sealed class HierarchicalSelectorWidgetFunction : CompositeWidgetFunctionBase
    {
        private const string _functionName = "HierarchicalSelector";
        public const string CompositeName = CompositeWidgetFunctionBase.CommonNamespace + ".String." + _functionName;


        public HierarchicalSelectorWidgetFunction(EntityTokenFactory entityTokenFactory)
            : base(CompositeName, typeof(string), entityTokenFactory)
        {
            SetParameterProfiles();
        }


        private void SetParameterProfiles()
        {
            base.AddParameterProfile(
                new ParameterProfile("TreeNodes",
                    typeof(IEnumerable<SelectionTreeNode>),
                    true,
                    new NoValueValueProvider(),
                    null,
                    null,
                    "Tree Nodes", new HelpDefinition("The structure to use for building hierarchy for selection. Call a function that return IEnumerable<SelectionTreeNode>.")));

            base.AddParameterProfile(
                new ParameterProfile("Required",
                    typeof(bool),
                    false,
                    new ConstantValueProvider(true),
                    StandardWidgetFunctions.GetBoolSelectorWidget("Yes, selection is required", "No, a 'none' selection is allowed.") ,
                    null,
                    "Selection required", new HelpDefinition("When true the user is forced to make a selection. This feature is not available when 'multiple selection' is enabled.")));

            base.AddParameterProfile(
                new ParameterProfile("AutoSelectChildren",
                    typeof(bool),
                    false,
                    new ConstantValueProvider(false),
                    StandardWidgetFunctions.GetBoolSelectorWidget("Yes, auto select child elements.", "No, only one selection on click."),
                    null,
                    "Auto select children", new HelpDefinition("When true a selection will automatically select all descendant elements in the hierarchy.")));

            base.AddParameterProfile(
                new ParameterProfile("AutoSelectParents",
                    typeof(bool),
                    false,
                    new ConstantValueProvider(false),
                    StandardWidgetFunctions.GetBoolSelectorWidget("Yes, auto select parents.", "No, only one selection on click."),
                    null,
                    "Auto select children", new HelpDefinition("When true a selection will automatically select all ancestor elements in the hierarchy.")));

        }


        public override XElement GetWidgetMarkup(ParameterList parameters, string label, HelpDefinition helpDefinition, string bindingSourceName)
        {
            BaseRuntimeTreeNode optionsRuntimeTreeNode = null;

            if (parameters.TryGetParameterRuntimeTreeNode("TreeNodes", out optionsRuntimeTreeNode))
            {
                bool required = parameters.GetParameter<bool>("Required");
                bool autoSelectChildren = parameters.GetParameter<bool>("AutoSelectChildren");
                bool autoSelectParents = parameters.GetParameter<bool>("AutoSelectParents");

                XElement formElement = base.BuildBasicWidgetMarkup("HierarchicalSelector", "SelectedKeys", label, helpDefinition, bindingSourceName);
                formElement.Add(new XElement(Namespaces.BindingFormsStdUiControls10 + "HierarchicalSelector.TreeNodes",
                    optionsRuntimeTreeNode.Serialize()));
                formElement.Add(new XAttribute("AutoSelectChildren", autoSelectChildren));
                formElement.Add(new XAttribute("AutoSelectParents", autoSelectParents));

                return formElement;
            }
            else
            {
                throw new InvalidOperationException("Could not get BaseRuntimeTreeNode for parameter 'TreeNodes'.");
            }
        }
    }
}
