using System;
using System.Linq;
using System.Collections.Generic;
using System.Data.SqlTypes;

using Composite.Functions;

using Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using Composite.Extensions;
using System.Linq.Expressions;

namespace Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Utils.Predicates
{
    public sealed class StringInListPredicateFunction : StandardFunctionBase
    {
        public StringInListPredicateFunction(EntityTokenFactory entityTokenFactory)
            : base("StringInList", "Composite.Utils.Predicates", typeof(Expression<Func<string, bool>>), entityTokenFactory)
        {
        }


        protected override IEnumerable<StandardFunctionParameterProfile> StandardFunctionParameterProfiles
        {
            get
            {
                yield return new StandardFunctionParameterProfile(
                    "SearchTerms", typeof(IEnumerable<string>), true, new NoValueValueProvider(), null);

                yield return new StandardFunctionParameterProfile(
                    "IgnoreCase", typeof(bool), false, new ConstantValueProvider(true), StandardWidgetFunctions.GetBoolSelectorWidget("Ignore case", "Match case"));
            }
        }


        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            IEnumerable<string> searchTerms = parameters.GetParameter<IEnumerable<string>>("SearchTerms");
            bool ignoreCase = parameters.GetParameter<bool>("IgnoreCase");

            StringComparison stringComparison = (ignoreCase
                                                     ? StringComparison.CurrentCultureIgnoreCase
                                                     : StringComparison.CurrentCulture);

            Expression<Func<string, bool>> predicate = f => false;

            foreach (string searchTerm in searchTerms)
            {
                string temp = searchTerm.Trim();
                predicate = predicate.Or(c => c.Equals(temp, stringComparison));
            }

            return predicate;
        }
    }
}
