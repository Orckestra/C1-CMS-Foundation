using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Composite.Functions;
using System.Web;
using Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using Composite.ResourceSystem;
using Composite.IO;
using Composite.WebClient;

namespace Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Web.Response
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
            if (HttpContext.Current != null && HttpContext.Current.Request != null)
            {
                string url = parameters.GetParameter<string>("Url");

                bool isAdminConsoleRequest = HttpContext.Current.Request.Url.PathAndQuery.ToLower().StartsWith(UrlUtils.AdminRootPath.ToLower());

                if (isAdminConsoleRequest == false)
                {
                    HttpContext.Current.Response.Redirect(url, false);
                }
            }

            return null;
        }
    }
}
