using System;
using System.Linq;
using System.Linq.Expressions;
using Composite.Core.Linq;
using System.Collections.Generic;


namespace Composite.C1Console.Trees
{
    /// <summary> 
    /// Tree node that shows filtered data items, or items generated from them (f.e. data grouping elements)   
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public abstract class DataFilteringTreeNode : TreeNode
    {
        internal abstract Type CurrentDataInterfaceType { get; }

        /// <summary>
        /// Depending on dynamicContext's Direction creates either filter expression for finding child elements or
        /// a filter expression to find current element based on children elements
        /// </summary>
        /// <param name="parameterExpression">The parameter expression.</param>
        /// <param name="dynamicContext">The dynamic context.</param>
        /// <param name="filtersToSkip">The filters to skip.</param>
        /// <returns></returns>
        internal virtual Expression CreateFilterExpression(ParameterExpression parameterExpression, TreeNodeDynamicContext dynamicContext, IList<int> filtersToSkip = null)
        {
            Expression expression = null;

            var filterNodes = dynamicContext.Direction == TreeNodeDynamicContextDirection.Down
                                  ? this.FilterNodes
                                  : dynamicContext.CurrentTreeNode.FilterNodes;

            foreach (FilterNode filterNode in filterNodes)
            {
                if (filtersToSkip != null && filtersToSkip.Contains(filterNode.Id)) continue;

                Expression filterExpression;
                if (dynamicContext.Direction == TreeNodeDynamicContextDirection.Down)
                {
                    filterExpression = filterNode.CreateDownwardsFilterExpression(parameterExpression, dynamicContext);
                }
                else
                {
                    filterExpression = filterNode.CreateUpwardsFilterExpression(parameterExpression, dynamicContext);
                }

                if (filterExpression == null) continue;

                expression = expression.NestedAnd(filterExpression);
            }

            return expression;
        }



        /// <summary>
        /// Creates the accumulated filter expression from current tree definition node, and all the nearest ancestor DataFolderElement-s that
        /// are related to the same data type.
        /// </summary>
        /// <param name="parameterExpression">The parameter expression.</param>
        /// <param name="affectedInterfaceType">Type of the affected interface.</param>
        /// <param name="dynamicContext">The dynamic context.</param>
        /// <param name="filtersToSkip">The filters to skip.</param>
        /// <returns></returns>
        internal Expression CreateAccumulatedFilterExpression(ParameterExpression parameterExpression, Type affectedInterfaceType, TreeNodeDynamicContext dynamicContext, IList<int> filtersToSkip = null)
        {
            TreeNode treeNode = this;            

            Expression currentExpression = null;            

            while (treeNode != null)
            {
                DataFilteringTreeNode dataFilteringTreeNode = treeNode as DataFilteringTreeNode;

                if (dataFilteringTreeNode != null 
                    && (dataFilteringTreeNode == this || dataFilteringTreeNode is DataFolderElementsTreeNode) 
                    && (dataFilteringTreeNode.CurrentDataInterfaceType == affectedInterfaceType))
                {
                    Expression filterExpression = dataFilteringTreeNode.CreateFilterExpression(parameterExpression, dynamicContext, filtersToSkip);

                    if (filterExpression != null)
                    {
                        currentExpression = currentExpression.NestedAnd(filterExpression);
                    }
                }
                else
                {
                    break;
                }

                treeNode = treeNode.ParentNode;
            }

            //currentExpression.DebugLogExpression("DataFileringTreeNode", "Accumulated Filter Expression");

            return currentExpression;
        }



        /// <summary>
        /// Creates the OrderBy expression.
        /// </summary>
        /// <param name="sourceExpression">The source expression.</param>
        /// <param name="parameterExpression">The parameter expression.</param>
        /// <returns></returns>
        /// <exclude />
        protected Expression CreateOrderByExpression(Expression sourceExpression, ParameterExpression parameterExpression)
        {
            Expression resultExpression = sourceExpression;

            bool isFirst = true;
            foreach (OrderByNode orderByNode in this.OrderByNodes)
            {
                resultExpression = orderByNode.CreateOrderByExpression(resultExpression, parameterExpression, isFirst);
                isFirst = false;
            }

            return resultExpression;
        }
    }
}
