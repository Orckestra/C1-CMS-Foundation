using System;
using System.Linq.Expressions;
using Composite.Linq.ExpressionVisitors;
using Composite.Logging;


namespace Composite.Linq
{
    public static class ExpressionExtensionMethods
    {
        public static Expression NestedAnd(this Expression leftExpression, Expression rightExpression)
        {
            if ((leftExpression == null) && (rightExpression == null)) throw new ArgumentNullException("rightExpression");

            if (leftExpression == null) return rightExpression;
            if (rightExpression == null) return leftExpression;            

            return Expression.And(leftExpression, rightExpression);
        }



        public static Expression NestedOr(this Expression leftExpression, Expression rightExpression)
        {
            if ((leftExpression == null) && (rightExpression == null)) throw new ArgumentNullException("rightExpression");

            if (leftExpression == null) return rightExpression;
            if (rightExpression == null) return leftExpression;

            return Expression.Or(leftExpression, rightExpression);
        }



        public static void DebugLogExpression(this Expression expression, string title, string label = "Expression")
        {
            if (RuntimeInformation.IsDebugBuild == true)
            {
                if (expression != null)
                {
                    Logging.LoggingService.LogInformation(title, label + " = " + expression.ToString());
                }
                else
                {
                    Logging.LoggingService.LogInformation(title, label + " =  null");
                }
            }
        }

        public static string BuildCacheKey(this Expression expression)
        {
            try
            {
                return CacheKeyBuilderExpressionVisitor.ExpressionToString(expression);
            }
            catch (Exception e)
            {
                var exeptionToLog = new InvalidOperationException("Failed while building a cache key for expression " + expression, e);
                LoggingService.LogError(typeof(ExpressionExtensionMethods).FullName, exeptionToLog);

                return null;
            }
        }
    }
}
