using System.Linq;
using System.Linq.Expressions;
using System.Xml.Linq;
using Composite.Functions;


namespace Composite.Trees
{
    internal sealed class FunctionFilterNode : FilterNode
    {
        public XElement FunctionMarkup { get; set; } // Required


        private AttributeDynamicValuesHelper FunctionMarkupDynamicValuesHelper { get; set; }


        public override Expression CreateDownwardsFilterExpression(ParameterExpression parameterExpression, TreeNodeDynamicContext dynamicContext)
        {
            DynamicValuesHelperReplaceContext dynamicValuesHelperReplaceContext = new DynamicValuesHelperReplaceContext
            {
                PiggybagDataFinder = new PiggybagDataFinder(dynamicContext.Piggybag, dynamicContext.CurrentEntityToken)
            };

            XElement markup = this.FunctionMarkupDynamicValuesHelper.ReplaceValues(dynamicValuesHelperReplaceContext);

            BaseRuntimeTreeNode baseRuntimeTreeNode = FunctionTreeBuilder.Build(markup);
            LambdaExpression expression = (LambdaExpression)baseRuntimeTreeNode.GetValue();            

            ParameterChangerExpressionVisitor expressionVisitor = new ParameterChangerExpressionVisitor(parameterExpression);

            Expression resultExpression = expressionVisitor.Visit(expression.Body);

            return resultExpression;
        }



        public override Expression CreateUpwardsFilterExpression(ParameterExpression parameterExpression, TreeNodeDynamicContext dynamicContext)
        {
            DynamicValuesHelperReplaceContext dynamicValuesHelperReplaceContext = new DynamicValuesHelperReplaceContext
            {
                PiggybagDataFinder = new PiggybagDataFinder(dynamicContext.Piggybag, dynamicContext.CurrentEntityToken)
            };

            XElement markup = this.FunctionMarkupDynamicValuesHelper.ReplaceValues(dynamicValuesHelperReplaceContext);

            BaseRuntimeTreeNode baseRuntimeTreeNode = FunctionTreeBuilder.Build(markup);
            LambdaExpression expression = (LambdaExpression)baseRuntimeTreeNode.GetValue();

            ParameterChangerExpressionVisitor expressionVisitor = new ParameterChangerExpressionVisitor(parameterExpression);

            Expression resultExpression = expressionVisitor.Visit(expression.Body);

            return resultExpression;
        }



        internal override void Initialize()
        {
            BaseRuntimeTreeNode baseRuntimeTreeNode = null;

            try
            {
                baseRuntimeTreeNode = FunctionTreeBuilder.Build(this.FunctionMarkup);
            }
            catch 
            {
                AddValidationError("TreeValidationError.FunctionFilter.WrongFunctionMarkup");
                return;
            }

            LambdaExpression expression = baseRuntimeTreeNode.GetValue() as LambdaExpression;
            if (expression == null)
            {
                AddValidationError("TreeValidationError.FunctionFilter.WrongReturnValue", string.Format("Expression<Func<{0}, bool>>", this.OwnerNode.InterfaceType));
                return;
            }

            if (expression.ReturnType != typeof(bool))
            {
                AddValidationError("TreeValidationError.FunctionFilter.WrongFunctionReturnType", expression.ReturnType, typeof(bool));
                return;
            }

            if (expression.Parameters.Count() != 1)
            {
                AddValidationError("TreeValidationError.FunctionFilter.WrongFunctionParameterCount", expression.Parameters.Count());
                return;
            }

            ParameterExpression parameterExpression = expression.Parameters.Single();
            if (this.OwnerNode.InterfaceType.IsAssignableFrom(parameterExpression.Type) == false)
            {
                AddValidationError("TreeValidationError.FunctionFilter.WrongFunctionParameterType", parameterExpression.Type, this.OwnerNode.InterfaceType);
                return;
            }

            this.FunctionMarkupDynamicValuesHelper = new AttributeDynamicValuesHelper(this.FunctionMarkup);
            this.FunctionMarkupDynamicValuesHelper.Initialize(this.OwnerNode);
        }



        private sealed class ParameterChangerExpressionVisitor : ExpressionVisitor
        {
            private ParameterExpression _parameterExpression;


            public ParameterChangerExpressionVisitor(ParameterExpression parameterExpression)
            {
                _parameterExpression = parameterExpression;
            }


            protected override Expression VisitParameter(ParameterExpression node)
            {
                return _parameterExpression;
            }
        }
    }
}
