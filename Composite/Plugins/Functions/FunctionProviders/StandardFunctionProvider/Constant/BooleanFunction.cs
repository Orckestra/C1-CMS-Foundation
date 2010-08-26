using System;
using System.Collections.Generic;
using System.Data.SqlTypes;

using Composite.Functions;

using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using Composite.Core.ResourceSystem;

namespace Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Constant
{
    internal sealed class BooleanFunction : StandardFunctionBase
    {
        public BooleanFunction(EntityTokenFactory entityTokenFactory)
            : base("Boolean", "Composite.Constant", typeof(bool), entityTokenFactory)
        {
        }


        protected override IEnumerable<StandardFunctionParameterProfile> StandardFunctionParameterProfiles
        {
            get
            {
                WidgetFunctionProvider widget = StandardWidgetFunctions.GetBoolSelectorWidget("True", "False");

                yield return new StandardFunctionParameterProfile(
                    "Constant", typeof(bool), true, new ConstantValueProvider(false), widget);
            }
        }


        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            return parameters.GetParameter<bool>("Constant");
        }
    }
}
