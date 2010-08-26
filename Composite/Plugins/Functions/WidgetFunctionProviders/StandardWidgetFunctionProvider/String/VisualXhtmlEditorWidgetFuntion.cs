using System;
using System.Xml.Linq;
using System.Collections.Generic;

using Composite.Functions;
using Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Foundation;


namespace Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.String
{
	internal sealed class VisualXhtmlEditorFuntion : CompositeWidgetFunctionBase
    {
        private const string _functionName = "VisualXhtmlEditor";
        public const string CompositeName = CompositeWidgetFunctionBase.CommonNamespace + ".String." +_functionName;

        public const string ClassConfigurationNameParameterName = "ClassConfigurationName";


        public VisualXhtmlEditorFuntion(EntityTokenFactory entityTokenFactory)
            : base(CompositeName, typeof(string), entityTokenFactory)
        {
            SetParameterProfiles(false, "common");
        }




        public override XElement GetWidgetMarkup(ParameterList parameters, string label, HelpDefinition help, string bindingSourceName)
        {
            XElement element = base.BuildBasicWidgetMarkup("InlineXhtmlEditor", "Xhtml", label, help, bindingSourceName);
            element.Add(new XAttribute("ClassConfigurationName", parameters.GetParameter<string>(VisualXhtmlEditorFuntion.ClassConfigurationNameParameterName)));

            return element;
        }


        private void SetParameterProfiles(bool require, string classConfigurationName)
        {
            ParameterProfile classConfigNamePP =
                new ParameterProfile(VisualXhtmlEditorFuntion.ClassConfigurationNameParameterName,
                    typeof(string), require,
                    new ConstantValueProvider(classConfigurationName), StandardWidgetFunctions.TextBoxWidget, null,
                    "Class configuration name", new HelpDefinition("The visual editor can be configured to offer the editor a special set of class names for formatting xhtml elements. The default value is '" + classConfigurationName + "'"));

            base.AddParameterProfile(classConfigNamePP);
        }

    }
}
