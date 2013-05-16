using System.Linq.Expressions;


namespace Composite.Core.Linq
{
    internal static class ExpressionExtractor
    {
        public static LambdaExpression GetLambdaExpression(Expression expression)
        {
            if ((expression is LambdaExpression))
            {
                return (LambdaExpression)expression;
            }

            if ((expression is UnaryExpression))
            {
                return GetLambdaExpression(((UnaryExpression)expression).Operand);
            }

            return null;
        }
    }
}
