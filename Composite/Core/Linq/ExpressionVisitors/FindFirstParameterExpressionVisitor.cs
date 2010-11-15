using System.Linq.Expressions;


namespace Composite.Core.Linq.ExpressionVisitors
{
    internal sealed class FindFirstParameterExpressionVisitor : ExpressionVisitor
    {
        private ParameterExpression _foundParameter = null;


        public ParameterExpression FoundParameter
        {
            get { return _foundParameter; }
        }


        protected override Expression VisitParameter(ParameterExpression p)
        {
            if (null == _foundParameter)
            {
                _foundParameter = p;
            }

            return p;
        }
    }
}
