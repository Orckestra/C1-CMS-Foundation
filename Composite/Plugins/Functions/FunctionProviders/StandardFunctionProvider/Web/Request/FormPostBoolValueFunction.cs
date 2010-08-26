using System;
using Composite.Functions;

using System.Collections.Generic;
using System.Web;
using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using Composite.Core.ResourceSystem;

namespace Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Web.Request
{
	internal sealed class FormPostBoolValueFunction :  StandardFunctionBase
	{
        public FormPostBoolValueFunction(EntityTokenFactory entityTokenFactory)
            : base("FormPostBoolValue", "Composite.Web.Request", typeof(bool), entityTokenFactory)
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
                string result = HttpContext.Current.Request.Form[parameters.GetParameter<string>("ParameterName")];

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
