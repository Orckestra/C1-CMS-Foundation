using System.Linq.Expressions;


namespace Composite.Data.Types.StoreIdFilter.Foundation
{
    internal sealed class StoreIdFilterQueryableChangeSourceExpressionVisitor : ExpressionVisitor
    {
        private readonly Expression _newSourceExpression;


        public StoreIdFilterQueryableChangeSourceExpressionVisitor()
        {
        }


        public StoreIdFilterQueryableChangeSourceExpressionVisitor(Expression newSourceExpression)
        {
            _newSourceExpression = newSourceExpression;
        }


        protected override Expression VisitConstant(ConstantExpression c)
        {
            var storeIdFilterQueryable = c.Value as IStoreIdFilterQueryable;

            if (storeIdFilterQueryable == null)
            {
                return base.VisitConstant(c);
            }
            
            return _newSourceExpression ?? storeIdFilterQueryable.Source.Expression;
        }
    }
}
