using System.Linq.Expressions;
using System.Collections.Generic;


namespace Composite.C1Console.Trees
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public abstract class FilterNode
    {
        public string XPath { get; internal set; }
        public int Id { get; internal set; }
        public DataElementsTreeNode OwnerNode { get; internal set; }


        /// <summary>
        /// This is used when finding data to create elements from (elements going down)
        /// </summary>
        /// <param name="parameterExpression"></param>
        /// <param name="dynamicContext"></param>
        /// <returns></returns>
        public virtual Expression CreateDownwardsFilterExpression(ParameterExpression parameterExpression, TreeNodeDynamicContext dynamicContext) { return null; }



        /// <summary>
        /// This is used when finding data to create entity tokens (security going up)
        /// </summary>
        /// <param name="parameterExpression"></param>
        /// <param name="dynamicContext"></param>
        /// <returns></returns>
        public virtual Expression CreateUpwardsFilterExpression(ParameterExpression parameterExpression, TreeNodeDynamicContext dynamicContext) { return null; }



        /// <summary>
        /// Use this method to do initializing and validation
        /// </summary>
        internal virtual void Initialize() { }



        public void SetOwnerNode(TreeNode treeNode)
        {
            this.OwnerNode = (DataElementsTreeNode)treeNode;
        }



        protected void AddValidationError(ValidationError validationError)
        {
            this.OwnerNode.Tree.BuildResult.AddValidationError(validationError);
        }



        protected void AddValidationError(string stringName, params object[] args)
        {
            this.OwnerNode.Tree.BuildResult.AddValidationError(ValidationError.Create(this.XPath, stringName, args));
        }
    }
}
