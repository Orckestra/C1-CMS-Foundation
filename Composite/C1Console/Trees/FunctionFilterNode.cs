using System;
using System.Linq;
using System.Linq.Expressions;
using System.Xml.Linq;
using Composite.Functions;
using Composite.Core;
using Composite.Core.ResourceSystem;


namespace Composite.C1Console.Trees
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
            LambdaExpression expression = GetLambdaExpression(baseRuntimeTreeNode);

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
            LambdaExpression expression = GetLambdaExpression(baseRuntimeTreeNode);

            ParameterChangerExpressionVisitor expressionVisitor = new ParameterChangerExpressionVisitor(parameterExpression);

            Expression resultExpression = expressionVisitor.Visit(expression.Body);

            return resultExpression;
        }



        internal override void Initialize()
        {
            try
            {
                FunctionTreeBuilder.Build(this.FunctionMarkup);
            }
            catch 
            {
                AddValidationError("TreeValidationError.FunctionFilter.WrongFunctionMarkup");
                return;
            }
                       

            this.FunctionMarkupDynamicValuesHelper = new AttributeDynamicValuesHelper(this.FunctionMarkup);
            this.FunctionMarkupDynamicValuesHelper.Initialize(this.OwnerNode);
        }



        private LambdaExpression GetLambdaExpression(BaseRuntimeTreeNode baseRuntimeTreeNode)
        {
            LambdaExpression expression = (LambdaExpression)baseRuntimeTreeNode.GetValue();

            if (expression == null)
            {
                string message = string.Format(StringResourceSystemFacade.GetString("Composite.C1Console.Trees", "TreeValidationError.FunctionFilter.WrongReturnValue"), string.Format("Expression<Func<{0}, bool>>", this.OwnerNode.InterfaceType));

                Log.LogError("TreeFacade", message);
                Log.LogError("TreeFacade", "In tree " + this.OwnerNode.Tree.TreeId + " in function " + this.XPath);

                throw new InvalidOperationException(message);
            }


            if (expression.ReturnType != typeof(bool))
            {
                string message = string.Format(StringResourceSystemFacade.GetString("Composite.C1Console.Trees", "TreeValidationError.FunctionFilter.WrongFunctionReturnType"), expression.ReturnType, typeof(bool));
                
                Log.LogError("TreeFacade", message);
                Log.LogError("TreeFacade", "In tree " + this.OwnerNode.Tree.TreeId + " in function " + this.XPath);
                
                throw new InvalidOperationException(message);
            }

            if (expression.Parameters.Count() != 1)
            {
                string message = string.Format(StringResourceSystemFacade.GetString("Composite.C1Console.Trees", "TreeValidationError.FunctionFilter.WrongFunctionParameterCount"), expression.Parameters.Count());
                
                Log.LogError("TreeFacade", message);
                Log.LogError("TreeFacade", "In tree " + this.OwnerNode.Tree.TreeId + " in function " + this.XPath);

                throw new InvalidOperationException(message);
            }

            ParameterExpression parameterExpression = expression.Parameters.Single();
            if (this.OwnerNode.InterfaceType.IsAssignableFrom(parameterExpression.Type) == false)
            {
                string message = string.Format(StringResourceSystemFacade.GetString("Composite.C1Console.Trees", "TreeValidationError.FunctionFilter.WrongFunctionParameterType"), parameterExpression.Type, this.OwnerNode.InterfaceType);
                
                Log.LogError("TreeFacade", message);
                Log.LogError("TreeFacade", "In tree " + this.OwnerNode.Tree.TreeId + " in function " + this.XPath);

                throw new InvalidOperationException(message);
            }

            return expression;
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
