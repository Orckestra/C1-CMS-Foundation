using System;
using System.Collections.Generic;
using System.Data.SqlTypes;

using Composite.Functions;

using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using Composite.Core.ResourceSystem;

namespace Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Constant
{
    internal sealed class GuidFunction : StandardFunctionBase
    {
        public GuidFunction(EntityTokenFactory entityTokenFactory)
            : base("Guid", "Composite.Constant", typeof(Guid), entityTokenFactory)
        {
        }


        protected override IEnumerable<StandardFunctionParameterProfile> StandardFunctionParameterProfiles
        {
            get
            {
                WidgetFunctionProvider textboxWidget = StandardWidgetFunctions.GuidTextBoxWidget;

                yield return new StandardFunctionParameterProfile(
                    "Constant", typeof(Guid), true, new ConstantValueProvider(Guid.Empty), textboxWidget);
            }
        }


        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            return new Guid(parameters.GetParameter<string>("Constant"));
        }
    }
}
