using System.Linq.Expressions;


namespace Composite.Data.Types.StoreIdFilter.Foundation
{
    internal sealed class StoreIdFilterQueryableSourceChanringExpressionVisitor : ExpressionVisitor
    {
        private Expression _newSourceExpression = null;


        public StoreIdFilterQueryableSourceChanringExpressionVisitor()
        {
        }


        public StoreIdFilterQueryableSourceChanringExpressionVisitor(Expression newSourceExpression)
        {
            _newSourceExpression = newSourceExpression;
        }


        protected override Expression VisitConstant(ConstantExpression c)
        {
            IStoreIdFilterQueryable queryable = c.Value as IStoreIdFilterQueryable;

            if (queryable != null)
            {
                if (_newSourceExpression == null)
                {
                    return queryable.Source.Expression;
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
