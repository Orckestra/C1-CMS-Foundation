using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Composite.Functions;
using System.Web;

using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using Composite.Core.ResourceSystem;

namespace Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Web.Server
{
    internal sealed class ApplicationVariableFunction :  StandardFunctionBase
	{
        public ApplicationVariableFunction(EntityTokenFactory entityTokenFactory)
            : base("ApplicationVariable", "Composite.Web.Server", typeof(string), entityTokenFactory)
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
                string result = HttpContext.Current.Application[parameters.GetParameter<string>("VariableName")].ToString();

                if (result != null) return result;
            }

            return parameters.GetParameter<string>("FallbackValue");
        }
	}
}
