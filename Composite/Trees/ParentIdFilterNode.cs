using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using Composite.Data;
using Composite.Linq;
using Composite.Security;
using Composite.Trees.Foundation;
using Composite.Trees.Foundation.AttachmentPoints;
using Composite.Types;


namespace Composite.Trees
{
    public class ParentIdFilterNode : FilterNode
    {
        public Type ParentFilterType { get; internal set; }     // Required
        public string ReferenceFieldName { get; internal set; } // Required


        public DataElementsTreeNode ParentFilterTypeTreeNode { get; internal set; }


        internal PropertyInfo KeyPropertyInfo { get; set; }
        internal PropertyInfo ReferencePropertyInfo { get; set; }


        public override Expression CreateDownwardsFilterExpression(ParameterExpression parameterExpression, TreeNodeDynamicContext dynamicContext)
        {
            IData parentDataItem = GetParentDataItem(this.ParentFilterType, dynamicContext.CurrentEntityToken, dynamicContext);
            if (parentDataItem == null) return null;

            object parentFieldValue = this.KeyPropertyInfo.GetValue(parentDataItem, null);

            Expression expression = Expression.Equal(ExpressionHelper.CreatePropertyExpression(this.ReferenceFieldName, parameterExpression), Expression.Constant(parentFieldValue, this.ReferencePropertyInfo.PropertyType));

            return expression;
        }



        private bool IsInParentTree(TreeNode treeNode)
        {
            TreeNode searchTreeNode = treeNode.ParentNode;
            while (searchTreeNode != null)
            {
                DataElementsTreeNode node = searchTreeNode as DataElementsTreeNode;
                if (node != null)
                {
                    if (node.InterfaceType == this.OwnerNode.InterfaceType)
                    {
                        // Found in parent tree.
                        return true;
                    }
                    else
                    {
                        searchTreeNode = searchTreeNode.ParentNode;
                    }
                }
                else
                {
                    searchTreeNode = searchTreeNode.ParentNode;
                }
            }

            return false;
        }



        /// <summary>
        /// This method finds the callers tree node own entity token by searching up/down using filters.
        /// In some cases this can be expensive.
        /// </summary>
        /// <param name="treeNode"></param>
        /// <param name="entityToken"></param>
        /// <param name="dynamicContext"></param>
        /// <returns></returns>
        private EntityToken FindOwnEntityToken(TreeNode treeNode, EntityToken entityToken, TreeNodeDynamicContext dynamicContext)
        {
            DataElementsTreeNode dataElementsTreeNode = treeNode as DataElementsTreeNode;
            if (dataElementsTreeNode != null)
            {
                if (dataElementsTreeNode.InterfaceType == this.OwnerNode.InterfaceType) // We found it :)
                {                    
                    return entityToken;
                }
            }


            TreeDataFieldGroupingElementEntityToken dataFieldGroupingElementEntityToken = entityToken as TreeDataFieldGroupingElementEntityToken;
            if (dataFieldGroupingElementEntityToken != null) // Search 'downwards'
            {                
                ParameterExpression parameterExpression = Expression.Parameter(this.OwnerNode.InterfaceType, "data");

                DataKeyPropertyCollection dataKeyPropertyCollection = new DataKeyPropertyCollection();
                dataKeyPropertyCollection.AddKeyProperty("Id", dataFieldGroupingElementEntityToken.ChildGeneratingDataElementsReferenceValue);
                IData parentData = DataFacade.GetDataByUniqueKey(this.ParentFilterType, dataKeyPropertyCollection);

                TreeNodeDynamicContext dummyContext = new TreeNodeDynamicContext(TreeNodeDynamicContextDirection.Down);
                dummyContext.CustomData.Add("ParentData", parentData);

                Expression filterExpression = this.CreateDownwardsFilterExpression(parameterExpression, dummyContext);

                Expression whereExpression = ExpressionHelper.CreateWhereExpression(DataFacade.GetData(this.OwnerNode.InterfaceType).Expression, parameterExpression, filterExpression);

                IData resultData = (IData)DataFacade.GetData(this.OwnerNode.InterfaceType).Provider.CreateQuery(whereExpression).ToEnumerableOfObjects().First();

                return resultData.GetDataEntityToken();
            }


            AncestorResult ancestorResult = treeNode.GetParentEntityToken(entityToken, this.ParentFilterType, dynamicContext);

            if ((this.OwnerNode.Id == ancestorResult.TreeNode.Id) || (this.OwnerNode.IsChild(ancestorResult.TreeNode) == true)) // Search upwards
            {
                return FindOwnEntityToken(ancestorResult.TreeNode, ancestorResult.EntityToken, dynamicContext);
            }            


            // Search 'downwards' by using the parent datas key value to get 
            DataElementsTreeNode parentDataElementsTreeNode = (DataElementsTreeNode)ancestorResult.TreeNode;
            if (this.ParentFilterType == parentDataElementsTreeNode.InterfaceType)
            {
                DataEntityToken dataEntityToken = (DataEntityToken)ancestorResult.EntityToken;

                ParameterExpression parameterExpression = Expression.Parameter(this.OwnerNode.InterfaceType, "data");

                TreeNodeDynamicContext dummyContext = new TreeNodeDynamicContext(TreeNodeDynamicContextDirection.Down);
                dummyContext.CustomData.Add("ParentData", dataEntityToken.Data);

                Expression filterExpression = this.CreateDownwardsFilterExpression(parameterExpression, dummyContext);

                Expression whereExpression = ExpressionHelper.CreateWhereExpression(DataFacade.GetData(this.OwnerNode.InterfaceType).Expression, parameterExpression, filterExpression);

                IData resultData = (IData)DataFacade.GetData(this.OwnerNode.InterfaceType).Provider.CreateQuery(whereExpression).ToEnumerableOfObjects().First();

                return resultData.GetDataEntityToken();
            }
            

            throw new InvalidOperationException("Missing parent id filtering or try to simplify the parent id filterings (Unable to find own entity token)");
        }




        private object FindParentKeyValue(TreeNodeDynamicContext dynamicContext)
        {
            if ((dynamicContext.CurrentEntityToken is DataEntityToken) == true)
            {
                DataEntityToken currentDataEntityToken = dynamicContext.CurrentEntityToken as DataEntityToken;
                if (currentDataEntityToken.InterfaceType == this.ParentFilterType)
                {
                    return this.KeyPropertyInfo.GetValue(currentDataEntityToken.Data, null);
                }
            }

            EntityToken ownFilterEntityToken = FindOwnEntityToken(dynamicContext.CurrentTreeNode, dynamicContext.CurrentEntityToken, dynamicContext);

            DataEntityToken dataEntityToken = (DataEntityToken)ownFilterEntityToken;

            IData data = dataEntityToken.Data;

            object parentFieldValue = this.ReferencePropertyInfo.GetValue(data, null);

            return parentFieldValue;
        }



        public override Expression CreateUpwardsFilterExpression(ParameterExpression parameterExpression, TreeNodeDynamicContext dynamicContext)
        {
            // To create a upwards filter, we need the parent key value to filter on our own reference value (by constant)
            // To do this we need the parent entity token or our own entity token
            object parentFieldValue = FindParentKeyValue(dynamicContext);

            Expression expression = Expression.Equal(ExpressionHelper.CreatePropertyExpression(this.ReferenceFieldName, parameterExpression), Expression.Constant(parentFieldValue, this.ReferencePropertyInfo.PropertyType));

            return expression;
        }



        internal override void Initialize()
        {
            foreach (TreeNode treeNode in this.OwnerNode.Ancestors(true))
            {
                DataElementsTreeNode dataElementsTreeNode = treeNode as DataElementsTreeNode;

                if ((dataElementsTreeNode != null) && (dataElementsTreeNode.InterfaceType == this.ParentFilterType))
                {
                    this.ParentFilterTypeTreeNode = dataElementsTreeNode;
                    break;
                }
            }

            bool dataItemAttachmentPointExists =
                    (this.OwnerNode.Tree.AttachmentPoints.
                     OfType<IDataItemAttachmentPoint>().
                     Where(f => f.InterfaceType == this.ParentFilterType).
                     Any())
                    ||
                    (this.OwnerNode.Tree.PossibleAttachmentPoints.
                     OfType<IDataItemAttachmentPoint>().
                     Where(f => f.InterfaceType == this.ParentFilterType).
                     Any());

            if ((this.ParentFilterTypeTreeNode != null) || (dataItemAttachmentPointExists == true))
            {
                this.KeyPropertyInfo = this.ParentFilterType.GetKeyPropertyInfoes()[0];
            }

            if (this.KeyPropertyInfo == null)
            {
                AddValidationError("TreeValidationError.ParentIdFilterNode.TypeIsNotInParentTree", this.ParentFilterType);
            }

            this.ReferencePropertyInfo = this.OwnerNode.InterfaceType.GetPropertiesRecursively().Where(f => f.Name == this.ReferenceFieldName).SingleOrDefault();

            if (this.ReferencePropertyInfo == null) AddValidationError("TreeValidationError.Common.MissingProperty", this.OwnerNode.InterfaceType, this.ReferenceFieldName);
        }



        public override string ToString()
        {
            if (this.ParentFilterTypeTreeNode != null)
            {
                return string.Format("ParentIdFilterNode, ParentFilterType = {0}, ReferenceFieldName = {1}, ParentFilterTreeNodeId = {2}", this.ParentFilterType, this.ReferenceFieldName, this.ParentFilterTypeTreeNode.Id);
            }
            else
            {
                return string.Format("ParentIdFilterNode, ParentFilterType = {0}, ReferenceFieldName = {1}", this.ParentFilterType, this.ReferenceFieldName);
            }
        }



        private object Find(TreeNode currentTreeNode, EntityToken currentEntityToken)
        {
            if (this.OwnerNode.IsAncestor(currentTreeNode) == true) // Is parent
            {
                return currentTreeNode;
            }
            else if (this.OwnerNode.Id != currentTreeNode.Id) // Is child
            {
                IEnumerable<ParentIdFilterNode> parentIdFilterNodes = currentTreeNode.FilterNodes.OfType<ParentIdFilterNode>();

                foreach (ParentIdFilterNode parentIdFilterNode in parentIdFilterNodes)
                {
                    Find(parentIdFilterNode.ParentFilterTypeTreeNode, null);
                }
            }

            foreach (TreeNode childTreeNode in this.OwnerNode.ChildNodes)
            {
                object res = Find(childTreeNode, null);
                if (res != null)
                {
                    return res;
                }
            }

            return null;
        }



        private IData GetParentDataItem(Type parentType, EntityToken parentEntityToken, TreeNodeDynamicContext dynamicContext)
        {
            if (dynamicContext.CustomData.ContainsKey("ParentData") == true)
            {
                return (IData)dynamicContext.CustomData["ParentData"];
            }

            IData parentDataItem = null;
            if (parentEntityToken is DataEntityToken)
            {
                DataEntityToken dataEntityToken = parentEntityToken as DataEntityToken;
                Type type = dataEntityToken.InterfaceType;
                if (type == parentType)
                {
                    return dataEntityToken.Data;
                }
            }

            if (parentDataItem == null)
            {
                foreach (EntityToken entityToken in dynamicContext.Piggybag.GetParentEntityTokens())
                {
                    DataEntityToken dataEntityToken = entityToken as DataEntityToken;

                    if (dataEntityToken == null) continue;

                    Type type = dataEntityToken.InterfaceType;
                    if (type != parentType) continue;

                    return dataEntityToken.Data;
                }
            }

            return null;
        }
    }
}
