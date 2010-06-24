using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Composite.Functions;
using Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;


namespace Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Utils.Predicates
{
    public sealed class NullableGuidEqualsPredicateFunction : StandardFunctionBase
    {
        public NullableGuidEqualsPredicateFunction(EntityTokenFactory entityTokenFactory)
            : base("NullableGuidEquals", "Composite.Utils.Predicates", typeof(Expression<Func<Guid?, bool>>), entityTokenFactory)
        {
        }


        protected override IEnumerable<StandardFunctionParameterProfile> StandardFunctionParameterProfiles
        {
            get
            {
                WidgetFunctionProvider widget = StandardWidgetFunctions.TextBoxWidget;

                yield return new StandardFunctionParameterProfile(
                    "Value", typeof(Guid), true, new NoValueValueProvider(), widget);
            }
        }


        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            Guid? value = parameters.GetParameter<Guid?>("Value");

            // Expression<Func<Guid?, bool>> predicate = f => f == value;

            var f = Expression.Parameter(typeof(Guid?), "f");
            var body = Expression.Equal(f, Expression.Constant(value, typeof (Guid?)));

            return Expression.Lambda(body, f);
        }
    }
}
