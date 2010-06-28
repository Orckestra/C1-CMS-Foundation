using System;
using System.Xml.Linq;
using System.Collections.Generic;

using Composite.Functions;
using Composite.StandardPlugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Foundation;


namespace Composite.StandardPlugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.String
{
    internal sealed class TextAreaWidgetFuntion : CompositeWidgetFunctionBase
    {
        private const string _functionName = "TextArea";
        public const string CompositeName = CompositeWidgetFunctionBase.CommonNamespace + ".String." + _functionName;


        public TextAreaWidgetFuntion(EntityTokenFactory entityTokenFactory)
            : base(CompositeName, typeof(string), entityTokenFactory)
        {
        }



        public override XElement GetWidgetMarkup(ParameterList parameters, string label, HelpDefinition help, string bindingSourceName)
        {
            return base.BuildBasicWidgetMarkup("TextArea", "Text", label, help, bindingSourceName);
        }
    }
}
