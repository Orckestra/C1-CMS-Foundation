using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Composite.Functions;
using Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using Composite.Security;
using Composite.ResourceSystem;

namespace Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Utils.Compare
{
	internal sealed class IsLessThanFunction : StandardFunctionBase
	{
        public IsLessThanFunction(EntityTokenFactory entityTokenFactory)
            : base("IsLessThan", "Composite.Utils.Compare", typeof(bool), entityTokenFactory)
        {
        }



        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            IComparable valueA = parameters.GetParameter<IComparable>("ValueA");
            IComparable valueB = parameters.GetParameter<IComparable>("ValueB");

            return valueA.CompareTo(valueB);
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
