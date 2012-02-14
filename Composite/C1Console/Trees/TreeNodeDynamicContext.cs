using System;
using System.Collections.Generic;
using Composite.C1Console.Security;
using System.Reflection;


namespace Composite.C1Console.Trees
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public enum TreeNodeDynamicContextDirection
    {
        /// <exclude />
        Down, // Creating elements

        /// <exclude />
        Up // Creating entity tokens
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class TreeNodeDynamicContext
    {
        private Dictionary<string, object> _fieldGroupingValues;
        private Dictionary<string, int> _fieldFolderRangeValues;


        /// <exclude />
        public TreeNodeDynamicContext(TreeNodeDynamicContextDirection treeNodeDynamicContextDirection)
        {
            this.Direction = treeNodeDynamicContextDirection;
            this.CustomData = new Dictionary<string, object>();
        }


        /// <exclude />
        public string ElementProviderName { get; set; }


        /// <exclude />
        public TreeNodeDynamicContextDirection Direction { get; internal set; }


        /// <exclude />
        public Dictionary<string, object> FieldGroupingValues
        {
            get
            {
                if (_fieldGroupingValues == null)
                {
                    _fieldGroupingValues = new Dictionary<string, object>();
                }

                return _fieldGroupingValues;
            }
            set
            {
                _fieldGroupingValues = value;
            }
        }


        /// <exclude />
        public Dictionary<string, int> FieldFolderRangeValues
        {
            get
            {
                if (_fieldFolderRangeValues == null)
                {
                    _fieldFolderRangeValues = new Dictionary<string, int>();
                }

                return _fieldFolderRangeValues;
            }
            set
            {
                _fieldFolderRangeValues = value;
            }
        }


        /// <exclude />
        public Dictionary<string, string> Piggybag { get; set; }


        /// <exclude />
        public EntityToken CurrentEntityToken { get; set; }

        /// <exclude />
        public TreeNode CurrentTreeNode { get; set; }


        internal Dictionary<string, object> CustomData { get; set; }        
    }    
}
