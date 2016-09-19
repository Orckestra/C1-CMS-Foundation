using System.Linq.Expressions;
using System.Linq;
using System.Reflection;
using System.Collections.Generic;
using System;
using Composite.Core.Linq;
using Composite.C1Console.Events;
using Composite.Data.ProcessControlled;


namespace Composite.Data.Foundation
{
    internal static class DataExpressionBuilder
    {
        private static object _lock = new object();



        static DataExpressionBuilder()
        {
        }



        /// <summary>
        /// This method returns a queryable containing data with the same keys
        /// </summary>
        /// <param name="data"></param>        
        /// <returns></returns>
        public static IQueryable GetQueryableByData(IData data)
        {
            return GetQueryableByData(data, true);
        }



        public static IQueryable GetQueryableByData(IData data, bool ignoreVersioning)
        {
            return GetQueryableByData(data, null, ignoreVersioning);
        }



        public static IQueryable GetQueryableByData(IData data, IQueryable sourceQueryable, bool ignoreVersioning)
        {
            LambdaExpression whereLambdaExpression = GetWhereLambdaExpression(data, ignoreVersioning);

            if (sourceQueryable == null)
            {
                sourceQueryable = DataFacade.GetData(data.DataSourceId.InterfaceType);
            }

            Expression whereExpression = ExpressionCreator.Where(sourceQueryable.Expression, whereLambdaExpression);

            IQueryable newQueryable = sourceQueryable.Provider.CreateQuery(whereExpression);

            return newQueryable;
        }



        public static IQueryable<T> GetQueryableByData<T>(T data, bool ignoreVersioning)
            where T : class, IData
        {
            LambdaExpression whereLambdaExpression = GetWhereLambdaExpression(data, ignoreVersioning);

            IQueryable queryable = DataFacade.GetData(data.DataSourceId.InterfaceType);

            Expression whereExpression = ExpressionCreator.Where(queryable.Expression, whereLambdaExpression);

            MethodInfo methodInfo = DataFacadeReflectionCache.GetCreateQueryMethodInfo(data.DataSourceId.InterfaceType);

            return (IQueryable<T>)methodInfo.Invoke(queryable.Provider, new object[] { whereExpression });
        }



        public static Delegate GetWherePredicateDelegate(IData data, bool ignoreVersioning)
        {
            LambdaExpression whereLambdaExpression = GetWhereLambdaExpression(data, ignoreVersioning);

            Delegate resultDelegate = whereLambdaExpression.Compile();

            return resultDelegate;
        }



        private static LambdaExpression GetWhereLambdaExpression(IData data, bool ignoreVersioning)
        {
            var propertyInfoes = data.DataSourceId.InterfaceType.GetPhysicalKeyProperties();

            if (propertyInfoes.Count == 0)
            {
                throw new InvalidOperationException(string.Format("The data type '{0}' does not have any keys specified", data.DataSourceId.InterfaceType));
            }

            ParameterExpression parameterExpression = Expression.Parameter(data.DataSourceId.InterfaceType, "parameter");

            Expression whereBodyExpression = null;
            foreach (PropertyInfo propertyInfo in propertyInfoes)
            {
                object value = propertyInfo.GetGetMethod().Invoke(data, new object[] { });

                Expression expression =
                    Expression.Equal(
                        Expression.Property(parameterExpression, propertyInfo),
                        Expression.Constant(value)
                    );

                if (whereBodyExpression == null)
                {
                    whereBodyExpression = expression;
                }
                else
                {
                    whereBodyExpression = Expression.And(whereBodyExpression, expression);
                }
            }

            LambdaExpression whereLambdaExpression = Expression.Lambda(whereBodyExpression, new ParameterExpression[] { parameterExpression });

            return whereLambdaExpression;
        }
    }
}
