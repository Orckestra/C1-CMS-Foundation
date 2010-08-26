using System;
using System.Xml.Linq;
using System.Collections.Generic;

using Composite.Functions;
using Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Foundation;
using Composite.C1Console.Forms.CoreUiControls;


namespace Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Bool
{
    internal sealed class BoolSelectorWidgetFuntion : CompositeWidgetFunctionBase
    {
        private const string _functionName = "BoolSelector";
        public const string CompositeName = CompositeWidgetFunctionBase.CommonNamespace + ".Bool." + _functionName;

        public const string TrueLabelParameterName = "TrueLabel";
        public const string FalseLabelParameterName = "FalseLabel";

        public BoolSelectorWidgetFuntion(EntityTokenFactory entityTokenFactory)
            : base(CompositeName, typeof(bool), entityTokenFactory)
        {
            SetParameterProfiles( true, "True", "False");
        }

        public BoolSelectorWidgetFuntion(EntityTokenFactory entityTokenFactory, string trueLabel, string falseLabel)
            : base(CompositeName, typeof(bool), entityTokenFactory)
        {
            SetParameterProfiles(false, trueLabel, falseLabel);
        }

        private void SetParameterProfiles(bool require, string trueLabel, string falseLabel)
        {
            ParameterProfile trueLabelPP =
                new ParameterProfile(BoolSelectorWidgetFuntion.TrueLabelParameterName,
                    typeof(string), require,
                    new ConstantValueProvider(trueLabel), StandardWidgetFunctions.TextBoxWidget, null,
                    "True label", new HelpDefinition("Label to show when value is true"));

            ParameterProfile falseLabelPP =
                new ParameterProfile(BoolSelectorWidgetFuntion.FalseLabelParameterName,
                    typeof(string), require,
                    new ConstantValueProvider(falseLabel), StandardWidgetFunctions.TextBoxWidget, null,
                    "False label", new HelpDefinition("Label to show when value is false"));

            base.AddParameterProfile(trueLabelPP);
            base.AddParameterProfile(falseLabelPP);
        }



        public override XElement GetWidgetMarkup(ParameterList parameters, string label, HelpDefinition help, string bindingSourceName)
        {
            XElement boolSelectorMarkup = base.BuildBasicWidgetMarkup("BoolSelector", "IsTrue", label, help, bindingSourceName);

            boolSelectorMarkup.Add(new XAttribute("TrueLabel", parameters.GetParameter<string>(BoolSelectorWidgetFuntion.TrueLabelParameterName)));
            boolSelectorMarkup.Add(new XAttribute("FalseLabel", parameters.GetParameter<string>(BoolSelectorWidgetFuntion.FalseLabelParameterName)));

            return boolSelectorMarkup;
        }
    }
}
