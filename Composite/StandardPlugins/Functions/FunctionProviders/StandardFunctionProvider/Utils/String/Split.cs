using System;
using System.Collections.Generic;
using System.Text;
using Composite.Functions;
using Composite.Security;
using Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;


namespace Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Utils.String
{
    internal sealed class Split : StandardFunctionBase
    {
        public Split(EntityTokenFactory entityTokenFactory)
            : base("Split", "Composite.Utils.String", typeof(IEnumerable<string>), entityTokenFactory)
        {
        }


        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            string stringToSplit = parameters.GetParameter<string>("String");
            string[] separator = new string[] { parameters.GetParameter<string>("Separator") };



            var resultArray = stringToSplit.Split(separator, StringSplitOptions.RemoveEmptyEntries);

            return new List<string>(resultArray);
        }


        protected override IEnumerable<StandardFunctionParameterProfile> StandardFunctionParameterProfiles
        {
            get
            {
                WidgetFunctionProvider textboxWidget = StandardWidgetFunctions.TextBoxWidget;

                yield return new StandardFunctionParameterProfile(
                    "String", typeof(string), true, new ConstantValueProvider(""), textboxWidget);

                yield return new StandardFunctionParameterProfile(
                    "Separator", typeof(string), false, new ConstantValueProvider(","), textboxWidget);
            }
        }
    }
}
