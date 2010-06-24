using System;
using System.Collections.Generic;
using System.Data.SqlTypes;

using Composite.Functions;

using Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using Composite.ResourceSystem;

namespace Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Constant
{
    public sealed class DateTimeFunction : StandardFunctionBase
    {
        public DateTimeFunction(EntityTokenFactory entityTokenFactory)
            : base("DateTime", "Composite.Constant", typeof(DateTime), entityTokenFactory)
        {
        }


        protected override IEnumerable<StandardFunctionParameterProfile> StandardFunctionParameterProfiles
        {
            get
            {
                WidgetFunctionProvider dateSelectorWidget = StandardWidgetFunctions.DateSelectorWidget;

                yield return new StandardFunctionParameterProfile(
                    "Constant", typeof(DateTime), true, new ConstantValueProvider(DateTime.Now), dateSelectorWidget);
            }
        }


        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            return parameters.GetParameter<DateTime>("Constant");
        }
    }
}
