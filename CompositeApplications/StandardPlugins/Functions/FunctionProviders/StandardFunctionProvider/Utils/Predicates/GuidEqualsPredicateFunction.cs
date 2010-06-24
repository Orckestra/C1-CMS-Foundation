using System;
using System.Collections.Generic;
using System.Linq.Expressions;

using Composite.Functions;
using Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;


namespace Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Utils.Predicates
{
    public sealed class GuidEqualsPredicateFunction : StandardFunctionBase
    {
        public GuidEqualsPredicateFunction(EntityTokenFactory entityTokenFactory)
            : base("GuidEquals", "Composite.Utils.Predicates", typeof(Expression<Func<Guid, bool>>), entityTokenFactory)
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
            Guid value = parameters.GetParameter<Guid>("Value");

            // Expression<Func<Guid, bool>> predicate = f => f == value;
            // DDZ: in order to get a correct debug information, not using labmda syntax while building an expression

            ParameterExpression parameter = Expression.Parameter(typeof(Guid), "f");
            return Expression.Lambda<Func<Guid, bool>>(Expression.Equal(parameter, Expression.Constant(value)), parameter);
        }
    }
}
