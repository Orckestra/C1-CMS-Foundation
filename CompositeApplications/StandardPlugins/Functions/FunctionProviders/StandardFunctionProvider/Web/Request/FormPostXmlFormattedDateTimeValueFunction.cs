using System;
using Composite.Functions;

using System.Collections.Generic;
using System.Web;
using Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using Composite.ResourceSystem;
using Composite.Functions.Foundation;
using System.Xml;

namespace Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Web.Request
{
	internal sealed class FormPostXmlFormattedDateTimeValueFunction :  StandardFunctionBase
	{
        public FormPostXmlFormattedDateTimeValueFunction(EntityTokenFactory entityTokenFactory)
            : base("FormPostXmlFormattedDateTimeValue", "Composite.Web.Request", typeof(DateTime), entityTokenFactory)
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
            if (HttpContext.Current != null && HttpContext.Current.Request != null)
            {
                string result = HttpContext.Current.Request.Form[parameters.GetParameter<string>("ParameterName")];

                return XmlConvert.ToDateTime(result, XmlDateTimeSerializationMode.Local);
            }

            return parameters.GetParameter<DateTime>("FallbackValue");
        }

    }
}
