using System;
using System.Xml.Linq;
using System.Collections.Generic;

using Composite.Functions;
using Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Foundation;


namespace Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Date
{
    internal sealed class DateTimeSelectorWidgetFunction : CompositeWidgetFunctionBase
    {
        private const string _functionName = "DateTimeSelector";
        public const string CompositeName = CompositeWidgetFunctionBase.CommonNamespace + ".Date." + _functionName;

        public DateTimeSelectorWidgetFunction(EntityTokenFactory entityTokenFactory)
            : base(CompositeName, typeof(DateTime), entityTokenFactory)
        {
        }


        public override XElement GetWidgetMarkup(ParameterList parameters, string label, HelpDefinition help, string bindingSourceName)
        {
            return base.BuildBasicWidgetMarkup("DateTimeSelector", "Date", label, help, bindingSourceName);
        }
    }
}