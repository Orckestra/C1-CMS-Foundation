using System;
using Composite.Functions;

using System.Collections.Generic;
using System.Web;
using Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using Composite.ResourceSystem;

namespace Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Web.Request
{
	public sealed class QueryStringBoolValueFunction :  StandardFunctionBase
	{
        public QueryStringBoolValueFunction(EntityTokenFactory entityTokenFactory)
            : base("QueryStringBoolValue", "Composite.Web.Request", typeof(bool), entityTokenFactory)
        {
        }

        protected override IEnumerable<StandardFunctionParameterProfile> StandardFunctionParameterProfiles
        {
            get
            {
                WidgetFunctionProvider textboxWidget = StandardWidgetFunctions.TextBoxWidget;
                WidgetFunctionProvider fallbackWidget = StandardWidgetFunctions.GetBoolSelectorWidget("True", "False");

                yield return new StandardFunctionParameterProfile(
                    "ParameterName", typeof(string), true, new NoValueValueProvider(), textboxWidget);

                yield return new StandardFunctionParameterProfile(
                    "FallbackValue", typeof(bool), false, new ConstantValueProvider(false), fallbackWidget);
            }
        }


        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            if (HttpContext.Current != null && HttpContext.Current.Request != null)
            {
                string result = HttpContext.Current.Request.QueryString[parameters.GetParameter<string>("ParameterName")];

                if (result != null)
                {
                    switch (result.ToLower())
                    {
                        case "0":
                        case "false":
                            return false;
                        case "1":
                        case "true":
                            return true;
                        default:
                            return bool.Parse(result);
                    }
                }
            }

            return parameters.GetParameter<bool>("FallbackValue");
        }
    }
}
