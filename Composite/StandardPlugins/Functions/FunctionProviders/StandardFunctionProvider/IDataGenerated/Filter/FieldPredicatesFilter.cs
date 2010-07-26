using System;
using System.Collections.Generic;
using System.Linq;
using Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using Composite.Functions;
using Composite.Data;
using System.Reflection;
using System.Linq.Expressions;
using Composite.Linq;


namespace Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.IDataGenerated.Filter
{
    internal sealed class FieldPredicatesFilter<T> : StandardFunctionBase
        where T : class, IData
    {
        //private static readonly ParameterExpression _dataItem = Expression.Parameter(typeof(T), "data");

        public FieldPredicatesFilter(EntityTokenFactory entityTokenFactory)
            : base("FieldPredicatesFilter", typeof(T).FullName, typeof(Expression<Func<T, bool>>), entityTokenFactory)
        {
            this.ResourceHandleNameStem = "Composite.IDataGenerated.Filter.FieldPredicatesFilter";
        }



        protected override IEnumerable<StandardFunctionParameterProfile> StandardFunctionParameterProfiles
        {
            get
            {
                foreach (PropertyInfo propertyInfo in typeof(T).GetAllProperties())
                {
                    if (propertyInfo.DeclaringType != typeof(IData) && propertyInfo.DeclaringType != typeof(object))
                    {
                        Type[] funcGenericArgs = new Type[] { propertyInfo.PropertyType, typeof(bool) };

                        Type parameterType = typeof(Expression<>).MakeGenericType(typeof(Func<,>).MakeGenericType(funcGenericArgs));

                        var param = new StandardFunctionParameterProfile(
                            propertyInfo.Name,
                            parameterType,
                            false,
                            new ConstantValueProvider(null),
                            null);

                        param.CustomLabel = propertyInfo.Name + " filter";
                        param.CustomHelpText = "Specify a criteria that this field must meet or use the default value (no criteria)";

                        yield return param;
                    }
                }

            }
        }



        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            ParameterExpression parameterExpression = Expression.Parameter(typeof(T), "data");


            Expression allRequirements = null;
            foreach (string parameterName in parameters.AllParameterNames)
            {
                object predicateObject = parameters.GetParameter(parameterName);
                if (predicateObject == null) continue;

                Expression propertyExpression = Expression.Property(parameterExpression, GetProperty(parameterName));

                LambdaExpression predicate = (LambdaExpression)predicateObject;

                Expression predicateBody = predicate.Body;

                ParameterExpressionSwitcher parameterExpressionSwitcher = new ParameterExpressionSwitcher(propertyExpression);

                Expression newPredicateBody = parameterExpressionSwitcher.Visit(predicateBody);

                allRequirements = allRequirements.NestedAnd(newPredicateBody);
            }

            if (allRequirements == null)
            {
                allRequirements = Expression.Constant(true);
            }

            Expression lambdaExpression = Expression.Lambda<Func<T, bool>>(allRequirements, parameterExpression);

            return lambdaExpression;
        }


        private PropertyInfo GetProperty(string fieldName)
        {
            PropertyInfo fieldPropertyInfo = typeof(T).GetAllProperties().Where(f => f.Name == fieldName).Single();
            return fieldPropertyInfo;
        }



        private sealed class ParameterExpressionSwitcher : ExpressionVisitor
        {
            private Expression _newParameterExpression;


            public ParameterExpressionSwitcher(Expression newParameterExpression)
            {
                _newParameterExpression = newParameterExpression;
            }


            protected override Expression VisitParameter(ParameterExpression node)
            {
                return _newParameterExpression;
            }
        }
    }
}
