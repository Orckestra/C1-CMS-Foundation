using Composite.Data;
using Composite.ResourceSystem;


namespace Composite.Trees
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class DynamicValuesHelperReplaceContext
    {
        public PiggybagDataFinder PiggybagDataFinder { get; set; }
        public IData CurrentDataItem { get; set; }
    }




    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class DynamicValuesHelper
    {
        private DataFieldValueHelper DataFieldValueHelper { get; set; }

        public string Template { get; private set; }


        public DynamicValuesHelper(string template)
        {
            this.Template = template;

            this.DataFieldValueHelper = null;
        }



        public string ReplaceValues(DynamicValuesHelperReplaceContext context)
        {
            string currentValue = this.Template;

            if (this.DataFieldValueHelper != null)
            {
                currentValue = this.DataFieldValueHelper.ReplaceValues(currentValue, context.PiggybagDataFinder, context.CurrentDataItem);
            }

            return StringResourceSystemFacade.ParseString(currentValue);
        }



        /// <summary>
        /// 
        /// </summary>
        /// <param name="ownerTreeNode">This is only used to add validation errors</param>
        public void Initialize(TreeNode ownerTreeNode)
        {
            Initialize_DataFieldValueHelper(ownerTreeNode);
        }


        public void Initialize(ActionNode ownerActionNode)
        {
            Initialize(ownerActionNode.OwnerNode);
        }


        /// <summary>
        /// 
        /// </summary>
        /// <param name="ownerTreeNode">This is only used to add validation errors</param>
        private void Initialize_DataFieldValueHelper(TreeNode ownerTreeNode)
        {
            if (DataFieldValueHelper.ContainsDataField(this.Template) == false) return;

            this.DataFieldValueHelper = new DataFieldValueHelper(this.Template);
            this.DataFieldValueHelper.Initialize(ownerTreeNode);
        }
    }	
}
