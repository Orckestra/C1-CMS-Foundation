using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Composite.Functions;
using Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;


namespace Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Utils.Predicates
{
    internal sealed class NullableDecimalNoValuePredicateFunction : StandardFunctionBase
    {
        public NullableDecimalNoValuePredicateFunction(EntityTokenFactory entityTokenFactory)
            : base("NullableDecimalNoValue", "Composite.Utils.Predicates", typeof(Expression<Func<decimal?, bool>>), entityTokenFactory)
        {
        }


        protected override IEnumerable<StandardFunctionParameterProfile> StandardFunctionParameterProfiles
        {
            get
            {
                yield break;
            }
        }


        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            Expression<Func<decimal?, bool>> predicate = f => f.HasValue == false;
            return predicate;
        }
    }
}
