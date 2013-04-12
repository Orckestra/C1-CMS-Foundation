using System;
using System.Linq;
using System.Linq.Expressions;
using System.Xml.Linq;
using Composite.Data;
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

            if (expression.Parameters.Count != 1)
            {
                throw new InvalidOperationException("Only 1 parameter lamdas supported when calling function: " + markup);
            }


            ParameterChangerExpressionVisitor expressionVisitor = new ParameterChangerExpressionVisitor(expression.Parameters.Single(), parameterExpression);

            Expression resultExpression = expressionVisitor.Visit(expression.Body);

            return resultExpression;
        }        



        public override Expression CreateUpwardsFilterExpression(ParameterExpression parameterExpression, TreeNodeDynamicContext dynamicContext)
        {
            DataEntityToken currentEntityToken = dynamicContext.CurrentEntityToken as DataEntityToken;
            IData filteredDataItem = null;

            Func<IData, bool> upwardsFilter = dataItem =>
            {
                var ancestorEntityToken = dataItem.GetDataEntityToken();

                DynamicValuesHelperReplaceContext dynamicValuesHelperReplaceContext = new DynamicValuesHelperReplaceContext
                {
                    PiggybagDataFinder = new PiggybagDataFinder(dynamicContext.Piggybag, ancestorEntityToken)
                };

                XElement markup = this.FunctionMarkupDynamicValuesHelper.ReplaceValues(dynamicValuesHelperReplaceContext);

                BaseRuntimeTreeNode baseRuntimeTreeNode = FunctionTreeBuilder.Build(markup);
                LambdaExpression expression = GetLambdaExpression(baseRuntimeTreeNode);

                if (expression.Parameters.Count != 1)
                {
                    throw new InvalidOperationException("Only 1 parameter lamdas supported when calling function: " + markup);
                }

                Delegate compiledExpression = expression.Compile();

                if (filteredDataItem == null)
                {
                    filteredDataItem = currentEntityToken.Data;
                }

                return (bool)compiledExpression.DynamicInvoke(filteredDataItem);
            };

            
            return upwardsFilter.Target != null 
                ? Expression.Call(Expression.Constant(upwardsFilter.Target), upwardsFilter.Method, parameterExpression)
                : Expression.Call(upwardsFilter.Method, parameterExpression);

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
            private readonly ParameterExpression _parameterExpressionToChange;
            private readonly ParameterExpression _newParameterExpression;


            public ParameterChangerExpressionVisitor(ParameterExpression parameterExpressionToChange, ParameterExpression newParameterExpression)
            {
                _parameterExpressionToChange = parameterExpressionToChange;
                _newParameterExpression = newParameterExpression;
            }


            protected override Expression VisitParameter(ParameterExpression node)
            {
                if (node == _parameterExpressionToChange)
                    return _newParameterExpression;
                    
                return node;
            }
        }
    }
}
