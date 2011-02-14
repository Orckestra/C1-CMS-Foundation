using System.Diagnostics;
using System.Collections.Generic;


namespace Composite.C1Console.Security
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public enum RelationshipGraphNodeType
    {
        /// <exclude />
        Entity = 0,
        /// <exclude />

        Hooking = 1
    }




    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [DebuggerDisplay("Level = {Level}, Type = {NodeType}, EntityToken = {EntityToken}")]
    public sealed class RelationshipGraphNode
    {
        internal RelationshipGraphNode(EntityToken entityToken, int level, RelationshipGraphNodeType relationshipGraphNodeType)
        {
            this.EntityToken = entityToken;
            this.Level = level;
            this.NodeType = relationshipGraphNodeType;
            this.ChildNode = null;
            this.ParentNodes = new List<RelationshipGraphNode>();
        }


        /// <exclude />
        public EntityToken EntityToken
        {
            get;
            private set;
        }


        /// <exclude />
        public int Level
        {
            get;
            private set;
        }


        /// <exclude />
        public RelationshipGraphNodeType NodeType
        {
            get;
            private set;
        }



        /// <exclude />
        public List<RelationshipGraphNode> ParentNodes
        {
            get;
            set;
        }


        /// <exclude />
        public RelationshipGraphNode ChildNode
        {
            get;
            set;
        }
    }
}
