using System.Linq.Expressions;
using Composite.Linq.Disassembled;


namespace Composite.Data.Caching.Foundation
{
    //MRJ: 4.0 Upgrade
    internal sealed class ChangeSourceExpressionVisitor : Composite.Linq.Disassembled.ExpressionVisitor
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


        public override Expression VisitConstant(ConstantExpression c)
        {
            if (c.Value == null) return base.VisitConstant(c);

            if (typeof(ICachingQueryable).IsAssignableFrom(c.Value.GetType()) == true)
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
