using System;
using System.Linq;
using System.Collections.Generic;
using System.Data.SqlTypes;

using Composite.Functions;

using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using Composite.Core.ResourceSystem;
using System.Linq.Expressions;

namespace Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Utils.Predicates
{
    internal sealed class BoolEqualsPredicateFunction : StandardFunctionBase
    {
        public BoolEqualsPredicateFunction(EntityTokenFactory entityTokenFactory)
            : base("BoolEquals", "Composite.Utils.Predicates", typeof(Expression<Func<bool, bool>>), entityTokenFactory)
        {
        }


        protected override IEnumerable<StandardFunctionParameterProfile> StandardFunctionParameterProfiles
        {
            get
            {
                WidgetFunctionProvider widget = StandardWidgetFunctions.GetBoolSelectorWidget("True", "False");

                yield return new StandardFunctionParameterProfile(
                    "Value", typeof(bool), true, new NoValueValueProvider(), widget);
            }
        }


        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            bool value = parameters.GetParameter<bool>("Value");
            Expression<Func<bool, bool>> predicate = f => f == value;
            return predicate;
        }
    }
}
