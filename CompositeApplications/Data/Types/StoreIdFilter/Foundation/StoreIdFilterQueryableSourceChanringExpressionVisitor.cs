using System.Linq.Expressions;
using Composite.Linq.Disassembled;


namespace Composite.Data.Types.StoreIdFilter.Foundation
{
    //MRJ: 4.0 Upgrade
    internal sealed class StoreIdFilterQueryableSourceChanringExpressionVisitor : Composite.Linq.Disassembled.ExpressionVisitor
    {
        private Expression _newSourceExpression = null;


        public StoreIdFilterQueryableSourceChanringExpressionVisitor()
        {
        }


        public StoreIdFilterQueryableSourceChanringExpressionVisitor(Expression newSourceExpression)
        {
            _newSourceExpression = newSourceExpression;
        }


        public override Expression VisitConstant(ConstantExpression c)
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
