using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using Composite.Data;


namespace Composite.Core.Linq
{
    internal static class ExpressionHelper
    {
        public static List<T> GetCastedObjects<T>(Type interfaceType, Expression sourceExpression)
        {
            return DataFacade.GetData(interfaceType).Provider
                             .CreateQuery(sourceExpression)
                             .Cast<T>().ToList();
        }



        public static Expression CreatePropertyExpression(string fieldName, Expression parameterExpression)
        {
            Type interfaceType = parameterExpression.Type;

            if (interfaceType.GetProperties().Any(f => f.Name == fieldName))
            {
                return Expression.Property(parameterExpression, fieldName);
            }


            foreach (Type superInterfaceType in interfaceType.GetInterfaces())
            {
                if (superInterfaceType.GetProperties().Any(f => f.Name == fieldName))
                {
                    return Expression.Property(Expression.Convert(parameterExpression, superInterfaceType), fieldName);
                }
            }

            throw new InvalidOperationException($"The interface '{parameterExpression.Type}' or any of its superinterfaces does not contain a field named '{fieldName}'");
        }



        public static Expression CreatePropertyExpression(Type currentInterfaceType, Type actualPropertyDeclaringType, string fieldName, ParameterExpression parameterExpression)
        {
            Expression fieldParameterExpression = GetPropertyParameterExpression(currentInterfaceType, actualPropertyDeclaringType, parameterExpression);

            Expression expression = CreatePropertyExpression(fieldName, fieldParameterExpression);

            return expression;
        }



        public static Expression GetPropertyParameterExpression(Type currentInterfaceType, Type actualPropertyDeclaringType, ParameterExpression parameterExpression)
        {
            if (currentInterfaceType == actualPropertyDeclaringType) return parameterExpression;

            return Expression.Convert(parameterExpression, actualPropertyDeclaringType);
        }



        public static Expression CreateWhereExpression(Expression sourceExpression, ParameterExpression parameterExpression, Expression filterExpression)
        {
            if (filterExpression == null) return sourceExpression;

            LambdaExpression whereLambdaExpression = Expression.Lambda(filterExpression, parameterExpression);
            Expression whereExpression = ExpressionCreator.Where(sourceExpression, whereLambdaExpression);

            return whereExpression;
        }



        public static Expression CreateSelectExpression(Expression sourceExpression, Expression bodyExpression, ParameterExpression parameterExpression)
        {
            LambdaExpression selectLambdaExpression = Expression.Lambda(bodyExpression, parameterExpression);

            Expression selectExpression = ExpressionCreator.Select(sourceExpression, selectLambdaExpression);

            return selectExpression;
        }



        public static Expression CreateDistinctExpression(Expression sourceExpression)
        {
            Expression distinctExpression = ExpressionCreator.Distinct(sourceExpression);

            return distinctExpression;
        }



        public static Expression CreateOrderByExpression(Expression sourceExpression, LambdaExpression keySelector)
        {
            Expression orderByExpression = ExpressionCreator.OrderBy(sourceExpression, keySelector);

            return orderByExpression;
        }


        public static Expression CreateOrderByDescendingExpression(Expression sourceExpression, LambdaExpression keySelector)
        {
            return ExpressionCreator.OrderByDescending(sourceExpression, keySelector);
        }


        public static Expression ThenByExpression(Expression sourceExpression, LambdaExpression keySelector)
        {
            return ExpressionCreator.ThenBy(sourceExpression, keySelector);
        }


        public static Expression ThenByDescendingExpression(Expression sourceExpression, LambdaExpression keySelector)
        {
            return ExpressionCreator.ThenByDescending(sourceExpression, keySelector);
        }


        public static Expression CreateJoinExpression(Expression outerSource, Expression innerSource, LambdaExpression outerKeySelector, LambdaExpression innerKeySelector, LambdaExpression resultSelector)
        {
            Expression joinExpression = ExpressionCreator.Join(outerSource, innerSource, outerKeySelector, innerKeySelector, resultSelector);

            return joinExpression;
        }

	    public static Expression CreatePropertyPredicate(ParameterExpression parameterExpression, IEnumerable<Tuple<PropertyInfo, object>> propertiesWithValues)
	    {
            Expression currentExpression = null;
            foreach (var kvp in propertiesWithValues)
            {
                PropertyInfo propertyInfo = kvp.Item1;
                object value = kvp.Item2;

                var left = Expression.Property(parameterExpression, propertyInfo);
                var right = Expression.Constant(value);

                var filter = Expression.Equal(left, right);

                currentExpression = currentExpression == null ? filter : Expression.And(currentExpression, filter);
            }

            return currentExpression;
	    }
	}
}
