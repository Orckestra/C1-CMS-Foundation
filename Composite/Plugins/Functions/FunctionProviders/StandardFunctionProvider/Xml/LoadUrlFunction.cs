using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Caching;
using System.Xml.Linq;
using Composite.Core.Instrumentation;
using Composite.Core.Xml;
using Composite.Functions;
using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;

namespace Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Xml
{
    internal sealed class LoadUrlFunction : StandardFunctionBase
    {
        public LoadUrlFunction(EntityTokenFactory entityTokenFactory)
            : base("LoadUrl", "Composite.Xml", typeof(XElement), entityTokenFactory)
        {
        }

        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            string url = parameters.GetParameter<string>("Url");

            bool cachingEnabled = false;

            int cachePeriod;
            if (parameters.TryGetParameter("CacheTime", out cachePeriod))
            {
                cachingEnabled = cachePeriod > 0;
            }

            string cacheKey = null;
            if (cachingEnabled)
            {
                cacheKey = typeof(LoadUrlFunction).FullName + "|" + url;
                var cachedValue = HttpRuntime.Cache.Get(cacheKey) as XElement;
                if (cachedValue != null)
                {
                    return cachedValue;
                }
            }

            using (TimerProfilerFacade.CreateTimerProfiler(url))
            {
                XElement value = XElementUtils.Load(url);

                if (cachingEnabled)
                {
                    HttpRuntime.Cache.Add(cacheKey, value, null, DateTime.Now.AddSeconds(cachePeriod),
                                          Cache.NoSlidingExpiration, CacheItemPriority.Normal, null);
                }

                return value;
            }
        }


        protected override IEnumerable<StandardFunctionParameterProfile> StandardFunctionParameterProfiles
        {
            get
            {
                WidgetFunctionProvider textboxWidget = StandardWidgetFunctions.TextBoxWidget;

                yield return new StandardFunctionParameterProfile(
                    "Url", typeof(string), true, new NoValueValueProvider(),textboxWidget);

                yield return new StandardFunctionParameterProfile(
                    "CacheTime", typeof(int), false, new ConstantValueProvider(0), textboxWidget);
            }
        }
    }
}
