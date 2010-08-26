using System;
using System.Collections.Generic;
using Composite.Functions;
using Composite.C1Console.Security;
using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using Composite.Core.ResourceSystem;

namespace Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Utils
{
    internal sealed class GetInputParameterFunction : DowncastableStandardFunctionBase
    {
        public GetInputParameterFunction(EntityTokenFactory entityTokenFactory)
            : base("GetInputParameter", "Composite.Utils", typeof(object), entityTokenFactory)
        {
        }



        protected override IEnumerable<StandardFunctionParameterProfile> StandardFunctionParameterProfiles {
            get
            {
                WidgetFunctionProvider textboxWidget = StandardWidgetFunctions.TextBoxWidget;

                yield return new StandardFunctionParameterProfile(
                    "InputParameterName", typeof(string), true, new NoValueValueProvider(), textboxWidget);
            }
        }



        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            string parameterName = parameters.GetParameter<string>("InputParameterName");
            return context.GetParameterValue(parameterName, typeof(object));
        }
    }
}
