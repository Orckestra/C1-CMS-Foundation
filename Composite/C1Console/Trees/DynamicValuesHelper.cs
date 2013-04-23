using System.Collections.Generic;
using System.Web;
using Composite.C1Console.Security;
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
        /// <summary>
        /// Initializes a new instance of the <see cref="DynamicValuesHelperReplaceContext"/> class.
        /// </summary>
        public DynamicValuesHelperReplaceContext()
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="DynamicValuesHelperReplaceContext"/> class.
        /// </summary>
        public DynamicValuesHelperReplaceContext(EntityToken currentEntityToken, Dictionary<string, string> piggyback)
        {
            piggyback = piggyback ?? new Dictionary<string, string>();

            this.CurrentEntityToken = currentEntityToken;
            this.PiggybagDataFinder = new PiggybagDataFinder(piggyback, currentEntityToken);

            if (currentEntityToken is DataEntityToken)
            {
                this.CurrentDataItem = (currentEntityToken as DataEntityToken).Data;
            }
        }

        /// <summary>
        /// Gets or sets the piggybag data finder.
        /// </summary>
        /// <value>
        /// The piggybag data finder.
        /// </value>
        /// <exclude />
        public PiggybagDataFinder PiggybagDataFinder { get; set; }

        /// <summary>
        /// Gets or sets the current data item.
        /// </summary>
        /// <value>
        /// The current data item.
        /// </value>
        /// <exclude />
        public IData CurrentDataItem { get; set; }

        /// <summary>
        /// Gets or sets the current entity token.
        /// </summary>
        /// <value>
        /// The current entity token.
        /// </value>
        /// <exclude />
        public EntityToken CurrentEntityToken { get; set; }
    }




    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class DynamicValuesHelper
    {
        const string CurrentEntityTokenMask = "${C1:EntityToken}";

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

            if (currentValue.Contains(CurrentEntityTokenMask))
            {
                string serializedEntityToken = context.CurrentEntityToken != null
                                                   ? EntityTokenSerializer.Serialize(context.CurrentEntityToken)
                                                   : "(null)";

                if (this.UseUrlEncode)
                {
                    serializedEntityToken = HttpUtility.UrlEncode(serializedEntityToken);
                }

                currentValue = currentValue.Replace(CurrentEntityTokenMask, serializedEntityToken);
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
