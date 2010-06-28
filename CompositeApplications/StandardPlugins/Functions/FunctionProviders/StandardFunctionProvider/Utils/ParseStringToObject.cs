using System;
using System.Collections.Generic;
using Composite.Functions;
using Composite.Security;
using Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using Composite.ResourceSystem;

namespace Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Utils
{
    internal sealed class ParseStringToObjectFunction : DowncastableStandardFunctionBase
    {
        public ParseStringToObjectFunction(EntityTokenFactory entityTokenFactory)
            : base("ParseStringToObject", "Composite.Utils", typeof(object), entityTokenFactory)
        {
        }



        protected override IEnumerable<StandardFunctionParameterProfile> StandardFunctionParameterProfiles {
            get
            {
                WidgetFunctionProvider textboxWidget = StandardWidgetFunctions.TextBoxWidget;

                yield return new StandardFunctionParameterProfile(
                    "StringToParse", typeof(string), true, new NoValueValueProvider(), textboxWidget);
            }
        }



        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            string stringToParse = parameters.GetParameter<string>("StringToParse");
            return stringToParse;
        }
    }
}
