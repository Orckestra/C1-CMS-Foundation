using System;
using Composite.Functions;

using System.Collections.Generic;
using System.Web;
using Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using Composite.ResourceSystem;

namespace Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Web.Request
{
	internal sealed class QueryStringValueFunction :  StandardFunctionBase
	{
        public QueryStringValueFunction(EntityTokenFactory entityTokenFactory)
            : base("QueryStringValue", "Composite.Web.Request", typeof(string), entityTokenFactory)
        {
        }

        protected override IEnumerable<StandardFunctionParameterProfile> StandardFunctionParameterProfiles
        {
            get
            {
                WidgetFunctionProvider textboxWidget = StandardWidgetFunctions.TextBoxWidget;

                yield return new StandardFunctionParameterProfile(
                    "ParameterName", typeof(string), true, new NoValueValueProvider(), textboxWidget);

                yield return new StandardFunctionParameterProfile(
                    "FallbackValue", typeof(string), false, new ConstantValueProvider(""), textboxWidget);
            }
        }


        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            var httpContext = HttpContext.Current;

            if (httpContext != null && httpContext.Request != null)
            {
                string parameterName = parameters.GetParameter<string>("ParameterName");

                string result = httpContext.Request.QueryString[parameterName];

                if (result != null) return result;
            }

            return parameters.GetParameter<string>("FallbackValue");
        }
    }
}
