using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;
using Composite.Core.Xml;
using Composite.Functions;
using Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Foundation;


namespace Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider
{
    internal sealed class SelectorWidgetFunction : CompositeWidgetFunctionBase
    {
        private const string _functionName = "Selector";
        public const string CompositeName = CompositeWidgetFunctionBase.CommonNamespace + "." + _functionName;

        public static IEnumerable GetOptions(string optionsDescriptorSerialized)
        {
            XElement optionsDescriptor = XElement.Parse(optionsDescriptorSerialized);

            string keyFieldName = optionsDescriptor.Attribute("KeyFieldName").Value;
            string labelFieldName = optionsDescriptor.Attribute("LabelFieldName").Value;
            XElement treeNodeElement = optionsDescriptor.Element("TreeNode").Elements().First();
            BaseRuntimeTreeNode runtimeTreeNode = FunctionFacade.BuildTree(treeNodeElement);

            IEnumerable optionsSource = runtimeTreeNode.GetValue<IEnumerable>();

            if (optionsSource is IEnumerable<XElement>)
            {
                IEnumerable<XElement> optionElements = (IEnumerable<XElement>)optionsSource;
                foreach (XElement optionElement in optionElements)
                {
                    yield return new
                    {
                        Key = optionElement.Attribute(keyFieldName).Value,
                        Label = optionElement.Attribute(labelFieldName).Value
                    };
                }
            }
            else if (optionsSource is IDictionary)
            {
                IDictionary optionsDictionary = (IDictionary)optionsSource;
                foreach (var optionKey in optionsDictionary.Keys)
                {
                    yield return new { Key = optionKey, Label = optionsDictionary[optionKey] };
                }
            }
            else if (string.IsNullOrEmpty(keyFieldName) == false || string.IsNullOrEmpty(labelFieldName))
            {
                foreach (object optionObject in optionsSource)
                {
                    if (optionObject != null)
                    {
                        Type objectType = optionObject.GetType();

                        string key = (string.IsNullOrEmpty(keyFieldName) ?
                            optionObject.ToString() :
                            objectType.GetProperty(keyFieldName).GetValue(optionObject, null).ToString());

                        string label = (string.IsNullOrEmpty(labelFieldName) ?
                            optionObject.ToString() :
                            objectType.GetProperty(labelFieldName).GetValue(optionObject, null).ToString());

                        yield return new { Key = key, Label = label };
                    }
                }
            }
            else
            {
                foreach (var option in optionsSource)
                {
                    yield return new { Key = option, Label = option };
                }
            }
        }



        public SelectorWidgetFunction(EntityTokenFactory entityTokenFactory)
            : base(CompositeName, typeof(object), entityTokenFactory)
        {
            SetParameterProfiles();
        }


        private void SetParameterProfiles()
        {
            base.AddParameterProfile(
                new ParameterProfile("Options",
                    typeof(IEnumerable),
                    true,
                    new NoValueValueProvider(),
                    null,
                    null,
                    "Options", new HelpDefinition("A list of elements to use as options. Expected types are IEnumerable (simple lists) and Dictionary.")));

            base.AddParameterProfile(
                new ParameterProfile("KeyFieldName",
                    typeof(string),
                    false,
                    new ConstantValueProvider(null),
                    StandardWidgetFunctions.TextBoxWidget,
                    null,
                    "Source key field name", new HelpDefinition("If your option source returns a list of objects or XElements, use this field to specify the name of the field (property) to use for key values. Leave this empty to use the source option value as a string.")));

            base.AddParameterProfile(
                new ParameterProfile("LabelFieldName",
                    typeof(string),
                    false,
                    new ConstantValueProvider(null),
                    StandardWidgetFunctions.TextBoxWidget,
                    null,
                    "Source label field name", new HelpDefinition("If your option source returns a list of objects or XElements, use this field to specify the name of the field (property) to use for labels. Leave this empty to use the source option value as a string.")));

            base.AddParameterProfile(
                new ParameterProfile("Required",
                    typeof(bool),
                    false,
                    new ConstantValueProvider(true),
                    StandardWidgetFunctions.GetBoolSelectorWidget("Yes, selection is required", "No, a 'none' selection is allowed.") ,
                    null,
                    "Selection required", new HelpDefinition("When true the user is forced to make a selection. This feature is not available when 'multiple selection' is enabled.")));          
        }


        public override XElement GetWidgetMarkup(ParameterList parameters, string label, HelpDefinition helpDefinition, string bindingSourceName)
        {
            BaseRuntimeTreeNode runtimeTreeNode = null;

            if (parameters.TryGetParameterRuntimeTreeNode("Options", out runtimeTreeNode))
            {
                const string selectorName = "KeySelector";

                bool required = parameters.GetParameter<bool>("Required");


                IEnumerable options = runtimeTreeNode.GetValue<IEnumerable>();
                IDictionary dictionaryOptions = options as IDictionary;

                XElement treeNodeElement = runtimeTreeNode.Serialize().Elements().First();

                XElement functionMarkup = treeNodeElement;
               

                XElement selector = StandardWidgetFunctions.BuildBasicFormsMarkup(
                    Namespaces.BindingFormsStdUiControls10,
                    selectorName,
                    "Selected",
                    label,
                    helpDefinition,
                    bindingSourceName);

                if (dictionaryOptions != null)
                {
                    selector.Add(new XAttribute("OptionsKeyField", "Key"));
                    selector.Add(new XAttribute("OptionsLabelField", "Value"));
                }
                
                selector.Add(new XAttribute("Required", required));

                selector.Add(new XElement(selector.Name.Namespace + (selectorName + ".Options"), functionMarkup));

                return selector;
            }
            else
            {
                throw new InvalidOperationException("Could not get BaseRuntimeTreeNode for parameter 'Options'.");
            }
        }
    }
}
