using System;
using System.Collections.Generic;
using System.Linq;
using Composite.C1Console.Elements;
using Composite.C1Console.Security;
using Composite.C1Console.Workflow;


namespace Composite.C1Console.Trees
{
    /// <summary>    
    /// Information about the ancestor node withing the same tree
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class AncestorResult
    {
        /// <exclude />
        public AncestorResult(TreeNode treeNode, EntityToken entityToken)
        {
            this.TreeNode = treeNode;
            this.EntityToken = entityToken;
        }


        /// <exclude />
        public TreeNode TreeNode { get; private set; }

        /// <exclude />
        public EntityToken EntityToken { get; private set; }
    }



    /// <summary>    
    /// Represents a node in tree definition
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public abstract class TreeNode
    {
        /// <exclude />
        protected List<TreeNode> _childNodes = new List<TreeNode>();

        /// <exclude />
        protected List<ActionNode> _actionNodes = new List<ActionNode>();

        /// <exclude />
        protected List<OrderByNode> _orderByNodes = new List<OrderByNode>();

        /// <exclude />
        protected List<FilterNode> _filterNodes = new List<FilterNode>();


        /// <exclude />
        public string XPath { get; internal set; }

        /// <exclude />
        public string Id { get; internal set; }


        /// <exclude />
        public Tree Tree { get; internal set; }

        /// <exclude />
        public TreeNode ParentNode { get; internal set; }


        /// <exclude />
        public IEnumerable<TreeNode> ChildNodes { get { return _childNodes; } }

        /// <exclude />
        public IEnumerable<ActionNode> ActionNodes { get { return _actionNodes; } }

        /// <exclude />
        public IEnumerable<OrderByNode> OrderByNodes { get { return _orderByNodes; } }

        /// <exclude />
        public IEnumerable<FilterNode> FilterNodes { get { return _filterNodes; } }

        /// <summary>
        /// This is call when this nodes entity tokens are needed to climb up the tree.
        /// If this tree nodes elements dont have any children, then this method will not be called.
        /// </summary>
        /// <param name="childEntityToken">The child entity token.</param>
        /// <param name="dynamicContext">The dynamic context.</param>
        /// <returns></returns>
        public abstract IEnumerable<EntityToken> GetEntityTokens(EntityToken childEntityToken, TreeNodeDynamicContext dynamicContext);




        /// <summary>
        /// This is called when a node has genereted its own entity tokens (by a child) and the child
        /// needs to filter these entity token
        /// </summary>
        /// <param name="selfEntityToken">The self entity token.</param>
        /// <param name="parentGeneretedEntityTokens">The parent genereted entity tokens.</param>
        /// <param name="dynamicContext">The dynamic context.</param>
        /// <returns></returns>
        internal virtual IEnumerable<EntityToken> FilterParentGeneretedEntityTokens(EntityToken selfEntityToken, IEnumerable<EntityToken> parentGeneretedEntityTokens, TreeNodeDynamicContext dynamicContext)
        {
            return parentGeneretedEntityTokens;
        }



        /// <summary>
        /// This is called to, in the end, find a parent data entity token, so that the data item behind it can be used 
        /// by the start caller (ParentIdFilterNode) to get its own data item for creating an upward filter.
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



        /// <exclude />
        public IEnumerable<Element> GetElements(EntityToken parentEntityToken, TreeNodeDynamicContext dynamicContext)
        {
            IEnumerable<Element> elements = OnGetElements(parentEntityToken, dynamicContext);

            var localizeDataWorkflow = WorkflowFacade.GetWorkflowType("Composite.C1Console.Trees.Workflows.LocalizeDataWorkflow");

            foreach (Element element in elements)
            {
                bool isForeignLocaleDataItem = element.Actions
                        .Any(x => x.ActionHandle.ActionToken is WorkflowActionToken 
                        && ((WorkflowActionToken)x.ActionHandle.ActionToken).WorkflowType == localizeDataWorkflow);

                if (!isForeignLocaleDataItem)
                {
                    foreach (ActionNode actionNode in this.ActionNodes)
                    {
                        actionNode.AddAction(element.AddAction, element.ElementHandle.EntityToken, dynamicContext);
                    }
                }

                yield return element;
            }
        }



        /// <summary>
        /// This is called after the build of the tree is finished
        /// </summary>
        /// <returns></returns>
        protected virtual void OnInitialize() { }


        /// <exclude />
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
            TreeNode ancestorNode = this.ParentNode;

            while (ancestorNode != null)
            {
                if (ancestorNode.Id == treeNode.Id) return true;

                ancestorNode = ancestorNode.ParentNode;
            }

            return false;
        }



        internal bool IsDescendant(TreeNode treeNode)
        {
            return this.ChildNodes.Any(childNode => childNode.Id == treeNode.Id || childNode.IsDescendant(treeNode));
        }



        /// <exclude />
        protected string ParentString()
        {
            return "ParentId = " + ((ParentNode != null) ? ParentNode.Id : "-1");
        }
    }    
}
