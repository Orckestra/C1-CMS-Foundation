using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Composite.Functions;
using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;


namespace Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Utils.Predicates
{
    internal sealed class NullableDateTimeEqualsPredicateFunction : StandardFunctionBase
    {
        public NullableDateTimeEqualsPredicateFunction(EntityTokenFactory entityTokenFactory)
            : base("NullableDateTimeEquals", "Composite.Utils.Predicates", typeof(Expression<Func<DateTime?, bool>>), entityTokenFactory)
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
            Expression<Func<DateTime?, bool>> predicate = f => f.HasValue == true && f.Value == value;
            return predicate;
        }
    }
}
