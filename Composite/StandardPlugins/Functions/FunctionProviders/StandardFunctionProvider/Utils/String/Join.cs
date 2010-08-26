using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using Composite.Functions;
using Composite.C1Console.Security;
using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;


namespace Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Utils.String
{
    internal sealed class Join : StandardFunctionBase
	{
        public Join(EntityTokenFactory entityTokenFactory)
            : base("Join", "Composite.Utils.String", typeof(string), entityTokenFactory)
        {
        }


        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            IEnumerable<string> strings = parameters.GetParameter<IEnumerable<string>>("Strings");
            string separator = parameters.GetParameter<string>("Separator");

            return string.Join(separator, strings.ToArray());
        }


        protected override IEnumerable<StandardFunctionParameterProfile> StandardFunctionParameterProfiles
        {
            get 
            {
                WidgetFunctionProvider textboxWidget = StandardWidgetFunctions.TextBoxWidget;

                yield return new StandardFunctionParameterProfile(
                    "Strings", typeof(IEnumerable<string>), true, new NoValueValueProvider(),null);

                yield return new StandardFunctionParameterProfile(
                    "Separator", typeof(string), false, new ConstantValueProvider(","), textboxWidget);
            }
        }
	}
}
