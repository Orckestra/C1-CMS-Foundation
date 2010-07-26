using System;
using System.Collections.Generic;
using Composite.Functions;

using Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using Composite.Extensions;
using System.Linq.Expressions;

namespace Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Utils.Predicates
{
    internal sealed class GuidInCommaSeparatedListPredicateFunction : StandardFunctionBase
    {
        public GuidInCommaSeparatedListPredicateFunction(EntityTokenFactory entityTokenFactory)
            : base("GuidInCommaSeparatedList", "Composite.Utils.Predicates", typeof(Expression<Func<Guid, bool>>), entityTokenFactory)
        {
        }


        protected override IEnumerable<StandardFunctionParameterProfile> StandardFunctionParameterProfiles
        {
            get
            {
                WidgetFunctionProvider textboxWidget = StandardWidgetFunctions.TextBoxWidget;

                yield return new StandardFunctionParameterProfile(
                    "CommaSeparatedGuids", typeof(string), true, new NoValueValueProvider(), textboxWidget);
            }
        }


        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            string commaSeparatedSearchTerms = parameters.GetParameter<string>("CommaSeparatedGuids");

            if (!commaSeparatedSearchTerms.IsNullOrEmpty())
            {
                ParameterExpression parameter = Expression.Parameter(typeof(Guid), "g");

                IEnumerable<string> guidStrings = commaSeparatedSearchTerms.Split(',');

                Expression body = null;

                foreach (string guidString in guidStrings)
                {
                    Guid temp = new Guid(guidString.Trim());

                    Expression part = Expression.Equal(parameter, Expression.Constant(temp));

                    body = (body == null) ? part : Expression.Or(body, part);
                }

                if(body != null)
                {
                    return Expression.Lambda<Func<Guid, bool>>(body, parameter);
                }
            }

            return (Expression<Func<Guid, bool>>) (f => false);
            
        }
    }
}
