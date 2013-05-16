using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Composite.Functions;
using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;


namespace Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Utils.Predicates
{
    internal sealed class NullableDecimalEqualsPredicateFunction : StandardFunctionBase
    {
        public NullableDecimalEqualsPredicateFunction(EntityTokenFactory entityTokenFactory)
            : base("NullableDecimalEquals", "Composite.Utils.Predicates", typeof(Expression<Func<decimal?, bool>>), entityTokenFactory)
        {
        }


        protected override IEnumerable<StandardFunctionParameterProfile> StandardFunctionParameterProfiles
        {
            get
            {
                WidgetFunctionProvider widget = StandardWidgetFunctions.DecimalTextBoxWidget;

                yield return new StandardFunctionParameterProfile(
                    "Value", typeof(decimal), true, new NoValueValueProvider(), widget);
            }
        }


        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            decimal value = parameters.GetParameter<decimal>("Value");
            Expression<Func<decimal?, bool>> predicate = f => f.HasValue && f.Value == value;
            return predicate;
        }
    }
}
