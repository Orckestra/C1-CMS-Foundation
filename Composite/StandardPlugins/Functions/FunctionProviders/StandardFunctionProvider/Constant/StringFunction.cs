using System;
using System.Collections.Generic;
using System.Data.SqlTypes;
using Composite.Functions;
using Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using Composite.ResourceSystem;


namespace Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Constant
{
    public sealed class StringFunction : StandardFunctionBase
    {
        public StringFunction(EntityTokenFactory entityTokenFactory)
            : base("String", "Composite.Constant", typeof(string), entityTokenFactory)
        {
        }


        protected override IEnumerable<StandardFunctionParameterProfile> StandardFunctionParameterProfiles
        {
            get
            {
                WidgetFunctionProvider textboxWidget = StandardWidgetFunctions.TextAreaWidget;

                yield return new StandardFunctionParameterProfile("Constant", typeof(string), false, new ConstantValueProvider(""), textboxWidget);
            }
        }


        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            return parameters.GetParameter<string>("Constant");
        }
    }
}
