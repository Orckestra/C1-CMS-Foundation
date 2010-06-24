using System;
using Composite.Functions;

using System.Collections.Generic;
using System.Web;
using Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using Composite.ResourceSystem;

namespace Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Web.Request
{
	public sealed class FormPostDecimalValueFunction :  StandardFunctionBase
	{
        public FormPostDecimalValueFunction(EntityTokenFactory entityTokenFactory)
            : base("FormPostDecimalValue", "Composite.Web.Request", typeof(decimal), entityTokenFactory)
        {
        }


        protected override IEnumerable<StandardFunctionParameterProfile> StandardFunctionParameterProfiles
        {
            get
            {
                WidgetFunctionProvider textboxWidget = StandardWidgetFunctions.TextBoxWidget;
                WidgetFunctionProvider decimalTextboxWidget = StandardWidgetFunctions.DecimalTextBoxWidget;

                yield return new StandardFunctionParameterProfile(
                    "ParameterName", typeof(string), true, new NoValueValueProvider(), textboxWidget);

                yield return new StandardFunctionParameterProfile(
                    "FallbackValue", typeof(decimal), false, new ConstantValueProvider((decimal)0), decimalTextboxWidget);

            }
        }


        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            if (HttpContext.Current != null && HttpContext.Current.Request != null)
            {
                string result = HttpContext.Current.Request.Form[parameters.GetParameter<string>("ParameterName")];

                if (result != null) return decimal.Parse(result);
            }

            return parameters.GetParameter<decimal>("FallbackValue");
        }
    }
}
