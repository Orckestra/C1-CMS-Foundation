using System.Linq.Expressions;


namespace Composite.Linq
{
    internal static class ExpressionExtractor
    {
        public static LambdaExpression GetLambdaExpression(Expression expression)
        {
            if ((expression is LambdaExpression) == true)
            {
                return (LambdaExpression)expression;
            }

            if ((expression is UnaryExpression) == true)
            {
                return GetLambdaExpression(((UnaryExpression)expression).Operand);
            }

            return null;
        }
    }
}
