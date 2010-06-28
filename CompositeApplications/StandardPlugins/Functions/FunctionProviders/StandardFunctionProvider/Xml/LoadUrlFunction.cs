using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml.Linq;
using Composite.Functions;
using Composite.Security;
using Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using Composite.ResourceSystem;
using Composite.Instrumentation;

namespace Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Xml
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

            using (TimerProfiler functionTimerProfiler = TimerProfilerFacade.CreateTimerProfiler(url))
            {
                XElement doc = XElement.Load(url);

                return doc;
            }
        }


        protected override IEnumerable<StandardFunctionParameterProfile> StandardFunctionParameterProfiles
        {
            get
            {
                WidgetFunctionProvider textboxWidget = StandardWidgetFunctions.TextBoxWidget;

                yield return new StandardFunctionParameterProfile(
                    "Url", typeof(string), true, new NoValueValueProvider(),textboxWidget);
            }
        }
    }
}
