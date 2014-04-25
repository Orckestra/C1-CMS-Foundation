using System;
using System.Xml.Linq;
using System.Collections.Generic;

using Composite.Functions;
using Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Foundation;
using Composite.Core.Xml;


namespace Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.String
{
	internal sealed class FontIconSelectorWidgetFuntion : CompositeWidgetFunctionBase
    {
        private const string _functionName = "FontIconSelector";

        /// <exclude />
        public const string CompositeName = CompositeWidgetFunctionBase.CommonNamespace + ".String." + _functionName;

        /// <exclude />
        public const string ClassNameOptionsParameterName = "ClassNameOptions";
        public const string StylesheetPathParameterName = "StylesheetPath";
        public const string ClassNamePrefixParameterName = "ClassNamePrefix";

        public FontIconSelectorWidgetFuntion(EntityTokenFactory entityTokenFactory)
            : base(CompositeName, typeof(string), entityTokenFactory)
        {
            base.AddParameterProfile(
                new ParameterProfile(FontIconSelectorWidgetFuntion.ClassNameOptionsParameterName,
                    typeof(object), true,
                    new ConstantValueProvider(null), StandardWidgetFunctions.TextAreaWidget, null,
                    "Class Name Options", new HelpDefinition("A list of class names the user should be able to choose from. Pass in a (comma seperated) string, a IEnumerable<string> or a Dictionary<string,string>.")));

            base.AddParameterProfile(
                new ParameterProfile(FontIconSelectorWidgetFuntion.StylesheetPathParameterName,
                    typeof(string), true,
                    new ConstantValueProvider(null), StandardWidgetFunctions.TextBoxWidget, null,
                    "Stylesheet Path", new HelpDefinition("Path to style sheet containing class name definitions and web font include. Example: ~/Frontend/styles/glyphicons.less")));

            base.AddParameterProfile(
                new ParameterProfile(FontIconSelectorWidgetFuntion.ClassNamePrefixParameterName,
                    typeof(string), false,
                    new ConstantValueProvider(""), StandardWidgetFunctions.TextBoxWidget, null,
                    "Class Name Prefix", new HelpDefinition("String to always prepend to the class name options for font icons to be shown in drop down. Bootstrap Example: 'glyphicon glyphicon-'")));
        }



        public override XElement GetWidgetMarkup(ParameterList parameters, string label, HelpDefinition help, string bindingSourceName)
        {
            string stylesheetPath = parameters.GetParameter<string>(FontIconSelectorWidgetFuntion.StylesheetPathParameterName);
            string classNamePrefix = parameters.GetParameter<string>(FontIconSelectorWidgetFuntion.ClassNamePrefixParameterName);

            XElement formElement = base.BuildBasicWidgetMarkup("FontIconSelector", "SelectedClassName", label, help, bindingSourceName);
            formElement.Add(new XElement(Namespaces.BindingFormsStdUiControls10+"FontIconSelector.ClassNameOptions", 
                GetClassNameOptionsValueNodes(parameters)));
            formElement.Add(new XAttribute("StylesheetPath", stylesheetPath));
            formElement.Add(new XAttribute("ClassNamePrefix", classNamePrefix));
            return formElement;
        }

        private IEnumerable<XNode> GetClassNameOptionsValueNodes(ParameterList parameters)
        {
            BaseRuntimeTreeNode classNameOptionsRuntimeTreeNode = null;
            if (parameters.TryGetParameterRuntimeTreeNode(FontIconSelectorWidgetFuntion.ClassNameOptionsParameterName, out classNameOptionsRuntimeTreeNode))
            {
                object value = parameters.GetParameter(FontIconSelectorWidgetFuntion.ClassNameOptionsParameterName);
                if (value is string)
                {
                    yield return new XText((string)value);
                }
                else
                {
                    foreach (var node in classNameOptionsRuntimeTreeNode.Serialize().Nodes())
                    {
                        yield return node;
                    }
                }
            }
        }
    }
}
