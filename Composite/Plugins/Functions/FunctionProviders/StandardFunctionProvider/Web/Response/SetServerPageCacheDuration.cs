using System;
using System.Collections.Generic;
using System.Web;
using Composite.Functions;
using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;


namespace Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Web.Response
{
    internal sealed class SetServerPageCacheDuration : StandardFunctionBase
    {
        private const string ParameterName_MaxSeconds = "MaxSeconds";

        public SetServerPageCacheDuration(EntityTokenFactory entityTokenFactory)
            : base("SetServerPageCacheDuration", "Composite.Web.Response", typeof(void), entityTokenFactory)
        {
        }

        protected override IEnumerable<StandardFunctionParameterProfile> StandardFunctionParameterProfiles
        {
            get
            {
                yield return new StandardFunctionParameterProfile(
                    ParameterName_MaxSeconds, typeof(int), true, new ConstantValueProvider(0), StandardWidgetFunctions.TextBoxWidget);
            }
        }



        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            var httpContext = HttpContext.Current;
            if (httpContext?.Response == null) return null;
            var cache = httpContext.Response.Cache;

            int maxSeconds = parameters.GetParameter<int>(ParameterName_MaxSeconds);

            if (maxSeconds <= 0)
            {
                cache.SetCacheability(HttpCacheability.NoCache);
                cache.SetNoServerCaching();
                cache.SetNoStore();
            }
            else
            {
                cache.SetExpires(DateTime.Now.AddSeconds(maxSeconds));
                cache.SetMaxAge(TimeSpan.FromSeconds(maxSeconds));
            }

            return null;
        }
    }
}
