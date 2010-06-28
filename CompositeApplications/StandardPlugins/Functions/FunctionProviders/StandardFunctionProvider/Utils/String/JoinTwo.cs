using System;
using System.Collections.Generic;
using Composite.Functions;
using Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;


namespace Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Utils.String
{
    internal sealed class JoinTwo : StandardFunctionBase, ICompoundFunction
    {
        public JoinTwo(EntityTokenFactory entityTokenFactory)
            : base("JoinTwo", "Composite.Utils.String", typeof(string), entityTokenFactory)
        {
        }


        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            string stringA = parameters.GetParameter<string>("StringA");
            string stringB = parameters.GetParameter<string>("StringB");
            string separator = parameters.GetParameter<string>("Separator");

            return stringA + separator + stringB;
        }


        protected override IEnumerable<StandardFunctionParameterProfile> StandardFunctionParameterProfiles
        {
            get
            {
                WidgetFunctionProvider textboxWidget = StandardWidgetFunctions.TextBoxWidget;

                yield return new StandardFunctionParameterProfile(
                    "StringA", typeof(string), true, new ConstantValueProvider(""), textboxWidget);

                yield return new StandardFunctionParameterProfile(
                    "StringB", typeof(string), true, new ConstantValueProvider(""), textboxWidget);

                yield return new StandardFunctionParameterProfile(
                    "Separator", typeof(string), false, new ConstantValueProvider(""), textboxWidget);
            }
        }

        public bool AllowRecursiveCall
        {
            get { return true; }
        }
    }
}
