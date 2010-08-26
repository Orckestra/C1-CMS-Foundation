using System;
using Composite.Functions;

using System.Collections.Generic;
using System.Web;
using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using Composite.Core.ResourceSystem;

namespace Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Web.Request
{
	internal sealed class FormPostValueFunction :  StandardFunctionBase
	{
        public FormPostValueFunction(EntityTokenFactory entityTokenFactory)
            : base("FormPostValue", "Composite.Web.Request", typeof(string), entityTokenFactory)
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
            if (HttpContext.Current != null && HttpContext.Current.Request != null)
            {
                string result = HttpContext.Current.Request.Form[parameters.GetParameter<string>("ParameterName")];

                if (result != null) return result;
            }

            return parameters.GetParameter<string>("FallbackValue");
        }
    }
}
