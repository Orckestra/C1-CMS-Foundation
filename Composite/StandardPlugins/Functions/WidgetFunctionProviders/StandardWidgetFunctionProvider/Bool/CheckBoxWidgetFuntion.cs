using System;
using System.Xml.Linq;
using System.Collections.Generic;

using Composite.Functions;
using Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Foundation;
using Composite.C1Console.Forms.CoreUiControls;


namespace Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Bool
{
    internal sealed class CheckBoxWidgetFuntion : CompositeWidgetFunctionBase
    {
        private const string _functionName = "CheckBox";
        public const string CompositeName = CompositeWidgetFunctionBase.CommonNamespace + ".Bool." + _functionName;


        public CheckBoxWidgetFuntion(EntityTokenFactory entityTokenFactory)
            : base(CompositeName, typeof(bool), entityTokenFactory)
        {
            ParameterProfile pp =
                new ParameterProfile("ItemLabel", typeof(string), false,
                    new ConstantValueProvider(""), StandardWidgetFunctions.TextBoxWidget, null,
                    "Sub label", new HelpDefinition("Text to whow beside the checkbox"));

            base.AddParameterProfile(pp);
        }



        public override XElement GetWidgetMarkup(ParameterList parameters, string label, HelpDefinition help, string bindingSourceName)
        {
            XElement checkBoxMarkup = base.BuildBasicWidgetMarkup("CheckBox", "Checked", label, help, bindingSourceName);

            string itemLabel = parameters.GetParameter<string>("ItemLabel");

            if (string.IsNullOrEmpty(itemLabel) == false)
            {
                checkBoxMarkup.Add(new XAttribute("ItemLabel", itemLabel));
            }

            return checkBoxMarkup;
        }
    }
}
