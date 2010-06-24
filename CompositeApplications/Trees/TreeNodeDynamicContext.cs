using System;
using System.Collections.Generic;
using Composite.Security;


namespace Composite.Trees
{
    public enum TreeNodeDynamicContextDirection
    {
        Down, // Creating elements
        Up // Creating entity tokens
    }



    public sealed class TreeNodeDynamicContext
    {
        private Dictionary<string, object> _fieldGroupingValues;
        private Dictionary<string, int> _fieldFolderRangeValues;


        public TreeNodeDynamicContext(TreeNodeDynamicContextDirection treeNodeDynamicContextDirection)
        {
            this.Direction = treeNodeDynamicContextDirection;
            this.CustomData = new Dictionary<string, object>();
        }

        public string ElementProviderName { get; set; }

        public TreeNodeDynamicContextDirection Direction { get; internal set; }


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


        public Dictionary<string, string> Piggybag { get; set; }

        public EntityToken CurrentEntityToken { get; set; }
        public TreeNode CurrentTreeNode { get; set; }


        internal Dictionary<string, object> CustomData { get; set; }
    }    
}
