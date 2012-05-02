using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Linq.Expressions;
using System.Reflection;
using Composite.Core.Extensions;

namespace Composite.Core.Types
{
    internal static class StaticReflection
    {
        public static MethodInfo GetGenericMethodInfo(Expression<Func<object>> expression)
        {
            Verify.ArgumentNotNull(expression, "expression");

            return GetMethodInfo(expression.Body).GetGenericMethodDefinition();
        }


        private static MethodInfo GetMethodInfo(Expression expression)
        {
            Verify.ArgumentCondition(expression is MethodCallExpression, "expressionBody", 
                                     "Expression body should be of type '{0}'".FormatWith(typeof(MethodCallExpression).Name));

            return (expression as MethodCallExpression).Method;
        }
    }
}
