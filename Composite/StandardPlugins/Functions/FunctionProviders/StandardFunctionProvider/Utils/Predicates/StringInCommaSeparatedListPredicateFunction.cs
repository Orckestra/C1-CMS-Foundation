using System;
using System.Linq;
using System.Collections.Generic;
using System.Data.SqlTypes;

using Composite.Functions;

using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using Composite.Core.Extensions;
using System.Linq.Expressions;

namespace Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Utils.Predicates
{
    internal sealed class StringInCommaSeparatedListPredicateFunction : StandardFunctionBase
    {
        public StringInCommaSeparatedListPredicateFunction(EntityTokenFactory entityTokenFactory)
            : base("StringInCommaSeparatedList", "Composite.Utils.Predicates", typeof(Expression<Func<string, bool>>), entityTokenFactory)
        {
        }


        protected override IEnumerable<StandardFunctionParameterProfile> StandardFunctionParameterProfiles
        {
            get
            {
                WidgetFunctionProvider textboxWidget = StandardWidgetFunctions.TextBoxWidget;

                yield return new StandardFunctionParameterProfile(
                    "CommaSeparatedSearchTerms", typeof(string), true, new NoValueValueProvider(), textboxWidget);

                yield return new StandardFunctionParameterProfile(
                    "IgnoreCase", typeof(bool), false, new ConstantValueProvider(true), StandardWidgetFunctions.GetBoolSelectorWidget("Ignore case", "Match case"));
            }
        }


        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            Expression<Func<string, bool>> predicate = f => false;

            string commaSeparatedSearchTerms = parameters.GetParameter<string>("CommaSeparatedSearchTerms");

            if (string.IsNullOrEmpty(commaSeparatedSearchTerms)==true)
            {
                return predicate;
            }

            bool ignoreCase = parameters.GetParameter<bool>("IgnoreCase");
            IEnumerable<string> searchTerms = commaSeparatedSearchTerms.Split(',');

            StringComparison stringComparison = (ignoreCase
                                                     ? StringComparison.CurrentCultureIgnoreCase
                                                     : StringComparison.CurrentCulture);

            foreach (string searchTerm in searchTerms)
            {
                string temp = searchTerm.Trim();
                predicate = predicate.Or(c => c.Equals(temp, stringComparison));
            }

            return predicate;
        }
    }
}
