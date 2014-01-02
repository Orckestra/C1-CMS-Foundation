using System.Linq.Expressions;


namespace Composite.Data.Caching.Foundation
{
    internal sealed class ChangeSourceExpressionVisitor : ExpressionVisitor
    {
        private readonly Expression _newSourceExpression;

        public ChangeSourceExpressionVisitor()
        {
            _newSourceExpression = null;
        }


        public ChangeSourceExpressionVisitor(Expression newSourceExpression)
        {
            _newSourceExpression = newSourceExpression;
        }


        protected override Expression VisitConstant(ConstantExpression c)
        {
            if (c.Value == null) return base.VisitConstant(c);

            if (c.Value is ICachingQueryable)
            {
                if (_newSourceExpression == null)
                {
                    return ((ICachingQueryable)c.Value).Source.Expression;
                }
                return _newSourceExpression;
            }

            return base.VisitConstant(c);
        }
    }

}
