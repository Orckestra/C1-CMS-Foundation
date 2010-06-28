using System;
using Composite.Functions;

using System.Collections.Generic;
using System.Web;
using Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using Composite.ResourceSystem;

namespace Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Web.Request
{
	internal sealed class QueryStringIntegerValueFunction :  StandardFunctionBase
	{
        public QueryStringIntegerValueFunction(EntityTokenFactory entityTokenFactory)
            : base("QueryStringIntegerValue", "Composite.Web.Request", typeof(int), entityTokenFactory)
        {
        }

        protected override IEnumerable<StandardFunctionParameterProfile> StandardFunctionParameterProfiles
        {
            get
            {
                WidgetFunctionProvider textboxWidget = StandardWidgetFunctions.TextBoxWidget;
                WidgetFunctionProvider integerTextboxWidget = StandardWidgetFunctions.IntegerTextBoxWidget;

                yield return new StandardFunctionParameterProfile(
                    "ParameterName", typeof(string), true, new NoValueValueProvider(), textboxWidget);

                yield return new StandardFunctionParameterProfile(
                    "FallbackValue", typeof(int), false, new ConstantValueProvider(0), integerTextboxWidget);
            }
        }


        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            if (HttpContext.Current != null && HttpContext.Current.Request != null)
            {
                string result = HttpContext.Current.Request.QueryString[parameters.GetParameter<string>("ParameterName")];

                if (result != null) return Int32.Parse(result);
            }

            return parameters.GetParameter<int>("FallbackValue");
        }
    }
}
