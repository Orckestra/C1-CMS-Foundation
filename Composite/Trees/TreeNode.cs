using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using Composite.Data;
using Composite.Data.ProcessControlled;
using Composite.Elements;
using Composite.Linq;
using Composite.ResourceSystem;
using Composite.ResourceSystem.Icons;
using Composite.Security;
using Composite.Trees.Foundation;
using Composite.Types;


namespace Composite.Trees
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class AncestorResult
    {
        public AncestorResult(TreeNode treeNode, EntityToken entityToken)
        {
            this.TreeNode = treeNode;
            this.EntityToken = entityToken;
        }


        public TreeNode TreeNode { get; set; }
        public EntityToken EntityToken { get; set; }
    }





    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public abstract class TreeNode
    {       
        protected List<TreeNode> _childNodes = new List<TreeNode>();
        protected List<ActionNode> _actionNodes = new List<ActionNode>();
        protected List<OrderByNode> _orderByNodes = new List<OrderByNode>();
        protected List<FilterNode> _filterNodes = new List<FilterNode>();


        public string XPath { get; internal set; }
        public string Id { get; internal set; }

        public Tree Tree { get; internal set; }
        public TreeNode ParentNode { get; internal set; }

        public IEnumerable<TreeNode> ChildNodes { get { return _childNodes; } }
        public IEnumerable<ActionNode> ActionNodes { get { return _actionNodes; } }
        public IEnumerable<OrderByNode> OrderByNodes { get { return _orderByNodes; } }
        public IEnumerable<FilterNode> FilterNodes { get { return _filterNodes; } }

        /// <summary>
        /// This is call when this nodes entity tokens are needed to climb up the tree.
        /// If this tree nodes elements dont have any children, then this method will not be called.
        /// </summary>
        /// <param name="childEntityToken"></param>
        /// <param name="dynamicContext"></param>
        /// <returns></returns>
        public abstract IEnumerable<EntityToken> GetEntityTokens(EntityToken childEntityToken, TreeNodeDynamicContext dynamicContext);




        /// <summary>
        /// This is called when a node has genereted its own entity tokens (by a child) and the child
        /// needs to filter these entity token
        /// </summary>
        /// <param name="selfEntityToken"></param>
        /// <param name="parentGeneretedEntityTokens"></param>
        /// <param name="dynamicContext"></param>
        /// <returns></returns>
        internal virtual IEnumerable<EntityToken> FilterParentGeneretedEntityTokens(EntityToken selfEntityToken, IEnumerable<EntityToken> parentGeneretedEntityTokens, TreeNodeDynamicContext dynamicContext)
        {
            return parentGeneretedEntityTokens;
        }



        /// <summary>
        /// This is called to, in the end, find a parent data entity token, so that the data item behind it can be used 
        /// by the start caller (ParentIdFilterNode) to get its own data item for creating a upward filter.
        /// 
        /// If more than one parent exists, the first one is enough
        /// 
        /// We are only looking for a data entity token, so 'jumping over' other
        /// parents is allowed.
        /// </summary>
        /// <param name="ownEntityToken"></param>
        /// <param name="parentInterfaceOfInterest">
        /// We are searching for a data entity token of interface type state in this parameter
        /// </param>
        /// <param name="dynamicContext"></param>
        /// <returns></returns>
        public abstract AncestorResult GetParentEntityToken(EntityToken ownEntityToken, Type parentInterfaceOfInterest, TreeNodeDynamicContext dynamicContext);


        /// <summary>
        /// This is called when this nodes elements are needed to create next sub level of tree elements.
        /// </summary>
        /// <param name="parentEntityToken"></param>
        /// <param name="dynamicContext"></param>
        /// <returns></returns>
        protected abstract IEnumerable<Element> OnGetElements(EntityToken parentEntityToken, TreeNodeDynamicContext dynamicContext);



        public IEnumerable<Element> GetElements(EntityToken parentEntityToken, TreeNodeDynamicContext dynamicContext)
        {
            IEnumerable<Element> elements = OnGetElements(parentEntityToken, dynamicContext);

            foreach (Element element in elements)
            {
                foreach (ActionNode actionNode in this.ActionNodes)
                {
                    actionNode.AddAction(f => element.AddAction(f), element.ElementHandle.EntityToken, dynamicContext);
                }

                yield return element;
            }
        }



        /// <summary>
        /// This is called after the build of the tree is finished
        /// </summary>
        /// <returns></returns>
        protected virtual void OnInitialize() { }


        public void Initialize() 
        {
            this.OnInitialize();

            foreach (TreeNode treeNode in this.ChildNodes)
            {
                treeNode.Initialize();
            }
        }



        internal void AddValidationError(string stringName, params object[] args)
        {
            this.Tree.AddValidationError(this.XPath, stringName, args);
        }



        internal TreeNode AddChildTreeNode(TreeNode treeNode)
        {
            treeNode.ParentNode = this;
            _childNodes.Add(treeNode);

            return this;
        }



        internal void RemoveChildTreeNode(TreeNode treeNode)
        {
            _childNodes.Remove(treeNode);
        }



        internal void AddActionNode(ActionNode actionNode)
        {
            actionNode.OwnerNode = this;
            _actionNodes.Add(actionNode);

        }



        internal void AddOrderByNode(OrderByNode orderByNode)
        {
            orderByNode.SetOwnerNode(this);
            _orderByNodes.Add(orderByNode);
        }



        internal void AddFilterNode(FilterNode filterNode)
        {
            filterNode.SetOwnerNode(this);
            _filterNodes.Add(filterNode);            
        }



        internal bool IsAncestor(TreeNode treeNode)
        {
            TreeNode parentTreeNode = this.ParentNode;

            while (parentTreeNode != null)
            {
                if (parentTreeNode.Id == treeNode.Id) return true;

                parentTreeNode = parentTreeNode.ParentNode;
            }

            return false;
        }



        internal bool IsChild(TreeNode treeNode)
        {
            foreach (TreeNode childTreeNode in this.ChildNodes)
            {
                if (childTreeNode.Id == treeNode.Id) return true;

                bool result = childTreeNode.IsChild(treeNode);
                if (result == true) return true;
            }

            return false;
        }



        protected string ParentString()
        {
            if (this.ParentNode == null)
            {
                return "ParentId = -1";
            }
            else
            {
                return "ParentId = " + this.ParentNode.Id;
            }
        }
    }    
}
