using System;
using System.Xml.Linq;
using System.Collections.Generic;

using Composite.Functions;
using Composite.StandardPlugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Foundation;


namespace Composite.StandardPlugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Date
{
    internal sealed class DateSelectorWidgetFunction : CompositeWidgetFunctionBase
    {
        private const string _functionName = "DateSelector";
        public const string CompositeName = CompositeWidgetFunctionBase.CommonNamespace + ".Date." + _functionName;

        public DateSelectorWidgetFunction(EntityTokenFactory entityTokenFactory)
            : base(CompositeName, typeof(DateTime), entityTokenFactory)
        {
        }


        public override XElement GetWidgetMarkup(ParameterList parameters, string label, HelpDefinition help, string bindingSourceName)
        {
            return base.BuildBasicWidgetMarkup("DateSelector", "Date", label, help, bindingSourceName);
        }
    }
}