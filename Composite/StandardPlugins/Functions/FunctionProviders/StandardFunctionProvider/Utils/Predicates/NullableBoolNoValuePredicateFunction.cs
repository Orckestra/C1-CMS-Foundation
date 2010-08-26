using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Composite.Functions;
using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;


namespace Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Utils.Predicates
{
    internal sealed class NullableBoolNoValuePredicateFunction : StandardFunctionBase
    {
        public NullableBoolNoValuePredicateFunction(EntityTokenFactory entityTokenFactory)
            : base("NullableBoolNoValue", "Composite.Utils.Predicates", typeof(Expression<Func<bool?, bool>>), entityTokenFactory)
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
            Expression<Func<bool?, bool>> predicate = f => f.HasValue == false;
            return predicate;
        }
    }
}
