using System.Linq.Expressions;


namespace Composite.Data.Caching.Foundation
{
    internal sealed class ChangeSourceExpressionVisitor : ExpressionVisitor
    {
        private Expression _newSourceExpression;

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

            if (typeof(ICachingQueryable).IsAssignableFrom(c.Value.GetType()))
            {
                if (_newSourceExpression == null)
                {
                    return ((ICachingQueryable)c.Value).Source.Expression;
                }
                else
                {
                    return _newSourceExpression;
                }
            }
            else
            {
                return base.VisitConstant(c);
            }
        }
    }

}
