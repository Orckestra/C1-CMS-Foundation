using System.Linq.Expressions;


namespace Composite.Linq.ExpressionVisitors
{
    internal sealed class FindFirstParameterExpressionVisitor : Linq.Disassembled.ExpressionVisitor
    {
        private ParameterExpression _foundParameter = null;


        public ParameterExpression FoundParameter
        {
            get { return _foundParameter; }
        }


        public override Expression VisitParameter(ParameterExpression p)
        {
            if (null == _foundParameter)
            {
                _foundParameter = p;
            }

            return p;
        }
    }
}
