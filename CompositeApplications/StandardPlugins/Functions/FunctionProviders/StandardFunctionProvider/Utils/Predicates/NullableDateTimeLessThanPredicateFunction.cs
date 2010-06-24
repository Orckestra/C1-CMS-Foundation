using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Composite.Functions;
using Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;


namespace Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Utils.Predicates
{
    public sealed class NullableDateTimeLessThanPredicateFunction : StandardFunctionBase
    {
        public NullableDateTimeLessThanPredicateFunction(EntityTokenFactory entityTokenFactory)
            : base("NullableDateTimeLessThan", "Composite.Utils.Predicates", typeof(Expression<Func<DateTime?, bool>>), entityTokenFactory)
        {
        }


        protected override IEnumerable<StandardFunctionParameterProfile> StandardFunctionParameterProfiles
        {
            get
            {
                WidgetFunctionProvider widget = StandardWidgetFunctions.DateTimeSelectorWidget;

                yield return new StandardFunctionParameterProfile(
                    "Value", typeof(DateTime), true, new NoValueValueProvider(), widget);
            }
        }


        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            DateTime value = parameters.GetParameter<DateTime>("Value");
            Expression<Func<DateTime?, bool>> predicate = f => f.HasValue == true && f.Value < value;
            return predicate;
        }
    }
}
