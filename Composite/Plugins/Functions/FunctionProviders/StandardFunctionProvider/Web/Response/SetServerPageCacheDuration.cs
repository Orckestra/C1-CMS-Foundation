using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Composite.Functions;
using System.Web;
using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using Composite.Core.ResourceSystem;

namespace Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Web.Response
{
    internal sealed class SetServerPageCacheDuration : StandardFunctionBase
    {
        public SetServerPageCacheDuration(EntityTokenFactory entityTokenFactory)
            : base("SetServerPageCacheDuration", "Composite.Web.Response", typeof(void), entityTokenFactory)
        {
        }

        protected override IEnumerable<StandardFunctionParameterProfile> StandardFunctionParameterProfiles
        {
            get
            {
                WidgetFunctionProvider textboxWidget = StandardWidgetFunctions.TextBoxWidget;

                yield return new StandardFunctionParameterProfile(
                    "MaxSeconds", typeof(int), true, new ConstantValueProvider(0), textboxWidget);
            }
        }



        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            if (HttpContext.Current != null && HttpContext.Current.Response != null)
            {
                int maxSeconds = parameters.GetParameter<int>("MaxSeconds");

                if (maxSeconds < -1)
                {
                    HttpContext.Current.Response.Cache.SetCacheability(HttpCacheability.NoCache);
                    HttpContext.Current.Response.Cache.SetNoServerCaching();
                    HttpContext.Current.Response.Cache.SetNoStore();
                }
                else
                {
                    HttpContext.Current.Response.Cache.SetExpires(DateTime.Now.AddSeconds(maxSeconds));
                    HttpContext.Current.Response.Cache.SetMaxAge(new TimeSpan(0, 0, maxSeconds));
                }
            }

            return null;
        }
    }
}
