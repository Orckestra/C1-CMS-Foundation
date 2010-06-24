using System.Collections.Generic;
using Composite.Functions;
using Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;

namespace Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Utils.Compare
{
	public sealed class AreEqualFunction : StandardFunctionBase
	{
        public AreEqualFunction(EntityTokenFactory entityTokenFactory)
            : base("AreEqual", "Composite.Utils.Compare", typeof(bool), entityTokenFactory)
        {
        }


        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            object valueA = parameters.GetParameter<object>("ValueA");
            object valueB = parameters.GetParameter<object>("ValueB");

            return valueA.Equals(valueB);
        }

        protected override IEnumerable<StandardFunctionParameterProfile> StandardFunctionParameterProfiles
        {
            get 
            {
                yield return new StandardFunctionParameterProfile(
                    "ValueA", typeof(object), true, new NoValueValueProvider(), null);
                yield return new StandardFunctionParameterProfile(
                    "ValueB", typeof(object), true, new NoValueValueProvider(), null);
            }
        }
    }
}
