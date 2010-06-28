using System;
using System.Collections.Generic;
using System.Data.SqlTypes;

using Composite.Functions;

using Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using Composite.ResourceSystem;

namespace Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Constant
{
    internal sealed class DecimalFunction : StandardFunctionBase
    {
        public DecimalFunction(EntityTokenFactory entityTokenFactory)
            : base("Decimal", "Composite.Constant", typeof(decimal), entityTokenFactory)
        {
        }


        protected override IEnumerable<StandardFunctionParameterProfile> StandardFunctionParameterProfiles
        {
            get
            {
                WidgetFunctionProvider widget = StandardWidgetFunctions.DecimalTextBoxWidget;

                yield return new StandardFunctionParameterProfile(
                    "Constant", typeof(decimal), true, new ConstantValueProvider(new decimal(0)), widget);
            }
        }


        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            return parameters.GetParameter<decimal>("Constant");
        }
    }
}
