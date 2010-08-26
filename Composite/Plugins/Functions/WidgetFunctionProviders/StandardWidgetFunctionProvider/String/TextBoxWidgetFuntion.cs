using System;
using System.Xml.Linq;
using System.Collections.Generic;

using Composite.Functions;
using Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Foundation;


namespace Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.String
{
	internal sealed class TextBoxWidgetFuntion : CompositeWidgetFunctionBase
    {
        private const string _functionName = "TextBox";
        public const string CompositeName = CompositeWidgetFunctionBase.CommonNamespace + ".String." +_functionName;


        public TextBoxWidgetFuntion(EntityTokenFactory entityTokenFactory)
            : base(CompositeName, typeof(string), entityTokenFactory)
        {
        }



        public override XElement GetWidgetMarkup(ParameterList parameters, string label, HelpDefinition help, string bindingSourceName)
        {
            return base.BuildBasicWidgetMarkup("TextBox", "Text", label, help, bindingSourceName);
        }
    }
}
