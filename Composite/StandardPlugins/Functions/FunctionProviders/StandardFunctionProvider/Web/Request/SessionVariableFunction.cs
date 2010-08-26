using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Composite.Functions;
using System.Web;
using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using Composite.Core.ResourceSystem;

namespace Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Web.Request
{
    internal sealed class SessionVariableFunction :  StandardFunctionBase
	{
        public SessionVariableFunction(EntityTokenFactory entityTokenFactory)
            : base("SessionVariable", "Composite.Web.Request", typeof(string), entityTokenFactory)
        {
        }

        protected override IEnumerable<StandardFunctionParameterProfile> StandardFunctionParameterProfiles
        {
            get
            {
                WidgetFunctionProvider textboxWidget = StandardWidgetFunctions.TextBoxWidget;

                yield return new StandardFunctionParameterProfile(
                    "VariableName", typeof(string), true, new NoValueValueProvider(), textboxWidget);

                yield return new StandardFunctionParameterProfile(
                    "FallbackValue", typeof(string), false, new ConstantValueProvider(""), textboxWidget);
            }
        }


        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            if (HttpContext.Current != null && HttpContext.Current.Request != null)
            {
                object result = HttpContext.Current.Session[parameters.GetParameter<string>("VariableName")];

                if (result != null) return result.ToString();
            }

            return parameters.GetParameter<string>("FallbackValue");
        }
	}
}
