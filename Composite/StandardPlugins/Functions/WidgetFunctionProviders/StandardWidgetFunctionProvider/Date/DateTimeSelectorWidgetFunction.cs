using System;
using System.Xml.Linq;
using System.Collections.Generic;

using Composite.Functions;
using Composite.StandardPlugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Foundation;


namespace Composite.StandardPlugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Date
{
    public sealed class DateTimeSelectorWidgetFunction : CompositeWidgetFunctionBase
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