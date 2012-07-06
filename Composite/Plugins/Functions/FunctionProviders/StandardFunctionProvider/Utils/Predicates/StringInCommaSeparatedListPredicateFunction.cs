using System;
using System.Collections.Generic;
using System.Reflection;
using Composite.Functions;

using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using Composite.Core.Extensions;
using System.Linq.Expressions;

namespace Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Utils.Predicates
{
    internal sealed class StringInCommaSeparatedListPredicateFunction : StandardFunctionBase
    {
        private static readonly MethodInfo _stringCompareMethodInfo;

        static StringInCommaSeparatedListPredicateFunction()
        {
            _stringCompareMethodInfo = typeof(string).GetMethod("Compare", new[] { typeof(string), typeof(string), typeof(StringComparison) });
        }

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
            Expression<Func<string, bool>> emptyPredicate = f => false;

            string commaSeparatedSearchTerms = parameters.GetParameter<string>("CommaSeparatedSearchTerms");

            if (commaSeparatedSearchTerms.IsNullOrEmpty())
            {
                return emptyPredicate;
            }


            bool ignoreCase = parameters.GetParameter<bool>("IgnoreCase");
            string[] searchTerms = commaSeparatedSearchTerms.Split(new [] {','}/*, StringSplitOptions.RemoveEmptyEntries*/);

            if (searchTerms.Length == 0)
            {
                return emptyPredicate;
            }

            StringComparison stringComparison = (ignoreCase
                                                     ? StringComparison.OrdinalIgnoreCase
                                                     : StringComparison.Ordinal);


            var parameterExpression = Expression.Parameter(typeof(string), "p");
            Expression body = null;

            foreach (string searchTerm in searchTerms)
            {
                string termTrimmed = searchTerm.Trim();

                // string.Compare(p, termTrimmed, stringComparison) == 0 
                // string.Compare() is supported by linq2sql
                Expression condition = Expression.Equal(Expression.Call(
                                                           _stringCompareMethodInfo,
                                                           parameterExpression,
                                                           Expression.Constant(termTrimmed),
                                                           Expression.Constant(stringComparison)), 
                                                       Expression.Constant(0));

                body = body == null ? condition : Expression.Or(body, condition);
            }
            Verify.IsNotNull(body, "Expression body is null");

            return Expression.Lambda<Func<string, bool>>(body, parameterExpression);
        }
    }
}
