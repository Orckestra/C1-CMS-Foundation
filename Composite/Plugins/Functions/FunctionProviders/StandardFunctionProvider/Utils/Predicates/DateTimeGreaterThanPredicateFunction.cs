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
    internal sealed class DateTimeGreaterThanPredicateFunction : StandardFunctionBase
    {
        public DateTimeGreaterThanPredicateFunction(EntityTokenFactory entityTokenFactory)
            : base("DateTimeGreaterThan", "Composite.Utils.Predicates", typeof(Expression<Func<DateTime, bool>>), entityTokenFactory)
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
            Expression<Func<DateTime,bool>> predicate = f=>f > value;
            return predicate;
        }
    }
}
