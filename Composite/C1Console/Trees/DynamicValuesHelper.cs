using Composite.Data;
using Composite.Core.ResourceSystem;


namespace Composite.C1Console.Trees
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class DynamicValuesHelperReplaceContext
    {
        /// <exclude />
        public PiggybagDataFinder PiggybagDataFinder { get; set; }

        /// <exclude />
        public IData CurrentDataItem { get; set; }
    }




    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class DynamicValuesHelper
    {
        private DataFieldValueHelper DataFieldValueHelper { get; set; }

        /// <exclude />
        public string Template { get; private set; }


        /// <exclude />

        public DynamicValuesHelper(string template)
        {
            this.Template = template;

            this.DataFieldValueHelper = null;
        }


        /// <exclude />
        public bool UseUrlEncode { get; set; }


        /// <exclude />
        public string ReplaceValues(DynamicValuesHelperReplaceContext context)
        {
            string currentValue = this.Template;

            if (this.DataFieldValueHelper != null)
            {
                currentValue = this.DataFieldValueHelper.ReplaceValues(currentValue, context.PiggybagDataFinder, context.CurrentDataItem, this.UseUrlEncode);
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


        /// <exclude />
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
