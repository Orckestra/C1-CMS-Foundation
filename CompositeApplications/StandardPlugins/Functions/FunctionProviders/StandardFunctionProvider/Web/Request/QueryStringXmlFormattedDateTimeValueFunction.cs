using System;
using Composite.Functions;
using System.Collections.Generic;
using System.Web;
using Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using System.Xml;

namespace Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Web.Request
{
	public sealed class QueryStringXmlFormattedDateTimeValueFunction :  StandardFunctionBase
	{
        public QueryStringXmlFormattedDateTimeValueFunction(EntityTokenFactory entityTokenFactory)
            : base("QueryStringXmlFormattedDateTimeValue", "Composite.Web.Request", typeof(DateTime), entityTokenFactory)
        {
        }

        protected override IEnumerable<StandardFunctionParameterProfile> StandardFunctionParameterProfiles
        {
            get
            {
                WidgetFunctionProvider textboxWidget = StandardWidgetFunctions.TextBoxWidget;
                WidgetFunctionProvider fallbackWidget = StandardWidgetFunctions.DateTimeSelectorWidget;

                yield return new StandardFunctionParameterProfile(
                    "ParameterName", typeof(string), true, new NoValueValueProvider(), textboxWidget);

                yield return new StandardFunctionParameterProfile(
                    "FallbackValue", typeof(DateTime), true, new NoValueValueProvider(), fallbackWidget);
            }
        }


        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            var httpContext = HttpContext.Current;
            if (httpContext != null && httpContext.Request != null)
            {
                string result = httpContext.Request.QueryString[parameters.GetParameter<string>("ParameterName")];

                if(!string.IsNullOrEmpty(result))
                {
                    return XmlConvert.ToDateTime(result, XmlDateTimeSerializationMode.Local);
                }
            }

            return parameters.GetParameter<DateTime>("FallbackValue");
        }

    }
}
