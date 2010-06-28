using System;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;


namespace Composite.Linq
{
    internal class ExpressionBuilder
    {
        private Type _currentQueryableType;
        private IQueryable _sourceQueryable;
        private Expression _currentExpression;
        private static PropertyInfo _dateDateTimePropertyInfo = typeof(DateTime).GetProperty("Date");


        public ExpressionBuilder(Type queryableType, IQueryable sourceQueryable)
        {

            _sourceQueryable = sourceQueryable;
            _currentExpression = _sourceQueryable.Expression;
            _currentQueryableType = queryableType;
        }


        public Type QueryableType { get; private set; }



        public ExpressionBuilder Where(PropertyInfoValueCollection propertyInfoValueCollection)
        {
            return Where(propertyInfoValueCollection, false);
        }



        public ExpressionBuilder Where(PropertyInfoValueCollection propertyInfoValueCollection, bool useInnerDateTimeDate)
        {
            ParameterExpression parameterExpression = Expression.Parameter(_currentQueryableType, "w");

            Expression currentExpression = null;
            foreach (var kvp in propertyInfoValueCollection.PropertyValues)
            {
                Expression left = LambdaExpression.Property(parameterExpression, kvp.Key);                
                Expression right = Expression.Constant(kvp.Value, kvp.Key.PropertyType);

                if ((useInnerDateTimeDate == true) && (kvp.Key.PropertyType == typeof(DateTime)))
                {
                    left = InnerDateTimeDateExpression(left);
                    right = InnerDateTimeDateExpression(right);
                }

                Expression filter = Expression.Equal(left, right);

                if (currentExpression == null)
                {
                    currentExpression = filter;
                }
                else
                {
                    currentExpression = Expression.And(currentExpression, filter);
                }
            }

            LambdaExpression lambdaExpression = Expression.Lambda(currentExpression, parameterExpression);

            MethodCallExpression methodCallExpression = Expression.Call
            (
                typeof(Queryable),
                "Where",
                new Type[] { _currentQueryableType, },
                _currentExpression,
                Expression.Quote(lambdaExpression)
            );

            _currentExpression = methodCallExpression;

            return this;
        }



        public ExpressionBuilder OrderBy(PropertyInfo orderByPropertyInfo)
        {
            return OrderBy(orderByPropertyInfo, false);
        }



        public ExpressionBuilder OrderBy(PropertyInfo orderByPropertyInfo, bool useInnerDateTimeDate)
        {
            ParameterExpression parameter = Expression.Parameter(_currentQueryableType, "o");

            Expression expression = Expression.Property(parameter, orderByPropertyInfo);
            if ((useInnerDateTimeDate == true) && (orderByPropertyInfo.PropertyType == typeof(DateTime)))
            {
                expression = InnerDateTimeDateExpression(expression);
            }


            LambdaExpression lambdaExpression = Expression.Lambda(expression, parameter);

            MethodCallExpression methodCallExpression = Expression.Call
            (
                typeof(Queryable),
                "OrderBy",
                new Type[] { _currentQueryableType, orderByPropertyInfo.PropertyType },
                _currentExpression,
                Expression.Quote(lambdaExpression)
            );

            _currentExpression = methodCallExpression;

            return this;
        }



        public ExpressionBuilder Select(PropertyInfo selectPropertyInfo)
        {
            return Select(selectPropertyInfo, false);
        }



        public ExpressionBuilder Select(PropertyInfo selectPropertyInfo, bool useInnerDateTimeDate)
        {
            ParameterExpression parameter = Expression.Parameter(_currentQueryableType, "s");

            Expression expression = Expression.Property(parameter, selectPropertyInfo);
            if ((useInnerDateTimeDate == true) && (selectPropertyInfo.PropertyType == typeof(DateTime)))
            {
                expression = InnerDateTimeDateExpression(expression);
            }

            LambdaExpression lambdaExpression = Expression.Lambda(expression, parameter);

            MethodCallExpression methodCallExpression = Expression.Call
            (
                typeof(Queryable),
                "Select",
                new Type[] { _currentQueryableType, selectPropertyInfo.PropertyType },
                _currentExpression,
                Expression.Quote(lambdaExpression)
            );

            _currentExpression = methodCallExpression;
            _currentQueryableType = selectPropertyInfo.PropertyType;

            return this;
        }



        public ExpressionBuilder Distinct()
        {
            MethodCallExpression methodCallExpression = Expression.Call
                (
                    typeof(Queryable),
                    "Distinct",
                    new Type[] { _currentQueryableType },
                    _currentExpression
                );

            _currentExpression = methodCallExpression;

            return this;
        }



        public IQueryable CreateQuery()
        {
            return _sourceQueryable.Provider.CreateQuery(_currentExpression);
        }



        private Expression InnerDateTimeDateExpression(Expression expression)
        {
            return Expression.Property(expression, _dateDateTimePropertyInfo);
        }
    }
}
