using System;
using System.Xml.Linq;
using System.Collections.Generic;

using Composite.Functions;
using Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Foundation;


namespace Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Date
{
    internal sealed class DateSelectorWidgetFunction : CompositeWidgetFunctionBase
    {
        private const string _functionName = "DateSelector";
        public const string CompositeName = CompositeWidgetFunctionBase.CommonNamespace + ".Date." + _functionName;

        public DateSelectorWidgetFunction(EntityTokenFactory entityTokenFactory)
            : base(CompositeName, typeof(DateTime), entityTokenFactory)
        {
            ParameterProfile pp =
                new ParameterProfile("ReadOnly", typeof(bool), false,
                    new ConstantValueProvider(false), StandardWidgetFunctions.CheckBoxWidget, null,
                    "Read only", new HelpDefinition("When selected users can not change the date."));

            base.AddParameterProfile(pp);
        }


        public override XElement GetWidgetMarkup(ParameterList parameters, string label, HelpDefinition help, string bindingSourceName)
        {
            XElement dateSelectorElement = base.BuildBasicWidgetMarkup("DateSelector", "Date", label, help, bindingSourceName);
            if (parameters.GetParameter<bool>("ReadOnly"))
            {
                dateSelectorElement.Add(new XAttribute("ReadOnly", true));
            }

            return dateSelectorElement;
        }
    }
}