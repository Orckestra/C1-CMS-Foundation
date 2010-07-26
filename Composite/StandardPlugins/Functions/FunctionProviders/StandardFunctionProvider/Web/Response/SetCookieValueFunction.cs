using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Composite.Functions;
using System.Web;
using Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using Composite.ResourceSystem;

namespace Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Web.Response
{
    internal sealed class SetCookieValueFunction : StandardFunctionBase
    {
        public SetCookieValueFunction(EntityTokenFactory entityTokenFactory)
            : base("SetCookieValue", "Composite.Web.Response", typeof(string), entityTokenFactory)
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
                    "Value", typeof(string), true, new ConstantValueProvider(""), textboxWidget);

                yield return new StandardFunctionParameterProfile(
                    "Expires", typeof(DateTime), false, new ConstantValueProvider(DateTime.MinValue), null);
            }
        }



        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            if (HttpContext.Current != null && HttpContext.Current.Request != null)
            {
                string cookieName = parameters.GetParameter<string>("CookieName");
                string value = parameters.GetParameter<string>("Value");
                DateTime expires = parameters.GetParameter<DateTime>("Expires");

                HttpContext.Current.Response.Cookies[cookieName].Value = value;
                HttpContext.Current.Response.Cookies[cookieName].Expires = expires; // DateTime.MinValue = session cookie
            }

            return null;
        }
    }
}
