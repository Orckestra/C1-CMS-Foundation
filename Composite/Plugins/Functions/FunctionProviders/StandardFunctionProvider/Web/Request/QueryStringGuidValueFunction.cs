using System;
using Composite.Functions;

using System.Collections.Generic;
using System.Web;
using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using Composite.Core.ResourceSystem;

namespace Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Web.Request
{
	internal sealed class QueryStringGuidValueFunction :  StandardFunctionBase
	{
        public QueryStringGuidValueFunction(EntityTokenFactory entityTokenFactory)
            : base("QueryStringGuidValue", "Composite.Web.Request", typeof(Guid), entityTokenFactory)
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
                    "FallbackValue", typeof(Guid), false, new ConstantValueProvider(Guid.Empty), textboxWidget);
            }
        }

        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            if (HttpContext.Current != null && HttpContext.Current.Request != null)
            {
                string result = HttpContext.Current.Request.QueryString[parameters.GetParameter<string>("ParameterName")];

                if (result != null) return new Guid(result);
            }

            return parameters.GetParameter<Guid>("FallbackValue");
        }
    }
}
