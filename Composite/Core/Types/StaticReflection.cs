using System;
using System.Linq.Expressions;
using System.Reflection;
using Composite.Core.Extensions;

namespace Composite.Core.Types
{
    internal static class StaticReflection
    {
        public static MethodInfo GetGenericMethodInfo(Expression<Action<object>> expression)
        {
            Verify.ArgumentNotNull(expression, "expression");

            return GetMethodInfo(expression.Body).GetGenericMethodDefinition();
        }

        public static MethodInfo GetGenericMethodInfo(Expression<Func<object>> expression)
        {
            Verify.ArgumentNotNull(expression, "expression");

            return GetMethodInfo(expression.Body).GetGenericMethodDefinition();
        }

        public static MethodInfo GetMethodInfo<T, S>(Expression<Func<T, S>>  expression)
        {
            return GetMethodInfo(expression.Body as MethodCallExpression);
        }

        public static MethodInfo GetMethodInfo<T>(Expression<Func<T>> expression)
        {
            return GetMethodInfo(expression.Body as MethodCallExpression);
        }

        public static MethodInfo GetMethodInfo(Expression expression)
        {
            Verify.ArgumentNotNull(expression, "expression");

            if (expression is UnaryExpression
                && (expression as UnaryExpression).NodeType == ExpressionType.Convert)
            {
                expression = (expression as UnaryExpression).Operand;
            }

            Verify.ArgumentCondition(expression is MethodCallExpression, "expressionBody", 
                                     "Expression body should be of type '{0}'".FormatWith(typeof(MethodCallExpression).Name));

            return (expression as MethodCallExpression).Method;
        }
    }
}
