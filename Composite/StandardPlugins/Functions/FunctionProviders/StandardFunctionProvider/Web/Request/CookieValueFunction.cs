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
    internal sealed class CookieValueFunction :  StandardFunctionBase
	{
        public CookieValueFunction(EntityTokenFactory entityTokenFactory)
            : base("CookieValue", "Composite.Web.Request", typeof(string), entityTokenFactory)
        {
        }


        protected override IEnumerable<StandardFunctionParameterProfile> StandardFunctionParameterProfiles
        {
            get
            {
                WidgetFunctionProvider textboxWidget = StandardWidgetFunctions.TextBoxWidget;

                yield return new StandardFunctionParameterProfile(
                    "CookieName", typeof(string), true, new NoValueValueProvider(), textboxWidget);

                yield return new StandardFunctionParameterProfile(
                    "FallbackValue", typeof(string), false, new ConstantValueProvider(""), textboxWidget);
            }
        }



        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            if (HttpContext.Current != null && HttpContext.Current.Request != null)
            {
                HttpCookie cookie = HttpContext.Current.Request.Cookies[parameters.GetParameter<string>("CookieName")];

                if (cookie != null)
                {
                    string result = HttpContext.Current.Request.Cookies[parameters.GetParameter<string>("CookieName")].Value;

                    if (result != null) return result;
                }
            }

            return parameters.GetParameter<string>("FallbackValue");
        }

	}
}
