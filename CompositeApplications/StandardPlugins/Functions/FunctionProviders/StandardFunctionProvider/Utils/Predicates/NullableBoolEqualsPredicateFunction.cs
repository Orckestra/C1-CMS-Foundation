using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Composite.Functions;
using Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;


namespace Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Utils.Predicates
{
    internal sealed class NullableBoolEqualsPredicateFunction : StandardFunctionBase
    {
        public NullableBoolEqualsPredicateFunction(EntityTokenFactory entityTokenFactory)
            : base("NullableBoolEquals", "Composite.Utils.Predicates", typeof(Expression<Func<bool?, bool>>), entityTokenFactory)
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
            Expression<Func<bool?, bool>> predicate = f => f.HasValue == true && f.Value == value;
            return predicate;
        }
    }
}
