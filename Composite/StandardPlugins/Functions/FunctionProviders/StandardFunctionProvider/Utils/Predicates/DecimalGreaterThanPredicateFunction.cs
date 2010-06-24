using System;
using System.Linq;
using System.Collections.Generic;
using System.Data.SqlTypes;

using Composite.Functions;

using Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using Composite.ResourceSystem;
using System.Linq.Expressions;

namespace Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Utils.Predicates
{
    public sealed class DecimalGreaterThanPredicateFunction : StandardFunctionBase
    {
        public DecimalGreaterThanPredicateFunction(EntityTokenFactory entityTokenFactory)
            : base("DecimalGreaterThan", "Composite.Utils.Predicates", typeof(Expression<Func<decimal, bool>>), entityTokenFactory)
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
            Expression<Func<decimal,bool>> predicate = f=>f > value;
            return predicate;
        }
    }
}
