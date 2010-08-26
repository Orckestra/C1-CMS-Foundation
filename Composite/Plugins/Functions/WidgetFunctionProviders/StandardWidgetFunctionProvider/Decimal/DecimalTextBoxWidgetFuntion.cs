using System;
using System.Xml.Linq;
using System.Collections.Generic;

using Composite.Functions;
using Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Foundation;
using Composite.C1Console.Forms.CoreUiControls;


namespace Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Decimal
{
	internal sealed class DecimalTextBoxWidgetFuntion : CompositeWidgetFunctionBase
    {
        private const string _functionName = "TextBox";
        public const string CompositeName = CompositeWidgetFunctionBase.CommonNamespace + ".Decimal." + _functionName;


        public DecimalTextBoxWidgetFuntion(EntityTokenFactory entityTokenFactory)
            : base(CompositeName, typeof(decimal), entityTokenFactory)
        {
        }



        public override XElement GetWidgetMarkup(ParameterList parameters, string label, HelpDefinition help, string bindingSourceName)
        {
            XElement textBoxMarkup = base.BuildBasicWidgetMarkup("TextBox", "Text", label, help, bindingSourceName);

            textBoxMarkup.Add(new XAttribute("Type", TextBoxType.Decimal));

            return textBoxMarkup;
        }
    }
}
