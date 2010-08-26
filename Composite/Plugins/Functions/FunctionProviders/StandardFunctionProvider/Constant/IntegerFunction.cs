using System;
using System.Collections.Generic;
using System.Data.SqlTypes;

using Composite.Functions;

using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using Composite.Core.ResourceSystem;

namespace Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Constant
{
    internal sealed class IntegerFunction : StandardFunctionBase
    {
        public IntegerFunction(EntityTokenFactory entityTokenFactory)
            : base("Integer", "Composite.Constant", typeof(int), entityTokenFactory)
        {
        }


        protected override IEnumerable<StandardFunctionParameterProfile> StandardFunctionParameterProfiles
        {
            get
            {
                WidgetFunctionProvider textboxWidget = StandardWidgetFunctions.IntegerTextBoxWidget;

                yield return new StandardFunctionParameterProfile(
                    "Constant", typeof(int), true, new ConstantValueProvider(0), textboxWidget);
            }
        }


        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            return parameters.GetParameter<int>("Constant");
        }
    }
}
