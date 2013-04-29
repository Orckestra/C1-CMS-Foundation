using System;
using System.Collections.Generic;
using System.Web;

using Composite.Core.WebClient;
using Composite.Functions;
using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;


namespace Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Web.Response
{
    internal sealed class RedirectFunction : StandardFunctionBase
    {
        public RedirectFunction(EntityTokenFactory entityTokenFactory)
            : base("Redirect", "Composite.Web.Response", typeof(void), entityTokenFactory)
        {
        }

        protected override IEnumerable<StandardFunctionParameterProfile> StandardFunctionParameterProfiles
        {
            get
            {
                WidgetFunctionProvider textboxWidget = StandardWidgetFunctions.TextBoxWidget;

                yield return new StandardFunctionParameterProfile(
                    "Url", typeof(string), true, new NoValueValueProvider(), textboxWidget);
            }
        }



        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            var httpContext = HttpContext.Current;

            if (httpContext == null)
            {
                return null;
            }
            
            string url = parameters.GetParameter<string>("Url");

            if (!UrlUtils.IsAdminConsoleRequest(httpContext))
            {
                httpContext.Response.Redirect(url, false);
            }

            return null;
        }
    }
}
